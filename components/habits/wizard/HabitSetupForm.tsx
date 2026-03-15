"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid, Input, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import {
  type TargetSkill,
  LANGUAGE_SKILLS,
  BEHAVIORAL_SKILLS,
  deriveHabitMode,
} from "@/types/habits";
import { SkillCard } from "./SkillCard";
import { s } from "../HabitCreationWizard.styles";
import { step1Schema, type Step1Data, WIZARD_FORM_ID } from "./types";

interface Step1FormProps {
  defaultValues?: Partial<Step1Data>;
  onNext: (_data: Step1Data) => void;
}

export function HabitSetupForm({ defaultValues, onNext }: Step1FormProps) {
  const t = useTranslations("habitWizard.step1");

  const { control, handleSubmit, watch } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: { name: "", targetSkill: "", ...defaultValues },
  });

  const targetSkill = watch("targetSkill") as TargetSkill | "";
  const mode = targetSkill ? deriveHabitMode(targetSkill as TargetSkill) : null;

  return (
    <Box as="form" id={WIZARD_FORM_ID} onSubmit={handleSubmit(onNext)}>
      <Box {...s.formStack}>
        <Box>
          <Text as="label" {...s.label}>
            {t("habitNameLabel")}
          </Text>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder={t("habitNamePlaceholder")} {...s.input} />
            )}
          />
        </Box>

        <Box>
          <Text as="label" {...s.label}>
            {t("targetSkillLabel")}
          </Text>
          <Controller
            name="targetSkill"
            control={control}
            render={({ field }) => (
              <VStack gap={6} align="stretch">
                {/* Language Skills Section */}
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

                {/* Behavioral Skills Section */}
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
        </Box>

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
