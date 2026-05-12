import { useMemo } from 'react'

export default function StarField() {
  const stars = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() < 0.2 ? 2 : 1,
      opacity: Math.random() * 0.25 + 0.05,
      delay: Math.random() * 4,
    })), [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map(s => (
        <div key={s.id} className="absolute rounded-full bg-gold-300"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            opacity: s.opacity,
            animation: `pulse ${3 + s.delay}s ease-in-out infinite alternate`,
          }} />
      ))}
    </div>
  )
}