import { NextRequest, NextResponse } from "next/server";
import { events } from "@/lib/data/events";
import { services, companyBlurb } from "@/lib/data/team";

type Message = { role: "user" | "bot"; text: string };

function buildContext() {
  const eventLines = events
    .map((e) => `- ${e.title} (${e.status}) — ${e.dateLabel} at ${e.venue}, ${e.city}. ${e.summary}`)
    .join("\n");
  const serviceLines = services.map((s) => `- ${s.title}: ${s.description}`).join("\n");
  return `${companyBlurb}\n\nEvents:\n${eventLines}\n\nServices:\n${serviceLines}`;
}

// Rule-based fallback: used when no LLM API key is configured, so the
// widget still works out of the box for a capstone demo.
function ruleBasedReply(question: string): string {
  const q = question.toLowerCase();

  if (/(ticket|price|cost|how much)/.test(q)) {
    const withTickets = events.filter((e) => e.tickets && e.tickets.length);
    const lines = withTickets
      .map((e) => `${e.title}: ${e.tickets!.map((t) => `${t.name} ₱${t.price}`).join(", ")}`)
      .join("\n");
    return `Here's current pricing:\n${lines}\n\nTickets are processed through HelixPay, with GCash and card accepted.`;
  }
  if (/(upcoming|next event|when.*event|schedule)/.test(q)) {
    const upcoming = events.filter((e) => e.status !== "past");
    if (!upcoming.length) return "No events are currently listed as upcoming — check back soon.";
    return upcoming.map((e) => `${e.title} — ${e.dateLabel} at ${e.venue}, ${e.city}.`).join("\n");
  }
  if (/(past|recap|previous)/.test(q)) {
    const past = events.filter((e) => e.status === "past");
    if (!past.length) return "We don't have past events listed yet.";
    return past.map((e) => `${e.title} — ${e.dateLabel}, ${e.attendance ?? "—"} guests.`).join("\n");
  }
  if (/(partner|venue|bar|collab|promot)/.test(q)) {
    return "We work with startup and new bars to run promotions, hosting, and event operations end-to-end. Head to the Contact page and pick 'Venue / Business Partnership' — our team replies within 1–2 business days after an initial call.";
  }
  if (/(payment|gcash|helixpay|card)/.test(q)) {
    return "Tickets are sold through HelixPay, with GCash and card payments accepted at checkout.";
  }
  if (/(who|about|company|what.*do)/.test(q)) {
    return companyBlurb;
  }
  return "I can help with event dates, ticket pricing, and venue partnerships. Try asking something like \"what events are upcoming\" or \"how much are tickets\" — or reach the team directly on the Contact page.";
}

async function claudeReply(messages: Message[]): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 400,
      system: `You are the customer-support assistant for Parallel Dimensions, a Metro Manila bar-party and events promotions company. Answer only using this context, and keep replies short and conversational:\n\n${buildContext()}`,
      messages: messages.map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text,
      })),
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const text = data?.content?.find((c: { type: string }) => c.type === "text")?.text;
  return typeof text === "string" ? text : null;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages: Message[] = body?.messages ?? [];
  const lastUser = [...messages].reverse().find((m) => m.role === "user");

  if (!lastUser) {
    return NextResponse.json({ reply: "Ask me anything about our events, tickets, or partnerships." });
  }

  try {
    const llmReply = await claudeReply(messages);
    if (llmReply) return NextResponse.json({ reply: llmReply });
  } catch {
    // fall through to rule-based reply
  }

  return NextResponse.json({ reply: ruleBasedReply(lastUser.text) });
}
