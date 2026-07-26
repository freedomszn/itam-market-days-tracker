import { useState } from "react";
import { Bell, X } from "lucide-react";
import { formatDateLong } from "../marketDays";

export default function NotificationModal({ isOpen, onClose, nextMarketDay }) {
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
    <div className="fixed inset-0 z-70 grid place-items-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="soft-card modal-panel w-full max-w-lg overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-line p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4">
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-lime text-lime-ink">
              <Bell size={20} />
            </div>
            <div>
              {/* <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-lime">Get Notified</p> */}
              {/* <h2 className="mt-2 font-display text-3xl font-bold text-white">Market reminders</h2> */}
              {/* <p className="mt-2 text-sm leading-6 text-muted">
                Enter your details and we will use them for customized ITAM Market reminders.
              </p> */}
            </div>
          </div>
          <button
            type="button"
            className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-white transition active:scale-90 hover:border-lime hover:text-lime"
            aria-label="Close notification form"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <form className="grid gap-4 p-6 sm:p-7" onSubmit={submitForm}>
          <label className="grid gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted">Name</span>
            <input
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="rounded-xl border border-line bg-background px-4 py-3 text-white outline-none transition focus:border-lime"
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
              className="rounded-xl border border-line bg-background px-4 py-3 text-white outline-none transition focus:border-lime"
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
              className="rounded-xl border border-line bg-background px-4 py-3 text-white outline-none transition focus:border-lime"
              placeholder="you@example.com"
            />
          </label>

          {message && (
            <div
              className={`rounded-xl border p-3 text-sm leading-6 ${status === "error" ? "border-clay-strong text-clay" : "border-lime text-lime"
                }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "saving"}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 font-display font-bold text-lime-ink transition active:scale-[0.97] hover:bg-white disabled:cursor-not-allowed disabled:active:scale-100 disabled:opacity-60"
          >
            <Bell size={18} />
            {status === "saving" ? "Saving..." : "Save reminder details"}
          </button>
        </form>
      </div>
    </div>
  );
}
