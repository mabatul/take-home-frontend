"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ApprovedContent() {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("applicationId");
  const customerId = searchParams.get("customerId");
  const returning = searchParams.get("returning") === "1";

  return (
    <div className="w-full max-w-lg rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <svg
          className="h-6 w-6 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">
        {returning ? "Application updated" : "Application approved"}
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        {returning
          ? "Your existing application has been updated with the latest information."
          : "Congratulations! Your loan application has been approved."}
      </p>

      <dl className="mt-6 space-y-2 rounded-lg bg-gray-50 p-4 text-left text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-500">Application ID</dt>
          <dd className="font-mono text-gray-900">{applicationId ?? "-"}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Customer ID</dt>
          <dd className="font-mono text-gray-900">{customerId ?? "-"}</dd>
        </div>
      </dl>

      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Apply again
      </Link>
    </div>
  );
}

export default function ApprovedPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <Suspense
        fallback={
          <div className="w-full max-w-lg rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-200">
            Loading...
          </div>
        }
      >
        <ApprovedContent />
      </Suspense>
    </main>
  );
}
