"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { s } from "../styles";
import { skillPlanSchema, type SkillPlanData, LEVELS, WIZARD_FORM_ID } from "./types";
import {
  MIN_AVAILABLE_MINUTES,
  MAX_AVAILABLE_MINUTES,
  DEFAULT_AVAILABLE_MINUTES,
} from "@/lib/constants";
import { handleRovingKeyDown } from "@/lib/a11y";

interface SkillPlanFormProps {
  defaultValues?: Partial<SkillPlanData>;
  onNext: (_data: SkillPlanData) => void;
}

export function SkillPlanForm({ defaultValues, onNext }: SkillPlanFormProps) {
  const t = useTranslations("habitWizard.step2Skill");
  const levelLabelId = useId();
  const levelGroupRef = useRef<HTMLDivElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SkillPlanData>({
    resolver: zodResolver(skillPlanSchema),
    defaultValues: {
      struggles: "",
      availableMinutes: DEFAULT_AVAILABLE_MINUTES,
      level: "beginner",
      ...defaultValues,
    },
  });

  return (
    <Box as="form" id={WIZARD_FORM_ID} onSubmit={handleSubmit(onNext)}>
      <Box {...s.formStack}>
        <Box {...s.planNoteSkill}>
          <Text {...s.planNoteText}>{t("planNote")}</Text>
        </Box>

        <Controller
          name="struggles"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              label={t("strugglesLabel")}
              placeholder={t("strugglesPh")}
              rows={4}
              error={errors.struggles ? t("errors.strugglesRequired") : undefined}
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
      </Box>
    </Box>
  );
}
