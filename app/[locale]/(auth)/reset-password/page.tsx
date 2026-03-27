"use client";

import { useMemo, Suspense } from "react";
import { AuthCard } from "@/components/AuthCard";
import { useRouter } from "@/lib/navigation";
import { useSearchParams } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { useResetPassword } from "@/lib/hooks/useResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Box, Text, VStack } from "@chakra-ui/react";
import { Button, PasswordInput } from "@/components/ui";
import { s } from "./styles";
import { MIN_PASSWORD_LENGTH } from "@/lib/constants";

function ResetPasswordForm(): React.JSX.Element {
  const t = useTranslations("auth.resetPassword");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const tokenError = !token;

  const { mutate: resetPassword, isPending } = useResetPassword({
    onSuccess: () => router.push(ROUTES.LOGIN),
  });

  const schema = useMemo(
    () =>
      z
        .object({
          password: z.string().min(MIN_PASSWORD_LENGTH, t("passwordMinLength")),
          confirmPassword: z.string().min(MIN_PASSWORD_LENGTH, t("passwordMinLength")),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: t("confirmPasswordMismatch"),
          path: ["confirmPassword"],
        }),
    [t]
  );

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const passwordValue = watch("password") ?? "";

  const onSubmit = (data: FormData): void => {
    if (!token) return;
    resetPassword({ token, newPassword: data.password });
  };

  if (tokenError) {
    return (
      <AuthCard
        title={t("title")}
        subtitle=""
        footerText=""
        footerLinkLabel={t("backToForgotPassword")}
        footerLinkHref={ROUTES.FORGOT_PASSWORD}
      >
        <Box textAlign="center" py={4}>
          <Text color="error" mb={4}>
            {t("tokenInvalid")}
          </Text>
        </Box>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title={t("title")}
      subtitle={t("subtitle")}
      footerText=""
      footerLinkLabel={t("backToForgotPassword")}
      footerLinkHref={ROUTES.FORGOT_PASSWORD}
    >
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack {...s.formStack}>
          <PasswordInput
            label={t("passwordLabel")}
            autoComplete="new-password"
            placeholder={t("passwordPlaceholder")}
            error={errors.password?.message}
            passwordValue={passwordValue}
            {...register("password")}
          />

          <PasswordInput
            label={t("confirmPasswordLabel")}
            autoComplete="new-password"
            placeholder={t("confirmPasswordPlaceholder")}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button type="submit" loading={isPending} {...s.submitBtn}>
            {t("submit")}
          </Button>
        </VStack>
      </Box>
    </AuthCard>
  );
}

export default function ResetPasswordPage(): React.JSX.Element {
  const t = useTranslations("auth.resetPassword");

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
          <Text color="mutedFg">{t("loading")}</Text>
        </Box>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
