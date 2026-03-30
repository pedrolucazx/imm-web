"use client";

import { useMemo, useState } from "react";
import { Alert, Box, Button, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { PageWrapper } from "@/components/PageWrapper";
import { GlobalStatsRow } from "@/components/Analytics/GlobalStatsRow";
import { HabitStatsGrid } from "@/components/Analytics/HabitStatsGrid";
import { JournalMetrics } from "@/components/Analytics/JournalMetrics";
import { MoodEnergyChart } from "@/components/Analytics/MoodEnergyChart";
import { ScoreTimeline } from "@/components/Analytics/ScoreTimeline";
import { StreakCalendar } from "@/components/Analytics/StreakCalendar";
import { WordCloudErrors } from "@/components/Analytics/WordCloudErrors";
import { useAnalyticsSummary } from "@/lib/hooks/useAnalytics";
import { s } from "./styles";

interface PhaseInfo {
  phase: number;
  theme: string;
}

function getCurrentPhaseInfo(habitPlan: Record<string, unknown> | null, currentDay: number) {
  if (habitPlan == null) {
    return null;
  }

  const phases = habitPlan["phases"];
  if (!Array.isArray(phases)) {
    return null;
  }

  for (const candidate of phases) {
    if (typeof candidate !== "object" || candidate == null) {
      continue;
    }

    const phase = candidate as Record<string, unknown>;
    const days = typeof phase["days"] === "string" ? phase["days"] : "";
    const phaseNumber = typeof phase["phase"] === "number" ? phase["phase"] : null;
    const theme = typeof phase["theme"] === "string" ? phase["theme"] : null;
    if (phaseNumber == null || theme == null) {
      continue;
    }

    const [start, end] = days.split("-").map(Number);
    if (!Number.isNaN(start) && !Number.isNaN(end) && currentDay >= start && currentDay <= end) {
      return { phase: phaseNumber, theme } satisfies PhaseInfo;
    }
  }

  return null;
}

export default function AnalyticsPage() {
  const t = useTranslations("analytics");
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const { data, isLoading, isError, refetch } = useAnalyticsSummary();

  const habits = useMemo(() => data?.habits ?? [], [data?.habits]);

  const selectedHabit = useMemo(() => {
    if (habits.length === 0) {
      return null;
    }

    if (selectedHabitId == null) {
      return habits[0] ?? null;
    }

    return habits.find((habit) => habit.id === selectedHabitId) ?? habits[0] ?? null;
  }, [habits, selectedHabitId]);

  const isLanguageHabit = (selectedHabit?.scoreTimeline?.length ?? 0) > 0;
  const phaseInfo = selectedHabit
    ? getCurrentPhaseInfo(selectedHabit.habitPlan, selectedHabit.currentDay)
    : null;

  return (
    <PageWrapper title={t("pageTitle")} loading={isLoading}>
      <Box {...s.content} data-tour="analytics-section">
        {isError ? (
          <Alert.Root colorPalette="yellow" {...s.errorCard}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title {...s.errorTitle}>{t("loadErrorTitle")}</Alert.Title>
              <Alert.Description {...s.errorText}>{t("loadErrorDescription")}</Alert.Description>
              <Button
                mt={3}
                size="sm"
                width="fit-content"
                colorPalette="yellow"
                onClick={() => refetch()}
              >
                {t("retry")}
              </Button>
            </Alert.Content>
          </Alert.Root>
        ) : (
          <>
            {data && (
              <>
                <Box {...s.globalGrid}>
                  <GlobalStatsRow global={data.global} />
                </Box>

                <HabitStatsGrid
                  habits={habits}
                  selectedId={selectedHabit?.id ?? null}
                  onSelect={setSelectedHabitId}
                />

                {selectedHabit && (
                  <Box {...s.detailCard}>
                    <Box {...s.detailHeader}>
                      <Text {...s.detailTitle}>
                        {selectedHabit.icon} {selectedHabit.name}
                      </Text>
                      {isLanguageHabit && phaseInfo && (
                        <Text {...s.detailPhase}>
                          {t("phase", { phase: phaseInfo.phase, theme: phaseInfo.theme })}
                        </Text>
                      )}
                    </Box>
                    <Box {...s.sectionGrid}>
                      <StreakCalendar habit={selectedHabit} logs={selectedHabit.logs} />
                      {isLanguageHabit ? (
                        <>
                          <ScoreTimeline habit={selectedHabit} />
                          <WordCloudErrors
                            habitId={selectedHabit.id}
                            habitColor={selectedHabit.color}
                          />
                        </>
                      ) : (
                        <JournalMetrics global={data.global} />
                      )}
                    </Box>
                  </Box>
                )}

                <MoodEnergyChart timeline={data.moodTimeline} />
              </>
            )}
          </>
        )}
      </Box>
    </PageWrapper>
  );
}
