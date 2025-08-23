import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe - AJC",
  description: "Subscribe to Georgia's most trusted news source",
};

export default function SubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      {children}
    </div>
  );
}