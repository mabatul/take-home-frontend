"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function DeniedContent() {
  const searchParams = useSearchParams();
  const reason =
    searchParams.get("reason") ?? "Your application could not be approved.";

  return (
    <div className="w-full max-w-lg rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <svg
          className="h-6 w-6 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Application denied</h1>
      <p className="mt-2 text-sm text-gray-600">{reason}</p>

      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Try again
      </Link>
    </div>
  );
}

export default function DeniedPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <Suspense
        fallback={
          <div className="w-full max-w-lg rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200">
            Loading...
          </div>
        }
      >
        <DeniedContent />
      </Suspense>
    </main>
  );
}
