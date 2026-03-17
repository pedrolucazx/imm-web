"use client";

import { useMemo } from "react";
import { Box, Text, chakra } from "@chakra-ui/react";
import { useTranslations, useLocale } from "next-intl";
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

function toDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function Calendar({ entries, currentMonth, onMonthChange, onDayClick }: CalendarProps) {
  const t = useTranslations("history");
  const locale = useLocale();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const today = new Date();
  const todayStr = toDateString(today.getFullYear(), today.getMonth(), today.getDate());

  const entriesByDate = useMemo(() => {
    const map: Record<string, JournalEntry[]> = {};
    for (const entry of entries) {
      if (!map[entry.entryDate]) map[entry.entryDate] = [];
      map[entry.entryDate].push(entry);
    }
    return map;
  }, [entries]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const monthLabel = currentMonth.toLocaleDateString(locale, { month: "long", year: "numeric" });
  const weekdays = t.raw("weekdays") as string[];

  return (
    <Box {...s.wrapper}>
      <Box {...s.header}>
        <chakra.button
          type="button"
          onClick={() => onMonthChange(new Date(year, month - 1, 1))}
          {...s.navBtn}
          aria-label={t("prevMonth")}
        >
          ‹
        </chakra.button>
        <Text {...s.monthTitle} textTransform="capitalize">
          {monthLabel}
        </Text>
        <chakra.button
          type="button"
          onClick={() => onMonthChange(new Date(year, month + 1, 1))}
          {...s.navBtn}
          aria-label={t("nextMonth")}
        >
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
          const dayEntries = entriesByDate[dateStr] ?? [];
          const hasEntries = dayEntries.length > 0;
          const isToday = dateStr === todayStr;

          return (
            <Box
              key={dateStr}
              {...s.dayCell}
              {...(hasEntries ? s.dayCellHasEntries : {})}
              {...(isToday ? s.dayCellToday : {})}
              onClick={hasEntries ? () => onDayClick(dateStr, dayEntries) : undefined}
              role={hasEntries ? "button" : undefined}
              tabIndex={hasEntries ? 0 : undefined}
              onKeyDown={
                hasEntries
                  ? (e) => (e.key === "Enter" || e.key === " ") && onDayClick(dateStr, dayEntries)
                  : undefined
              }
            >
              <Text {...s.dayNumber}>{day}</Text>
              {hasEntries && <Text {...s.entryCount}>{dayEntries.length}📝</Text>}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
