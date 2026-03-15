"use client";

import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Box, Text } from "@chakra-ui/react";
import { Input, Textarea, Select, Button } from "@/components/ui";
import { AvatarUpload, useAvatarUpload } from "@/components/AvatarUpload";
import { LanguageSelector, type UILanguage } from "@/components/LanguageSelector";
import { useGetProfile, useUpdateProfile } from "@/lib/hooks/useProfile";
import { useRouter, usePathname } from "@/lib/navigation";
import { toaster } from "@/components/ui/toaster";
import { PageWrapper } from "@/components/PageWrapper";
import { s } from "./settings.styles";

const TIMEZONES = [
  { value: "America/Sao_Paulo", labelKey: "timezone.america_sao_paulo" },
  { value: "America/New_York", labelKey: "timezone.america_new_york" },
  { value: "America/Chicago", labelKey: "timezone.america_chicago" },
  { value: "America/Los_Angeles", labelKey: "timezone.america_los_angeles" },
  { value: "America/Buenos_Aires", labelKey: "timezone.america_buenos_aires" },
  { value: "America/Mexico_City", labelKey: "timezone.america_mexico_city" },
  { value: "Europe/London", labelKey: "timezone.europe_london" },
  { value: "Europe/Paris", labelKey: "timezone.europe_paris" },
  { value: "Europe/Madrid", labelKey: "timezone.europe_madrid" },
  { value: "Asia/Tokyo", labelKey: "timezone.asia_tokyo" },
] as const;

type ProfileForm = {
  name: string;
  bio: string;
  timezone: string;
  ui_language: UILanguage;
};

const AI_LIMIT = 10;

export default function SettingsPage(): React.JSX.Element {
  const t = useTranslations("settings");
  const router = useRouter();
  const pathname = usePathname();

  const { data: profile, isLoading } = useGetProfile();
  const { mutateAsync: saveProfile, isPending: isSaving } = useUpdateProfile();
  const { previewUrl, isAvatarReady, isUploading, handleFileChange, uploadIfPending } =
    useAvatarUpload(profile?.avatarUrl, {
      onUploadError: (_error: Error) =>
        toaster.create({ type: "error", title: t("avatarErrorUpload"), meta: { closable: true } }),
    });

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("nameMinLength")),
        bio: z.string(),
        timezone: z.string(),
        ui_language: z.enum(["pt-BR", "en-US", "es-ES"]),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors, dirtyFields },
  } = useForm<ProfileForm>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", bio: "", timezone: "", ui_language: "pt-BR" },
  });

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
        bio: profile?.profile?.bio ?? "",
        timezone: profile?.profile?.timezone ?? "",
        ui_language: profile?.profile?.uiLanguage ?? "pt-BR",
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfileForm): Promise<void> => {
    const changed: {
      name?: string;
      bio?: string;
      timezone?: string;
      avatarUrl?: string;
      uiLanguage?: UILanguage;
    } = {};

    try {
      const avatarUrl = await uploadIfPending();
      if (avatarUrl !== undefined) changed.avatarUrl = avatarUrl;

      if (dirtyFields.name) changed.name = data.name;
      if (dirtyFields.bio) changed.bio = data.bio;
      if (dirtyFields.timezone) changed.timezone = data.timezone;
      if (dirtyFields.ui_language) changed.uiLanguage = data.ui_language;

      if (Object.keys(changed).length === 0) return;

      await saveProfile(changed);
      if (dirtyFields.ui_language) {
        router.replace(pathname, { locale: data.ui_language });
      }
    } catch {}
  };

  const usagePercent = profile
    ? Math.min((profile.profile.aiRequestsToday / AI_LIMIT) * 100, 100)
    : 0;

  return (
    <PageWrapper title={t("pageTitle")} isLoading={isLoading || !isAvatarReady}>
      <Box {...s.languageCard}>
        <Text {...s.languageCardTitle}>{t("languageCardTitle")}</Text>
        <Text {...s.languageBanner}>{t("languageBanner")}</Text>
        <LanguageSelector
          label=""
          value={watch("ui_language")}
          onChange={(lang) => setValue("ui_language", lang, { shouldDirty: true })}
        />
      </Box>

      <Box {...s.profileCard}>
        <Text {...s.profileCardTitle}>{t("profileCardTitle")}</Text>
        <Box as="form" onSubmit={handleSubmit(onSubmit)} {...s.formStack}>
          <AvatarUpload
            currentUrl={profile?.avatarUrl}
            previewUrl={previewUrl}
            name={profile?.name}
            label={t("avatarLabel")}
            changeLabel={t("avatarUploadLabel")}
            onFileChange={handleFileChange}
            onValidationError={(reason) => {
              const title = reason === "size" ? t("avatarErrorSize") : t("avatarErrorType");
              toaster.create({ type: "error", title, meta: { closable: true } });
            }}
          />

          <Input
            label={t("nameLabel")}
            placeholder={t("namePlaceholder")}
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label={t("emailLabel")}
            value={profile?.email ?? ""}
            disabled
            title={t("emailReadonly")}
          />

          <Textarea
            label={t("bioLabel")}
            placeholder={t("bioPlaceholder")}
            error={errors.bio?.message}
            {...register("bio")}
          />

          <Controller
            control={control}
            name="timezone"
            render={({ field }) => (
              <Select
                label={t("timezoneLabel")}
                options={[
                  { value: "", label: "—" },
                  ...TIMEZONES.map((tz) => ({ value: tz.value, label: t(tz.labelKey) })),
                ]}
                value={field.value ? [field.value] : []}
                onValueChange={({ value }) => field.onChange(value[0] ?? "")}
                positioning={{ placement: "bottom" }}
              />
            )}
          />

          <Box {...s.aiSection}>
            <Text {...s.aiTitle}>{t("aiUsageTitle")}</Text>
            <Box {...s.usageInfo}>
              <Text {...s.usageLabel}>
                {t("aiUsageLabel", {
                  used: profile?.profile.aiRequestsToday ?? 0,
                  limit: AI_LIMIT,
                })}
              </Text>
              <Text {...s.usageReset}>{t("aiUsageReset")}</Text>
            </Box>
            <Box
              {...s.usageBar}
              role="progressbar"
              aria-valuenow={profile?.profile?.aiRequestsToday ?? 0}
              aria-valuemin={0}
              aria-valuemax={AI_LIMIT}
              aria-label={t("aiUsageLabel", {
                used: profile?.profile?.aiRequestsToday ?? 0,
                limit: AI_LIMIT,
              })}
            >
              <Box {...s.usageFill} style={{ width: `${usagePercent}%` }} />
            </Box>
          </Box>

          <Button type="submit" loading={isUploading || isSaving} variant="primary" {...s.saveBtn}>
            {t("save")}
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  );
}
