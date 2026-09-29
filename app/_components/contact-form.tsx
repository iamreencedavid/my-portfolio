"use client";

import { useEffect, useState, type FormEvent } from "react";
import { icons } from "./icons";

const prompts = [
  {
    name: "name",
    label: "your name",
    type: "text",
    autoComplete: "name",
    placeholder: "Reence David",
  },
  {
    name: "email",
    label: "your email",
    type: "email",
    autoComplete: "email",
    placeholder: "david.reence@gmail.com",
  },
  {
    name: "message",
    label: "message",
    type: "text",
    autoComplete: "off",
    placeholder: "Open for a new opportunity.",
  },
] as const;

const button =
  "inline-flex items-center gap-2.5 rounded-lg border border-border px-4 py-2 text-text transition-colors hover:bg-selected/50 focus-ring";

type Status = { tone: "ok" | "error"; text: string } | null;

export function ContactForm({
  email,
  resume,
}: {
  email: string;
  resume: string;
}) {
  const [status, setStatus] = useState<Status>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name")).trim();
    const from = String(data.get("email")).trim();
    const message = String(data.get("message")).trim();

    const subject = encodeURIComponent(`Hello from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} <${from}>`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setStatus({ tone: "ok", text: "✓ opening your mail app…" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setStatus({ tone: "ok", text: `✓ copied ${email}` });
    } catch {
      setStatus({ tone: "error", text: `✗ copy failed — ${email}` });
    }
  };

  return (
    <form onSubmit={send}>
      <div className="space-y-2">
        {prompts.map((p) => (
          <div
            key={p.name}
            className="flex items-center gap-x-3 border-b border-transparent focus-within:border-border"
          >
            <span className="text-syn-literal" aria-hidden>
              ?
            </span>
            <label
              htmlFor={`contact-${p.name}`}
              className="shrink-0 text-muted"
            >
              {p.label}
            </label>
            <span className="text-muted" aria-hidden>
              ›
            </span>
            <input
              id={`contact-${p.name}`}
              name={p.name}
              type={p.type}
              autoComplete={p.autoComplete}
              placeholder={p.placeholder}
              required
              className="min-w-0 flex-1 bg-transparent text-text caret-text outline-none placeholder:text-muted/50"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="submit" className={button}>
          {icons.enter}
          send
        </button>
        <button type="button" onClick={copyEmail} className={button}>
          {icons.copy}
          {copied ? "copied!" : "copy email"}
        </button>
        <a href={resume} download className={button}>
          {icons.download}
          resume.pdf
        </a>
      </div>

      <p
        aria-live="polite"
        className={`mt-4 min-h-[1.5em] ${
          status?.tone === "error" ? "text-syn-number" : "text-online"
        }`}
      >
        {status?.text}
      </p>
    </form>
  );
}
