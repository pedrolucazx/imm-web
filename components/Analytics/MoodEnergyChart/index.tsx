"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { format, parseISO } from "date-fns";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MoodTimelineEntry } from "../types";
import { chartColors, legendWrapperStyle, s, tooltipContentStyle } from "./styles";

interface MoodEnergyChartProps {
  timeline: MoodTimelineEntry[];
}

const CHART_MARGIN = { top: 30, right: 16, bottom: 40, left: 32 };

export function MoodEnergyChart({ timeline }: MoodEnergyChartProps) {
  const t = useTranslations("analytics");
  const hasMood = timeline.some((entry) => entry.mood !== null);

  if (!hasMood) return null;

  const moodLabel = t("mood.mood");
  const energyLabel = t("mood.energy");
  const axisDateLabel = t("mood.axisDate");
  const axisLevelLabel = t("mood.axisLevel");

  const data = timeline.map((entry) => ({
    label: format(parseISO(entry.date), "dd/MM"),
    [moodLabel]: entry.mood,
    [energyLabel]: entry.energy,
  }));

  return (
    <Box {...s.wrapper}>
      <Box {...s.header}>
        <Text {...s.title}>{t("mood.title")}</Text>
      </Box>
      <Box {...s.body}>
        <Box {...s.chartFrame}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={CHART_MARGIN}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#d4d4d4" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fontWeight: 700 }}
                tickLine={false}
                axisLine={false}
                interval={4}
                label={{
                  value: axisDateLabel,
                  position: "center",
                  dy: 32,
                  fontSize: 10,
                  fontWeight: 700,
                  fill: "#888",
                }}
              />
              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                tick={{ fontSize: 10, fontWeight: 700 }}
                tickLine={false}
                axisLine={false}
                width={36}
                label={{
                  value: axisLevelLabel,
                  angle: -90,
                  position: "center",
                  dx: -24,
                  fontSize: 10,
                  fontWeight: 700,
                  fill: "#888",
                }}
              />
              <Tooltip contentStyle={tooltipContentStyle} />
              <Legend verticalAlign="top" align="right" wrapperStyle={legendWrapperStyle} />
              <Line
                type="monotone"
                dataKey={moodLabel}
                stroke={chartColors.mood}
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 5, stroke: "white", strokeWidth: 2 }}
                isAnimationActive={false}
                connectNulls
              />
              <Line
                type="monotone"
                dataKey={energyLabel}
                stroke={chartColors.energy}
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 5, stroke: "white", strokeWidth: 2 }}
                isAnimationActive={false}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}
