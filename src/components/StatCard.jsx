import { twoDigits } from "../marketDays";

export default function StatCard({ value, label, className = "" }) {
  return (
    <div className={`p-3 min-[360px]:p-4 sm:p-5 lg:p-6 ${className}`}>
      <div className="font-display text-[1.65rem] font-bold leading-none tabular-nums text-white min-[360px]:text-3xl sm:text-4xl lg:text-5xl">
        {twoDigits(value)}
      </div>
      <div className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted sm:mt-3 sm:text-xs sm:tracking-[0.18em]">{label}</div>
    </div>
  );
}
