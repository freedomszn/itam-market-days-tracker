import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";

const navItems = [
  { label: "Countdown", path: "/" },
  { label: "Upcoming", path: "/upcoming" },
  { label: "Calendar", path: "/calendar" },
  // { label: "WhatsApp Bot", path: "/bot" },
];

export default function Header({ onNotify }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-3 top-3 z-50 sm:inset-x-6 sm:top-4">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 rounded-full border border-line bg-panel/90 px-3 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md sm:h-[72px] sm:px-4">
        <Link to="/" className="flex shrink-0 items-center gap-2 pl-1.5 sm:gap-3">
          <img src="/favicon.png" alt="ITAM MARKET" className="size-8 sm:size-9" />
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-line-soft bg-panel-high/40 p-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 font-display text-sm font-semibold transition ${isActive ? "bg-lime text-lime-ink" : "text-muted hover:bg-panel-high hover:text-white"
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
            className="hidden cursor-pointer items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-display text-sm font-bold text-lime-ink transition active:scale-[0.97] hover:shadow-[0_0_28px_rgba(195,244,0,0.45)] sm:inline-flex"
          >
            <Bell size={16} />
            Get Notified
          </button>
          <button
            type="button"
            className="grid size-10 cursor-pointer place-items-center rounded-full border border-line text-white transition active:scale-[0.94] lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-5xl rounded-2xl border border-line bg-panel/95 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md lg:hidden">
          <div className="grid gap-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 font-display font-semibold transition ${isActive ? "bg-lime text-lime-ink" : "text-muted hover:bg-panel-high hover:text-white"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-4 py-3 font-display font-bold text-background transition active:scale-[0.97] hover:bg-lime"
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
