import type React from "react";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { SubscriptionProvider } from "@/lib/subscription-context";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AJC Onboarding",
  description: "Flow for AJC subscriber onboarding and personaliztion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={workSans.variable}>
      <head>
        <style>{`
html {
  font-family: ${workSans.style.fontFamily};
  --font-sans: ${workSans.style.fontFamily};
}
        `}</style>
      </head>
      <body>
        <SubscriptionProvider>{children}</SubscriptionProvider>
      </body>
    </html>
  );
}
