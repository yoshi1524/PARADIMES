import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata = { title: "Sign In | Parallel Dimensions" };

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-5 py-20 md:px-8">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
