import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/lib/navigation";
import { LandingClient } from "./LandingClient";

const BASE_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://insidemymind.app").replace(/\/$/, "");

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "landing.seo" });

  const title = t("title");
  const description = t("description");
  const pageUrl = `${BASE_URL}/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
      languages: {
        "pt-BR": `${BASE_URL}/pt-BR`,
        "en-US": `${BASE_URL}/en-US`,
        "es-ES": `${BASE_URL}/es-ES`,
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Inside My Mind",
      locale: locale.replace("-", "_"),
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return <LandingClient locale={locale} />;
}
