"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Box, Text } from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import { getDateFnsLocale } from "@/lib/date-locale";
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
  return format(new Date(), "yyyy-MM-dd");
}

export default function DailyLabPage() {
  const t = useTranslations("dailyLab");
  const tHabits = useTranslations("habits");
  const locale = useLocale();
  const { data: habits = [], isLoading } = useHabits();
  const { data: profile } = useGetProfile();

  const activeHabits = habits.filter((h: Habit) => h.is_active);
  const [today, setToday] = useState(getLocalDateString);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const next = getLocalDateString();
      setToday((prev) => (prev === next ? prev : next));
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const resolvedHabitId = selectedHabitId ?? activeHabits[0]?.id ?? null;

  const { data: journalEntries = [], isLoading: isLoadingEntry } = useJournalEntries(today);
  const journalEntry = journalEntries.find((e) => e.habitId === resolvedHabitId) ?? null;

  const { mutate: analyzeJournal, isPending: isAnalyzing } = useAnalyzeJournal();
  const { mutate: logHabit } = useLogHabit();

  const selectedHabit = activeHabits.find((h) => h.id === resolvedHabitId);

  const displayDate = useMemo(
    () => format(new Date(`${today}T00:00:00`), "PPPP", { locale: getDateFnsLocale(locale) }),
    [today, locale]
  );

  return (
    <PageWrapper title={`⚡ ${t("pageTitle")}`} loading={isLoading}>
      <Box maxW="800px">
        <Text {...s.displayDate}>{displayDate}</Text>

        <Box>
          <HabitChecklist
            habits={activeHabits}
            journalEntries={journalEntries}
            selectedHabitId={resolvedHabitId}
            onSelect={setSelectedHabitId}
            today={today}
          />

          {activeHabits.length > 0 && selectedHabit && (
            <Box>
              <Text {...s.sectionTitle}>{t("journal.sectionTitle")}</Text>

              {selectedHabit.habit_mode === "skill-building" && (
                <Box {...s.skillBanner}>
                  <Text {...s.skillBannerText}>
                    ✍️{" "}
                    {t("journal.skillBuildingBanner", {
                      skill: tHabits(`skills.${selectedHabit.target_skill}.name`),
                    })}
                  </Text>
                </Box>
              )}

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
      </Box>
    </PageWrapper>
  );
}
