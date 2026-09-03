"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Field } from "@/components/Field";
import { StateSelect } from "@/components/StateSelect";
import { submitApplication } from "@/lib/api";
import { ApplicationDto } from "@/lib/types";
import { STATE_CODES } from "@/lib/states";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  state: z
    .string()
    .refine((v) => STATE_CODES.includes(v.toUpperCase()), "Select a valid US state"),
  companyName: z.string().min(1, "Company name is required"),
  requestedAmount: z
    .number()
    .positive("Amount must be greater than 0"),
  ssn: z
    .string()
    .regex(/^\d{3}-\d{2}-\d{4}$/, "Format must be XXX-XX-XXXX"),
});

type FormValues = z.infer<typeof schema>;

export function ApplicationForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    setSubmitError(null);

    const payload: ApplicationDto = {
      ...values,
      requestedAmount: Number(values.requestedAmount),
    };

    try {
      const result = await submitApplication(payload);
      if (result.status === "Denied") {
        router.push(`/denied?reason=${encodeURIComponent(result.reason ?? "")}`);
      } else {
        router.push(
          `/approved?applicationId=${result.applicationId}&customerId=${result.customerId}&returning=${
            result.isReturningCustomer ? "1" : "0"
          }`
        );
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="First name"
          placeholder="John"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <Field
          label="Last name"
          placeholder="Doe"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
      </div>

      <Field
        label="Address"
        placeholder="123 Main St"
        error={errors.address?.message}
        {...register("address")}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <StateSelect
              label="State"
              error={errors.state?.message}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Field
          label="Company name"
          placeholder="Acme Corp"
          error={errors.companyName?.message}
          {...register("companyName")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Requested amount ($)"
          type="number"
          min={0}
          step="0.01"
          placeholder="5000"
          error={errors.requestedAmount?.message}
          {...register("requestedAmount", { valueAsNumber: true })}
        />
        <Field
          label="SSN"
          type="text"
          placeholder="123-45-6789"
          error={errors.ssn?.message}
          {...register("ssn")}
        />
      </div>

      {submitError && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit application"}
      </button>
    </form>
  );
}
