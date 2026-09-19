import Image from "next/image";

import { consultant } from "@/data/consultant";
import { contactContent } from "@/data/contact";
import { getConsultantActions, hasApprovedConsultantName } from "@/lib/contact";

export function ConsultantProfile() {
  const actions = getConsultantActions(consultant);
  const showName = hasApprovedConsultantName(consultant);
  const hasProfile =
    showName || actions.length > 0 || Boolean(consultant.qrImage);

  return (
    <div className="border-border border-t pt-7">
      <p className="text-accent-text text-(length:--text-xs) font-medium tracking-[0.16em] uppercase">
        Tư vấn dự án
      </p>

      {hasProfile ? (
        <div className="mt-5 grid gap-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div>
            {showName ? (
              <p className="font-[family-name:var(--font-serif)] text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2]">
                {consultant.name}
              </p>
            ) : null}
            {consultant.role ? (
              <p className="text-muted mt-2 text-(length:--text-sm) leading-6">
                {consultant.role}
              </p>
            ) : null}
            {actions.length ? (
              <ul className="border-border mt-6 max-w-md border-t">
                {actions.map((action) => (
                  <li key={action.kind} className="border-border border-b py-3">
                    <a
                      href={action.href}
                      {...(action.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-center justify-between gap-4 no-underline"
                    >
                      <span className="text-accent-text text-(length:--text-xs) tracking-[0.12em] uppercase">
                        {action.label}
                      </span>
                      <span className="text-(length:--text-sm) group-hover:underline">
                        {action.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {consultant.qrImage ? (
            <Image
              src={consultant.qrImage}
              alt={`Mã QR liên hệ ${showName ? consultant.name : "tư vấn dự án"}`}
              width={144}
              height={144}
              className="bg-(--color-ivory-50) p-2"
            />
          ) : null}
        </div>
      ) : (
        <p className="text-muted mt-5 max-w-[28rem] text-(length:--text-sm) leading-7">
          {contactContent.consultantUnavailable}
        </p>
      )}
    </div>
  );
}
