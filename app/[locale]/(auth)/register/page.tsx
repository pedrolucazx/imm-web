"use client";

import { Button, Input, PasswordInput } from "../../../../components/ui";
import { AuthCard } from "@/components/AuthCard";
import { LanguageSelector, LANGUAGES, type UILanguage } from "@/components/LanguageSelector";
import { useRegister } from "@/lib/hooks/useAuth";
import { useRouter } from "@/lib/navigation";
import { ROUTES } from "@/lib/routes";
import { Box } from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { s } from "./register.styles";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  uiLanguage: UILanguage;
}

export default function RegisterPage(): React.JSX.Element {
  const t = useTranslations("auth.register");
  const locale = useLocale();
  const router = useRouter();
  const { mutate: register, isPending } = useRegister({
    onSuccess: () => router.push(ROUTES.APP),
  });

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

  const onSubmit = (data: RegisterForm): void => {
    register(data);
  };

  return (
    <AuthCard
      title={t("title")}
      subtitle={t("subtitle")}
      footerText={t("hasAccount")}
      footerLinkLabel={t("loginLink")}
      footerLinkHref={ROUTES.LOGIN}
    >
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
            passwordValue={passwordValue}
            {...registerField("password", {
              required: t("passwordRequired"),
              minLength: { value: 6, message: t("passwordMinLength") },
            })}
          />

          <LanguageSelector
            label={t("languageLabel")}
            value={selectedLang}
            onChange={(lang) => setValue("uiLanguage", lang)}
          />

          <Button type="submit" loading={isPending} {...s.submitBtn}>
            {t("submit")}
          </Button>
        </Box>
      </Box>
    </AuthCard>
  );
}
