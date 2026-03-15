"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, Input, Text, Textarea } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { s } from "../HabitCreationWizard.styles";
import { step2TrackingSchema, type Step2TrackingData, LEVELS, WIZARD_FORM_ID } from "./types";

interface Step2TrackingProps {
  defaultValues?: Partial<Step2TrackingData>;
  onNext: (_data: Step2TrackingData) => void;
}

export function TrackingOptionsForm({ defaultValues, onNext }: Step2TrackingProps) {
  const t = useTranslations("habitWizard.step2Tracking");

  const { control, handleSubmit, watch } = useForm<Step2TrackingData>({
    resolver: zodResolver(step2TrackingSchema),
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
                  <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                    {LEVELS.map((l) => (
                      <Button
                        key={l}
                        type="button"
                        variant={field.value === l ? "primary" : "muted"}
                        onClick={() => field.onChange(l)}
                      >
                        {t(`levels.${l}`)}
                      </Button>
                    ))}
                  </Grid>
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
