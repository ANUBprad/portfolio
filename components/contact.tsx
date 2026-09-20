"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useReducedMotion } from "framer-motion";

import SectionCard from "./section-card";
import { CONTACT } from "@/lib/contact";

const PHRASES = [
  "Interested in Hiring",
  "Interested in Chatting",
  "Interested in Friendship",
] as const;

const ROTATE_MS = 2500;

const EMAIL_HREF = CONTACT.find((contact) => contact.label === "Email")?.href ?? "mailto:";

const FIELD_CLASS =
  "w-full rounded-lg border border-dotted border-neutral-800 bg-neutral-900/40 px-3 py-2 font-mono text-xs text-neutral-100 transition-colors placeholder:text-neutral-500 focus:border-neutral-600 focus-visible:text-neutral-100";

export default function Contact() {
  const reduced = useReducedMotion();
  const [phrase, setPhrase] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setPhrase((index) => (index + 1) % PHRASES.length),
      ROTATE_MS,
    );
    return () => clearInterval(id);
  }, [reduced]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Portfolio contact — ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message,
    ].join("\r\n");

    // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- mailto: opens the visitor's mail client, not an internal route
    window.location.href =
      `${EMAIL_HREF}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <SectionCard>
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-5">
        <h3 className="font-sans text-lg font-bold tracking-tight text-heading sm:text-xl">
          <span aria-live="polite">
            <span
              key={phrase}
              className="inline-block animate-[contact-rotate_0.35s_ease-out_both]"
            >
              {PHRASES[phrase]}
            </span>
          </span>
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="grid gap-3.5 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-name"
                className="font-mono text-[10px] text-neutral-500"
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                maxLength={100}
                placeholder="Your name"
                className={FIELD_CLASS}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-email"
                className="font-mono text-[10px] text-neutral-500"
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                maxLength={200}
                placeholder="you@example.com"
                className={FIELD_CLASS}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="contact-message"
              className="font-mono text-[10px] text-neutral-500"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              maxLength={2000}
              placeholder="What's on your mind?"
              className={`${FIELD_CLASS} resize-y`}
            />
          </div>

          <button
            type="submit"
            className="font-mono self-start rounded-lg border border-dotted border-neutral-800 bg-neutral-900/40 px-3 py-1.5 text-[11px] text-neutral-300 transition-colors hover:border-neutral-600 hover:text-neutral-100 focus-visible:text-neutral-100"
          >
            Send Message
            <span aria-hidden="true"> ↗</span>
          </button>

          {sent ? (
            <p role="status" className="font-mono text-[10px] text-neutral-500">
              Your mail client should open with the message pre-filled.
            </p>
          ) : null}
        </form>
      </div>
    </SectionCard>
  );
}