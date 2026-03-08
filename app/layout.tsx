import { Toaster } from "../components/ui/toaster";
import { Providers } from "@/providers/Providers";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Inside My Mind",
  description: "A habit tracking and AI-powered journaling SaaS",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={spaceGrotesk.variable}>
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
