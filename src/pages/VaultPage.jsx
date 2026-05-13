import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function VaultPage({ user, onAuthRequired }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!user) { setLoading(false); return }
    fetchRecords()
  }, [user])

  async function fetchRecords() {
    setLoading(true)
    const { data, error } = await supabase
      .from('birth_records')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setRecords(data || [])
    setLoading(false)
  }

  async function deleteRecord(id) {
    const { error } = await supabase.from('birth_records').delete().eq('id', id)
    if (error) { toast.error('Failed to delete'); return }
    toast.success('Record deleted')
    setRecords(r => r.filter(x => x.id !== id))
  }

  const filtered = records.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    (r.country || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="relative z-10 max-w-4xl mx-auto px-4 py-10">
      <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}>
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="section-label mb-1">✦ people vault</p>
            <h1 className="font-serif text-2xl text-stone-100">Saved Records</h1>
          </div>
          {user && (
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or country…"
              className="input-field max-w-xs" />
          )}
        </div>

        {!user ? (
          <div className="text-center py-20 text-stone-500">
            <p className="text-5xl mb-4">✦</p>
            <p className="mb-4">Sign in to see your saved records.</p>
            <button onClick={onAuthRequired}
              className="text-sm bg-gold-500/10 border border-gold-500/20 text-gold-400
              hover:bg-gold-500/20 transition-colors px-6 py-2 rounded-xl">
              Sign in
            </button>
          </div>
        ) : loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-stone-500">
            <p className="text-5xl mb-4">✦</p>
            <p>{search ? 'No matching records.' : 'No records yet. Do a reading first.'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((r, i) => (
              <motion.div key={r.id}
                initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
                transition={{ delay: i * 0.04 }}
                className="glass-card p-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/20
                    flex items-center justify-center text-gold-400 font-medium text-sm">
                    {r.name.split(' ').map(n=>n[0]).slice(0,2).join('')}
                  </div>
                  <div>
                    <p className="text-stone-100 font-medium text-sm">{r.name}</p>
                    <p className="text-stone-500 text-xs">
                      {new Date(r.dob + 'T12:00:00').toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})}
                      {r.country ? ` · ${r.country}` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-stone-400">
                    {r.zodiac_sign}
                  </span>
                  <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-stone-400">
                    {r.chinese_zodiac}
                  </span>
                  <p className="text-stone-600 text-xs">
                    {new Date(r.created_at).toLocaleDateString()}
                  </p>
                  <button onClick={() => deleteRecord(r.id)}
                    className="text-stone-600 hover:text-red-400 transition-colors text-sm px-2">
                    ✕
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </main>
  )
}