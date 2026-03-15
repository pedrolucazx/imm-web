"use client";

import { Box, Text, chakra } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { Habit } from "@/types/habits";
import { SKILL_ICONS } from "@/types/habits";
import { s } from "./styles";

interface HabitSelectorProps {
  habits: Habit[];
  selectedHabitId: string;
  onSelect: (_id: string) => void;
}

export function HabitSelector({ habits, selectedHabitId, onSelect }: HabitSelectorProps) {
  const t = useTranslations("dailyLab");
  const tHabits = useTranslations("habits");

  const selectedHabit = habits.find((h) => h.id === selectedHabitId);
  const isSkillBuilding = selectedHabit?.habit_mode === "skill-building";

  return (
    <Box>
      <Box {...s.tabsRow}>
        {habits.map((habit) => {
          const active = habit.id === selectedHabitId;
          return (
            <chakra.button
              key={habit.id}
              type="button"
              aria-pressed={active}
              onClick={() => onSelect(habit.id)}
              {...s.tab}
              {...(active ? s.tabActive : s.tabInactive)}
            >
              {SKILL_ICONS[habit.target_skill]}{" "}
              {habit.name.length > 18 ? `${habit.name.slice(0, 18)}…` : habit.name}
            </chakra.button>
          );
        })}
      </Box>

      {selectedHabit && (
        <>
          <Box {...s.modeBadge} {...(isSkillBuilding ? {} : s.modeBadgeTracking)}>
            {isSkillBuilding ? "📝 " : "🎯 "}
            {t(isSkillBuilding ? "journal.modeSkillBuilding" : "journal.modeTracking")}
          </Box>

          {isSkillBuilding && (
            <Box {...s.skillBanner}>
              <Text {...s.skillBannerText}>
                ✍️{" "}
                {t("journal.skillBuildingBanner", {
                  skill: tHabits(`skills.${selectedHabit.target_skill}.name`),
                })}
              </Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
