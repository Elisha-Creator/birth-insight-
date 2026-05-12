export default function AstrologySection({ chinese, element, western }) {
  return (
    <div className="glass-card p-6">
      <p className="section-label mb-4">✦ Astrology Deep Dive</p>
      <div className="grid md:grid-cols-3 gap-4">

        {/* Strengths & Weaknesses */}
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
          <p className="text-xs text-green-400 uppercase tracking-wider mb-2">Strengths</p>
          <ul className="space-y-1">
            {chinese.strengths.map(s => (
              <li key={s} className="text-sm text-stone-300 flex items-center gap-2">
                <span className="text-green-500 text-xs">✓</span>{s}
              </li>
            ))}
          </ul>
          <p className="text-xs text-red-400 uppercase tracking-wider mt-4 mb-2">Weaknesses</p>
          <ul className="space-y-1">
            {chinese.weaknesses.map(w => (
              <li key={w} className="text-sm text-stone-300 flex items-center gap-2">
                <span className="text-red-500 text-xs">–</span>{w}
              </li>
            ))}
          </ul>
        </div>

        {/* Lucky numbers & colors */}
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
          <p className="text-xs text-gold-500 uppercase tracking-wider mb-3">Lucky Numbers</p>
          <div className="flex gap-2 flex-wrap mb-4">
            {chinese.lucky.numbers.map(n => (
              <span key={n} className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/30
                text-gold-400 text-sm font-medium flex items-center justify-center">
                {n}
              </span>
            ))}
          </div>
          <p className="text-xs text-gold-500 uppercase tracking-wider mb-3">Lucky Colors</p>
          <div className="flex gap-2 flex-wrap">
            {chinese.lucky.colors.map(c => (
              <span key={c} className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-stone-300">
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Compatibility */}
        <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
          <p className="text-xs text-purple-400 uppercase tracking-wider mb-3">Best Compatible With</p>
          <div className="space-y-2">
            {chinese.compatible.map(a => {
              const match = [
                {animal:'Rat',emoji:'🐀'},{animal:'Ox',emoji:'🐂'},{animal:'Tiger',emoji:'🐅'},
                {animal:'Rabbit',emoji:'🐇'},{animal:'Dragon',emoji:'🐉'},{animal:'Snake',emoji:'🐍'},
                {animal:'Horse',emoji:'🐎'},{animal:'Goat',emoji:'🐑'},{animal:'Monkey',emoji:'🐒'},
                {animal:'Rooster',emoji:'🐓'},{animal:'Dog',emoji:'🐕'},{animal:'Pig',emoji:'🐖'},
              ].find(x => x.animal === a)
              return (
                <div key={a} className="flex items-center gap-2">
                  <span>{match?.emoji}</span>
                  <span className="text-sm text-stone-300">{a}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-white/5">
            <p className="text-xs text-stone-500 uppercase tracking-wider mb-1">Element</p>
            <p className="text-sm text-stone-300">{element.emoji} {element.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}