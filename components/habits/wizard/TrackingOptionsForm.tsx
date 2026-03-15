"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Input, Text, Textarea } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { s } from "../styles";
import { trackingConfigSchema, type TrackingConfigData, LEVELS, WIZARD_FORM_ID } from "./types";

interface TrackingOptionsFormProps {
  defaultValues?: Partial<TrackingConfigData>;
  onNext: (_data: TrackingConfigData) => void;
}

export function TrackingOptionsForm({ defaultValues, onNext }: TrackingOptionsFormProps) {
  const t = useTranslations("habitWizard.step2Tracking");

  const { control, handleSubmit, watch } = useForm<TrackingConfigData>({
    resolver: zodResolver(trackingConfigSchema),
    defaultValues: {
      wantPlan: false,
      barrier: "",
      availableMinutes: 30,
      level: "beginner",
      ...defaultValues,
    },
  });

  const wantPlan = watch("wantPlan");

  return (
    <Box as="form" id={WIZARD_FORM_ID} onSubmit={handleSubmit(onNext)}>
      <Box {...s.formStack}>
        <Box {...s.planNoteTracking}>
          <Text {...s.planNoteText}>{t("optionalNote")}</Text>
        </Box>

        <Controller
          name="wantPlan"
          control={control}
          render={({ field }) => (
            <Box {...s.toggleRow}>
              <Text {...s.toggleLabel}>{t("wantPlanLabel")}</Text>
              <Switch checked={field.value} onCheckedChange={(e) => field.onChange(e.checked)} />
            </Box>
          )}
        />

        {wantPlan && (
          <>
            <Box>
              <Text as="label" {...s.label}>
                {t("barrierLabel")}
              </Text>
              <Controller
                name="barrier"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} rows={3} placeholder={t("barrierPh")} {...s.textarea} />
                )}
              />
            </Box>

            <Box>
              <Text as="label" {...s.label}>
                {t("timeLabel")}
              </Text>
              <Controller
                name="availableMinutes"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    min={5}
                    max={120}
                    fontWeight="bold"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    {...s.input}
                  />
                )}
              />
            </Box>

            <Box>
              <Text as="label" {...s.label}>
                {t("levelLabel")}
              </Text>
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <Box {...s.levelGroup}>
                    {LEVELS.map((l) => (
                      <Button
                        key={l}
                        type="button"
                        variant={field.value === l ? "primary" : "muted"}
                        onClick={() => field.onChange(l)}
                        {...s.levelBtn}
                      >
                        {t(`levels.${l}`)}
                      </Button>
                    ))}
                  </Box>
                )}
              />
            </Box>
          </>
        )}

        {!wantPlan && (
          <Box {...s.manualNote}>
            <Text {...s.manualNoteText}>{t("manualNote")}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
