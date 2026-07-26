import { CalendarDays, Sparkles } from "lucide-react";
import { dayNames, formatShortMonth } from "../marketDays";
import Reveal from "./Reveal";

export default function LogicSection({ marketDays }) {
  return (
    <section className="border-b border-line bg-[#0e0e0e] py-14 sm:py-20">
      <div className="section-shell grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <Reveal>
          <h2 className="max-w-2xl font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Never miss a market day again.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
            The app automatically tracks the Itam market's 8-day cycle, so you always know exactly when the next market day falls. No mental counting, no guessing. Whether you're a shopper planning your week or a vendor preparing your goods, you'll get timely reminders and stay ahead of every market day.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal delay={80} className="hard-card p-5 sm:p-6">
            <Sparkles size={20} className="mb-4 text-lime" />
            <h3 className="font-display text-lg font-bold text-white">8-day shift</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Monday becomes Tuesday, Tuesday becomes Wednesday, and the weekday keeps rotating.
            </p>
          </Reveal>
          <Reveal delay={160} className="hard-card border-clay-strong p-5 sm:p-6">
            <CalendarDays size={20} className="mb-4 text-clay" />
            <h3 className="font-display text-lg font-bold text-white">Sunday exception</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              When Sunday shifts to Monday, the next regular cycle still lands on Monday.
              After those two Monday sessions, the cycle resumes normally on Tuesday.
            </p>
          </Reveal>
          <Reveal delay={240} className="hard-card p-5 sm:col-span-2 sm:p-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Next rotation sample</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {marketDays.slice(0, 4).map((item, index) => (
                <div key={item.date.toISOString()} className="border border-line-soft bg-background p-3 sm:p-4">
                  <p className="font-mono text-xs text-muted">#{index + 1}</p>
                  <p className="mt-2 font-display text-base font-bold text-white sm:text-lg">
                    {dayNames[item.date.getDay()].slice(0, 3)}
                  </p>
                  <p className="font-mono text-xs uppercase text-muted">
                    {formatShortMonth(item.date)} {item.date.getDate()}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
