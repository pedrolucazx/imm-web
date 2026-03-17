"use client";

import { Box, Text, chakra } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { Habit, SkillBuildingPhase, TrackingCoachedPhase } from "@/types/habits";
import { SKILL_ICONS } from "@/types/habits";
import type { JournalEntry } from "@/types/journal";
import { s } from "./styles";

interface HabitChecklistProps {
  habits: Habit[];
  journalEntries: JournalEntry[];
  selectedHabitId: string | null;
  onSelect: (_id: string) => void;
}

/** Returns the active plan phase for the given habit based on its current day, or null if no plan is ready. */
function getCurrentPhase(habit: Habit): SkillBuildingPhase | TrackingCoachedPhase | null {
  if (!habit.habit_plan || habit.plan_status !== "ready") return null;
  return (
    habit.habit_plan.phases.find((phase) => {
      const [start, end] = phase.days.split("-").map(Number);
      return habit.current_day >= start && habit.current_day <= end;
    }) ?? null
  );
}

export function HabitChecklist({
  habits,
  journalEntries,
  selectedHabitId,
  onSelect,
}: HabitChecklistProps) {
  const t = useTranslations("dailyLab");
  const tHabits = useTranslations("habits");
  const habitsWithFeedback = new Set(
    journalEntries.filter((e) => e.aiFeedback != null).map((e) => e.habitId)
  );

  return (
    <Box {...s.section}>
      <Text {...s.sectionTitle}>
        {t("checklist.sectionTitle", {
          completed: habits.filter((h) => h.completed_today || habitsWithFeedback.has(h.id)).length,
          total: habits.length,
        })}
      </Text>

      <Box {...s.habitList}>
        {habits.map((habit) => {
          const completed = habit.completed_today || habitsWithFeedback.has(habit.id);
          const selected = habit.id === selectedHabitId;
          const isActive = completed || selected;
          const phase = getCurrentPhase(habit);

          return (
            <Box key={habit.id}>
              <chakra.button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(habit.id)}
                {...s.habitCard}
                bg={isActive ? habit.color : "card"}
                boxShadow={isActive ? "none" : "brutal"}
                transform={isActive ? "translate(4px, 4px)" : undefined}
              >
                <Box {...s.habitRow}>
                  <Text {...s.habitIcon}>{habit.icon}</Text>
                  <Box {...s.habitInfo}>
                    <Text {...s.habitName}>{habit.name}</Text>
                    <Text {...s.statusText}>
                      {completed
                        ? t("checklist.doneToday")
                        : selected
                          ? t("checklist.inFocus")
                          : t("checklist.notYet")}
                    </Text>
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
                  <Box {...s.checkbox} bg={isActive ? "black" : "card"}>
                    {isActive && <Text {...s.checkboxIcon}>✓</Text>}
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
