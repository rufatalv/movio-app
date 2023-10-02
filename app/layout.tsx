import Header from "@/components/Header/Header";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Suspense } from "react";
import { SessionProvider } from "next-auth/react";

export const Helvetica = localFont({
  src: [
    {
      path: "./fonts/HelveticaNowDisplay-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNowDisplay-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/HelveticaNowDisplay-Bold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
});
import { NextUIProvider } from "@nextui-org/react";
import { Providers } from "@/components/providers";
import AuthProvider from "./AuthProvider";
import getCurrentUser from "@/actions/getCurrentUser";
import useAuth from "@/hooks/useAuth";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "movio.",
  description:
    "A new generation movie website which will give you the best experience of watching",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  useAuth.setState({
    user: currentUser!,
  });
  return (
    <html lang="en">
      <body className={Helvetica.className}>
        <Toaster />
        <Header currentUser={currentUser} />
        <Suspense fallback={<h1 className="pt-20">Loading...</h1>}>
          <Providers>
            <main className="relative min-h-screen z-[5] pt-20 bg-afw">
              {children}
            </main>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
