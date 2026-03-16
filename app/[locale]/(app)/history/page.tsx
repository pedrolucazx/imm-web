"use client";

import { useState } from "react";
import { Box, Text, Separator } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { PageWrapper } from "@/components/PageWrapper";
import { Calendar } from "@/components/Calendar";
import { RecentEntries } from "@/components/history/RecentEntries";
import { Modal } from "@/components/ui/modal";
import { LanguageTeacherPanel } from "@/components/daily-lab/AIFeedbackPanel/LanguageTeacherPanel";
import { BehavioralCoachPanel } from "@/components/daily-lab/AIFeedbackPanel/BehavioralCoachPanel";
import { useJournalHistory } from "@/lib/hooks/useJournal";
import { useHabits } from "@/lib/hooks/useHabits";
import type { JournalEntry } from "@/types/journal";
import type { Habit } from "@/types/habits";
import { SKILL_ICONS } from "@/types/habits";

export default function HistoryPage() {
  const t = useTranslations("history");
  const tHabits = useTranslations("habits");

  const { data: entries = [], isLoading: isLoadingEntries } = useJournalHistory();
  const { data: habits = [], isLoading: isLoadingHabits } = useHabits();
  const activeHabits = (habits as Habit[]).filter((h) => h.is_active);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEntries, setSelectedEntries] = useState<JournalEntry[]>([]);

  const habitMap = Object.fromEntries((habits as Habit[]).map((h) => [h.id, h]));

  const handleDayClick = (date: string, dayEntries: JournalEntry[]) => {
    setSelectedDate(date);
    setSelectedEntries(dayEntries);
    setModalOpen(true);
  };

  return (
    <PageWrapper title={t("pageTitle")} loading={isLoadingEntries || isLoadingHabits}>
      <Box maxW="3xl">
        <Calendar
          entries={entries}
          habits={activeHabits}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
          onDayClick={handleDayClick}
        />

        <RecentEntries entries={entries} habits={activeHabits} onEntryClick={handleDayClick} />
      </Box>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedDate ?? ""}
        maxW="680px"
      >
        {selectedEntries.map((entry, idx) => {
          const habit = habitMap[entry.habitId];
          return (
            <Box key={entry.id}>
              {idx > 0 && <Separator borderColor="black" borderWidth="2px" my={6} />}

              <Box border="3px solid black" bg="card" p={4} mb={4}>
                {habit && (
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Text fontSize="lg">{habit.icon}</Text>
                    <Text fontWeight="800" fontSize="sm">
                      {habit.name}
                    </Text>
                    <Box
                      px={2}
                      py="2px"
                      border="2px solid black"
                      fontSize="xs"
                      fontWeight="800"
                      bg="muted"
                    >
                      {SKILL_ICONS[habit.target_skill]}{" "}
                      {tHabits(`skills.${habit.target_skill}.name`)}
                    </Box>
                  </Box>
                )}
                <Text fontSize="sm" fontWeight="500" mb={2}>
                  {entry.content}
                </Text>
                <Text fontSize="xs" color="mutedFg" fontWeight="700">
                  {entry.wordCount ?? 0} {t("words")} · {t("mood")} {entry.moodScore ?? "—"}/5 ·{" "}
                  {t("energy")} {entry.energyScore ?? "—"}/5
                </Text>
              </Box>

              {entry.aiFeedback?.agentType ? (
                <Box border="3px solid black" p={5} bg={habit?.color ?? "card"} boxShadow="brutal">
                  {entry.aiFeedback.agentType === "language-teacher" && (
                    <LanguageTeacherPanel feedback={entry.aiFeedback} />
                  )}
                  {entry.aiFeedback.agentType === "behavioral-coach" && (
                    <BehavioralCoachPanel feedback={entry.aiFeedback} />
                  )}
                </Box>
              ) : (
                <Box border="3px solid black" bg="muted" p={4} textAlign="center">
                  <Text fontSize="sm" fontWeight="500" color="mutedFg">
                    {t("noFeedback")}
                  </Text>
                </Box>
              )}
            </Box>
          );
        })}
      </Modal>
    </PageWrapper>
  );
}
