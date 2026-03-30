"use client";

import { Box, HStack, Text, chakra } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { Api } from "@zag-js/tour";
import { s } from "./TourStep.styles";

interface TourStepProps {
  api: Api;
}

const variantBg: Record<string, string> = {
  primary: "primary",
  secondary: "secondary",
  accent: "accent",
  muted: "muted",
};

function TourCard({ api }: TourStepProps) {
  const totalSteps = api.totalSteps;
  const t = useTranslations("onboarding");

  return (
    <Box {...api.getContentProps()} {...s.card}>
      <chakra.button {...api.getCloseTriggerProps()} aria-label={t("btnClose")} {...s.closeBtn}>
        ✕
      </chakra.button>

      <Text {...api.getTitleProps()} {...s.title}>
        {api.step?.title}
      </Text>

      <Box {...s.divider} />

      <Text {...api.getDescriptionProps()} {...s.description}>
        {api.step?.description}
      </Text>

      <HStack {...s.progressRow}>
        <HStack {...s.dotsRow}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <Box key={i} {...s.dot} {...(i <= api.stepIndex ? s.dotActive : s.dotInactive)} />
          ))}
        </HStack>
        <Text {...s.progressText}>
          {t("progress", { current: api.stepIndex + 1, total: totalSteps })}
        </Text>
      </HStack>

      <HStack {...s.footer}>
        {api.step?.actions?.map((action) => {
          const triggerProps = api.getActionTriggerProps({ action });
          const variant = (action.attrs?.variant as string) ?? "muted";
          const bg = variantBg[variant] ?? variantBg.muted;

          return (
            <chakra.button
              key={action.label}
              {...triggerProps}
              {...s.actionBtn}
              bg={bg}
              color="black"
            >
              {action.label}
            </chakra.button>
          );
        })}
      </HStack>
    </Box>
  );
}

export function TourStep({ api }: TourStepProps) {
  if (!api.step) return null;

  // Dialog steps: Zag's positioner has no position:fixed, so render in a centered
  // fixed overlay to avoid the backdrop stacking above the card.
  if (api.step.type === "dialog") {
    return (
      <Box
        position="fixed"
        inset="0"
        zIndex={9999}
        display="flex"
        alignItems="center"
        justifyContent="center"
        pointerEvents="none"
      >
        <Box pointerEvents="auto">
          <TourCard api={api} />
        </Box>
      </Box>
    );
  }

  // Tooltip steps: Zag's floating-ui provides position:fixed + transform.
  return (
    <Box {...api.getPositionerProps()}>
      <TourCard api={api} />
    </Box>
  );
}
