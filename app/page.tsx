import { ApplicationForm } from "@/components/ApplicationForm";

export default function HomePage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl">
        <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <h1 className="mb-1 text-2xl font-bold text-gray-900">
            Apply for a loan
          </h1>
          <p className="mb-6 text-sm text-gray-500">
            Fill in your details below. Your application will be reviewed
            automatically.
          </p>
          <ApplicationForm />
        </div>
      </div>
    </main>
  );
}
