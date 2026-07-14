"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "bot"; text: string };

const GREETING: Message = {
  role: "bot",
  text: "Hey — this is the Parallel Dimensions assistant. Ask about upcoming events, ticket tiers, or how to partner with us as a venue.",
};

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", text } as Message];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "bot", text: data.reply as string }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Something went wrong reaching support. Try again in a moment, or use the Contact page." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 md:bottom-8 md:right-8">
      {open && (
        <div className="mb-3 flex h-[28rem] w-[20rem] flex-col border border-static bg-void shadow-2xl md:w-[22rem]">
          <div className="flex items-center justify-between border-b border-static/70 px-4 py-3">
            <p className="font-mono text-xs uppercase tracking-widest text-silver">PD Assistant</p>
            <button
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="text-ash hover:text-bone"
            >
              ✕
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto border border-bone bg-bone text-void"
                    : "border border-static/70 bg-iron text-bone"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && <p className="font-mono text-xs text-ash">Typing…</p>}
          </div>
          <div className="flex gap-2 border-t border-static/70 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about tickets, dates…"
              className="flex-1 border border-static bg-void px-3 py-2 text-sm text-bone placeholder:text-ash focus:border-silver focus:outline-none"
            />
            <button
              onClick={send}
              disabled={loading}
              className="border border-bone px-3 py-2 font-mono text-xs uppercase text-bone hover:bg-bone hover:text-void disabled:opacity-40"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-bone bg-void font-display text-lg text-bone shadow-xl hover:bg-bone hover:text-void"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
      >
        {open ? "✕" : "PD"}
      </button>
    </div>
  );
}
