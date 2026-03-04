"use client";

import {
  Button,
  Input,
  PasswordInput,
  toaster,
  type StrengthLevel,
} from "../../../../components/ui";
import { useRegister } from "@/lib/hooks/useAuth";
import { Link, useRouter } from "@/lib/navigation";
import { Box, Heading, Text, chakra } from "@chakra-ui/react";
import { passwordStrength } from "check-password-strength";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { s, brandLinkStyle, footerLinkStyle } from "./register.styles";

const LANGUAGES = [
  { value: "pt-BR", label: "Português", flag: "🇧🇷" },
  { value: "en-US", label: "English", flag: "🇺🇸" },
  { value: "es-ES", label: "Español", flag: "🇪🇸" },
] as const;

const LANG_KEY_INDEX: Record<string, (_i: number) => number> = {
  ArrowRight: (i) => (i + 1) % LANGUAGES.length,
  ArrowDown: (i) => (i + 1) % LANGUAGES.length,
  ArrowLeft: (i) => (i - 1 + LANGUAGES.length) % LANGUAGES.length,
  ArrowUp: (i) => (i - 1 + LANGUAGES.length) % LANGUAGES.length,
  Home: (_i) => 0,
  End: (_i) => LANGUAGES.length - 1,
};

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
  const locale = useLocale();
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();

  const defaultUiLanguage: UILanguage = LANGUAGES.some((l) => l.value === locale)
    ? (locale as UILanguage)
    : "en-US";

  const {
    register: registerField,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({ defaultValues: { uiLanguage: defaultUiLanguage } });

  const selectedLang = watch("uiLanguage");
  const passwordValue = watch("password") ?? "";
  const langGroupRef = useRef<HTMLDivElement>(null);

  const handleLangKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const getIndex = LANG_KEY_INDEX[e.key];
      if (!getIndex) return;
      e.preventDefault();
      const targetIndex = getIndex(index);
      setValue("uiLanguage", LANGUAGES[targetIndex].value);
      const radios = langGroupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
      radios?.[targetIndex]?.focus();
    },
    [setValue]
  );
  const passwordStrengthLevel = useMemo(() => {
    if (!passwordValue) return 0;
    return passwordStrength(passwordValue).id;
  }, [passwordValue]);

  const strengthLevels: StrengthLevel[] = useMemo(
    () => [
      { label: t("strengthVeryWeak"), color: "hsl(0, 84%, 60%)" },
      { label: t("strengthWeak"), color: "hsl(30, 100%, 55%)" },
      { label: t("strengthGood"), color: "hsl(54, 100%, 45%)" },
      { label: t("strengthStrong"), color: "hsl(152, 100%, 40%)" },
    ],
    [t]
  );

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
                <Input
                  label={t("nameLabel")}
                  type="text"
                  placeholder={t("namePlaceholder")}
                  error={errors.name?.message}
                  {...registerField("name", {
                    required: t("nameRequired"),
                    minLength: { value: 2, message: t("nameMinLength") },
                  })}
                />

                <Input
                  label={t("emailLabel")}
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  error={errors.email?.message}
                  {...registerField("email", {
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
                  strengthValue={passwordStrengthLevel + 1}
                  strengthLevels={strengthLevels}
                  showStrength={passwordValue.length > 0 && !errors.password}
                  {...registerField("password", {
                    required: t("passwordRequired"),
                    minLength: { value: 6, message: t("passwordMinLength") },
                  })}
                />

                <Box>
                  <Text
                    id="register-language-label"
                    fontSize="sm"
                    fontWeight="700"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    mb={2}
                  >
                    {t("languageLabel")}
                  </Text>
                  <Box
                    ref={langGroupRef}
                    role="radiogroup"
                    aria-labelledby="register-language-label"
                    {...s.langGrid}
                  >
                    {LANGUAGES.map((lang, index) => (
                      <chakra.button
                        key={lang.value}
                        type="button"
                        role="radio"
                        {...s.langBtn}
                        bg={selectedLang === lang.value ? "primary" : "card"}
                        aria-checked={selectedLang === lang.value}
                        tabIndex={selectedLang === lang.value ? 0 : -1}
                        onClick={() => setValue("uiLanguage", lang.value)}
                        onKeyDown={(e) => handleLangKeyDown(e, index)}
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
