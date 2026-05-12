import { motion } from 'framer-motion'

export default function Nav({ page, setPage }) {
  return (
    <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
      <button onClick={() => setPage('home')} className="flex items-center gap-2 group">
        <span className="text-gold-500 text-xl">✦</span>
        <span className="font-serif text-lg text-stone-100 group-hover:text-gold-400 transition-colors">
          Birth Insight
        </span>
      </button>
      <div className="flex items-center gap-1 bg-night-800 border border-white/10 rounded-xl p-1">
        {[
          { id:'home',  label:'Oracle' },
          { id:'vault', label:'Vault' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setPage(tab.id)}
            className={`relative px-4 py-1.5 rounded-lg text-sm transition-colors ${
              page === tab.id ? 'text-gold-400' : 'text-stone-400 hover:text-stone-200'
            }`}>
            {page === tab.id && (
              <motion.div layoutId="nav-pill"
                className="absolute inset-0 bg-night-950 rounded-lg border border-white/10"
                style={{ zIndex: -1 }} />
            )}
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}