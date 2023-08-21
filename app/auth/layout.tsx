"use client";

import ClientOnly from "../ClientOnly";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientOnly>{children}</ClientOnly>;
}
