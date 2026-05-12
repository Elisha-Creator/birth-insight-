import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import InputPage from './pages/InputPage'
import ResultPage from './pages/ResultPage'
import VaultPage from './pages/VaultPage'
import Nav from './components/Nav'
import StarField from './components/StarField'

export default function App() {
  const [page, setPage] = useState('home') // 'home' | 'result' | 'vault'
  const [result, setResult] = useState(null)

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <StarField />
      <Nav page={page} setPage={setPage} />
      <AnimatePresence mode="wait">
        {page === 'home' && (
          <motion.div key="home"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <InputPage onResult={(data) => { setResult(data); setPage('result') }} />
          </motion.div>
        )}
        {page === 'result' && result && (
          <motion.div key="result"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <ResultPage data={result} onBack={() => setPage('home')} />
          </motion.div>
        )}
        {page === 'vault' && (
          <motion.div key="vault"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <VaultPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}