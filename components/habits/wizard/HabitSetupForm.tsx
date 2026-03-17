"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import {
  type TargetSkill,
  LANGUAGE_SKILLS,
  BEHAVIORAL_SKILLS,
  deriveHabitMode,
} from "@/types/habits";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { SkillCard } from "./SkillCard";
import { s } from "../styles";
import { habitSetupSchema, type HabitSetupData, WIZARD_FORM_ID } from "./types";

interface HabitSetupFormProps {
  defaultValues?: Partial<HabitSetupData>;
  onNext: (_data: HabitSetupData) => void;
}

export function HabitSetupForm({ defaultValues, onNext }: HabitSetupFormProps) {
  const t = useTranslations("habitWizard.step1");

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<HabitSetupData>({
    resolver: zodResolver(habitSetupSchema),
    defaultValues: { name: "", targetSkill: "", ...defaultValues },
  });

  const targetSkill = watch("targetSkill") as TargetSkill | "";
  const mode = targetSkill ? deriveHabitMode(targetSkill as TargetSkill) : null;

  return (
    <Box as="form" id={WIZARD_FORM_ID} onSubmit={handleSubmit(onNext)}>
      <Box {...s.formStack}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label={t("habitNameLabel")}
              placeholder={t("habitNamePlaceholder")}
              maxLength={80}
              error={errors.name ? t("errors.nameRequired") : undefined}
            />
          )}
        />

        <Field.Root invalid={!!errors.targetSkill}>
          <Text as="label" {...s.label}>
            {t("targetSkillLabel")}
          </Text>
          <Controller
            name="targetSkill"
            control={control}
            render={({ field }) => (
              <VStack
                gap={6}
                align="stretch"
                p={3}
                bg={errors.targetSkill ? "errorBg" : "transparent"}
                boxShadow={
                  errors.targetSkill ? "inset 0 0 0 2px var(--chakra-colors-error)" : "none"
                }
                transition="all 0.15s"
              >
                <Box>
                  <Text {...s.sectionLabel}>{t("langSkillsLabel")}</Text>
                  <Text fontSize="xs" color="text.muted" mb={3}>
                    {t("langSkillsHint")}
                  </Text>
                  <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={3}>
                    {LANGUAGE_SKILLS.map((skill) => (
                      <SkillCard
                        key={skill}
                        skill={skill}
                        isSelected={field.value === skill}
                        onClick={() => field.onChange(skill)}
                      />
                    ))}
                  </Grid>
                </Box>

                <Box>
                  <Text {...s.sectionLabel}>{t("behaviorLabel")}</Text>
                  <Text fontSize="xs" color="text.muted" mb={3}>
                    {t("behaviorHint")}
                  </Text>
                  <Grid templateColumns="repeat(auto-fit, minmax(240px, 1fr))" gap={3}>
                    {BEHAVIORAL_SKILLS.map((skill) => (
                      <SkillCard
                        key={skill}
                        skill={skill}
                        isSelected={field.value === skill}
                        onClick={() => field.onChange(skill)}
                      />
                    ))}
                  </Grid>
                </Box>
              </VStack>
            )}
          />
          <Field.ErrorText>{t("errors.skillRequired")}</Field.ErrorText>
        </Field.Root>

        {targetSkill && mode && (
          <Box {...(mode === "skill-building" ? s.modeHintSkill : s.modeHintTracking)}>
            <Text {...s.modeHintText}>
              {mode === "skill-building" ? t("modeHintSkill") : t("modeHintTracking")}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
