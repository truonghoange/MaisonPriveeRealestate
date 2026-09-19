"use client";

import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";

export default function ErrorPage({ retry }: { retry: () => void }) {
  return (
    <main className="section-tone-light bg-background text-foreground flex min-h-svh items-center py-(--section-space-md)">
      <Container>
        <p className="text-accent-text text-(length:--text-xs) tracking-[0.16em] uppercase">
          Maison Privée
        </p>
        <Heading as="h1" size="lg" className="mt-6 max-w-[15ch]">
          Đã xảy ra sự cố
        </Heading>
        <p className="text-muted mt-6 max-w-lg">
          Trang hiện chưa thể hiển thị. Vui lòng thử lại.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button onClick={retry}>Thử lại</Button>
          <Link href="/" className="text-(length:--text-sm)">
            Về trang chủ
          </Link>
        </div>
      </Container>
    </main>
  );
}
