import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[#0e0e0e]">
      <div className="section-shell grid gap-6 py-8 sm:grid-cols-2 sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <img src="/favicon.png" alt="" className="size-6" />
            {/* <span className="font-display text-2xl font-bold text-white">ITAM MARKET</span> */}
          </div>
          {/* <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Market day tracker.
          </p> */}
        </div>
        <div className="flex flex-wrap gap-4 sm:justify-end">
          {/* {["WhatsApp Bot coming soon..."].map((item) => (
            <Link key={item} to="/bot" className="font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-white">
              {item}
            </Link>
          ))} */}
        </div>
      </div>
    </footer>
  );
}
