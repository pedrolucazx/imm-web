"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { JournalEntry } from "@/types/journal";
import type { Habit } from "@/types/habits";
import { SKILL_ICONS } from "@/types/habits";
import { s } from "./styles";

interface RecentEntriesProps {
  entries: JournalEntry[];
  habits: Habit[];
  onEntryClick: (_date: string, _entries: JournalEntry[]) => void;
}

export function RecentEntries({ entries, habits, onEntryClick }: RecentEntriesProps) {
  const t = useTranslations("history");
  const tHabits = useTranslations("habits");

  const habitMap = Object.fromEntries(habits.map((h) => [h.id, h]));

  const recent = [...entries].sort((a, b) => b.entryDate.localeCompare(a.entryDate)).slice(0, 5);

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
            const dayEntries = entries.filter((e) => e.entryDate === entry.entryDate);

            return (
              <Box
                key={entry.id}
                {...s.card}
                onClick={() => onEntryClick(entry.entryDate, dayEntries)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && onEntryClick(entry.entryDate, dayEntries)
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
                  <Text {...s.date}>{entry.entryDate}</Text>
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
