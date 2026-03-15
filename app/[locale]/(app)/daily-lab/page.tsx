"use client";

import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import { PageWrapper } from "@/components/PageWrapper";
import { HabitChecklist } from "@/components/daily-lab/HabitChecklist";
import { HabitSelector } from "@/components/daily-lab/HabitSelector";
import { JournalEditor } from "@/components/daily-lab/JournalEditor";
import { useHabits } from "@/lib/hooks/useHabits";
import { useJournalEntries } from "@/lib/hooks/useJournal";
import type { Habit } from "@/types/habits";

function getLocalDateString(): string {
  return new Date().toLocaleDateString("sv-SE");
}

export default function DailyLabPage() {
  const t = useTranslations("dailyLab");
  const locale = useLocale();
  const { data: habits = [], isLoading } = useHabits();

  const activeHabits = habits.filter((h: Habit) => h.is_active);
  const today = getLocalDateString();

  const [selectedHabitId, setSelectedHabitId] = useState<string>("");
  const resolvedHabitId = selectedHabitId || activeHabits[0]?.id || null;

  const { data: journalEntries = [], isLoading: isLoadingEntry } = useJournalEntries(today);
  const journalEntry = journalEntries.find((e) => e.habitId === resolvedHabitId) ?? null;

  const selectedHabit = activeHabits.find((h) => h.id === resolvedHabitId);

  const displayDate = new Date().toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageWrapper title={`⚡ ${t("pageTitle")}`} loading={isLoading}>
      <Text fontSize="lg" fontWeight="500" color="mutedFg" mb={8}>
        {displayDate}
      </Text>

      <Box maxW="3xl">
        <HabitChecklist habits={activeHabits} />

        {activeHabits.length > 0 && (
          <Box>
            <Text
              fontSize="xl"
              fontWeight="800"
              textTransform="uppercase"
              letterSpacing="wider"
              mb={4}
            >
              {t("journal.sectionTitle")}
            </Text>

            <HabitSelector
              habits={activeHabits}
              selectedHabitId={resolvedHabitId ?? ""}
              onSelect={setSelectedHabitId}
            />

            {selectedHabit && (
              <JournalEditor
                habit={selectedHabit}
                existingEntry={journalEntry}
                isLoadingEntry={isLoadingEntry}
              />
            )}
          </Box>
        )}
      </Box>
    </PageWrapper>
  );
}
