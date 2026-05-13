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
  const [showAuth, setShowAuth] = useState(false)
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

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <StarField />
      <Nav page={page} setPage={setPage} user={user}
        onAuthClick={() => setShowAuth(true)}
        onSignOut={() => supabase.auth.signOut()} />

      <AnimatePresence mode="wait">
        {page === 'home' && (
          <motion.div key="home"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
            <InputPage
              user={user}
              onAuthRequired={() => setShowAuth(true)}
              onResult={(data) => { setResult(data); setPage('result') }} />
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
            <VaultPage user={user} onAuthRequired={() => setShowAuth(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </AnimatePresence>
    </div>
  )
}