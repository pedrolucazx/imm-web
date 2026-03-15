"use client";

import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import {
  type TargetSkill,
  type HabitPlan,
  type SkillBuildingPhase,
  type TrackingCoachedPhase,
  SKILL_ICONS,
  deriveHabitMode,
} from "@/types/habits";
import { s } from "../styles";

interface Step3ConfirmProps {
  habitName: string;
  habitIcon: string;
  habitTargetSkill: TargetSkill;
  wantPlan: boolean;
  previewedPlan: HabitPlan | null;
  isLoading: boolean;
}

export function PlanReviewPanel({
  habitName,
  habitIcon,
  habitTargetSkill,
  wantPlan,
  previewedPlan,
  isLoading,
}: Step3ConfirmProps) {
  const t = useTranslations("habitWizard.step3");
  const tSkills = useTranslations("habits.skills");
  const mode = deriveHabitMode(habitTargetSkill);
  const needsPlan = mode === "skill-building" || wantPlan;

  if (isLoading) {
    return (
      <Box {...s.loadingContainer}>
        <Spinner size="xl" borderWidth="4px" color="primary" />
        <Heading size="lg" {...s.loadingTitle}>
          {t("loadingTitle")}
        </Heading>
        <Text {...s.loadingSubtitle}>{t("loadingSubtitle")}</Text>
      </Box>
    );
  }

  return (
    <Box {...s.formStack}>
      <Box {...s.summaryCard}>
        <Box {...s.summaryStack}>
          <Text fontWeight="800" fontSize="lg">
            {habitIcon} {habitName}
          </Text>
          <Text>
            {SKILL_ICONS[habitTargetSkill]} {tSkills(`${habitTargetSkill}.name`)}
            {" · "}
            {mode === "skill-building" ? t("modeSkillBuilding") : t("modeTracking")}
          </Text>
        </Box>
      </Box>

      {previewedPlan && (
        <Box {...s.planPreview}>
          <Text {...s.planPreviewTitle}>📋 {t("planPreviewTitle")}</Text>
          <Box {...s.planStrategy}>
            <Text>
              <Text as="strong">{t("strategyLabel")}:</Text> {previewedPlan.strategy}
            </Text>
            <Text>
              <Text as="strong">{t("metricsLabel")}:</Text> {previewedPlan.success_metrics}
            </Text>
            <Text>
              <Text as="strong">{t("timeLabel")}:</Text> {previewedPlan.total_time_per_day_minutes}{" "}
              min/dia
            </Text>
          </Box>
          {previewedPlan.phases.map((phase) => (
            <Box key={phase.phase} {...s.phaseCard}>
              <Text {...s.phaseHeader}>
                Fase {phase.phase} · {phase.days} dias
              </Text>
              <Text {...s.phaseTitle}>{phase.theme}</Text>
              {"daily_tasks" in phase ? (
                <Box {...s.taskList}>
                  {(phase as SkillBuildingPhase).daily_tasks.map((task, i) => (
                    <Text key={i} {...s.taskItem}>
                      → {task}
                    </Text>
                  ))}
                </Box>
              ) : (
                <Box>
                  <Text {...s.taskItem}>{(phase as TrackingCoachedPhase).weekly_focus}</Text>
                  <Text {...s.taskItem}>💡 {(phase as TrackingCoachedPhase).tip}</Text>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      {!previewedPlan && needsPlan && (
        <Box border="3px solid black" bg="surface.yellow" p={3}>
          <Text fontSize="sm" fontWeight="bold">
            {t("planPending")}
          </Text>
        </Box>
      )}
    </Box>
  );
}
