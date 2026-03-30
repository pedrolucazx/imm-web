"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { Portal } from "@chakra-ui/react";
import * as tour from "@zag-js/tour";

// The default tour machine traps focus inside the card, which breaks inputs in
// other modals open simultaneously. Override trapFocus with a no-op so the tour
// acts as a passive overlay and never steals keyboard focus from the page.
const tourMachine = {
  ...tour.machine,
  implementations: {
    ...tour.machine.implementations,
    effects: {
      ...(
        tour.machine.implementations as Record<string, unknown> & {
          effects?: Record<string, unknown>;
        }
      )?.effects,
      trapFocus: () => {},
    },
  },
};
import { useMachine, normalizeProps } from "@zag-js/react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/navigation";
import { useId } from "react";
import type { StepDetails, StatusChangeDetails } from "@zag-js/tour";
import { useOnboarding } from "@/lib/hooks/useOnboarding";
import { ROUTES } from "@/lib/routes";
import { logger } from "@/lib/logger";
import { TourBackdrop } from "./TourBackdrop";
import { TourStep } from "./TourStep";

const TOTAL_STEPS = 6;
const TOUR_CARD_WIDTH = 380;
const TOUR_VIEWPORT_PADDING = 24;

function getAnchoredPlacement(target: HTMLElement | null): StepDetails["placement"] {
  if (typeof window === "undefined" || !target) {
    return "bottom";
  }

  const rect = target.getBoundingClientRect();
  const requiredX = TOUR_CARD_WIDTH + TOUR_VIEWPORT_PADDING;
  const requiredY = 220;

  const leftSpace = rect.left;
  const rightSpace = window.innerWidth - rect.right;
  const topSpace = rect.top;
  const bottomSpace = window.innerHeight - rect.bottom;

  if (rightSpace >= requiredX) return "right";
  if (leftSpace >= requiredX) return "left";
  if (bottomSpace >= requiredY) return "bottom";
  if (topSpace >= requiredY) return "top";

  return "bottom";
}

function buildAnchoredStep(
  id: string,
  title: string,
  description: string,
  selector: string,
  actions: NonNullable<StepDetails["actions"]>,
  navigateTo?: () => void
): StepDetails {
  const resolveTarget = () => document.querySelector<HTMLElement>(selector);
  const target = () => resolveTarget() ?? document.body;

  return {
    id,
    type: "tooltip" as const,
    title,
    description,
    target,
    placement: "bottom",
    effect({ update, show }) {
      const run = () => {
        const anchoredTarget = resolveTarget();
        if (!anchoredTarget) {
          update({ placement: "center" });
        } else {
          update({ placement: getAnchoredPlacement(anchoredTarget) });
        }
        show();
      };

      if (navigateTo) {
        navigateTo();
        // Poll until the target element appears after navigation (max ~2s)
        let attempts = 0;
        let timerId: ReturnType<typeof setTimeout>;
        const poll = () => {
          attempts++;
          if (resolveTarget() || attempts >= 8) {
            run();
          } else {
            timerId = setTimeout(poll, 250);
          }
        };
        timerId = setTimeout(poll, 300);
        return () => clearTimeout(timerId);
      }

      run();
    },
    actions,
  };
}

function buildTourSteps(
  t: ReturnType<typeof useTranslations<"onboarding">>,
  navigateToHabits: () => void,
  navigateToDailyLab: () => void,
  navigateToAnalytics: () => void
): StepDetails[] {
  return [
    {
      id: "welcome",
      type: "dialog",
      target: () => document.body,
      title: t("step0Title"),
      description: t("step0Desc"),
      actions: [{ label: t("btnNext"), action: "next", attrs: { variant: "primary" } }],
    },
    buildAnchoredStep(
      "habits",
      t("step1Title"),
      t("step1Desc"),
      '[data-tour="habits-section"]',
      [
        { label: t("btnBack"), action: "prev", attrs: { variant: "muted" } },
        { label: t("btnNext"), action: "next", attrs: { variant: "primary" } },
      ],
      navigateToHabits
    ),
    buildAnchoredStep(
      "daily-lab",
      t("step2Title"),
      t("step2Desc"),
      '[data-tour="habit-checklist"]',
      [
        { label: t("btnBack"), action: "prev", attrs: { variant: "muted" } },
        { label: t("btnNext"), action: "next", attrs: { variant: "primary" } },
      ],
      navigateToDailyLab
    ),
    buildAnchoredStep(
      "journal",
      t("step3Title"),
      t("step3Desc"),
      '[data-tour="journal-section"]',
      [
        { label: t("btnBack"), action: "prev", attrs: { variant: "muted" } },
        { label: t("btnNext"), action: "next", attrs: { variant: "primary" } },
      ],
      navigateToDailyLab
    ),
    buildAnchoredStep(
      "analytics",
      t("step4Title"),
      t("step4Desc"),
      '[data-tour="analytics-section"]',
      [
        { label: t("btnBack"), action: "prev", attrs: { variant: "muted" } },
        { label: t("btnNext"), action: "next", attrs: { variant: "primary" } },
      ],
      navigateToAnalytics
    ),
    {
      id: "finish",
      type: "dialog",
      target: () => document.body,
      title: t("step5Title"),
      description: t("step5Desc"),
      actions: [
        {
          label: t("btnStart"),
          action: "dismiss",
          attrs: { variant: "primary" },
        },
      ],
    },
  ];
}

function sanitizeTourSteps(steps: StepDetails[]): StepDetails[] {
  return steps.map((step) => {
    if (step.target != null || step.type != null) {
      return step;
    }

    return {
      ...step,
      type: "dialog",
      target: () => document.body,
    };
  });
}

export function OnboardingTour() {
  const t = useTranslations("onboarding");
  const router = useRouter();
  const { shouldShowTour, completeTour, skipTour } = useOnboarding();

  const navigateToHabits = useCallback(() => router.replace(ROUTES.APP_HABITS), [router]);
  const navigateToDailyLab = useCallback(() => router.replace(ROUTES.APP_DAILY_LAB), [router]);
  const navigateToAnalytics = useCallback(() => router.replace(ROUTES.APP_ANALYTICS), [router]);
  const steps = useMemo(
    () =>
      sanitizeTourSteps(
        buildTourSteps(t, navigateToHabits, navigateToDailyLab, navigateToAnalytics)
      ),
    [t, navigateToHabits, navigateToDailyLab, navigateToAnalytics]
  );

  const completeTourRef = useRef(completeTour);
  const skipTourRef = useRef(skipTour);

  useEffect(() => {
    completeTourRef.current = completeTour;
    skipTourRef.current = skipTour;
  }, [completeTour, skipTour]);

  const machineId = useId();
  const service = useMachine(tourMachine, {
    id: machineId,
    steps,
    closeOnInteractOutside: false,
    closeOnEscape: false,
    onStatusChange({ status, stepIndex }: StatusChangeDetails) {
      if (status === "completed" || (status === "dismissed" && stepIndex === TOTAL_STEPS - 1)) {
        completeTourRef
          .current()
          .catch((err: unknown) => logger.error({ err }, "onboarding: completeTour failed"));
      } else if (status === "dismissed" || status === "skipped") {
        skipTourRef
          .current()
          .catch((err: unknown) => logger.error({ err }, "onboarding: skipTour failed"));
      }
    },
  });

  const api = tour.connect(service, normalizeProps);

  useEffect(() => {
    if (shouldShowTour && !api.open) {
      api.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShowTour]);

  return (
    <Portal>
      {api.step && api.open && (
        <>
          <TourBackdrop api={api} />
          <TourStep api={api} totalSteps={TOTAL_STEPS} />
        </>
      )}
    </Portal>
  );
}
