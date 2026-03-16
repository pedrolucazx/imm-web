"use client";

import { Box, Text, chakra } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import type { JournalEntry } from "@/types/journal";
import type { Habit } from "@/types/habits";
import { s } from "./styles";

interface CalendarProps {
  entries: JournalEntry[];
  habits: Habit[];
  currentMonth: Date;
  onMonthChange: (_date: Date) => void;
  onDayClick: (_date: string, _entries: JournalEntry[]) => void;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function toDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function Calendar({
  entries,
  habits,
  currentMonth,
  onMonthChange,
  onDayClick,
}: CalendarProps) {
  const t = useTranslations("history");
  const locale = useLocale();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const today = new Date();
  const todayStr = toDateString(today.getFullYear(), today.getMonth(), today.getDate());

  const habitColorMap = Object.fromEntries(habits.map((h) => [h.id, h.color]));

  const entriesByDay: Record<string, JournalEntry[]> = {};
  for (const entry of entries) {
    if (entry.entryDate.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)) {
      if (!entriesByDay[entry.entryDate]) entriesByDay[entry.entryDate] = [];
      entriesByDay[entry.entryDate].push(entry);
    }
  }

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfWeek(year, month);

  const monthLabel = currentMonth.toLocaleDateString(locale, { month: "long", year: "numeric" });
  const weekdays = t.raw("weekdays") as string[];

  const handlePrev = () => onMonthChange(new Date(year, month - 1, 1));
  const handleNext = () => onMonthChange(new Date(year, month + 1, 1));

  return (
    <Box {...s.wrapper}>
      <Box {...s.header}>
        <chakra.button type="button" onClick={handlePrev} {...s.navBtn} aria-label={t("prevMonth")}>
          ‹
        </chakra.button>
        <Text {...s.monthTitle} textTransform="capitalize">
          {monthLabel}
        </Text>
        <chakra.button type="button" onClick={handleNext} {...s.navBtn} aria-label={t("nextMonth")}>
          ›
        </chakra.button>
      </Box>

      <Box {...s.weekdayGrid}>
        {weekdays.map((day) => (
          <Text key={day} {...s.weekdayLabel}>
            {day}
          </Text>
        ))}
      </Box>

      <Box {...s.daysGrid}>
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <Box key={`empty-${i}`} {...s.dayCellEmpty} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = toDateString(year, month, day);
          const dayEntries = entriesByDay[dateStr] ?? [];
          const hasEntries = dayEntries.length > 0;
          const isToday = dateStr === todayStr;

          return (
            <Box
              key={dateStr}
              {...s.dayCell}
              {...(isToday ? s.dayCellToday : {})}
              {...(hasEntries ? s.dayCellHasEntries : {})}
              onClick={hasEntries ? () => onDayClick(dateStr, dayEntries) : undefined}
              role={hasEntries ? "button" : undefined}
              tabIndex={hasEntries ? 0 : undefined}
              onKeyDown={
                hasEntries
                  ? (e) => (e.key === "Enter" || e.key === " ") && onDayClick(dateStr, dayEntries)
                  : undefined
              }
            >
              <Text {...s.dayNumber} {...(!hasEntries && !isToday ? s.dayNumberMuted : {})}>
                {day}
              </Text>
              {hasEntries && (
                <Box {...s.dotsRow}>
                  {dayEntries.slice(0, 5).map((entry) => (
                    <Box key={entry.id} {...s.dot} bg={habitColorMap[entry.habitId] ?? "black"} />
                  ))}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
