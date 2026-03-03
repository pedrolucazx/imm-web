"use client";

import { Button, Input, PasswordInput, toaster } from "../../../../components/ui";
import { useLogin } from "@/lib/hooks/useAuth";
import { Link, useRouter } from "@/lib/navigation";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { s, brandLinkStyle, footerLinkStyle } from "./login.styles";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const tc = useTranslations("common");
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    login(data, {
      onSuccess: () => {
        toaster.create({
          title: t("toastSuccessTitle"),
          description: t("toastSuccessDesc"),
          type: "success",
          meta: { closable: true },
        });
        router.push("/app");
      },
      onError: (error) => {
        toaster.create({
          title: t("toastErrorTitle"),
          description: error.message || t("toastErrorDesc"),
          type: "error",
          meta: { closable: true },
        });
      },
    });
  };

  return (
    <Box {...s.pageWrapper}>
      <Box {...s.inner}>
        <Box {...s.brandWrapper}>
          <Link href="/" style={brandLinkStyle}>
            <Heading {...s.brandHeading}>
              <Box {...s.brandFlex}>🧠 {tc("appName")}</Box>
            </Heading>
          </Link>
        </Box>

        <Box {...s.card}>
          <Box {...s.cardStack}>
            <Box>
              <Heading {...s.cardTitle}>{t("title")}</Heading>
              <Text {...s.cardSubtitle}>{t("subtitle")}</Text>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
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
            </form>

            <Text {...s.footerText}>
              {t("noAccount")}{" "}
              <Link href="/register" style={footerLinkStyle}>
                {t("registerLink")}
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
