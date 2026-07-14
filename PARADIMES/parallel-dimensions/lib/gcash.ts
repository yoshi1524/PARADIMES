/**
 * GCash payment integration point.
 *
 * GCash does not expose a direct public checkout API to individual
 * merchants — in practice you reach it through either:
 *   (a) HelixPay's own GCash payment method (if HelixPay is your ticketing
 *       processor, this may already be covered — check with them first), or
 *   (b) a payment aggregator that supports GCash (e.g. PayMongo, Xendit,
 *       Maya Business, Adyen) using their documented GCash e-wallet source.
 *
 * This stub exists so the site has a real call site to swap in once you've
 * picked a path with your payments/finance director. It intentionally does
 * not guess at endpoint URLs it can't verify.
 */

export type GCashChargeRequest = {
  amount: number; // in PHP, whole pesos
  description: string;
  referenceId: string;
  redirectSuccessUrl: string;
  redirectFailureUrl: string;
};

export type GCashChargeResult = {
  redirectUrl: string;
  provider: "gcash-aggregator" | "mock";
};

export async function createGCashCharge(
  req: GCashChargeRequest
): Promise<GCashChargeResult> {
  const aggregatorKey = process.env.GCASH_AGGREGATOR_API_KEY;

  if (!aggregatorKey) {
    return {
      redirectUrl: `/checkout/mock?method=gcash&ref=${req.referenceId}`,
      provider: "mock",
    };
  }

  // --- Real integration (fill in once a payments aggregator is chosen) ---
  // const res = await fetch("https://<aggregator-endpoint-from-their-docs>", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${aggregatorKey}`,
  //   },
  //   body: JSON.stringify({
  //     type: "gcash",
  //     amount: req.amount * 100, // most aggregators expect centavos
  //     currency: "PHP",
  //     description: req.description,
  //     redirect: {
  //       success: req.redirectSuccessUrl,
  //       failed: req.redirectFailureUrl,
  //     },
  //   }),
  // });
  // const data = await res.json();
  // return { redirectUrl: data.redirect_url ?? data.checkout_url, provider: "gcash-aggregator" };

  throw new Error(
    "GCASH_AGGREGATOR_API_KEY is set but the real API call is not implemented yet — see lib/gcash.ts"
  );
}
