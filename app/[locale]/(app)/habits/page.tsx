"use client";

import { useState } from "react";
import { Box, Heading, Text, HStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { PageWrapper } from "@/components/PageWrapper";
import { HabitCreationWizard } from "@/components/habits";
import { useHabits } from "@/lib/hooks/useHabits";
import {
  type Habit,
  type PlanStatus,
  type SkillBuildingPhase,
  type TrackingCoachedPhase,
  MAX_ACTIVE_HABITS,
  WARN_ACTIVE_HABITS,
  SKILL_ICONS,
} from "@/types/habits";
import { s } from "./habits.styles";

const STATUS_BG: Record<PlanStatus, string> = {
  ready: "surface.mint",
  generating: "surface.yellow",
  pending: "muted",
  failed: "surface.coral",
  skipped: "muted",
};

export default function HabitsPage(): React.JSX.Element {
  const t = useTranslations("habits");
  const queryClient = useQueryClient();
  const { data: habits = [], isLoading } = useHabits();
  const [showWizard, setShowWizard] = useState(false);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const activeCount = habits.filter((h: Habit) => h.is_active).length;
  const isAtLimit = activeCount >= MAX_ACTIVE_HABITS;
  const showWarning = activeCount >= WARN_ACTIVE_HABITS;

  const handleCreated = () => {
    queryClient.invalidateQueries({ queryKey: ["habits"] });
  };

  const handleRetryPlan = (habitId: string) => {
    queryClient.invalidateQueries({ queryKey: ["habits", habitId] });
  };

  return (
    <PageWrapper
      title={`🎯 ${t("pageTitle")}`}
      loading={isLoading}
      actions={
        <Tooltip content={t("tooltipLimit", { max: MAX_ACTIVE_HABITS })} disabled={!isAtLimit}>
          <Button
            onClick={() => !isAtLimit && setShowWizard(true)}
            disabled={isAtLimit}
            variant={isAtLimit ? "muted" : "primary"}
            px={6}
            py={3}
            fontSize="sm"
          >
            {t("newHabit")}
          </Button>
        </Tooltip>
      }
    >
      {showWarning && (!bannerDismissed || isAtLimit) && (
        <Box
          {...s.banner}
          bg={isAtLimit ? "surface.coral" : "surface.yellow"}
          border="3px solid black"
        >
          <Text fontSize="sm" fontWeight="bold">
            {isAtLimit
              ? t("warningBannerLimit", { count: activeCount })
              : t("warningBanner", { count: activeCount })}
          </Text>
          {!isAtLimit && (
            <Button
              {...s.bannerDismiss}
              aria-label={t("dismiss")}
              onClick={() => setBannerDismissed(true)}
            >
              {t("dismiss")}
            </Button>
          )}
        </Box>
      )}

      <Box {...s.habitList}>
        {habits.map((habit: Habit) => {
          const isExpanded = expandedPlan === habit.id;

          return (
            <Box
              key={habit.id}
              {...s.habitCard}
              bg={habit.color}
              border="3px solid black"
              boxShadow="brutal"
            >
              <Box {...s.habitHeader}>
                <Text {...s.habitIcon}>{habit.icon}</Text>
                <Box>
                  <Heading {...s.habitTitle}>{habit.name}</Heading>
                  <HStack {...s.habitTags}>
                    <Box {...s.habitTag}>
                      {SKILL_ICONS[habit.target_skill]} {t(`skills.${habit.target_skill}.name`)}
                    </Box>
                    <Box {...s.habitTag} bg={STATUS_BG[habit.plan_status]}>
                      {t(`status.${habit.plan_status}`)}
                    </Box>
                  </HStack>
                </Box>
                <Box {...s.habitStreak}>
                  <Text {...s.streakNumber}>{habit.streak}🔥</Text>
                  <Text {...s.streakLabel}>{t("streakDay", { current: habit.current_day })}</Text>
                </Box>
              </Box>

              {habit.habit_plan && habit.plan_status === "ready" && (
                <Box>
                  <Button
                    onClick={() => setExpandedPlan(isExpanded ? null : habit.id)}
                    {...s.planToggle}
                  >
                    {isExpanded ? t("hidePlan") : t("viewPlan")}
                  </Button>
                  {isExpanded && (
                    <Box {...s.planContent}>
                      <Box {...s.planStrategy}>
                        <Text {...s.planStrategyText}>
                          {t("strategy", { strategy: habit.habit_plan.strategy })}
                        </Text>
                        <Text {...s.planMetrics}>
                          {t("minPerDay", {
                            minutes: habit.habit_plan.total_time_per_day_minutes,
                            metrics: habit.habit_plan.success_metrics,
                          })}
                        </Text>
                      </Box>
                      {habit.habit_plan.phases.map(
                        (phase: SkillBuildingPhase | TrackingCoachedPhase) => (
                          <Box key={phase.phase} {...s.phaseCard}>
                            <Text {...s.phaseHeader}>
                              {t("phase", { phase: phase.phase, days: phase.days })}
                            </Text>
                            <Text {...s.phaseTitle}>{phase.theme}</Text>
                            {"daily_tasks" in phase ? (
                              <Box {...s.taskList}>
                                {(phase as SkillBuildingPhase).daily_tasks.map((task, i) => (
                                  <Text key={i} {...s.taskItem}>
                                    <Text as="span">→</Text> {task}
                                  </Text>
                                ))}
                              </Box>
                            ) : (
                              <Box>
                                <Text {...s.taskItem}>
                                  {(phase as TrackingCoachedPhase).weekly_focus}
                                </Text>
                                <Text {...s.phaseTipLabel}>
                                  💡 {(phase as TrackingCoachedPhase).tip}
                                </Text>
                              </Box>
                            )}
                          </Box>
                        )
                      )}
                    </Box>
                  )}
                </Box>
              )}

              {habit.plan_status === "generating" && (
                <Box {...s.generatingStatus}>
                  <Text fontSize="sm" fontWeight="bold">
                    {t("generatingPlan")}
                  </Text>
                </Box>
              )}

              {habit.plan_status === "failed" && (
                <Box {...s.failedStatus}>
                  <Text fontSize="sm" fontWeight="bold">
                    {t("planFailed")}
                  </Text>
                  <Button variant="muted" fontSize="sm" onClick={() => handleRetryPlan(habit.id)}>
                    {t("retry")}
                  </Button>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      {!isLoading && habits.length === 0 && (
        <Box {...s.emptyState} border="3px solid black" boxShadow="brutal">
          <Text {...s.emptyIcon}>🎯</Text>
          <Heading {...s.emptyTitle}>{t("emptyTitle")}</Heading>
          <Text {...s.emptySubtitle}>{t("emptySubtitle")}</Text>
          <Button
            onClick={() => !isAtLimit && setShowWizard(true)}
            disabled={isAtLimit}
            variant="primary"
            px={8}
            py={6}
          >
            {t("createFirst")}
          </Button>
        </Box>
      )}

      <HabitCreationWizard
        open={showWizard}
        onClose={() => setShowWizard(false)}
        onCreated={handleCreated}
      />
    </PageWrapper>
  );
}
