export default function StatCard({ label, value, sub }) {
  return (
    <div className="glass-card p-4 text-center">
      <p className="section-label">{label}</p>
      <p className="font-serif text-2xl text-stone-100">{value.toLocaleString()}</p>
      {sub && <p className="text-stone-500 text-xs mt-0.5">{sub}</p>}
    </div>
  )
}