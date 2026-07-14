import { NextRequest, NextResponse } from "next/server";

/**
 * Receives HelixPay webhooks. Register this URL (yourdomain.com/api/webhooks/helixpay)
 * in the HelixPay Merchant Console — see "Create Webhooks" in their docs.
 *
 * Documented event types (helixpay.readme.io/reference/webhook-guide):
 *   subscription.created, subscription.updated, subscription.cancelled,
 *   payment.success, payment.failed, order.shipped, order.skipped
 *
 * For one-time event tickets, the ones that matter are `payment.success`
 * (confirm the ticket / trigger the confirmation email) and `payment.failed`
 * (release the hold on inventory, if you're tracking it).
 *
 * HelixPay's docs don't publish a signature-verification scheme on the
 * pages readable without login — check your Merchant Console / Postman
 * collection for a signing secret before going live, and verify it here
 * instead of trusting the payload as-is.
 */
export async function POST(req: NextRequest) {
  const payload = await req.json();
  const { event, data } = payload ?? {};

  // TODO: verify a signature header (e.g. X-HelixPay-Signature) once you
  // confirm the scheme HelixPay uses for your account — do this before
  // trusting `data` in production.

  switch (event) {
    case "payment.success":
      console.log("[helixpay:payment.success]", {
        subscriptionId: data?.subscription_id,
        amount: data?.total_price,
        payor: data?.payor,
      });
      // TODO: mark the corresponding order as paid, send confirmation email.
      break;
    case "payment.failed":
      console.log("[helixpay:payment.failed]", { subscriptionId: data?.subscription_id });
      // TODO: release any reserved inventory for this order.
      break;
    case "subscription.created":
      console.log("[helixpay:subscription.created]", { id: data?.id, payor: data?.payor });
      break;
    default:
      console.log("[helixpay:webhook]", event, data?.id);
  }

  return NextResponse.json({ received: true });
}
