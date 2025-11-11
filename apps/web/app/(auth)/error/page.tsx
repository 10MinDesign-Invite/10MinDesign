"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error") || "Access Denied";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-6">
          {error === "OAuthAccountNotLinked"
            ? "This email is already linked with a different sign-in method. Please use the same login method you used earlier."
            : "Something went wrong during authentication. Please try again. OR Remember your SignUp method GOOGLE OR EMAIL"}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.back()}
            className="px-5 py-2.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Go Back
          </button>

          <Link
            href="/login"
            className="px-5 py-2.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Need help?{" "}
        <a
          href="mailto:10mindesign.invite@gmail.com"
          className="text-blue-600 hover:underline"
        >
          Contact Support
        </a>
      </p>
    </div>
  );
}
