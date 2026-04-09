import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/hooks/useAppContext.js'

function Login() {
  const { user, googleLogin, logout } = useAppContext()
  const [error, setError] = useState('')
  const [googleReady, setGoogleReady] = useState(false)

  useEffect(() => {
    if (user) return

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    if (!clientId) return

    let retryTimer = null
    let attempts = 0

    const renderGoogleButton = () => {
      if (!window.google?.accounts?.id) {
        attempts += 1
        if (attempts < 20) {
          retryTimer = window.setTimeout(renderGoogleButton, 250)
        }
        return
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          try {
            setError('')
            await googleLogin(response.credential)
          } catch (err) {
            console.error('[Google Login] Error:', err)
            setError(err?.message || 'Google login failed. Please try again.')
          }
        },
      })

      const container = document.getElementById('google-signin-btn')
      if (container) {
        container.innerHTML = ''
        const buttonWidth = Math.max(220, Math.min(320, window.innerWidth - 120))
        window.google.accounts.id.renderButton(container, {
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'pill',
          width: buttonWidth,
        })
        setGoogleReady(true)
      }
    }

    renderGoogleButton()

    return () => {
      if (retryTimer) {
        window.clearTimeout(retryTimer)
      }
    }
  }, [googleLogin, user])

  return (
    <section className="mx-auto w-full max-w-xl px-1">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-7 shadow-[0_24px_60px_rgba(148,163,184,0.2)] backdrop-blur sm:p-10">
        <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-14 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl" />

        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Secure Access
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-slate-900 sm:text-5xl">
            {user ? 'You are signed in' : 'Continue with Google'}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Premium one-tap login for your Saltify account experience.
          </p>

          {!user ? (
            <>
              {error ? (
                <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <div className="mt-7 flex justify-center rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                <div
                  id="google-signin-btn"
                  className={!googleReady ? 'opacity-70 transition-opacity' : ''}
                />
              </div>

              {!import.meta.env.VITE_GOOGLE_CLIENT_ID ? (
                <p className="mt-4 text-center text-xs text-amber-700">
                  Set `VITE_GOOGLE_CLIENT_ID` in `saltifyWeb/.env` to enable Google login.
                </p>
              ) : null}
            </>
          ) : (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/80 p-5">
              <div className="flex items-center gap-4">
                {user.picture ? (
                  <img
                    src={user.picture || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                    alt={user.name || user.email || 'User'}
                    className="h-14 w-14 rounded-full border border-slate-200 object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-700">
                    {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-base font-semibold text-slate-900">{user.name || 'Saltify User'}</p>
                  <p className="text-sm text-slate-600">{user.email}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={logout}
                  className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Logout
                </button>
                <Link
                  to="/"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Login
