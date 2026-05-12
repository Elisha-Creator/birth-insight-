import { motion } from 'framer-motion'
import ZodiacCard from '../components/ZodiacCard'
import HistorySection from '../components/HistorySection'
import AstrologySection from '../components/AstrologySection'
import StatCard from '../components/StatCard'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay }
})

export default function ResultPage({ data, onBack }) {
  const { form, western, chinese, element, birthstone, flower, age, dayOfWeek, insights, month, day, year } = data
  const MONTHS = ['','January','February','March','April','May','June','July','August','September','October','November','December']

  return (
    <main className="relative z-10 max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div {...fade(0)} className="text-center mb-10">
        <p className="section-label mb-2">✦ birth insight ✦</p>
        <h1 className="text-3xl md:text-4xl mb-2">
          {form.name.split(' ')[0]}'s <span className="gold-text italic">Cosmic Profile</span>
        </h1>
        <p className="text-stone-400 text-sm">
          {dayOfWeek}, {MONTHS[month]} {day}, {year}
          {form.country ? ` · ${form.country}` : ''}
        </p>
      </motion.div>

      {/* Age stats */}
      <motion.div {...fade(0.1)} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Years Old" value={age.years} />
        <StatCard label="Months" value={age.months} sub="this year" />
        <StatCard label="Days" value={age.days} sub="extra" />
        <StatCard label="Days to Birthday" value={age.daysUntil} sub="🎂" />
      </motion.div>

      {/* Quick facts */}
      <motion.div {...fade(0.15)} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="glass-card p-4 text-center">
          <p className="section-label">Born on a</p>
          <p className="font-serif text-lg text-stone-100">{dayOfWeek}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="section-label">Western Zodiac</p>
          <p className="font-serif text-lg text-stone-100">{western.symbol} {western.name}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="section-label">Birthstone</p>
          <p className="font-serif text-lg text-stone-100">{birthstone.emoji} {birthstone.stone}</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="section-label">Birth Flower</p>
          <p className="font-serif text-lg text-stone-100">{flower.emoji} {flower.name}</p>
        </div>
      </motion.div>

      {/* Zodiac card */}
      <motion.div {...fade(0.2)} className="mb-6">
        <ZodiacCard western={western} chinese={chinese} element={element} />
      </motion.div>

      {/* Astrology deep dive */}
      <motion.div {...fade(0.25)} className="mb-6">
        <AstrologySection chinese={chinese} element={element} western={western} />
      </motion.div>

      {/* Historical events */}
      <motion.div {...fade(0.3)} className="mb-6">
        <HistorySection insights={insights} month={month} day={day} year={year} />
      </motion.div>

      {/* AI personality summary */}
      {insights?.personality && (
        <motion.div {...fade(0.35)} className="glass-card p-6 mb-6">
          <p className="section-label mb-3">✦ AI Personality Insight</p>
          <p className="text-stone-300 text-sm leading-relaxed">{insights.personality}</p>
        </motion.div>
      )}

      <motion.div {...fade(0.4)} className="text-center">
        <button onClick={onBack} className="text-stone-500 hover:text-gold-400 text-sm transition-colors">
          ← New reading
        </button>
      </motion.div>
    </main>
  )
}