"use client";

import { useMemo, useState } from "react";
import { Box, Text, Separator } from "@chakra-ui/react";
import { useTranslations, useLocale } from "next-intl";
import { PageWrapper } from "@/components/PageWrapper";
import { Calendar } from "@/components/Calendar";
import { RecentEntries } from "@/components/history/RecentEntries";
import { LanguageTeacherPanel } from "@/components/daily-lab/AIFeedbackPanel/LanguageTeacherPanel";
import { BehavioralCoachPanel } from "@/components/daily-lab/AIFeedbackPanel/BehavioralCoachPanel";
import { Modal } from "@/components/ui/modal";
import { useJournalHistory } from "@/lib/hooks/useJournal";
import { useHabits } from "@/lib/hooks/useHabits";
import type { JournalEntry } from "@/types/journal";
import type { Habit } from "@/types/habits";
import { SKILL_ICONS } from "@/types/habits";
import { s } from "./styles";

export default function HistoryPage() {
  const t = useTranslations("history");
  const tHabits = useTranslations("habits");
  const locale = useLocale();

  const { data: entries = [], isLoading: isLoadingEntries } = useJournalHistory();
  const { data: habits = [], isLoading: isLoadingHabits } = useHabits();
  const allHabits = habits as Habit[];

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [selectedEntries, setSelectedEntries] = useState<JournalEntry[]>([]);

  const monthPrefix = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}`;

  const monthEntries = useMemo(
    () => entries.filter((e) => e.entryDate.startsWith(monthPrefix)),
    [entries, monthPrefix]
  );

  const habitMap = Object.fromEntries(allHabits.map((h) => [h.id, h]));

  const handleEntrySelect = (_date: string, dayEntries: JournalEntry[]) => {
    setSelectedEntries(dayEntries);
  };

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
    setSelectedEntries([]);
  };

  const modalDate = selectedEntries[0]?.entryDate;
  const formattedDate = modalDate
    ? (() => {
        const [y, m, d] = modalDate.split("-").map(Number);
        return new Date(y, m - 1, d).toLocaleDateString(locale, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      })()
    : null;

  return (
    <PageWrapper title={t("pageTitle")} loading={isLoadingEntries || isLoadingHabits}>
      <Box {...s.pageContainer}>
        <Calendar
          entries={monthEntries}
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          onDayClick={handleEntrySelect}
        />

        <RecentEntries entries={monthEntries} habits={allHabits} onEntryClick={handleEntrySelect} />
      </Box>

      <Modal
        open={selectedEntries.length > 0}
        onClose={() => setSelectedEntries([])}
        title={formattedDate ?? ""}
        maxW="680px"
      >
        <Box {...s.badgesRow}>
          {selectedEntries.map((entry) =>
            entry.aiFeedback?.agentType ? (
              <Box key={entry.id} {...s.agentBadge}>
                {t(`agentTypes.${entry.aiFeedback.agentType}`)}
              </Box>
            ) : null
          )}
        </Box>
        {selectedEntries.map((entry, index) => {
          const habit = habitMap[entry.habitId];
          return (
            <Box key={entry.id}>
              {index > 0 && <Separator {...s.separator} />}

              <Box {...s.entryCard}>
                <Box {...s.habitRow}>
                  {habit && (
                    <>
                      <Text {...s.habitIcon}>{habit.icon}</Text>
                      <Text {...s.habitName}>{habit.name}</Text>
                      <Box {...s.skillBadge}>
                        {SKILL_ICONS[habit.target_skill]}{" "}
                        {tHabits(`skills.${habit.target_skill}.name`)}
                      </Box>
                    </>
                  )}
                </Box>
                <Text {...s.entryContent}>{entry.content}</Text>
                <Text {...s.entryMeta}>
                  {entry.wordCount ?? 0} {t("words")} · {t("mood")} {entry.moodScore ?? "—"}/5 ·{" "}
                  {t("energy")} {entry.energyScore ?? "—"}/5
                </Text>
              </Box>

              {entry.aiFeedback?.agentType ? (
                <Box {...s.feedbackBox} bg={habit?.color ?? "card"}>
                  {entry.aiFeedback.agentType === "language-teacher" && (
                    <LanguageTeacherPanel feedback={entry.aiFeedback} />
                  )}
                  {entry.aiFeedback.agentType === "behavioral-coach" && (
                    <BehavioralCoachPanel feedback={entry.aiFeedback} />
                  )}
                </Box>
              ) : (
                <Box {...s.noFeedback}>
                  <Text {...s.noFeedbackText}>{t("noFeedback")}</Text>
                </Box>
              )}
            </Box>
          );
        })}
      </Modal>
    </PageWrapper>
  );
}
