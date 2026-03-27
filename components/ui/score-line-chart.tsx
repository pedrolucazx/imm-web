"use client";

import { Box } from "@chakra-ui/react";
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
import { addDays, format, isValid, parseISO, subDays } from "date-fns";
import { chartColors, legendWrapperStyle, s, tooltipContentStyle } from "./score-line-chart.styles";

export interface ScoreEntry {
  date: string;
  grammarScore: number;
  vocabularyScore: number;
  fluencyScore: number;
}

interface ScoreLineChartProps {
  entries: ScoreEntry[];
  currentDay: number;
  labels: {
    grammar: string;
    vocabulary: string;
    fluency: string;
    axisDate: string;
    axisScore: string;
  };
}

const TOTAL_DAYS = 66;
const CHART_MARGIN = { top: 30, right: 16, bottom: 40, left: 32 };

export function ScoreLineChart({ entries, currentDay, labels }: ScoreLineChartProps) {
  const safeCurrentDay = Math.max(1, Math.min(currentDay, TOTAL_DAYS));

  const startDate =
    entries
      .map((entry) => parseISO(entry.date))
      .filter((date) => isValid(date))
      .sort((a, b) => a.getTime() - b.getTime())[0] ?? subDays(new Date(), safeCurrentDay - 1);

  const entryMap = new Map(entries.map((entry) => [entry.date, entry]));

  const data = Array.from({ length: TOTAL_DAYS }, (_, i) => {
    const dateObj = addDays(startDate, i);
    const date = format(dateObj, "yyyy-MM-dd");
    const entry = entryMap.get(date);

    return {
      label: format(dateObj, "dd/MM"),
      [labels.grammar]: entry?.grammarScore ?? null,
      [labels.vocabulary]: entry?.vocabularyScore ?? null,
      [labels.fluency]: entry?.fluencyScore ?? null,
    };
  });

  return (
    <Box {...s.wrapper}>
      <Box {...s.chartFrame}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={CHART_MARGIN}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#d4d4d4" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fontWeight: 700 }}
              tickLine={false}
              axisLine={false}
              interval={6}
              label={{
                value: labels.axisDate,
                position: "center",
                dy: 32,
                fontSize: 10,
                fontWeight: 700,
                fill: "#888",
              }}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fontSize: 10, fontWeight: 700 }}
              tickLine={false}
              axisLine={false}
              width={36}
              label={{
                value: labels.axisScore,
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
              dataKey={labels.grammar}
              stroke={chartColors.grammar}
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 5, stroke: "white", strokeWidth: 2 }}
              isAnimationActive={false}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey={labels.vocabulary}
              stroke={chartColors.vocabulary}
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 5, stroke: "white", strokeWidth: 2 }}
              isAnimationActive={false}
              connectNulls
            />
            <Line
              type="monotone"
              dataKey={labels.fluency}
              stroke={chartColors.fluency}
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
  );
}
