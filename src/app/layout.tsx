import type { Metadata } from "next";
import { Providers } from "@/providers/ChakraProvider";

export const metadata: Metadata = {
  title: "Inside My Mind",
  description: "A habit tracking and AI-powered journaling SaaS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
