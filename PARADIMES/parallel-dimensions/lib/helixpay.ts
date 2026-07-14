/**
 * HelixPay integration point.
 *
 * Verified from HelixPay's public docs (helixpay.readme.io) on 2026-07-02:
 *   - Base URLs:  Live https://api.helixpay.ph
 *                 Sandbox https://api-sandbox.helixpay.ph
 *                 (their prose docs also mention api-sandbox.helixsandbox.com
 *                  as the testing domain — the two didn't match, so verify
 *                  which one is current for your account against the
 *                  Postman collection in your Merchant Console before relying
 *                  on either)
 *   - Auth: every request needs `Authorization: Bearer <access_token>`.
 *     The docs don't publish the literal token endpoint path on the pages
 *     that are readable outside a logged-in session — get it from your
 *     Postman/Insomnia collection (Merchant Console → Credentials) along
 *     with your Client ID/Secret, then fill in getHelixPayToken() below.
 *   - Checkout: POST /v1/checkouts, body wrapped in a top-level `data`
 *     object. HelixPay is fundamentally a *subscription* platform (their
 *     own words: "Philippines' 1st Subscription Payment System") — a
 *     single event ticket is modeled as a one-time "subscription" against
 *     a Product/Product Variant you configure in the Merchant Console
 *     first. The exact body fields for `data` aren't fully readable from
 *     the public docs (they render dynamically behind a login) — confirm
 *     them from the Postman collection. From the webhook payload shapes
 *     HelixPay does publish, `success_redirect_url`, `failure_redirect_url`,
 *     and `reference_id` are real fields you can expect to pass.
 *
 * Until HELIXPAY_API_KEY/HELIXPAY_API_SECRET are set, this returns a mock
 * checkout session so the rest of the site works end-to-end for a demo.
 */

const HELIXPAY_BASE_URL =
  process.env.HELIXPAY_BASE_URL ?? "https://api-sandbox.helixpay.ph";

export type CheckoutRequest = {
  eventSlug: string;
  helixpayEventId?: string;
  ticketTierName: string;
  unitPrice: number;
  quantity: number;
  buyerEmail: string;
  buyerName: string;
};

export type CheckoutSession = {
  checkoutUrl: string;
  referenceId: string;
  provider: "helixpay" | "mock";
};

/**
 * Exchanges your Client ID/Secret for a Bearer token.
 * TODO: confirm the real path (likely something like `/v1/oauth/token` or
 * `/v1/token`) from your Postman collection, then fill it in below — the
 * publicly readable docs describe the header format but not this path.
 */
async function getHelixPayToken(): Promise<string> {
  const clientId = process.env.HELIXPAY_CLIENT_ID;
  const clientSecret = process.env.HELIXPAY_API_SECRET;

  const res = await fetch(`${HELIXPAY_BASE_URL}/v1/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });
  if (!res.ok) {
    throw new Error(`HelixPay token request failed (${res.status}) — verify the token path in lib/helixpay.ts against your Postman collection.`);
  }
  const data = await res.json();
  return data.access_token as string;
}

export async function createHelixPayCheckout(
  req: CheckoutRequest
): Promise<CheckoutSession> {
  const clientId = process.env.HELIXPAY_CLIENT_ID;

  if (!clientId) {
    // No credentials configured yet — return a mock session so the
    // checkout flow can be demoed end-to-end.
    return {
      checkoutUrl: `/checkout/mock?event=${req.eventSlug}&tier=${encodeURIComponent(
        req.ticketTierName
      )}&qty=${req.quantity}`,
      referenceId: `MOCK-${Date.now()}`,
      provider: "mock",
    };
  }

  const token = await getHelixPayToken();
  const referenceId = `${req.eventSlug}-${Date.now()}`;
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const res = await fetch(`${HELIXPAY_BASE_URL}/v1/checkouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: {
        // TODO: confirm exact field names against the Postman collection —
        // the public docs render this schema dynamically and it wasn't
        // extractable. This shape is a best-effort based on the fields
        // HelixPay's own webhook payloads confirm exist (reference_id,
        // success_redirect_url, failure_redirect_url, payor, products[]).
        reference_id: referenceId,
        payor: req.buyerName,
        customer: { name: req.buyerName, email: req.buyerEmail },
        products: [
          {
            product_id: req.helixpayEventId, // the Product you set up in HelixPay's console for this event/tier
            quantity: req.quantity,
          },
        ],
        success_redirect_url: `${origin}/checkout/success?ref=${referenceId}`,
        failure_redirect_url: `${origin}/checkout/failed?ref=${referenceId}`,
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HelixPay checkout request failed (${res.status}): ${body}`);
  }

  const data = await res.json();
  return {
    checkoutUrl: data.data?.checkout_url ?? data.checkout_url,
    referenceId,
    provider: "helixpay",
  };
}
