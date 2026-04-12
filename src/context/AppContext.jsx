import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
const backendBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
  export const AppContext = createContext(null)
  const AUTH_STORAGE_KEY = 'saltify_auth'
  const CART_STORAGE_PREFIX = 'saltify_cart'
  const GUEST_CART_KEY = `${CART_STORAGE_PREFIX}_guest`

  function getCartStorageKey(user) {
    if (!user?.email) return GUEST_CART_KEY
    return `${CART_STORAGE_PREFIX}_${user.email.toLowerCase()}`
  }

  function readCartFromStorage(storageKey) {
    try {
      const rawCart = localStorage.getItem(storageKey)
      if (!rawCart) return []
      const parsed = JSON.parse(rawCart)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

export function AppProvider({ children }) {
    const [user, setUser] = useState(null)
    const [cart, setCart] = useState([])
    const [cartReady, setCartReady] = useState(false)

    useEffect(() => {
      const rawAuth = localStorage.getItem(AUTH_STORAGE_KEY)
      if (!rawAuth) return

      try {
        const parsed = JSON.parse(rawAuth)
        if (parsed?.email && parsed?.token) {
          setUser(parsed)
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY)
        }
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }, [])

    useEffect(() => {
      const loadCart = async () => {
        // ✅ If logged in → fetch from backend
        if (user?.token) {
           try {
      const res = await fetch(`${backendBase}/cart/${encodeURIComponent(user.sub)}`)


      const data = await res.json()
      if (Array.isArray(data.cart)) {
        setCart(data.cart)
        setCartReady(true)
        return
      }
    } catch (err) {
      console.error("Error fetching cart:", err)
    }
  }
        // ✅ fallback → localStorage
        const storageKey = getCartStorageKey(user)
        const nextCart = readCartFromStorage(storageKey)
        setCart(nextCart)
        setCartReady(true)
      }

      loadCart()
    }, [user])

    useEffect(() => {
      if (!cartReady) return
      const storageKey = getCartStorageKey(user)
      localStorage.setItem(storageKey, JSON.stringify(cart))
    }, [cart, user, cartReady])

  const googleLogin = useCallback(async (credential) => {
    if (!credential) {
      throw new Error('Google credential is missing.')
    }

    const backendBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
    const backendUrl = `${backendBase}/auth/google`

    console.log('[Google Login] Callback received')
    console.log('[Google Login] Calling backend:', backendUrl)

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credential,
        token: credential,
      }),
    })

    const rawText = await response.text()
    let data = {}
    try {
      data = rawText ? JSON.parse(rawText) : {}
    } catch {
      data = { message: rawText }
    }

    console.log('[Google Login] Backend status:', response.status)
    console.log('[Google Login] Backend response:', data)

    if (!response.ok) {
      throw new Error(data?.message || 'Backend Google login failed.')
    }

    const backendUser = data?.user
    if (!backendUser?.email) {
      throw new Error('Backend did not return a valid user payload.')
    }

    const authUser = {
      name: backendUser.name || backendUser.email.split('@')[0],
      email: backendUser.email,
      avatar: backendUser.avatar || backendUser.picture || '',
      token: data?.token || credential,
      sub: backendUser.google_id,   // ✅ BEST SOURCE
      provider: 'google',
    }

      setUser(authUser)
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser))
      return authUser
    }, [])

    const logout = useCallback(() => {
      const currentUser = user
      const currentUserCartKey = getCartStorageKey(currentUser)
      localStorage.setItem(currentUserCartKey, JSON.stringify(cart))
      setUser(null)
      localStorage.removeItem(AUTH_STORAGE_KEY)
      window.google?.accounts?.id?.disableAutoSelect?.()
      if (currentUser?.email) {
        window.google?.accounts?.id?.revoke?.(currentUser.email, () => {})
      }
    }, [user, cart])

    const addToCart = useCallback(async (product, quantity) => {
      // ✅ If user logged in → call backend
      if (user?.token) {
        try {
          await fetch(`${backendBase}/cart/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
           body: JSON.stringify({
              productId: product.id,
              quantity,
              userId: user.sub,
            })
          })
        } catch (err) {
          console.error("API error:", err)
        }
      }

      // ✅ Always update UI instantly
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id)

        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }

        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
          },
        ]
      })
    }, [user])

    const removeFromCart = useCallback(async (productId) => {
      if (user?.token) {
        try {
          await fetch(`${backendBase}/cart/remove`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ productId,userId: user.sub }),
          })
        } catch (err) {
          console.error("API error:", err)
        }
      }

      setCart((prev) => prev.filter((item) => item.id !== productId))
    }, [user])

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0)

    const value = useMemo(
      () => ({
        user,
        setUser,
        googleLogin,
        logout,
        setCart,
        cart,
        cartCount,
        addToCart,
        removeFromCart, 
      }),
      [user, googleLogin, logout, cart, cartCount, addToCart, removeFromCart],
    )

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
  }
