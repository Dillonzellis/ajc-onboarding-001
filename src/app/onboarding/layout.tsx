import type React from "react";
import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { UserProvider } from "@/lib/user-context";

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
        <UserProvider>
          <main className="min-h-screen w-full bg-[#282828] font-sans px-5 md:px-0 relative">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-8"
              style={{ backgroundImage: "url('/atlanta-skyline.png')" }}
            ></div>

            <div className="z-20">{children}</div>
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
