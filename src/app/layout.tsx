import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inside My Mind",
  description: "A habit tracking and AI-powered journaling SaaS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
