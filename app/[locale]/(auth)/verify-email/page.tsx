"use client";

import { useEffect, Suspense } from "react";
import { AuthCard } from "@/components/AuthCard";
import { useRouter } from "@/lib/navigation";
import { useSearchParams } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { useVerifyEmail } from "@/lib/hooks/useVerifyEmail";
import { useTranslations } from "next-intl";
import { Box, Text } from "@chakra-ui/react";

function VerifyEmailContent(): React.JSX.Element {
  const t = useTranslations("auth.verifyEmail");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    mutate: verifyEmail,
    isError,
    isSuccess,
  } = useVerifyEmail({
    onSuccess: () => router.push(ROUTES.APP_DAILY_LAB),
  });

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token, verifyEmail]);

  if (!token || isError) {
    return (
      <AuthCard
        title={t("errorTitle")}
        subtitle=""
        footerText=""
        footerLinkLabel={t("backToRegister")}
        footerLinkHref={ROUTES.REGISTER}
      >
        <Box textAlign="center" py={4}>
          <Text color="error">{t("errorDesc")}</Text>
        </Box>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title={isSuccess ? t("successTitle") : t("verifyingTitle")}
      subtitle=""
      footerText=""
      footerLinkLabel={t("backToLogin")}
      footerLinkHref={ROUTES.LOGIN}
    >
      <Box textAlign="center" py={4}>
        <Text color="mutedFg">{isSuccess ? t("successDesc") : t("verifyingDesc")}</Text>
      </Box>
    </AuthCard>
  );
}

export default function VerifyEmailPage(): React.JSX.Element {
  const t = useTranslations("auth.verifyEmail");

  return (
    <Suspense
      fallback={
        <Box
          minH="100vh"
          bg="canvas"
          role="status"
          aria-live="polite"
          display="grid"
          placeItems="center"
        >
          <Text color="mutedFg">{t("verifyingDesc")}</Text>
        </Box>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
