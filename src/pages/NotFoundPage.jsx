import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="section-shell grid min-h-[70svh] content-center pt-28 sm:pt-32">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-lime">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
        This route does not exist in the ITAM Market tracker.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 font-display font-bold text-lime-ink transition active:scale-[0.97] hover:bg-white"
      >
        <ChevronLeft size={18} />
        Back to Countdown
      </Link>
    </section>
  );
}
