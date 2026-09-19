import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Heading } from "@/components/ui/Heading";
import { site } from "@/config/site";

export default function NotFound() {
  return (
    <main className="section-tone-light bg-background text-foreground flex min-h-svh items-center py-(--section-space-md)">
      <Container>
        <p className="text-accent-text text-(length:--text-xs) tracking-[0.16em] uppercase">
          {site.name} · 404
        </p>
        <Heading as="h1" size="lg" className="mt-6 max-w-[14ch]">
          Không tìm thấy trang
        </Heading>
        <p className="text-muted mt-6 max-w-lg">
          Đường dẫn bạn mở không tồn tại.
        </p>
        <Link
          href="/"
          className="border-foreground mt-10 inline-flex min-h-11 items-center border-b text-(length:--text-sm) no-underline"
        >
          Về trang chủ
        </Link>
      </Container>
    </main>
  );
}
