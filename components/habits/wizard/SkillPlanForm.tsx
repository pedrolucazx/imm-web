"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Input, Text, Textarea } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { s } from "../styles";
import { skillPlanSchema, type SkillPlanData, LEVELS, WIZARD_FORM_ID } from "./types";

interface SkillPlanFormProps {
  defaultValues?: Partial<SkillPlanData>;
  onNext: (_data: SkillPlanData) => void;
}

export function SkillPlanForm({ defaultValues, onNext }: SkillPlanFormProps) {
  const t = useTranslations("habitWizard.step2Skill");

  const { control, handleSubmit } = useForm<SkillPlanData>({
    resolver: zodResolver(skillPlanSchema),
    defaultValues: { struggles: "", availableMinutes: 30, level: "beginner", ...defaultValues },
  });

  return (
    <Box as="form" id={WIZARD_FORM_ID} onSubmit={handleSubmit(onNext)}>
      <Box {...s.formStack}>
        <Box {...s.planNoteSkill}>
          <Text {...s.planNoteText}>{t("planNote")}</Text>
        </Box>

        <Box>
          <Text as="label" {...s.label}>
            {t("strugglesLabel")}
          </Text>
          <Controller
            name="struggles"
            control={control}
            render={({ field }) => (
              <Textarea {...field} rows={4} placeholder={t("strugglesPh")} {...s.textarea} />
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
      </Box>
    </Box>
  );
}
