import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Bot, Send, Smartphone } from "lucide-react";
import { formatDateLong } from "../marketDays";
import Reveal from "../components/Reveal";

export default function BotPage() {
  const { nextMarketDay } = useOutletContext();
  const [question, setQuestion] = useState("When is the next ITAM market day?");
  const answer = nextMarketDay.exception
    ? `The next market day is ${formatDateLong(nextMarketDay.date)}. The normal pattern landed on Sunday, so it was moved to Monday.`
    : nextMarketDay.followsShiftedSunday
      ? `The next market day is ${formatDateLong(nextMarketDay.date)}. This is the regular Monday market after the shifted Sunday session.`
      : `The next market day is ${formatDateLong(nextMarketDay.date)}, from 8:00 AM to 4:00 PM.`;

  return (
    <section id="bot" className="py-14 pt-28 sm:py-20 sm:pt-32">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <span className="inline-block rounded border border-line-soft bg-panel px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
            Coming soon
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Reminds you of Itam market days, directly on your WhatsApp.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base sm:leading-7">
            The web app can share one calculation engine with a WhatsApp chatbot. Users ask simple questions,
            and the bot responds with the next date, countdown, Sunday exceptions, and reminder prompts.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="hard-card p-4 sm:p-5">
              <Bot size={20} className="mb-3 text-lime" />
              <h3 className="font-display text-base font-bold text-white sm:text-lg">Natural questions</h3>
              <p className="mt-2 text-sm leading-6 text-muted">“Is market this week?” “Remind me one day before.”</p>
            </div>
            <div className="hard-card p-4 sm:p-5">
              <Smartphone size={20} className="mb-3 text-lime" />
              <h3 className="font-display text-base font-bold text-white sm:text-lg">WhatsApp-first</h3>
              <p className="mt-2 text-sm leading-6 text-muted">Works for people who do not want to open the web app.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="hard-card mx-auto w-full max-w-md overflow-hidden">
          <div className="flex items-center gap-3 border-b border-line bg-panel p-4">
            <div className="grid size-10 place-items-center rounded bg-lime text-lime-ink">
              <Bot size={22} />
            </div>
            <div>
              <h3 className="font-display font-bold text-white">ITAM Market Bot</h3>
              <p className="font-mono text-xs uppercase text-muted">Preview</p>
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
              className="grid size-12 shrink-0 cursor-pointer place-items-center rounded bg-lime text-lime-ink transition active:scale-90 hover:bg-white"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
