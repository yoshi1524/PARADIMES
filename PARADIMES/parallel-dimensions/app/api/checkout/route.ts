import { NextRequest, NextResponse } from "next/server";
import { createHelixPayCheckout } from "@/lib/helixpay";
import { getEventBySlug } from "@/lib/data/events";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { eventSlug, ticketTierName, quantity, buyerEmail, buyerName } = body ?? {};

  if (!eventSlug || !ticketTierName || !quantity || !buyerEmail || !buyerName) {
    return NextResponse.json(
      { error: "Missing one of: eventSlug, ticketTierName, quantity, buyerEmail, buyerName." },
      { status: 400 }
    );
  }

  const event = getEventBySlug(eventSlug);
  if (!event) {
    return NextResponse.json({ error: "Unknown event." }, { status: 404 });
  }

  const tier = event.tickets?.find((t) => t.name === ticketTierName);
  if (!tier) {
    return NextResponse.json({ error: "Unknown ticket tier for this event." }, { status: 400 });
  }

  try {
    const session = await createHelixPayCheckout({
      eventSlug,
      helixpayEventId: event.helixpayEventId,
      ticketTierName: tier.name,
      unitPrice: tier.price,
      quantity: Number(quantity),
      buyerEmail,
      buyerName,
    });
    return NextResponse.json(session);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Checkout failed." },
      { status: 500 }
    );
  }
}
