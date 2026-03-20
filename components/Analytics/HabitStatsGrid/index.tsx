"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { TargetSkill } from "@/types/habits";
import { SKILL_ICONS, toChakraColor } from "@/lib/habit-utils";
import type { HabitStat } from "../types";
import { s } from "./styles";

const MAX_HABIT_DAYS = 66;

interface HabitStatsGridProps {
  habits: HabitStat[];
  selectedId: string | null;
  onSelect: (_id: string) => void;
}

function resolveCardTone(color: string) {
  switch (color) {
    case "surface.sky":
      return s.toneSky;
    case "surface.coral":
      return s.toneCoral;
    case "surface.lavender":
      return s.toneLavender;
    case "surface.yellow":
      return s.toneYellow;
    case "surface.mint":
    default:
      return s.toneMint;
  }
}

export function HabitStatsGrid({ habits, selectedId, onSelect }: HabitStatsGridProps) {
  const t = useTranslations("analytics");
  const tHabits = useTranslations("habits");

  if (habits.length === 0) {
    return (
      <Box {...s.emptyState}>
        <Text {...s.emptyText}>{t("noHabits")}</Text>
      </Box>
    );
  }

  return (
    <Box {...s.grid}>
      {habits.map((habit) => {
        const skillIcon = habit.targetSkill ? SKILL_ICONS[habit.targetSkill as TargetSkill] : null;
        const skillLabel = habit.targetSkill ? tHabits(`skills.${habit.targetSkill}.name`) : null;
        const progressPct = Math.min((habit.currentDay / MAX_HABIT_DAYS) * 100, 100);
        const progressStyle = { ...s.progressInner, w: `${progressPct}%` };
        const isSelected = selectedId === habit.id;

        return (
          <Box
            key={habit.id}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={habit.name}
            {...s.card}
            {...resolveCardTone(toChakraColor(habit.color))}
            {...(isSelected ? s.cardSelected : s.cardUnselected)}
            onClick={() => onSelect(habit.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(habit.id);
              }
            }}
          >
            <Box {...s.cardHeader}>
              <Text {...s.habitIcon}>{habit.icon}</Text>
              <Box {...s.cardInfo}>
                <Text {...s.habitName}>{habit.name}</Text>
                {skillIcon && skillLabel && (
                  <Box {...s.skillBadge}>
                    <Text {...s.skillBadgeText}>
                      {skillIcon} {skillLabel}
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>

            <Text {...s.streakNumber}>{habit.streak}🔥</Text>
            <Text {...s.streakLabel}>{t("streak.current")}</Text>

            <Box {...s.bottomSection}>
              <Text {...s.dayLabel}>
                {t("dayOf", { current: habit.currentDay, total: MAX_HABIT_DAYS })}
              </Text>
              <Box {...s.progressOuter}>
                <Box {...progressStyle} />
              </Box>
              <Box {...s.extraStats}>
                <Text {...s.extraStat}>
                  {t("streak.best")}: <strong>{habit.bestStreak}</strong>
                </Text>
                <Text {...s.extraStat}>
                  {t("consistency")}: <strong>{Math.round(habit.consistencyRate * 100)}%</strong>
                </Text>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
