"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { s } from "../styles";
import { trackingConfigSchema, type TrackingConfigData, LEVELS, WIZARD_FORM_ID } from "./types";
import {
  MIN_AVAILABLE_MINUTES,
  MAX_AVAILABLE_MINUTES,
  DEFAULT_AVAILABLE_MINUTES,
} from "@/lib/constants";
import { handleRovingKeyDown } from "@/lib/a11y";

interface TrackingOptionsFormProps {
  defaultValues?: Partial<TrackingConfigData>;
  onNext: (_data: TrackingConfigData) => void;
}

export function TrackingOptionsForm({ defaultValues, onNext }: TrackingOptionsFormProps) {
  const t = useTranslations("habitWizard.step2Tracking");
  const levelLabelId = useId();
  const levelGroupRef = useRef<HTMLDivElement>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TrackingConfigData>({
    resolver: zodResolver(trackingConfigSchema),
    defaultValues: {
      wantPlan: false,
      barrier: "",
      availableMinutes: DEFAULT_AVAILABLE_MINUTES,
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
            <Controller
              name="barrier"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label={t("barrierLabel")}
                  placeholder={t("barrierPh")}
                  rows={3}
                  error={errors.barrier ? t("errors.barrierRequired") : undefined}
                />
              )}
            />

            <Controller
              name="availableMinutes"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  type="number"
                  min={MIN_AVAILABLE_MINUTES}
                  max={MAX_AVAILABLE_MINUTES}
                  label={t("timeLabel")}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                  error={error?.message}
                />
              )}
            />

            <Box>
              <Text id={levelLabelId} {...s.label}>
                {t("levelLabel")}
              </Text>
              <Controller
                name="level"
                control={control}
                render={({ field }) => (
                  <Box
                    ref={levelGroupRef}
                    role="radiogroup"
                    aria-labelledby={levelLabelId}
                    {...s.levelGroup}
                  >
                    {LEVELS.map((l, i) => (
                      <Button
                        key={l}
                        type="button"
                        role="radio"
                        aria-checked={field.value === l}
                        tabIndex={field.value === l ? 0 : -1}
                        variant={field.value === l ? "primary" : "muted"}
                        onClick={() => field.onChange(l)}
                        onKeyDown={(e: React.KeyboardEvent) =>
                          handleRovingKeyDown(e, i, LEVELS.length, levelGroupRef, (idx) =>
                            field.onChange(LEVELS[idx])
                          )
                        }
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
