"use client";

import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { useTranslations, useLocale } from "next-intl";
import { format, subDays } from "date-fns";
import { formatEntryDate } from "@/lib/date-locale";
import { toChakraColor } from "@/lib/habit-utils";
import type { HabitLog, HabitStat } from "../types";
import { s } from "./styles";

interface StreakCalendarProps {
  habit: HabitStat | null;
  logs?: HabitLog[];
}

const DAYS = 66;

function buildGrid(
  logs: HabitLog[] | undefined,
  currentDay: number
): { date: string; completed: boolean }[] {
  const safeCurrentDay = Math.max(1, Math.min(currentDay, DAYS));
  const completedSet = new Set((logs ?? []).filter((l) => l.completed).map((l) => l.logDate));
  const today = new Date();
  const startDate = subDays(today, safeCurrentDay - 1);
  const cells: { date: string; completed: boolean }[] = [];

  for (let i = 0; i < DAYS; i++) {
    const date = format(subDays(startDate, -i), "yyyy-MM-dd");
    cells.push({ date, completed: completedSet.has(date) });
  }

  return cells;
}

function resolveCompletedStyle(color: string) {
  switch (color) {
    case "surface.sky":
      return s.completedSky;
    case "surface.coral":
      return s.completedCoral;
    case "surface.lavender":
      return s.completedLavender;
    case "surface.yellow":
      return s.completedYellow;
    case "surface.mint":
    default:
      return s.completedMint;
  }
}

export function StreakCalendar({ habit, logs }: StreakCalendarProps) {
  const t = useTranslations("analytics");
  const locale = useLocale();
  const cells = buildGrid(logs, habit?.currentDay ?? 1);
  const completedStyle = resolveCompletedStyle(toChakraColor(habit?.color ?? ""));

  return (
    <VStack {...s.wrapper}>
      <Text {...s.title}>{t("calendar.title")}</Text>
      <Box {...s.scrollContainer}>
        <Box {...s.grid} role="grid">
          {cells.map((cell) => (
            <Box
              key={cell.date}
              title={`${formatEntryDate(cell.date, locale)}${cell.completed ? " ✓" : ""}`}
              aria-label={`${formatEntryDate(cell.date, locale)}${cell.completed ? ` - ${t("calendar.done")}` : ` - ${t("calendar.notDone")}`}`}
              role="gridcell"
              {...s.cell}
              {...(cell.completed ? completedStyle : s.pendingRegular)}
            />
          ))}
        </Box>
      </Box>
      <HStack {...s.legend}>
        <Box {...s.legendCell} {...s.pendingRegular} />
        <Text {...s.legendText}>{t("calendar.notDone")}</Text>
        <Box {...s.legendCell} {...completedStyle} />
        <Text {...s.legendText}>{t("calendar.done")}</Text>
      </HStack>
    </VStack>
  );
}
