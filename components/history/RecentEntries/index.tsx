"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations, useLocale } from "next-intl";
import type { JournalEntry } from "@/types/journal";
import type { Habit } from "@/types/habits";
import { SKILL_ICONS } from "@/types/habits";
import { s } from "./styles";

interface RecentEntriesProps {
  entries: JournalEntry[];
  habits: Habit[];
  onEntryClick: (_date: string, _entries: JournalEntry[]) => void;
}

function formatEntryDate(dateStr: string, locale: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(locale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function RecentEntries({ entries, habits, onEntryClick }: RecentEntriesProps) {
  const t = useTranslations("history");
  const tHabits = useTranslations("habits");
  const locale = useLocale();

  const habitMap = Object.fromEntries(habits.map((h) => [h.id, h]));

  const recent = entries.slice(0, 5);

  return (
    <Box {...s.section}>
      <Text {...s.title}>{t("recentTitle")}</Text>

      {recent.length === 0 ? (
        <Box {...s.empty}>
          <Text {...s.emptyText}>{t("noRecentEntries")}</Text>
        </Box>
      ) : (
        <Box {...s.list}>
          {recent.map((entry) => {
            const habit = habitMap[entry.habitId];

            return (
              <Box
                key={entry.id}
                {...s.card}
                onClick={() => onEntryClick(entry.entryDate, [entry])}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && onEntryClick(entry.entryDate, [entry])
                }
              >
                <Box {...s.cardHeader}>
                  <Box {...s.habitRow}>
                    {habit && (
                      <Text as="span" {...s.habitIcon}>
                        {habit.icon}
                      </Text>
                    )}
                    <Text {...s.habitName}>{habit?.name ?? "—"}</Text>
                    {habit && (
                      <Box {...s.skillBadge}>
                        {SKILL_ICONS[habit.target_skill]}{" "}
                        {tHabits(`skills.${habit.target_skill}.name`)}
                      </Box>
                    )}
                  </Box>
                  <Text {...s.date}>{formatEntryDate(entry.entryDate, locale)}</Text>
                </Box>

                <Text {...s.preview} lineClamp={2}>
                  {entry.content}
                </Text>

                <Text {...s.meta}>
                  {entry.wordCount ?? 0} {t("words")} · {t("mood")} {entry.moodScore ?? "—"}/5 ·{" "}
                  {t("energy")} {entry.energyScore ?? "—"}/5
                </Text>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
