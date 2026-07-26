import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildMonthGrid, formatMonthYear, twoDigits } from "../marketDays";
import Reveal from "../components/Reveal";

export default function CalendarPage() {
  const { calendarMarketDays, now } = useOutletContext();
  const [viewDate, setViewDate] = useState(calendarMarketDays[0].date);
  const monthDays = useMemo(
    () => buildMonthGrid(viewDate.getFullYear(), viewDate.getMonth(), calendarMarketDays, now),
    [calendarMarketDays, now, viewDate],
  );

  function moveMonth(offset) {
    setViewDate((date) => new Date(date.getFullYear(), date.getMonth() + offset, 1));
  }

  return (
    <section id="calendar" className="border-b border-line bg-[#0e0e0e] py-14 pt-28 sm:py-20 sm:pt-32">
      <div className="section-shell">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-lime">Monthly View</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">Market calendar</h2>
          </div>
          <div className="flex items-center justify-between gap-1 rounded-full border border-line bg-panel p-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => moveMonth(-1)}
              className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full border border-line-soft text-muted transition active:scale-90 hover:text-white sm:size-10"
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="min-w-24 px-2 text-center font-display text-sm font-bold text-white sm:min-w-40 sm:px-3 sm:text-lg">
              {formatMonthYear(viewDate)}
            </div>
            <button
              type="button"
              onClick={() => moveMonth(1)}
              className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full border border-line-soft text-muted transition active:scale-90 hover:text-white sm:size-10"
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <Reveal as="div" className="overflow-hidden rounded border border-line bg-background">
          <div className="grid grid-cols-7 border-b border-line">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="border-r border-line-soft py-3 text-center font-mono text-xs uppercase text-muted last:border-r-0">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {monthDays.map((cell, index) => (
              <div
                key={cell.key}
                className={`calendar-cell border-r border-b border-line-soft p-2 last:border-r-0 sm:p-3 ${(index + 1) % 7 === 0 ? "border-r-0" : ""
                  } ${cell.empty ? "bg-panel/30" : "bg-background"} ${cell.market?.isPast ? "bg-panel/70 opacity-60" : cell.market ? "bg-clay-strong/20" : cell.isSunday ? "bg-panel/50" : ""
                  }`}
              >
                {!cell.empty && (
                  <>
                    <div className={`font-mono text-xs ${cell.market ? "font-bold text-white" : "text-muted"}`}>
                      {twoDigits(cell.day)}
                    </div>
                    {cell.market && (
                      <div className={`mt-2 rounded-full px-1.5 py-1 text-center font-mono text-[9px] font-bold uppercase leading-tight sm:text-[10px] ${cell.market.isPast ? "bg-line text-muted line-through" : "bg-clay text-background"
                        }`}>
                        {cell.market.isPast ? "Past" : "Itam"}
                      </div>
                    )}
                    {(cell.market?.exception || cell.market?.followsShiftedSunday) && (
                      <div className="mt-1 hidden font-mono text-[10px] text-clay sm:block">
                        {cell.market.exception ? "Moved from Sun" : "Regular Mon"}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
