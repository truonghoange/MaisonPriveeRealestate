import { LEAD_LIMITS, validateLeadPayload } from "@/lib/validations";
import type { LeadErrorResponse, LeadSuccessResponse } from "@/types/lead";

const SUCCESS_MESSAGE = "Cảm ơn bạn. Yêu cầu đã được ghi nhận.";
const UNAVAILABLE_MESSAGE =
  "Hiện chưa thể gửi yêu cầu. Vui lòng liên hệ trực tiếp.";

const responseHeaders = {
  "Cache-Control": "no-store",
};

function errorResponse(
  message: string,
  status: number,
  fieldErrors?: LeadErrorResponse["fieldErrors"],
) {
  return Response.json(
    { ok: false, message, ...(fieldErrors ? { fieldErrors } : {}) },
    { status, headers: responseHeaders },
  );
}

async function readLimitedBody(request: Request): Promise<string | null> {
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > LEAD_LIMITS.requestBytes) {
      await reader.cancel().catch(() => undefined);
      return null;
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export async function POST(request: Request) {
  const contentType = request.headers
    .get("content-type")
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase();
  if (contentType !== "application/json") {
    return errorResponse("Yêu cầu phải ở định dạng JSON.", 415);
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > LEAD_LIMITS.requestBytes) {
    return errorResponse("Dữ liệu gửi lên quá lớn.", 413);
  }

  let rawBody: string;
  try {
    const body = await readLimitedBody(request);
    if (body === null) {
      return errorResponse("Dữ liệu gửi lên quá lớn.", 413);
    }
    rawBody = body;
  } catch {
    return errorResponse("Không thể đọc yêu cầu.", 400);
  }

  let input: unknown;
  try {
    input = JSON.parse(rawBody);
  } catch {
    return errorResponse("Dữ liệu gửi lên không hợp lệ.", 400);
  }

  const validation = validateLeadPayload(input);

  // Silently absorb likely bot submissions without forwarding any data.
  if (validation.data.companyWebsite) {
    const response: LeadSuccessResponse = {
      ok: true,
      message: SUCCESS_MESSAGE,
    };
    return Response.json(response, { status: 200, headers: responseHeaders });
  }

  if (!validation.valid) {
    return errorResponse(
      "Vui lòng kiểm tra lại thông tin.",
      422,
      validation.errors,
    );
  }

  const webhookUrl = process.env.CRM_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    if (process.env.NODE_ENV === "development") {
      const response: LeadSuccessResponse = {
        ok: true,
        message: `${SUCCESS_MESSAGE} (Mô phỏng trong môi trường phát triển.)`,
        simulated: true,
      };
      return Response.json(response, {
        status: 200,
        headers: responseHeaders,
      });
    }

    return errorResponse(UNAVAILABLE_MESSAGE, 503);
  }

  const lead = {
    fullName: validation.data.fullName,
    phone: validation.data.phone,
    email: validation.data.email,
    residenceInterest: validation.data.residenceInterest,
    message: validation.data.message,
    consent: validation.data.consent,
  };

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        source: "maison-privee-website",
        submittedAt: new Date().toISOString(),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (!upstream.ok) {
      return errorResponse(UNAVAILABLE_MESSAGE, 502);
    }
  } catch {
    return errorResponse(UNAVAILABLE_MESSAGE, 502);
  }

  const response: LeadSuccessResponse = {
    ok: true,
    message: SUCCESS_MESSAGE,
  };
  return Response.json(response, { status: 200, headers: responseHeaders });
}
