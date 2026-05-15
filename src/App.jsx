import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import {
  Bell,
  Bot,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Menu,
  MessageCircle,
  Send,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import {
  buildMonthGrid,
  dayNames,
  daysUntil,
  formatDateLong,
  formatMonthYear,
  formatShortMonth,
  generateMarketDays,
  generateMarketDaysRange,
  getCountdownParts,
  getWhatsAppMessage,
} from "./marketDays";

const navItems = [
  { label: "Countdown", path: "/" },
  { label: "Upcoming", path: "/upcoming" },
  { label: "Calendar", path: "/calendar" },
  // { label: "WhatsApp Bot", path: "/bot" },
];

function twoDigits(value) {
  return String(value).padStart(2, "0");
}

function Header({ onNotify }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md">
      <nav className="section-shell flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link to="/" className="font-display text-xl font-bold tracking-normal text-white sm:text-2xl">
          ITAM MARKET
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 font-display text-sm font-semibold transition hover:text-white ${isActive ? "border-b-2 border-lime text-lime" : "text-muted"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNotify}
            className="hidden cursor-pointer items-center gap-2 rounded bg-lime px-4 py-2 font-display text-sm font-bold text-lime-ink transition hover:lime-glow sm:inline-flex"
          >
            <Bell size={16} />
            Get Notified
          </button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded border border-line text-white lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-panel lg:hidden">
          <div className="section-shell grid gap-2 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `border px-4 py-3 font-display font-semibold ${isActive ? "border-lime text-lime" : "border-line-soft text-muted"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded bg-lime px-4 py-3 font-display font-bold text-lime-ink"
              onClick={() => {
                setOpen(false);
                onNotify();
              }}
            >
              <Bell size={16} />
              Get Notified
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="hard-card p-3 transition hover:border-lime min-[360px]:p-4 sm:p-6 lg:p-8">
      <div className="font-display text-[2.35rem] font-bold leading-none text-white min-[360px]:text-5xl sm:text-6xl lg:text-8xl">
        {twoDigits(value)}
      </div>
      <div className="mt-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted sm:mt-3 sm:text-xs sm:tracking-[0.18em]">{label}</div>
    </div>
  );
}

function Hero({ nextMarketDay, countdown, onNotify }) {
  const whatsappHref = `https://wa.me/?text=${getWhatsAppMessage(nextMarketDay)}`;

  return (
    <section id="countdown" className="hero-grid border-b border-line pt-20 sm:pt-28">
      <div className="section-shell grid min-h-[calc(100svh-4rem)] content-center gap-6 py-8 sm:gap-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:py-20">
        <div className="min-w-0">
          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-panel px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted sm:mb-5 sm:text-xs sm:tracking-[0.14em]">
            <span className="rounded bg-lime px-2 py-0.5 font-bold text-lime-ink">Live</span>
            <span className="truncate">keep track of every cycle, never miss a market day again</span>
          </div>
          <h1 className="max-w-5xl text-balance font-display text-[clamp(2.35rem,12vw,5rem)] font-bold leading-[1] tracking-normal text-white sm:text-6xl lg:text-7xl xl:text-8xl">
            Next Market Day is{" "}
            <span className="text-lime">{dayNames[nextMarketDay.date.getDay()]}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:mt-6 sm:text-lg sm:leading-7">
            ITAM Market runs on a rotating weekly pattern. The tracker calculates the next date,
            handles the Sunday exception, and prepares reminders for shoppers and vendors.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Link
              to="/upcoming"
              className="inline-flex items-center justify-center gap-2 rounded bg-white px-6 py-3 font-display font-bold text-background transition hover:bg-lime"
            >
              <CalendarDays size={18} />
              View Schedule
            </Link>
            <button
              type="button"
              onClick={onNotify}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded bg-lime px-6 py-3 font-display font-bold text-lime-ink transition hover:bg-white"
            >
              <Bell size={18} />
              Get Notified
            </button>
            {/* <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded border border-white px-6 py-3 font-display font-bold text-white transition hover:border-lime hover:text-lime"
            >
              <MessageCircle size={18} />
              Ask WhatsApp Bot
            </a> */}
          </div>
        </div>

        <div className="hard-card min-w-0 p-4 sm:p-7">
          <div className="flex items-center justify-between gap-4 border-b border-line pb-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-lime">Next session</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                {formatDateLong(nextMarketDay.date)}
              </h2>
            </div>
            <Clock3 className="shrink-0 text-lime" />
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3">
            <StatCard value={countdown.days} label="Days" />
            <StatCard value={countdown.hours} label="Hours" />
            <StatCard value={countdown.minutes} label="Minutes" />
            <StatCard value={countdown.seconds} label="Seconds" />
          </div>
          {nextMarketDay.exception && (
            <div className="mt-4 border border-clay-strong bg-clay-strong/20 p-4 text-sm text-clay">
              Sunday exception applied. The pattern landed on{" "}
              {formatDateLong(nextMarketDay.originalDate)}, so the market moved to Saturday.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function LogicSection({ marketDays }) {
  return (
    <section className="border-b border-line bg-[#0e0e0e] py-14 sm:py-20">
      <div className="section-shell grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-lime">System Logic</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-white sm:text-5xl">
            App is designed to help remove mentally tracking market days.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-muted">
            Starting from Monday, May 11, 2026, the underlying pattern advances by 8 days.
            That makes each market day appear one weekday later. If the calculated day is
            Sunday, the public market date is the Saturday immediately before it.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="hard-card p-6">
            <Sparkles className="mb-5 text-lime" />
            <h3 className="font-display text-2xl font-bold text-white">8-day shift</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              Monday becomes Tuesday, Tuesday becomes Wednesday, and the weekday keeps rotating.
            </p>
          </div>
          <div className="hard-card border-clay-strong p-6">
            <CalendarDays className="mb-5 text-clay" />
            <h3 className="font-display text-2xl font-bold text-white">Sunday exception</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              No market is shown on Sunday. The app tags the shifted Saturday as an exception.
            </p>
          </div>
          <div className="hard-card p-6 sm:col-span-2">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Next rotation sample</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {marketDays.slice(0, 4).map((item, index) => (
                <div key={item.date.toISOString()} className="border border-line-soft bg-background p-4">
                  <p className="font-mono text-xs text-muted">#{index + 1}</p>
                  <p className="mt-2 font-display text-xl font-bold text-white">
                    {dayNames[item.date.getDay()].slice(0, 3)}
                  </p>
                  <p className="font-mono text-xs uppercase text-muted">
                    {formatShortMonth(item.date)} {item.date.getDate()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketDayCard({ item, index, now }) {
  const wait = daysUntil(item.date, now);
  const label = wait === 0 ? "Today" : wait === 1 ? "Tomorrow" : `In ${wait} days`;

  return (
    <article
      className={`hard-card p-5 transition hover:border-lime sm:p-6 ${index === 0 ? "border-2 border-lime lime-glow" : ""
        } ${item.exception ? "border-clay-strong" : ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted">
            {formatShortMonth(item.date)} {item.date.getFullYear()}
          </p>
          <h3 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            {dayNames[item.date.getDay()]}, {item.date.getDate()}
          </h3>
        </div>
        <span
          className={`shrink-0 rounded px-2 py-1 font-mono text-[10px] font-bold uppercase ${index === 0 ? "bg-lime text-lime-ink" : item.exception ? "bg-clay text-background" : "bg-panel-high text-muted"
            }`}
        >
          {index === 0 ? "Next" : item.exception ? "Exception" : label}
        </span>
      </div>
      <div className="mt-6 border-t border-line-soft pt-4 font-mono text-sm text-muted">
        {item.exception ? (
          <span>Shifted from {formatDateLong(item.originalDate)}</span>
        ) : (
          <span>08:00 AM to 04:00 PM</span>
        )}
      </div>
    </article>
  );
}

function UpcomingSection({ marketDays, now, standalone = false }) {
  return (
    <section id="upcoming" className={`border-b border-line py-14 sm:py-20 ${standalone ? "pt-28 sm:pt-32" : ""}`}>
      <div className="section-shell">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-lime">Market Schedule</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-5xl">
              Upcoming market days
            </h2>
          </div>
          {/* <p className="max-w-xl leading-7 text-muted">
            The list stays useful on phones, tablets, and desktop dashboards, with exception days clearly tagged.
          </p> */}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {marketDays.slice(0, 9).map((item, index) => (
            <MarketDayCard key={`${item.cycle}-${item.date.toISOString()}`} item={item} index={index} now={now} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CalendarSection({ marketDays, now, standalone = false }) {
  const [viewDate, setViewDate] = useState(marketDays[0].date);
  const monthDays = useMemo(
    () => buildMonthGrid(viewDate.getFullYear(), viewDate.getMonth(), marketDays, now),
    [marketDays, now, viewDate],
  );

  function moveMonth(offset) {
    setViewDate((date) => new Date(date.getFullYear(), date.getMonth() + offset, 1));
  }

  return (
    <section id="calendar" className={`border-b border-line bg-[#0e0e0e] py-14 sm:py-20 ${standalone ? "pt-28 sm:pt-32" : ""}`}>
      <div className="section-shell">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-lime">Monthly View</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-5xl">Market calendar</h2>
          </div>
          <div className="flex items-center justify-between gap-2 border border-line bg-panel p-2">
            <button
              type="button"
              onClick={() => moveMonth(-1)}
              className="grid cursor-pointer size-10 place-items-center rounded border border-line-soft text-muted transition hover:text-white"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="min-w-40 px-3 text-center font-display text-xl font-bold text-white">
              {formatMonthYear(viewDate)}
            </div>
            <button
              type="button"
              onClick={() => moveMonth(1)}
              className="grid cursor-pointer size-10 place-items-center rounded border border-line-soft text-muted transition hover:text-white"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded border border-line bg-background">
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
                      <div className={`mt-2 rounded px-1.5 py-1 font-mono text-[9px] font-bold uppercase leading-tight sm:text-[10px] ${cell.market.isPast ? "bg-line text-muted line-through" : "bg-clay text-background"
                        }`}>
                        {cell.market.isPast ? "Past" : "Itam"}
                      </div>
                    )}
                    {cell.market?.exception && (
                      <div className="mt-1 hidden font-mono text-[10px] text-clay sm:block">Sun shift</div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BotSection({ nextMarketDay, standalone = false }) {
  const [question, setQuestion] = useState("When is the next ITAM market day?");
  const answer = nextMarketDay.exception
    ? `The next market day is ${formatDateLong(nextMarketDay.date)}. The normal pattern landed on Sunday, so it was moved to Saturday.`
    : `The next market day is ${formatDateLong(nextMarketDay.date)}, from 8:00 AM to 4:00 PM.`;

  return (
    <section id="bot" className={`py-14 sm:py-20 ${standalone ? "pt-28 sm:pt-32" : ""}`}>
      <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-lime">AI WhatsApp Assistant</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-5xl">
            Reminds you of Itam market days, directly on your WhatsApp.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-muted">
            The web app can share one calculation engine with a WhatsApp chatbot. Users ask simple questions,
            and the bot responds with the next date, countdown, Sunday exceptions, and reminder prompts.
          </p>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="hard-card p-5">
              <Bot className="mb-4 text-lime" />
              <h3 className="font-display text-xl font-bold text-white">Natural questions</h3>
              <p className="mt-2 text-sm leading-6 text-muted">“Is market this week?” “Remind me one day before.”</p>
            </div>
            <div className="hard-card p-5">
              <Smartphone className="mb-4 text-lime" />
              <h3 className="font-display text-xl font-bold text-white">WhatsApp-first</h3>
              <p className="mt-2 text-sm leading-6 text-muted">Works for people who do not want to open the web app.</p>
            </div>
          </div>
        </div>

        <div className="hard-card mx-auto w-full max-w-md overflow-hidden invisible">
          <div className="flex items-center gap-3 border-b border-line bg-panel p-4">
            <div className="grid size-10 place-items-center rounded bg-lime text-lime-ink">
              <Bot size={22} />
            </div>
            <div>
              <h3 className="font-display font-bold text-white">ITAM Market Bot</h3>
              <p className="font-mono text-xs uppercase text-muted">Online</p>
            </div>
          </div>
          <div className="space-y-4 p-4">
            <div className="max-w-[85%] rounded bg-panel-high p-3 text-sm leading-6 text-white">{question}</div>
            <div className="ml-auto max-w-[88%] rounded bg-lime p-3 text-sm font-semibold leading-6 text-lime-ink">
              {answer}
            </div>
          </div>
          <form
            className="flex gap-2 border-t border-line p-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              className="min-w-0 flex-1 rounded border border-line bg-background px-3 py-3 text-sm text-white outline-none transition placeholder:text-muted focus:border-lime"
              aria-label="Chatbot question"
            />
            <button
              type="submit"
              className="grid size-12 shrink-0 place-items-center rounded bg-lime text-lime-ink transition hover:bg-white"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function NotificationModal({ isOpen, onClose, nextMarketDay }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  if (!isOpen) {
    return null;
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitForm(event) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");

    const payload = {
      ...form,
      nextMarketDay: formatDateLong(nextMarketDay.date),
      source: "itam-market-days-tracker",
      createdAt: new Date().toISOString(),
    };

    const stored = JSON.parse(localStorage.getItem("itam-market-notification-signups") || "[]");
    localStorage.setItem("itam-market-notification-signups", JSON.stringify([...stored, payload]));

    const sheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

    if (sheetsUrl) {
      try {
        await fetch(sheetsUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
        setStatus("saved");
        setMessage("You are on the reminder list. You'll be notified of upcoming market days.");
        setForm({ name: "", phone: "", email: "" });
      } catch {
        setStatus("error");
        setMessage("Saved locally, but the Google Sheets connection failed. Check the webhook URL.");
      }
      return;
    }

    setStatus("saved");
    setMessage("Saved locally. Add VITE_GOOGLE_SHEETS_WEBHOOK_URL to send this form to Google Sheets.");
    setForm({ name: "", phone: "", email: "" });
  }

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="hard-card w-full max-w-lg overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] cursor-pointer text-lime">Get Notified</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">Market reminders</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Enter your details and we will use them for customized ITAM Market reminders.
            </p>
          </div>
          <button
            type="button"
            className="grid cursor-pointer size-10 shrink-0 place-items-center rounded border border-line text-white"
            aria-label="Close notification form"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <form className="grid gap-4 p-5" onSubmit={submitForm}>
          <label className="grid gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted">Name</span>
            <input
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="rounded border border-line bg-background px-4 py-3 text-white outline-none transition focus:border-lime"
              placeholder="Your full name"
            />
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted">Phone number</span>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="rounded border border-line bg-background px-4 py-3 text-white outline-none transition focus:border-lime"
              placeholder="+234..."
            />
          </label>
          <label className="grid gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted">Email address</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="rounded border border-line bg-background px-4 py-3 text-white outline-none transition focus:border-lime"
              placeholder="you@example.com"
            />
          </label>

          {message && (
            <div
              className={`border p-3 text-sm leading-6 ${status === "error" ? "border-clay-strong text-clay" : "border-lime text-lime"
                }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "saving"}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded bg-lime px-5 py-3 font-display font-bold text-lime-ink transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Bell size={18} />
            {status === "saving" ? "Saving..." : "Save reminder details"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-[#0e0e0e]">
      <div className="section-shell grid gap-6 py-8 sm:grid-cols-2 sm:items-center">
        <div>
          <div className="font-display text-2xl font-bold text-white">ITAM MARKET</div>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Market day tracker.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 sm:justify-end">
          {["WhatsApp Bot coming soon..."].map((item) => (
            <Link key={item} to="/bot" className="font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-white">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

function NotFound() {
  return (
    <section className="section-shell grid min-h-[70svh] content-center pt-28 sm:pt-32">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-lime">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-6xl">Page not found</h1>
      <p className="mt-4 max-w-xl leading-7 text-muted">
        This route does not exist in the ITAM Market tracker.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex w-fit items-center justify-center rounded bg-lime px-6 py-3 font-display font-bold text-lime-ink"
      >
        Back to Countdown
      </Link>
    </section>
  );
}

export default function App() {
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
  const nextMarketDay = marketDays[0];
  const countdown = getCountdownParts(nextMarketDay.date, now);

  return (
    <BrowserRouter>
      <div className="grain" />
      <Header onNotify={() => setNotifyOpen(true)} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero nextMarketDay={nextMarketDay} countdown={countdown} onNotify={() => setNotifyOpen(true)} />
                <LogicSection marketDays={marketDays} />
              </>
            }
          />
          <Route path="/upcoming" element={<UpcomingSection marketDays={marketDays} now={now} standalone />} />
          <Route path="/calendar" element={<CalendarSection marketDays={calendarMarketDays} now={now} standalone />} />
          <Route path="/bot" element={<BotSection nextMarketDay={nextMarketDay} standalone />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <NotificationModal
        isOpen={notifyOpen}
        onClose={() => setNotifyOpen(false)}
        nextMarketDay={nextMarketDay}
      />
      <div className="fixed bottom-4 right-4 z-40 hidden items-center gap-2 rounded border border-line bg-panel-high px-4 py-3 shadow-2xl sm:flex">
        <span className="size-2 rounded-full bg-lime" />
        <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-white">Active Cycle</span>
      </div>
      <Analytics />
    </BrowserRouter>
  );
}
