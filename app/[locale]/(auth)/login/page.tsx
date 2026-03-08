"use client";

import { Button, Input, PasswordInput } from "../../../../components/ui";
import { AuthCard } from "@/components/AuthCard";
import { useLogin } from "@/lib/hooks/useAuth";
import { useRouter } from "@/lib/navigation";
import { ROUTES } from "@/lib/routes";
import { Box } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { s } from "./login.styles";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const router = useRouter();
  const { mutate: login, isPending } = useLogin({
    onSuccess: () => router.push(ROUTES.APP),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

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
        <Box {...s.formStack}>
          <Input
            label={t("emailLabel")}
            type="email"
            placeholder={t("emailPlaceholder")}
            error={errors.email?.message}
            {...register("email", {
              required: t("emailRequired"),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t("emailInvalid"),
              },
            })}
          />

          <PasswordInput
            label={t("passwordLabel")}
            placeholder={t("passwordPlaceholder")}
            error={errors.password?.message}
            {...register("password", {
              required: t("passwordRequired"),
              minLength: { value: 6, message: t("passwordMinLength") },
            })}
          />

          <Button type="submit" loading={isPending} {...s.submitBtn}>
            {t("submit")}
          </Button>
        </Box>
      </Box>
    </AuthCard>
  );
}
