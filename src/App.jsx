import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase } from './lib/supabase'
import InputPage from './pages/InputPage'
import ResultPage from './pages/ResultPage'
import VaultPage from './pages/VaultPage'
import Nav from './components/Nav'
import StarField from './components/StarField'
import AuthModal from './components/AuthModal'

export default function App() {
  const [page, setPage] = useState('home')
  const [result, setResult] = useState(null)
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
    </div>
  )

  // 🔒 Auth gate — show login screen if not signed in
  if (!user) return (
    <div className="min-h-screen relative overflow-x-hidden">
      <StarField />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.6 }} className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="text-gold-500 text-3xl mb-3">✦</p>
            <h1 className="font-serif text-4xl text-stone-100 mb-2">
              Birth <span className="gold-text italic">Insight</span>
            </h1>
            <p className="text-stone-400 text-sm">
              Sign in to discover your cosmic birth story.
            </p>
          </div>
          <AuthModal inline onSuccess={(u) => setUser(u)} />
        </motion.div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <StarField />
      <Nav page={page} setPage={setPage} user={user}
        onSignOut={() => supabase.auth.signOut()} />
      <AnimatePresence mode="wait">
        {page === 'home' && (
          <motion.div key="home"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <InputPage user={user} onResult={(data) => { setResult(data); setPage('result') }} />
          </motion.div>
        )}
        {page === 'result' && result && (
          <motion.div key="result"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
            <ResultPage data={result} onBack={() => setPage('home')} />
          </motion.div>
        )}
        {page === 'vault' && (
          <motion.div key="vault"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <VaultPage user={user} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}