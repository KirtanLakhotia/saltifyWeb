import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200 py-8 text-sm text-slate-500">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p>Copyright {new Date().getFullYear()} SALTIFY®. All rights reserved.</p>
        <div className="flex items-center gap-4 text-xs uppercase tracking-wide text-slate-500">
          <Link to="/contact" className="hover:text-slate-900">
            Contact
          </Link>
          <Link to="/products" className="hover:text-slate-900">
            Products
          </Link>
          <Link to="/login" className="hover:text-slate-900">
            Account
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
