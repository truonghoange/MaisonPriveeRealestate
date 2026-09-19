export interface LeadPayload {
  fullName: string;
  phone: string;
  email?: string;
  residenceInterest?: string;
  message?: string;
  consent: boolean;
  companyWebsite?: string;
}

export type LeadField =
  "fullName" | "phone" | "email" | "residenceInterest" | "message" | "consent";

export type LeadFieldErrors = Partial<Record<LeadField, string>>;

export interface LeadSuccessResponse {
  ok: true;
  message: string;
  simulated?: boolean;
}

export interface LeadErrorResponse {
  ok: false;
  message: string;
  fieldErrors?: LeadFieldErrors;
}

export type LeadResponse = LeadSuccessResponse | LeadErrorResponse;
