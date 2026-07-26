import { dayNames, daysUntil, formatDateLong, formatShortMonth } from "../marketDays";

export default function MarketDayCard({ item, index, now }) {
  const wait = daysUntil(item.date, now);
  const label = wait === 0 ? "Today" : wait === 1 ? "Tomorrow" : `In ${wait} days`;
  const statusLabel = index === 0
    ? wait === 0 ? "Today" : "Next"
    : item.exception
      ? "Sunday Shift"
      : item.followsShiftedSunday
        ? "Regular Monday"
        : label;

  return (
    <article
      className={`hard-card p-4 transition hover:border-lime sm:p-5 ${index === 0 ? "border-2 border-lime lime-glow" : ""
        } ${item.exception || item.followsShiftedSunday ? "border-clay-strong" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted">
            {formatShortMonth(item.date)} {item.date.getFullYear()}
          </p>
          <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-2xl">
            {dayNames[item.date.getDay()]}, {item.date.getDate()}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase ${index === 0 ? "bg-lime text-lime-ink" : item.exception || item.followsShiftedSunday ? "bg-clay text-background" : "bg-panel-high text-muted"
            }`}
        >
          {statusLabel}
        </span>
      </div>
      <div className="mt-5 border-t border-line-soft pt-3 font-mono text-xs text-muted sm:text-sm">
        {item.exception ? (
          <span>Shifted from {formatDateLong(item.originalDate)}</span>
        ) : item.followsShiftedSunday ? (
          <span>Regular Monday market after the shifted Sunday session</span>
        ) : (
          <span>08:00 AM to 04:00 PM</span>
        )}
      </div>
    </article>
  );
}
