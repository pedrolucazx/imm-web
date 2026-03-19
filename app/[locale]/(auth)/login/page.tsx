"use client";

import { Button, Input, PasswordInput } from "../../../../components/ui";
import { AuthCard } from "@/components/AuthCard";
import { useLogin } from "@/lib/hooks/useAuth";
import { useRouter } from "@/lib/navigation";
import { ROUTES } from "@/lib/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { s } from "./login.styles";
import { MIN_PASSWORD_LENGTH } from "@/lib/constants";

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const router = useRouter();
  const { mutate: login, isPending } = useLogin({
    onSuccess: () => router.push(ROUTES.APP_DAILY_LAB),
  });

  const loginSchema = useMemo(
    () =>
      z.object({
        email: z.email(t("emailInvalid")),
        password: z.string().min(MIN_PASSWORD_LENGTH, t("passwordMinLength")),
      }),
    [t]
  );

  type LoginForm = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm): void => {
    login(data);
  };

  return (
    <AuthCard
      title={t("title")}
      subtitle={t("subtitle")}
      footerText={t("noAccount")}
      footerLinkLabel={t("registerLink")}
      footerLinkHref={ROUTES.REGISTER}
    >
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack {...s.formStack}>
          <Input
            label={t("emailLabel")}
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            error={errors.email?.message}
            {...register("email")}
          />

          <PasswordInput
            label={t("passwordLabel")}
            autoComplete="current-password"
            placeholder={t("passwordPlaceholder")}
            error={errors.password?.message}
            {...register("password")}
          />

          <Button type="submit" loading={isPending} {...s.submitBtn}>
            {t("submit")}
          </Button>
        </VStack>
      </Box>
    </AuthCard>
  );
}
