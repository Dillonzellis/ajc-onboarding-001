import type React from "react";
import type { Metadata } from "next";

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
    <main className="min-h-screen w-full bg-[#282828] font-sans px-5 md:px-0 relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-8"
        style={{ backgroundImage: "url('/atlanta-skyline.png')" }}
      ></div>
      <div className="z-20">{children}</div>
    </main>
  );
}
