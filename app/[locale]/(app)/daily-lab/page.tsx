"use client";

import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import { PageWrapper } from "@/components/PageWrapper";
import { HabitChecklist } from "@/components/daily-lab/HabitChecklist";
import { JournalEditor } from "@/components/daily-lab/JournalEditor";
import { AIFeedbackPanel } from "@/components/daily-lab/AIFeedbackPanel";
import { useHabits, useLogHabit } from "@/lib/hooks/useHabits";
import { useJournalEntries, useAnalyzeJournal } from "@/lib/hooks/useJournal";
import { useGetProfile } from "@/lib/hooks/useProfile";
import type { Habit } from "@/types/habits";
import { s } from "./styles";

function getLocalDateString(): string {
  return new Date().toLocaleDateString("sv-SE");
}

export default function DailyLabPage() {
  const t = useTranslations("dailyLab");
  const locale = useLocale();
  const { data: habits = [], isLoading } = useHabits();
  const { data: profile } = useGetProfile();

  const activeHabits = habits.filter((h: Habit) => h.is_active);
  const today = getLocalDateString();

  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const resolvedHabitId = selectedHabitId ?? activeHabits[0]?.id ?? null;

  const { data: journalEntries = [], isLoading: isLoadingEntry } = useJournalEntries(today);
  const journalEntry = journalEntries.find((e) => e.habitId === resolvedHabitId) ?? null;

  const { mutate: analyzeJournal, isPending: isAnalyzing } = useAnalyzeJournal();
  const { mutate: logHabit } = useLogHabit();

  const selectedHabit = activeHabits.find((h) => h.id === resolvedHabitId);

  const displayDate = new Date().toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageWrapper title={`⚡ ${t("pageTitle")}`} loading={isLoading}>
      <Text {...s.displayDate}>{displayDate}</Text>

      <Box maxW="3xl">
        <HabitChecklist
          habits={activeHabits}
          journalEntries={journalEntries}
          selectedHabitId={selectedHabitId}
          onSelect={setSelectedHabitId}
        />

        {activeHabits.length > 0 && selectedHabit && (
          <Box>
            <Text {...s.sectionTitle}>{t("journal.sectionTitle")}</Text>

            <JournalEditor
              habit={selectedHabit}
              existingEntry={journalEntry}
              isLoadingEntry={isLoadingEntry}
              isAnalyzing={isAnalyzing}
              today={today}
              onAnalyze={(journalEntryId, habitId) =>
                analyzeJournal(
                  { journalEntryId, habitId },
                  {
                    onSuccess: () =>
                      logHabit({ id: habitId, input: { logDate: today, completed: true } }),
                  }
                )
              }
            />

            <AIFeedbackPanel
              entry={journalEntry}
              isAnalyzing={isAnalyzing}
              aiRequestsToday={profile?.profile.aiRequestsToday ?? 0}
              habitColor={selectedHabit.color}
            />
          </Box>
        )}
      </Box>
    </PageWrapper>
  );
}
