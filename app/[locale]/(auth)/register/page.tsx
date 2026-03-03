"use client";

import { Button, Input, PasswordInput, PasswordStrengthMeter, toaster } from "@/components/ui";
import { useRegister } from "@/lib/hooks/useAuth";
import { Link, useRouter } from "@/lib/navigation";
import { Box, Field, Heading, Text, chakra } from "@chakra-ui/react";
import { passwordStrength } from "check-password-strength";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { s, brandLinkStyle, footerLinkStyle } from "./register.styles";

const LANGUAGES = [
  { value: "pt-BR", label: "Português", flag: "🇧🇷" },
  { value: "en-US", label: "English", flag: "🇺🇸" },
  { value: "es-ES", label: "Español", flag: "🇪🇸" },
] as const;

type UILanguage = (typeof LANGUAGES)[number]["value"];

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  uiLanguage: UILanguage;
}

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const tc = useTranslations("common");
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();

  const {
    register: registerField,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({ defaultValues: { uiLanguage: "pt-BR" } });

  const selectedLang = watch("uiLanguage");
  const passwordValue = watch("password") ?? "";
  const passwordStrengthLevel = useMemo(() => {
    if (!passwordValue) return 0;
    return passwordStrength(passwordValue).id;
  }, [passwordValue]);

  const onSubmit = (data: RegisterForm) => {
    register(data, {
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

            <Box as="form" onSubmit={handleSubmit(onSubmit)}>
              <Box {...s.formStack}>
                <Field.Root invalid={!!errors.name}>
                  <Field.Label>{t("nameLabel")}</Field.Label>
                  <Input
                    type="text"
                    placeholder={t("namePlaceholder")}
                    {...registerField("name", {
                      required: t("nameRequired"),
                      minLength: {
                        value: 2,
                        message: t("nameMinLength"),
                      },
                    })}
                  />
                  <Box h="1.25rem" mt={1}>
                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                  </Box>
                </Field.Root>

                <Field.Root invalid={!!errors.email}>
                  <Field.Label>{t("emailLabel")}</Field.Label>
                  <Input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    {...registerField("email", {
                      required: t("emailRequired"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("emailInvalid"),
                      },
                    })}
                  />
                  <Box h="1.25rem" mt={1}>
                    <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                  </Box>
                </Field.Root>

                <Field.Root invalid={!!errors.password}>
                  <Field.Label>{t("passwordLabel")}</Field.Label>
                  <PasswordInput
                    placeholder={t("passwordPlaceholder")}
                    {...registerField("password", {
                      required: t("passwordRequired"),
                      minLength: {
                        value: 6,
                        message: t("passwordMinLength"),
                      },
                    })}
                  />
                  <Box mt={1} position="relative" w="full">
                    <PasswordStrengthMeter
                      value={passwordStrengthLevel + 1}
                      max={4}
                      w="full"
                      opacity={passwordValue.length > 0 && !errors.password ? 1 : 0}
                    />
                    <Field.ErrorText position="absolute" top={0} left={0} lineHeight="1.25rem">
                      {errors.password?.message}
                    </Field.ErrorText>
                  </Box>
                </Field.Root>

                <Box>
                  <Text
                    fontSize="sm"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    mb={2}
                  >
                    {t("languageLabel")}
                  </Text>
                  <Box {...s.langGrid}>
                    {LANGUAGES.map((lang) => (
                      <chakra.button
                        key={lang.value}
                        type="button"
                        {...s.langBtn}
                        bg={selectedLang === lang.value ? "primary" : "card"}
                        aria-pressed={selectedLang === lang.value}
                        onClick={() => setValue("uiLanguage", lang.value)}
                      >
                        <Text {...s.langFlag}>{lang.flag}</Text>
                        {lang.label}
                      </chakra.button>
                    ))}
                  </Box>
                </Box>

                <Button type="submit" loading={isPending} {...s.submitBtn}>
                  {t("submit")}
                </Button>
              </Box>
            </Box>

            <Text {...s.footerText}>
              {t("hasAccount")}{" "}
              <Link href="/login" style={footerLinkStyle}>
                {t("loginLink")}
              </Link>
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
