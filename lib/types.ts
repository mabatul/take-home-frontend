export interface ApplicationDto {
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  companyName: string;
  requestedAmount: number;
  ssn: string;
}

export interface LoanResponse {
  status: "Approved" | "Denied";
  reason?: string;
  customerId?: string;
  applicationId?: string;
  isReturningCustomer?: boolean;
}
