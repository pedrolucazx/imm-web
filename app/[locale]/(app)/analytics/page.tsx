"use client";

import { useMemo, useState } from "react";
import { Alert, Box, Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { PageWrapper } from "@/components/PageWrapper";
import { GlobalStatsRow } from "@/components/Analytics/GlobalStatsRow";
import { HabitStatsGrid } from "@/components/Analytics/HabitStatsGrid";
import { JournalMetrics } from "@/components/Analytics/JournalMetrics";
import { MoodEnergyChart } from "@/components/Analytics/MoodEnergyChart";
import { ScoreTimeline } from "@/components/Analytics/ScoreTimeline";
import { StreakCalendar } from "@/components/Analytics/StreakCalendar";
import { useAnalyticsSummary } from "@/lib/hooks/useAnalytics";
import { s } from "./styles";

export default function AnalyticsPage() {
  const t = useTranslations("analytics");
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const { data, isLoading, isError, refetch } = useAnalyticsSummary();

  const habits = data?.habits ?? [];

  const selectedHabit = useMemo(() => {
    if (habits.length === 0) {
      return null;
    }

    if (selectedHabitId == null) {
      return habits[0] ?? null;
    }

    return habits.find((habit) => habit.id === selectedHabitId) ?? habits[0] ?? null;
  }, [habits, selectedHabitId]);

  return (
    <PageWrapper title={t("pageTitle")} loading={isLoading}>
      <Box {...s.content}>
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

                <MoodEnergyChart timeline={data.moodTimeline} />

                <JournalMetrics global={data.global} />

                <HabitStatsGrid
                  habits={habits}
                  selectedId={selectedHabit?.id ?? null}
                  onSelect={setSelectedHabitId}
                />

                {selectedHabit && (
                  <Box {...s.sectionGrid}>
                    <StreakCalendar habit={selectedHabit} logs={selectedHabit.logs} />
                    <ScoreTimeline habit={selectedHabit} />
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </PageWrapper>
  );
}
