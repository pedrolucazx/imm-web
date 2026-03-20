"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations, useLocale } from "next-intl";
import { format, subDays } from "date-fns";
import { formatEntryDate } from "@/lib/date-locale";
import { toChakraColor } from "@/lib/habit-utils";
import type { HabitLog, HabitStat } from "../types";
import { s } from "./styles";

interface StreakCalendarProps {
  habit: HabitStat | null;
  logs?: HabitLog[];
  compact?: boolean;
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

export function StreakCalendar({ habit, logs, compact = false }: StreakCalendarProps) {
  const t = useTranslations("analytics");
  const locale = useLocale();
  const cells = buildGrid(logs, habit?.currentDay ?? 1);
  const completedStyle = resolveCompletedStyle(toChakraColor(habit?.color ?? ""));
  const pendingStyle = compact ? s.pendingCompact : s.pendingRegular;
  const wrapperStyle = compact ? s.wrapperCompact : s.wrapper;
  const titleStyle = compact ? s.titleCompact : s.title;
  const scrollStyle = compact ? s.scrollContainerCompact : s.scrollContainer;
  const gridStyle = compact ? s.gridCompact : s.grid;
  const legendStyle = compact ? s.legendCompact : s.legend;
  const legendCellStyle = compact ? s.legendCellCompact : s.legendCell;
  const legendTextStyle = compact ? s.legendTextCompact : s.legendText;

  return (
    <Box {...wrapperStyle}>
      <Text {...titleStyle}>{t("calendar.title")}</Text>
      <Box {...scrollStyle}>
        <Box {...gridStyle}>
          {cells.map((cell) => (
            <Box
              key={cell.date}
              title={`${formatEntryDate(cell.date, locale)}${cell.completed ? " ✓" : ""}`}
              {...s.cell}
              {...(cell.completed ? completedStyle : pendingStyle)}
            />
          ))}
        </Box>
      </Box>
      <Box {...legendStyle}>
        <Box {...legendCellStyle} {...pendingStyle} />
        <Text {...legendTextStyle}>{t("calendar.notDone")}</Text>
        <Box {...legendCellStyle} {...completedStyle} />
        <Text {...legendTextStyle}>{t("calendar.done")}</Text>
      </Box>
    </Box>
  );
}
