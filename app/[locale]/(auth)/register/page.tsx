"use client";

import { AuthCard } from "@/components/AuthCard";
import { LANGUAGES, LanguageSelector, type UILanguage } from "@/components/LanguageSelector";
import { useRegister } from "@/lib/hooks/useAuth";
import { useRouter } from "@/lib/navigation";
import { ROUTES } from "@/lib/routes";
import { Box, VStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input, PasswordInput } from "../../../../components/ui";
import { s } from "./register.styles";

const LANGUAGE_VALUES = LANGUAGES.map((l) => l.value) as [UILanguage, ...UILanguage[]];

export default function RegisterPage(): React.JSX.Element {
  const t = useTranslations("auth.register");
  const locale = useLocale();
  const router = useRouter();
  const { mutate: registerMutation, isPending } = useRegister({
    onSuccess: () => router.push(ROUTES.APP_DAILY_LAB),
  });

  const registerSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("nameMinLength")),
        email: z.email(t("emailInvalid")),
        password: z.string().min(6, t("passwordMinLength")),
        uiLanguage: z.enum(LANGUAGE_VALUES),
      }),
    [t]
  );

  type RegisterForm = z.infer<typeof registerSchema>;

  const defaultUiLanguage: UILanguage = LANGUAGES.some((l) => l.value === locale)
    ? (locale as UILanguage)
    : "en-US";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { uiLanguage: defaultUiLanguage },
  });

  const selectedLang = watch("uiLanguage");
  const passwordValue = watch("password") ?? "";

  const onSubmit = (data: RegisterForm): void => {
    // uiLanguage is collected here for future use (e.g., persisting user preference
    // server-side). Currently, the locale is managed by the URL path, so it is
    // intentionally omitted from the RegisterInput payload sent to the API.
    registerMutation({
      name: data.name,
      email: data.email,
      password: data.password,
    });
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
        <VStack {...s.formStack}>
          <Input
            label={t("nameLabel")}
            type="text"
            placeholder={t("namePlaceholder")}
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label={t("emailLabel")}
            type="email"
            placeholder={t("emailPlaceholder")}
            error={errors.email?.message}
            {...register("email")}
          />

          <PasswordInput
            label={t("passwordLabel")}
            placeholder={t("passwordPlaceholder")}
            error={errors.password?.message}
            passwordValue={passwordValue}
            {...register("password")}
          />

          <LanguageSelector
            label={t("languageLabel")}
            value={selectedLang}
            onChange={(lang) => setValue("uiLanguage", lang)}
            error={errors.uiLanguage?.message}
          />

          <Button type="submit" loading={isPending} {...s.submitBtn}>
            {t("submit")}
          </Button>
        </VStack>
      </Box>
    </AuthCard>
  );
}
