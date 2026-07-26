import { useOutletContext } from "react-router-dom";
import MarketDayCard from "../components/MarketDayCard";
import Reveal from "../components/Reveal";

export default function UpcomingPage() {
  const { marketDays, now } = useOutletContext();

  return (
    <section id="upcoming" className="border-b border-line py-14 pt-28 sm:py-20 sm:pt-32">
      <div className="section-shell">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-lime">Market Schedule</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Upcoming market days
            </h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {marketDays.slice(0, 9).map((item, index) => (
            <Reveal key={`${item.cycle}-${item.date.toISOString()}`} delay={Math.min(index, 5) * 70}>
              <MarketDayCard item={item} index={index} now={now} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
