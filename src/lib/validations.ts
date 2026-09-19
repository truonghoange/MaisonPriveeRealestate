import { residences } from "@/data/residences";
import type { LeadFieldErrors, LeadPayload } from "@/types/lead";

export const LEAD_LIMITS = {
  fullName: 100,
  phone: 30,
  email: 254,
  residenceInterest: 80,
  message: 1000,
  honeypot: 200,
  requestBytes: 16_384,
} as const;

const validResidenceIds = new Set<string>(
  residences.map((residence) => residence.id),
);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneCharactersPattern = /^[+()\d.\s-]+$/;

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export interface LeadValidationResult {
  valid: boolean;
  data: LeadPayload;
  errors: LeadFieldErrors;
}

export function validateLeadPayload(input: unknown): LeadValidationResult {
  const source =
    typeof input === "object" && input !== null
      ? (input as Record<string, unknown>)
      : {};
  const data: LeadPayload = {
    fullName: readString(source.fullName),
    phone: readString(source.phone),
    email: readString(source.email) || undefined,
    residenceInterest: readString(source.residenceInterest) || undefined,
    message: readString(source.message) || undefined,
    consent: source.consent === true,
    companyWebsite: readString(source.companyWebsite) || undefined,
  };
  const errors: LeadFieldErrors = {};

  if (data.fullName.length < 2) {
    errors.fullName = "Vui lòng nhập họ và tên.";
  } else if (data.fullName.length > LEAD_LIMITS.fullName) {
    errors.fullName = `Họ và tên không được vượt quá ${LEAD_LIMITS.fullName} ký tự.`;
  }

  const phoneDigits = data.phone.replace(/\D/g, "");
  if (!data.phone) {
    errors.phone = "Vui lòng nhập số điện thoại.";
  } else if (
    data.phone.length > LEAD_LIMITS.phone ||
    !phoneCharactersPattern.test(data.phone) ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15
  ) {
    errors.phone = "Số điện thoại chưa đúng định dạng.";
  }

  if (
    data.email &&
    (data.email.length > LEAD_LIMITS.email || !emailPattern.test(data.email))
  ) {
    errors.email = "Email chưa đúng định dạng.";
  }

  if (
    data.residenceInterest &&
    (!validResidenceIds.has(data.residenceInterest) ||
      data.residenceInterest.length > LEAD_LIMITS.residenceInterest)
  ) {
    errors.residenceInterest = "Loại căn quan tâm không hợp lệ.";
  }

  if (data.message && data.message.length > LEAD_LIMITS.message) {
    errors.message = `Lời nhắn không được vượt quá ${LEAD_LIMITS.message} ký tự.`;
  }

  if (!data.consent) {
    errors.consent = "Vui lòng đồng ý để chúng tôi liên hệ tư vấn.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    data,
    errors,
  };
}
