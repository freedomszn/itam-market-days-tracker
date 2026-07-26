import { useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { daysUntil, generateMarketDays, generateMarketDaysRange, getCountdownParts } from "../marketDays";
import Header from "./Header";
import Footer from "./Footer";
import NotificationModal from "./NotificationModal";

export default function Layout() {
  const [now, setNow] = useState(() => new Date());
  const [notifyOpen, setNotifyOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const marketDays = useMemo(() => generateMarketDays(24, now), [now]);
  const calendarMarketDays = useMemo(() => {
    const start = new Date(now.getFullYear(), now.getMonth() - 3, 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 12, 0);
    return generateMarketDaysRange(start, end);
  }, [now]);
  const nextMarketDay = marketDays.find((item) => daysUntil(item.date, now) > 0) || marketDays[0];
  const todayMarketDay = marketDays.find((item) => daysUntil(item.date, now) === 0);
  const countdown = getCountdownParts(nextMarketDay.date, now);
  const onNotify = () => setNotifyOpen(true);

  return (
    <>
      <div className="grain" />
      <Header onNotify={onNotify} />
      <main>
        <Outlet
          context={{
            now,
            marketDays,
            calendarMarketDays,
            nextMarketDay,
            todayMarketDay,
            countdown,
            onNotify,
          }}
        />
      </main>
      <Footer />
      <NotificationModal isOpen={notifyOpen} onClose={() => setNotifyOpen(false)} nextMarketDay={nextMarketDay} />
      <div className="fixed bottom-4 right-4 z-40 hidden items-center gap-2 rounded border border-line bg-panel-high px-4 py-3 shadow-2xl sm:flex">
        <span className="size-2 rounded-full bg-lime" />
        <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-white">Active Cycle</span>
      </div>
      <Analytics />
    </>
  );
}
