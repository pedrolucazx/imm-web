"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { PageWrapper } from "@/components/PageWrapper";
import { HabitChecklist } from "@/components/daily-lab/HabitChecklist";
import { useHabits } from "@/lib/hooks/useHabits";
import type { Habit } from "@/types/habits";

export default function DailyLabPage() {
  const t = useTranslations("dailyLab");
  const { data: habits = [], isLoading } = useHabits();

  const activeHabits = habits.filter((h: Habit) => h.is_active);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageWrapper title={`⚡ ${t("pageTitle")}`} loading={isLoading}>
      <Text fontSize="lg" fontWeight="500" color="mutedFg" mb={8}>
        {today}
      </Text>

      <Box maxW="3xl">
        <HabitChecklist habits={activeHabits} />
      </Box>
    </PageWrapper>
  );
}
