"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { LEAD_LIMITS, validateLeadPayload } from "@/lib/validations";
import type { LeadField, LeadFieldErrors, LeadResponse } from "@/types/lead";

export interface ResidenceInterestOption {
  value: string;
  label: string;
}

interface LeadFormProps {
  residenceOptions: readonly ResidenceInterestOption[];
  privacyNotice: string;
}

type SubmissionState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

const controlClassName =
  "border-border text-foreground placeholder:text-muted/70 focus:border-accent w-full border-0 border-b bg-transparent px-0 py-3 text-(length:--text-base) outline-none transition-colors duration-(--duration-fast) focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text";

function FieldError({
  field,
  message,
}: {
  field: LeadField;
  message?: string;
}) {
  if (!message) return null;

  return (
    <p id={`${field}-error`} className="mt-2 text-(length:--text-xs) leading-5">
      <span aria-hidden="true" className="text-accent-text mr-2">
        —
      </span>
      {message}
    </p>
  );
}

function isLeadResponse(value: unknown): value is LeadResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "ok" in value &&
    typeof value.ok === "boolean" &&
    "message" in value &&
    typeof value.message === "string"
  );
}

export function LeadForm({ residenceOptions, privacyNotice }: LeadFormProps) {
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [submission, setSubmission] = useState<SubmissionState>({
    kind: "idle",
  });
  const submittingRef = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const validation = validateLeadPayload({
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      residenceInterest: formData.get("residenceInterest"),
      message: formData.get("message"),
      consent: formData.get("consent") === "on",
      companyWebsite: formData.get("companyWebsite"),
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      setSubmission({
        kind: "error",
        message: "Vui lòng kiểm tra lại thông tin.",
      });
      const firstInvalid = Object.keys(validation.errors)[0] as
        LeadField | undefined;
      if (firstInvalid) {
        form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      }
      return;
    }

    submittingRef.current = true;
    setErrors({});
    setSubmission({ kind: "submitting" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const responseBody: unknown = await response.json().catch(() => null);

      if (!isLeadResponse(responseBody)) {
        setSubmission({
          kind: "error",
          message: "Không thể gửi yêu cầu lúc này. Vui lòng thử lại sau.",
        });
        return;
      }

      if (response.ok && responseBody.ok) {
        form.reset();
        setSubmission({ kind: "success", message: responseBody.message });
        return;
      }

      if (!responseBody.ok && responseBody.fieldErrors) {
        setErrors(responseBody.fieldErrors);
      }
      setSubmission({ kind: "error", message: responseBody.message });
    } catch {
      setSubmission({
        kind: "error",
        message: "Không thể kết nối. Vui lòng thử lại sau.",
      });
    } finally {
      submittingRef.current = false;
    }
  }

  const isSubmitting = submission.kind === "submitting";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-label="Yêu cầu Private Preview"
    >
      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <div>
          <label
            htmlFor="lead-full-name"
            className="block text-(length:--text-sm)"
          >
            Họ và tên <span className="text-accent-text">*</span>
          </label>
          <input
            id="lead-full-name"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            maxLength={LEAD_LIMITS.fullName}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={controlClassName}
          />
          <FieldError field="fullName" message={errors.fullName} />
        </div>

        <div>
          <label htmlFor="lead-phone" className="block text-(length:--text-sm)">
            Số điện thoại <span className="text-accent-text">*</span>
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={LEAD_LIMITS.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={controlClassName}
          />
          <FieldError field="phone" message={errors.phone} />
        </div>

        <div>
          <label htmlFor="lead-email" className="block text-(length:--text-sm)">
            Email{" "}
            <span className="text-muted text-(length:--text-xs)">
              (không bắt buộc)
            </span>
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={LEAD_LIMITS.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={controlClassName}
          />
          <FieldError field="email" message={errors.email} />
        </div>

        <div>
          <label
            htmlFor="lead-residence"
            className="block text-(length:--text-sm)"
          >
            Loại căn quan tâm{" "}
            <span className="text-muted text-(length:--text-xs)">
              (không bắt buộc)
            </span>
          </label>
          <select
            id="lead-residence"
            name="residenceInterest"
            defaultValue=""
            aria-invalid={Boolean(errors.residenceInterest)}
            aria-describedby={
              errors.residenceInterest ? "residenceInterest-error" : undefined
            }
            className={`${controlClassName} cursor-pointer`}
          >
            <option value="" className="text-(--color-navy-950)">
              Chưa lựa chọn
            </option>
            {residenceOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="text-(--color-navy-950)"
              >
                {option.label}
              </option>
            ))}
          </select>
          <FieldError
            field="residenceInterest"
            message={errors.residenceInterest}
          />
        </div>
      </div>

      <div className="mt-9">
        <label htmlFor="lead-message" className="block text-(length:--text-sm)">
          Lời nhắn{" "}
          <span className="text-muted text-(length:--text-xs)">
            (không bắt buộc)
          </span>
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={4}
          maxLength={LEAD_LIMITS.message}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${controlClassName} resize-y`}
        />
        <FieldError field="message" message={errors.message} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute size-px overflow-hidden opacity-0"
      >
        <label htmlFor="lead-company-website">Website công ty</label>
        <input
          id="lead-company-website"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          maxLength={LEAD_LIMITS.honeypot}
        />
      </div>

      <div className="mt-8">
        <label className="flex cursor-pointer items-start gap-3 text-(length:--text-sm) leading-6">
          <input
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="border-control-border mt-1 size-4 shrink-0 accent-(--color-champagne-500)"
          />
          <span>Tôi đồng ý để đơn vị tư vấn liên hệ về yêu cầu này.</span>
        </label>
        <FieldError field="consent" message={errors.consent} />
        <p className="text-muted mt-3 text-(length:--text-xs) leading-5">
          {privacyNotice}
        </p>
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
        </Button>
        <div
          aria-live="polite"
          aria-atomic="true"
          className="min-h-6 flex-1 text-(length:--text-sm) leading-6"
        >
          {submission.kind === "success" || submission.kind === "error" ? (
            <p role={submission.kind === "error" ? "alert" : "status"}>
              {submission.message}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
