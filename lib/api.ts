import { ApplicationDto, LoanResponse } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5175";

export async function submitApplication(
  data: ApplicationDto
): Promise<LoanResponse> {
  const response = await fetch(`${API_URL}/api/Loan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}
