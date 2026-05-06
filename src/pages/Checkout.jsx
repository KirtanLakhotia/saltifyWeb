import { useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppContext } from '../context/hooks/useAppContext.js'
import { useEffect } from 'react'

function Checkout() {
  const { user, cart, removeFromCart , setCart} = useAppContext()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [isCountryNoteOpen, setIsCountryNoteOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    landmark: '',
    country: 'India',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  )

  if (!user) {
    return <Navigate to="/login" replace />
  }


  useEffect(() => {
  const fetchUserData = async () => {
    try {
      const backendBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

      const res = await fetch(`${backendBase}/user/${user.sub}`)
      const data = await res.json()

      if (data?.user) {
        setFormData({
          fullName: data.user.name || '',
          email: data.user.email || '',
          phone: data.user.phone || '',
          address: data.user.address || '',
          city: data.user.city || '',
          pincode: data.user.pincode || '',
          landmark: data.user.landmark || '',
          country: data.user.country || 'India',
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (user?.sub) {
    fetchUserData()
  }
}, [user])

  const onChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const nextErrors = {}

    if (!formData.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      nextErrors.phone = 'Enter a valid 10-digit phone number.'
    }

    if (!formData.address.trim()) {
      nextErrors.address = 'Address is required.'
    }

    if (!formData.city.trim()) {
      nextErrors.city = 'City is required.'
    }

    if (!formData.pincode.trim()) {
      nextErrors.pincode = 'Pincode is required.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const onSubmit = async (event) => {
    console.log(cart) ;
    event.preventDefault()
    setSuccessMessage('')

    if (!validate()) return
    if (cart.length === 0) {
      setErrors((prev) => ({ ...prev, submit: 'Your cart is empty.' }))
      return
    }

    try {
      setIsSubmitting(true)
      setErrors((prev) => ({ ...prev, submit: '' }))

      const backendBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
      const payload = {
        userId: user.sub,
        items: cart,
        totalAmount: total,
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        pincode: formData.pincode.trim(),
        fullName: formData.fullName.trim(),
        landmark: formData.landmark.trim(),
        country: formData.country.trim(),
      }

      const response = await fetch(`${backendBase}/user/address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      // await fetch(`${backendBase}/user/address`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     userId: user.sub,
      //     ...formData,
      //   }),
      // })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data?.message || 'Unable to place order right now.')
      }


    // ✅ 2. Create Razorpay order
    const orderRes = await fetch(`${backendBase}/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart: cart,
        userId: user.sub,
      }),
    });

    const orderData = await orderRes.json();
    if (!orderData.success) {
      throw new Error("Order creation failed");
    }
    const order = orderData.order;

        // ✅ 3. Open Razorpay
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // frontend key
      amount: order.amount,
      currency: order.currency,
      name: "Saltify",
      description: "Order Payment",
      order_id: order.id,

      handler: async function (response) {
        // ✅ 4. Verify payment
        const verifyRes = await fetch(`${backendBase}/verify-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...response, userId: user.sub ,cart: cart}),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          setOrderPlaced(true)
          setSuccessMessage('Your order has been placed and we will contact you via mail.')
          setCart([]) // Clear cart on successful order

          // 👉 HERE save order in DB (important next step)
        } else {
          setErrors((prev) => ({ ...prev, submit: 'Payment verification failed.' }))
        }
      },

      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();


      
      // setFormData({
      //   fullName: '',
      //   phone: '',
      //   address: '',
      //   city: '',
      //   pincode: '',
      //   landmark: '',
      // })
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error.message || 'Something went wrong.',
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  const fieldClass =
    'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-100'

  if (orderPlaced) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-[0_20px_45px_rgba(148,163,184,0.18)] sm:p-10"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500 text-white shadow-[0_18px_35px_rgba(52,211,153,0.32)]">
            <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-[2.2]">
              <path d="M5 12.5 9.2 16.7 19 7.5" />
            </svg>
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Payment Successful
          </p>
          <h1 className="mt-3 section-headline text-slate-900">
            Order Received
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            {successMessage}
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(56,189,248,0.24)] transition hover:scale-[1.01] hover:shadow-[0_0_28px_rgba(56,189,248,0.32)]"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </section>
    )
  }

  return (
    <section className="space-y-8">
      <div>
        <h1 className="section-headline text-slate-900">Secure Checkout</h1>
        <p className="mt-3 text-sm text-slate-600">
          Complete your order with a fast and premium checkout flow.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="order-1 rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_16px_34px_rgba(148,163,184,0.16)] lg:order-2"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Order Summary
          </p>
          {cart.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600">
              Your cart is empty. Add products to continue.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="mt-1 text-xs text-slate-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      INR {item.price * item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-3 text-xs font-semibold uppercase tracking-wide text-rose-600 hover:text-rose-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600">Total Amount</p>
              <p className="text-2xl font-bold text-slate-900">INR {total}</p>
            </div>
          </div>
        </motion.aside>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="order-2 rounded-[1.8rem] border border-slate-200 bg-white p-6 shadow-[0_16px_34px_rgba(148,163,184,0.16)] lg:order-1"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={onChange}
                placeholder="Enter your full name"
                className={fieldClass}
              />
              {errors.fullName ? (
                <p className="mt-1 text-xs text-rose-600">{errors.fullName}</p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={onChange}
                placeholder="10-digit mobile number"
                className={fieldClass}
                inputMode="numeric"
              />
              {errors.phone ? (
                <p className="mt-1 text-xs text-rose-600">{errors.phone}</p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="Enter your email"
                className={fieldClass}
                type="email"
                autoComplete="email"
              />
              {errors.email ? (
                <p className="mt-1 text-xs text-rose-600">{errors.email}</p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Address Line</label>
              <input
                name="address"
                value={formData.address}
                onChange={onChange}
                placeholder="House no, street, area"
                className={fieldClass}
              />
              {errors.address ? (
                <p className="mt-1 text-xs text-rose-600">{errors.address}</p>
              ) : null}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={onChange}
                placeholder="City"
                className={fieldClass}
              />
              {errors.city ? (
                <p className="mt-1 text-xs text-rose-600">{errors.city}</p>
              ) : null}
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">Pincode</label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={onChange}
                placeholder="Pincode"
                className={fieldClass}
                inputMode="numeric"
              />
              {errors.pincode ? (
                <p className="mt-1 text-xs text-rose-600">{errors.pincode}</p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-700">Country</label>
              <input
                name="country"
                value={formData.country}
                readOnly
                title="We are expanding our services. For now we are selling in India only."
                className={`${fieldClass} cursor-not-allowed bg-slate-50 text-slate-500`}
              />
              <button
                type="button"
                onClick={() => setIsCountryNoteOpen((prev) => !prev)}
                className="mt-2 text-xs font-semibold uppercase tracking-wide text-sky-700 hover:text-sky-800"
              >
                Why is this locked?
              </button>
              {isCountryNoteOpen ? (
                <p className="mt-2 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-800">
                  We are expanding our services. For now we are selling in India only.
                </p>
              ) : null}
            </div>
            
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-700">
                Landmark (Optional)
              </label>
              <input
                name="landmark"
                value={formData.landmark}
                onChange={onChange}
                placeholder="Nearby landmark"
                className={fieldClass}
              />
            </div>
          </div>

          {errors.submit ? (
            <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {errors.submit}
            </p>
          ) : null}

          {successMessage ? (
            <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {successMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(56,189,248,0.24)] transition hover:scale-[1.01] hover:shadow-[0_0_28px_rgba(56,189,248,0.32)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Placing Order...' : 'Place Order'}
          </button>

          <Link
            to="/products"
            className="mt-4 block text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 hover:text-slate-900"
          >
            Continue Shopping
          </Link>
        </motion.form>
      </div>
    </section>
  )
}

export default Checkout
