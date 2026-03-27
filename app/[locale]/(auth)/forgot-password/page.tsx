"use client";

import { useMemo } from "react";
import { AuthCard } from "@/components/AuthCard";
import { ROUTES } from "@/lib/routes";
import { useForgotPassword } from "@/lib/hooks/useForgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Box, VStack } from "@chakra-ui/react";
import { Button, Input } from "@/components/ui";
import { s } from "./styles";

export default function ForgotPasswordPage(): React.JSX.Element {
  const t = useTranslations("auth.forgotPassword");
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();

  const schema = useMemo(
    () =>
      z.object({
        email: z.string().trim().min(1, t("emailRequired")).email(t("emailInvalid")),
      }),
    [t]
  );

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData): void => {
    forgotPassword(data.email);
  };

  if (isSuccess) {
    return (
      <AuthCard
        title={t("successTitle")}
        subtitle={t("successDesc")}
        footerText=""
        footerLinkLabel={t("backToLogin")}
        footerLinkHref={ROUTES.LOGIN}
      >
        <Box {...s.successSpacer} />
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title={t("title")}
      subtitle={t("subtitle")}
      footerText=""
      footerLinkLabel={t("backToLogin")}
      footerLinkHref={ROUTES.LOGIN}
    >
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack {...s.formStack}>
          <Input
            label={t("emailLabel")}
            type="email"
            autoComplete="email"
            spellCheck={false}
            placeholder={t("emailPlaceholder")}
            error={errors.email?.message}
            {...register("email")}
          />

          <Button type="submit" loading={isPending} {...s.submitBtn}>
            {t("submit")}
          </Button>
        </VStack>
      </Box>
    </AuthCard>
  );
}
