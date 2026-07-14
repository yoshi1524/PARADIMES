export default function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="border border-static/70 bg-iron/40 p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-silver">{label}</p>
      <p className="mt-2 font-display text-3xl text-bone">{value}</p>
      {sub && <p className="mt-1 text-xs text-ash">{sub}</p>}
    </div>
  );
}
