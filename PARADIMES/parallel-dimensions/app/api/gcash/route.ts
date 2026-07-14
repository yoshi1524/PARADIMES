import { NextRequest, NextResponse } from "next/server";
import { createGCashCharge } from "@/lib/gcash";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount, description, referenceId } = body ?? {};

  if (!amount || !description || !referenceId) {
    return NextResponse.json(
      { error: "Missing one of: amount, description, referenceId." },
      { status: 400 }
    );
  }

  const origin = req.nextUrl.origin;

  try {
    const result = await createGCashCharge({
      amount: Number(amount),
      description,
      referenceId,
      redirectSuccessUrl: `${origin}/checkout/success?ref=${referenceId}`,
      redirectFailureUrl: `${origin}/checkout/failed?ref=${referenceId}`,
    });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "GCash charge failed." },
      { status: 500 }
    );
  }
}
