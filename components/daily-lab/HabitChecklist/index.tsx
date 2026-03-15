"use client";

import { useState } from "react";
import { Box, Text, chakra } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { Habit, SkillBuildingPhase, TrackingCoachedPhase } from "@/types/habits";
import { SKILL_ICONS } from "@/types/habits";
import { useLogHabit } from "@/lib/hooks/useHabits";
import { s } from "./styles";

interface HabitChecklistProps {
  habits: Habit[];
}

function getCurrentPhase(habit: Habit): SkillBuildingPhase | TrackingCoachedPhase | null {
  if (!habit.habit_plan || habit.plan_status !== "ready") return null;
  return (
    habit.habit_plan.phases.find((phase) => {
      const [start, end] = phase.days.split("-").map(Number);
      return habit.current_day >= start && habit.current_day <= end;
    }) ?? null
  );
}

function getLocalDateString(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function HabitChecklist({ habits }: HabitChecklistProps) {
  const t = useTranslations("dailyLab");
  const tHabits = useTranslations("habits");
  const { mutate: logHabit } = useLogHabit();

  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());

  const handleToggle = (habitId: string) => {
    if (pendingIds.has(habitId)) return;

    const wasCompleted = completedIds.has(habitId);
    const willBeCompleted = !wasCompleted;
    const today = getLocalDateString();

    setPendingIds((prev) => new Set(prev).add(habitId));

    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (willBeCompleted) next.add(habitId);
      else next.delete(habitId);
      return next;
    });

    logHabit(
      { id: habitId, input: { logDate: today, completed: willBeCompleted } },
      {
        onError: () => {
          setCompletedIds((prev) => {
            const next = new Set(prev);
            if (wasCompleted) next.add(habitId);
            else next.delete(habitId);
            return next;
          });
        },
        onSettled: () => {
          setPendingIds((prev) => {
            const next = new Set(prev);
            next.delete(habitId);
            return next;
          });
        },
      }
    );
  };

  return (
    <Box {...s.section}>
      <Text {...s.sectionTitle}>
        {t("checklist.sectionTitle", { completed: completedIds.size, total: habits.length })}
      </Text>

      <Box {...s.habitList}>
        {habits.map((habit) => {
          const completed = completedIds.has(habit.id);
          const pending = pendingIds.has(habit.id);
          const phase = getCurrentPhase(habit);

          return (
            <Box key={habit.id}>
              <chakra.button
                type="button"
                aria-pressed={completed}
                disabled={pending}
                onClick={() => handleToggle(habit.id)}
                {...s.habitCard}
                bg={completed ? habit.color : "card"}
                boxShadow={completed ? "none" : "brutal"}
                transform={completed ? "translate(4px, 4px)" : undefined}
                opacity={pending ? 0.7 : 1}
              >
                <Box {...s.habitRow}>
                  <Text {...s.habitIcon}>{habit.icon}</Text>
                  <Box {...s.habitInfo}>
                    <Text {...s.habitName}>{habit.name}</Text>
                    <Box {...s.habitMeta}>
                      <Box {...s.skillBadge}>
                        {SKILL_ICONS[habit.target_skill]}{" "}
                        {tHabits(`skills.${habit.target_skill}.name`)}
                      </Box>
                      <Text {...s.streakText}>
                        {t("checklist.day", { current: habit.current_day })} · {habit.streak}🔥
                      </Text>
                    </Box>
                  </Box>
                  <Box {...s.checkbox} bg={completed ? "black" : "card"}>
                    {completed && (
                      <Text color="card" fontWeight="bold" fontSize="sm">
                        ✓
                      </Text>
                    )}
                  </Box>
                </Box>
              </chakra.button>

              {phase && (
                <Box {...s.planCard}>
                  <Text {...s.planHeader}>
                    {t("checklist.todaysFocus", { phase: phase.phase, theme: phase.theme })}
                  </Text>
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
                      <Text {...s.tipText}>💡 {(phase as TrackingCoachedPhase).tip}</Text>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
