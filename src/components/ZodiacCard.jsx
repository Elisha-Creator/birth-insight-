export default function ZodiacCard({ western, chinese, element }) {
  return (
    <div className="glass-card p-6">
      <p className="section-label mb-4">✦ Zodiac Profile</p>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Western */}
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{western.emoji}</span>
            <div>
              <p className="text-stone-400 text-xs uppercase tracking-wider">Western</p>
              <p className="font-serif text-xl text-stone-100">{western.symbol} {western.name}</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-stone-400">
              {western.element}
            </span>
            <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-stone-400">
              {western.quality}
            </span>
          </div>
        </div>
        {/* Chinese */}
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{chinese.emoji}</span>
            <div>
              <p className="text-stone-400 text-xs uppercase tracking-wider">Chinese</p>
              <p className="font-serif text-xl text-stone-100">Year of the {chinese.animal}</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-stone-400">
              {element.emoji} {element.name}
            </span>
          </div>
          <p className="text-stone-400 text-xs mt-3 leading-relaxed">{chinese.trait}</p>
        </div>
      </div>
    </div>
  )
}