import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LandingClient } from "./LandingClient";

const BASE_URL = (process.env.NEXT_PUBLIC_APP_URL ?? "https://insidemymind.app").replace(/\/$/, "");

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function LandingPage() {
  return <LandingClient />;
}
