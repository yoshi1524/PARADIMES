import { Suspense } from "react";
import StaffLoginForm from "@/components/StaffLoginForm";

export const metadata = { title: "Staff Access | Parallel Dimensions" };

// Intentionally not linked anywhere on the public site (no nav/footer
// link) — reachable only by typing this URL directly, or via a link the
// company shares internally with its own staff. Public visitors, clients,
// and customers should never see this route advertised.
export default function StaffAccessPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-5 py-20 md:px-8">
      <Suspense fallback={null}>
        <StaffLoginForm />
      </Suspense>
    </div>
  );
}
