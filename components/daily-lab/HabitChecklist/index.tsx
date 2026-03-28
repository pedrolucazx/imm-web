"use client";

import { useState } from "react";
import { Box, Button, Text, chakra } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { LuMic } from "react-icons/lu";
import type { Habit, SkillBuildingPhase, TrackingCoachedPhase } from "@/types/habits";
import { SKILL_ICONS } from "@/lib/habit-utils";
import type { JournalEntry } from "@/types/journal";
import { getCurrentPhase } from "@/lib/habit-utils";
import { PronunciationModal } from "@/components/daily-lab/PronunciationModal";
import { s } from "./styles";

type ModalState = {
  habit: Habit;
  originalText: string;
} | null;

interface HabitChecklistProps {
  habits: Habit[];
  journalEntries: JournalEntry[];
  selectedHabitId: string | null;
  onSelect: (_id: string) => void;
  today: string;
}

export function HabitChecklist({
  habits,
  journalEntries,
  selectedHabitId,
  onSelect,
  today,
}: HabitChecklistProps) {
  const t = useTranslations("dailyLab");
  const tHabits = useTranslations("habits");
  const [modalState, setModalState] = useState<ModalState>(null);

  const habitsWithFeedback = new Set(
    journalEntries.filter((e) => e.aiFeedback != null).map((e) => e.habitId)
  );

  return (
    <>
      <Box {...s.section}>
        <Text {...s.sectionTitle}>
          {t("checklist.sectionTitle", {
            completed: habits.filter((h) => h.completed_today || habitsWithFeedback.has(h.id))
              .length,
            total: habits.length,
          })}
        </Text>

        <Box {...s.habitList}>
          {habits.map((habit) => {
            const hasFeedback = habitsWithFeedback.has(habit.id);
            const completed = habit.completed_today || hasFeedback;
            const selected = habit.id === selectedHabitId;
            const isActive = completed || selected;
            const phase = getCurrentPhase(habit);

            return (
              <Box key={habit.id}>
                <chakra.button
                  type="button"
                  aria-pressed={selected}
                  aria-label={`${habit.name}${hasFeedback ? ` — ${t("checklist.doneToday")}` : ""}`}
                  onClick={() => onSelect(habit.id)}
                  {...s.habitCard}
                  cursor="pointer"
                  bg={isActive ? habit.color : "card"}
                  boxShadow={isActive ? "none" : "brutal"}
                  _motionSafe={isActive ? { transform: "translate(4px, 4px)" } : undefined}
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
                    <Box
                      aria-hidden="true"
                      {...s.checkboxIndicator}
                      bg={hasFeedback ? "black" : "card"}
                    >
                      {hasFeedback && <Text {...s.checkboxIcon}>✓</Text>}
                      {selected && !hasFeedback && <Text {...s.checkboxDashIcon}>–</Text>}
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
                        {(() => {
                          const skillPhase = phase as SkillBuildingPhase;
                          const originalText =
                            skillPhase.journal_prompt?.trim() ||
                            skillPhase.daily_tasks[0]?.trim() ||
                            null;
                          return habit.plan_status === "ready" && originalText ? (
                            <Button
                              size="sm"
                              variant="outline"
                              mt={2}
                              onClick={() => setModalState({ habit, originalText })}
                            >
                              <LuMic />
                              {t("checklist.practiceButton")}
                            </Button>
                          ) : null;
                        })()}
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

      {modalState && (
        <PronunciationModal
          open={true}
          onClose={() => setModalState(null)}
          habit={modalState.habit}
          originalText={modalState.originalText}
          entryDate={today}
        />
      )}
    </>
  );
}
