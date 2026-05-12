import { useState, useEffect } from 'react'

export default function HistorySection({ insights, month, day, year }) {
  const MONTHS = ['','January','February','March','April','May','June','July','August','September','October','November','December']
  const events = insights?.events || []
  const famous = insights?.famous || []
  const worldFact = insights?.worldFact || null

  return (
    <div className="glass-card p-6">
      <p className="section-label mb-1">✦ On This Day</p>
      <p className="text-stone-400 text-sm mb-5">{MONTHS[month]} {day} in history</p>

      {!insights ? (
        <div className="text-center py-8">
          <div className="inline-block w-6 h-6 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mb-3" />
          <p className="text-stone-500 text-sm">Loading historical data…</p>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Historical events */}
          {events.length > 0 && (
            <div>
              <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">Historical Events</p>
              <div className="space-y-3">
                {events.map((e, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="bg-gold-500/10 border border-gold-500/20 text-gold-400
                      text-xs font-medium px-2.5 py-1 rounded-lg whitespace-nowrap mt-0.5">
                      {e.year}
                    </span>
                    <p className="text-stone-300 text-sm leading-relaxed">{e.event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Famous people */}
          {famous.length > 0 && (
            <div className="pt-4 border-t border-white/5">
              <p className="text-xs text-stone-500 uppercase tracking-wider mb-3">Famous Birthdays on {MONTHS[month]} {day}</p>
              <div className="grid grid-cols-2 gap-2">
                {famous.map((p, i) => (
                  <div key={i} className="bg-white/[0.03] border border-white/5 rounded-xl p-3">
                    <p className="text-stone-200 text-sm font-medium">{p.name}</p>
                    <p className="text-stone-500 text-xs">{p.born} · {p.known}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* World fact */}
          {worldFact && (
            <div className="pt-4 border-t border-white/5">
              <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">World in {year}</p>
              <p className="text-stone-300 text-sm leading-relaxed italic">"{worldFact}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}