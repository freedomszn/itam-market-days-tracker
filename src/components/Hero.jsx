import { Link } from "react-router-dom";
import { Bell, CalendarDays, Clock3 } from "lucide-react";
import { useMounted } from "../hooks/useMounted";
import { dayNames, formatDateLong } from "../marketDays";
import StatCard from "./StatCard";

export default function Hero({ nextMarketDay, todayMarketDay, countdown, onNotify }) {
  const isMarketDayToday = Boolean(todayMarketDay);
  const mounted = useMounted();
  const enter = (delayMs) =>
    `transition duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
    }`;

  return (
    <section id="countdown" className="hero-grid border-b border-line pt-28 sm:pt-32">
      <div className="section-shell grid min-h-[calc(100svh-7rem)] content-center gap-6 py-8 sm:gap-10 sm:py-12 lg:grid-cols-[1.05fr_1fr] lg:items-start lg:py-16">
        <div className="min-w-0">
          <h1
            className={`max-w-2xl text-balance font-display text-[clamp(1.85rem,8vw,2.75rem)] font-bold leading-[1.05] tracking-normal text-white sm:text-5xl lg:text-6xl ${enter(0)}`}
          >
            {isMarketDayToday ? (
              <>
                Today is <span className="text-lime">Itam Market Day.</span>
              </>
            ) : (
              <>
                Next Market Day is{" "}
                <span className="text-lime">{dayNames[nextMarketDay.date.getDay()]}</span>
              </>
            )}
          </h1>
          <p className={`mt-4 max-w-2xl text-sm leading-6 text-muted sm:mt-5 sm:text-base ${enter(120)}`}>
            Itam Market rotates every 8 days and skips Sundays. This tracker calculates each upcoming date automatically, adjusts for the Monday shift, and sends reminders before the market opens.
          </p>

          <div className={`mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row ${enter(180)}`}>
            <Link
              to="/upcoming"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-display font-bold text-background transition active:scale-[0.97] hover:bg-lime"
            >
              <CalendarDays size={18} />
              View Schedule
            </Link>
            <button
              type="button"
              onClick={onNotify}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 font-display font-bold text-lime-ink transition active:scale-[0.97] hover:bg-white"
            >
              <Bell size={18} />
              Get Notified
            </button>
          </div>
        </div>

        <div
          className={`soft-card relative min-w-0 overflow-hidden p-4 shadow-[0_0_60px_rgba(195,244,0,0.08)] sm:p-7 ${enter(120)}`}
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-lime/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-lime">
                <span className="live-dot size-1.5 rounded-full bg-lime" aria-hidden="true" />
                Next session
              </p>
              <h2 className="mt-2 font-display text-lg font-bold text-white sm:text-xl">
                {formatDateLong(nextMarketDay.date)}
              </h2>
            </div>
            <Clock3 size={18} className="shrink-0 text-lime" />
          </div>
          <div className="soft-tile relative mt-5 grid grid-cols-2 overflow-hidden">
            <StatCard value={countdown.days} label="Days" className="border-b border-r border-line-soft" />
            <StatCard value={countdown.hours} label="Hours" className="border-b border-line-soft" />
            <StatCard value={countdown.minutes} label="Minutes" className="border-r border-line-soft" />
            <StatCard value={countdown.seconds} label="Seconds" />
          </div>
          {nextMarketDay.exception && (
            <div className="relative mt-4 rounded-2xl border border-clay-strong bg-clay-strong/20 p-4 text-sm text-clay">
              Sunday exception applied. The pattern landed on{" "}
              {formatDateLong(nextMarketDay.originalDate)}, so the market moved to Monday.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
