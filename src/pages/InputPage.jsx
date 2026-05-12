import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import {
  getWesternZodiac, getChineseZodiac, getChineseElement,
  getBirthstone, getBirthFlower, getExactAge, getDayOfWeek
} from '../lib/zodiac'
import toast from 'react-hot-toast'

export default function InputPage({ onResult }) {
  const [form, setForm] = useState({ name: '', dob: '', country: '' })
  const [loading, setLoading] = useState(false)

  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    if (!form.name.trim()) return toast.error('Please enter your name')
    if (!form.dob) return toast.error('Please enter your date of birth')

    const dobDate = new Date(form.dob + 'T12:00:00')
    if (dobDate > new Date()) return toast.error('Date of birth cannot be in the future')
    if (dobDate.getFullYear() < 1900) return toast.error('Please enter a valid year (1900+)')

    setLoading(true)
    try {
      const month = dobDate.getMonth() + 1
      const day = dobDate.getDate()
      const year = dobDate.getFullYear()

      // All local calculations
      const western = getWesternZodiac(month, day)
      const chinese = getChineseZodiac(year)
      const element = getChineseElement(year)
      const birthstone = getBirthstone(month)
      const flower = getBirthFlower(month)
      const age = getExactAge(form.dob)
      const dayOfWeek = getDayOfWeek(form.dob)

      // AI insights from Supabase Edge Function
      let insights = null
      try {
        const { data, error } = await supabase.functions.invoke('get-insights', {
          body: { month, day, year, zodiac: western.name, chineseAnimal: chinese.animal }
        })
        if (!error) insights = data
      } catch { /* insights stay null, we show fallback */ }

      // Save to Supabase DB
      await supabase.from('birth_records').insert({
        name: form.name.trim(),
        dob: form.dob,
        country: form.country.trim() || null,
        zodiac_sign: western.name,
        chinese_zodiac: chinese.animal,
      })

      onResult({ form, western, chinese, element, birthstone, flower, age, dayOfWeek, insights, month, day, year })
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-65px)] px-4 py-12">
      <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
        className="w-full max-w-md">

        {/* Hero text */}
        <div className="text-center mb-10">
          <p className="section-label mb-3">✦ cosmic archive ✦</p>
          <h1 className="text-4xl md:text-5xl mb-3">
            Discover Your <span className="gold-text italic">Birth Story</span>
          </h1>
          <p className="text-stone-400 text-sm leading-relaxed">
            Enter your details to unlock historical events, zodiac insights,
            and a personalised cosmic profile.
          </p>
        </div>

        {/* Form card */}
        <div className="glass-card p-6 md:p-8">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="section-label block mb-2">Full Name</label>
              <input name="name" value={form.name} onChange={handle}
                placeholder="e.g. Amara Okafor"
                className="input-field" autoComplete="name" />
            </div>
            <div>
              <label className="section-label block mb-2">Date of Birth</label>
              <input name="dob" type="date" value={form.dob} onChange={handle}
                max={new Date().toISOString().split('T')[0]}
                className="input-field [color-scheme:dark]" />
            </div>
            <div>
              <label className="section-label block mb-2">Country / Location <span className="text-stone-600">(optional)</span></label>
              <input name="country" value={form.country} onChange={handle}
                placeholder="e.g. Nigeria"
                className="input-field" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary mt-2">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-night-900/40 border-t-night-900 rounded-full animate-spin" />
                  Reading the cosmos…
                </span>
              ) : '✦ Reveal My Birth Insight'}
            </button>
          </form>
        </div>

        <p className="text-center text-stone-600 text-xs mt-6">
          Your data is stored securely and never shared.
        </p>
      </motion.div>
    </main>
  )
}