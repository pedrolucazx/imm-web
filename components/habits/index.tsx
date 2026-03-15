"use client";

import { useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { type TargetSkill, type HabitPlan, SKILL_ICONS, deriveHabitMode } from "@/types/habits";
import { usePreviewHabitPlan, useCreateHabit } from "@/lib/hooks/useHabits";
import { type PreviewPlanInput } from "@/lib/habit.service";
import { HabitSetupForm } from "./wizard/HabitSetupForm";
import { SkillPlanForm } from "./wizard/SkillPlanForm";
import { TrackingOptionsForm } from "./wizard/TrackingOptionsForm";
import { PlanReviewPanel } from "./wizard/PlanReviewPanel";
import {
  WIZARD_FORM_ID,
  type HabitSetupData,
  type SkillPlanData,
  type TrackingConfigData,
} from "./wizard/types";

const API_COLORS = [
  "bg-surface-mint",
  "bg-surface-sky",
  "bg-surface-coral",
  "bg-surface-lavender",
  "bg-surface-yellow",
];

interface HabitCreationWizardProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function HabitCreationWizard({ open, onClose, onCreated }: HabitCreationWizardProps) {
  const t = useTranslations("habitWizard");
  const tStep1 = useTranslations("habitWizard.step1");
  const tStep2Skill = useTranslations("habitWizard.step2Skill");
  const tStep2Track = useTranslations("habitWizard.step2Tracking");
  const tStep3 = useTranslations("habitWizard.step3");

  const [step, setStep] = useState(1);
  const [habitSetup, setHabitSetup] = useState<HabitSetupData | null>(null);
  const [planConfig, setPlanConfig] = useState<SkillPlanData | TrackingConfigData | null>(null);
  const [previewedPlan, setPreviewedPlan] = useState<HabitPlan | null>(null);
  const [stepError, setStepError] = useState<"generic" | "rate-limit" | null>(null);

  const previewMutation = usePreviewHabitPlan();
  const createMutation = useCreateHabit();

  const mode = habitSetup ? deriveHabitMode(habitSetup.targetSkill as TargetSkill) : null;
  const wantPlan = (planConfig as TrackingConfigData)?.wantPlan ?? false;
  const needsPlan = mode === "skill-building" || wantPlan;
  const randomColor = () => API_COLORS[Math.floor(Math.random() * API_COLORS.length)];

  const buildPainPoints = (data: SkillPlanData | TrackingConfigData): string[] => {
    const raw = "barrier" in data ? data.barrier : data.struggles;
    const parts = raw
      .split(/[.,;]+/)
      .map((s: string) => s.trim())
      .filter(Boolean);
    return parts.length > 0 ? parts : [raw];
  };

  const handleStep1Next = (data: HabitSetupData) => {
    setHabitSetup(data);
    setStep(2);
  };

  const handleStep2Next = async (data: SkillPlanData | TrackingConfigData) => {
    setPlanConfig(data);
    setStepError(null);
    setStep(3);

    const localNeedsPlan = mode === "skill-building" || (data as TrackingConfigData).wantPlan;
    if (!localNeedsPlan || !habitSetup) return;

    const previewInput: PreviewPlanInput = {
      name: habitSetup.name,
      targetSkill: habitSetup.targetSkill,
      painPoints: buildPainPoints(data),
      availableMinutes: data.availableMinutes,
      level: data.level,
    };

    try {
      const plan = await previewMutation.mutateAsync(previewInput);
      setPreviewedPlan(plan);
    } catch (err) {
      setStepError(err instanceof Error && err.message.includes("429") ? "rate-limit" : "generic");
    }
  };

  const handleRegenerate = async () => {
    if (!habitSetup || !planConfig) return;
    setStepError(null);

    const previewInput: PreviewPlanInput = {
      name: habitSetup.name,
      targetSkill: habitSetup.targetSkill,
      painPoints: buildPainPoints(planConfig),
      availableMinutes: planConfig.availableMinutes,
      level: planConfig.level,
    };

    try {
      const plan = await previewMutation.mutateAsync(previewInput);
      setPreviewedPlan(plan);
    } catch (err) {
      setStepError(err instanceof Error && err.message.includes("429") ? "rate-limit" : "generic");
    }
  };

  const handleConfirm = async () => {
    if (!habitSetup) return;
    await createMutation.mutateAsync({
      name: habitSetup.name,
      icon: SKILL_ICONS[habitSetup.targetSkill as TargetSkill],
      color: randomColor(),
      targetSkill: habitSetup.targetSkill,
      frequency: "daily",
      ...(previewedPlan ? { habitPlan: previewedPlan } : {}),
    });
    onCreated();
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setHabitSetup(null);
    setPlanConfig(null);
    setPreviewedPlan(null);
    setStepError(null);
    previewMutation.reset();
    createMutation.reset();
    onClose();
  };

  const goBack = () => {
    setStepError(null);
    setPreviewedPlan(null);
    previewMutation.reset();
    setStep((s) => s - 1);
  };

  const isPreviewLoading = previewMutation.isPending;
  const isConfirming = createMutation.isPending;
  const isDisabled = isPreviewLoading || isConfirming;

  const footer = (() => {
    if (step === 1) {
      return (
        <Button type="submit" form={WIZARD_FORM_ID} variant="primary" w="100%">
          {tStep1("next")}
        </Button>
      );
    }

    if (step === 2) {
      const label =
        mode === "skill-building"
          ? tStep2Skill("generate")
          : wantPlan
            ? tStep2Track("nextWithPlan")
            : tStep2Track("next");
      return (
        <Box display="flex" flexDirection="column" gap={2} w="100%">
          <Button
            type="submit"
            form={WIZARD_FORM_ID}
            variant="primary"
            w="100%"
            loading={isPreviewLoading}
          >
            {label}
          </Button>
          <Button type="button" variant="muted" w="100%" onClick={goBack}>
            {tStep2Skill("back")}
          </Button>
        </Box>
      );
    }

    if (step === 3 && stepError !== null) {
      return (
        <Button type="button" variant="muted" w="100%" onClick={goBack}>
          {tStep3("back")}
        </Button>
      );
    }

    if (step === 3) {
      return (
        <Box display="flex" flexDirection="column" gap={2} w="100%">
          <HStack gap={2}>
            <Button type="button" variant="muted" flex={1} onClick={goBack} disabled={isDisabled}>
              {tStep3("back")}
            </Button>
            {needsPlan && (
              <Button
                type="button"
                variant="muted"
                flex={1}
                onClick={handleRegenerate}
                disabled={isDisabled}
                loading={isPreviewLoading}
              >
                {tStep3("regenerate")}
              </Button>
            )}
          </HStack>
          <Button
            type="button"
            variant="primary"
            w="100%"
            onClick={handleConfirm}
            disabled={isDisabled}
            loading={isConfirming}
          >
            {tStep3("create")}
          </Button>
        </Box>
      );
    }

    return null;
  })();

  return (
    <Modal open={open} onClose={handleClose} title={t("title")} footer={footer} maxW="680px">
      <HStack gap={2} mb={6}>
        {[1, 2, 3].map((n) => (
          <Box
            key={n}
            flex={1}
            h={2}
            bg={step >= n ? "primary" : "muted"}
            border="2px solid black"
          />
        ))}
      </HStack>

      {step === 1 && (
        <HabitSetupForm defaultValues={habitSetup ?? undefined} onNext={handleStep1Next} />
      )}

      {step === 2 && mode === "skill-building" && (
        <SkillPlanForm
          defaultValues={planConfig ? (planConfig as SkillPlanData) : undefined}
          onNext={handleStep2Next}
        />
      )}

      {step === 2 && mode === "tracking-coached" && (
        <TrackingOptionsForm
          defaultValues={planConfig ? (planConfig as TrackingConfigData) : undefined}
          onNext={handleStep2Next}
        />
      )}

      {step === 3 && habitSetup && (
        <PlanReviewPanel
          habitName={habitSetup.name}
          habitIcon={SKILL_ICONS[habitSetup.targetSkill as TargetSkill]}
          habitTargetSkill={habitSetup.targetSkill as TargetSkill}
          wantPlan={wantPlan}
          previewedPlan={previewedPlan}
          isLoading={isPreviewLoading}
        />
      )}

      {step === 3 && stepError !== null && (
        <Box border="3px solid black" bg="surface.coral" p={4} mt={4}>
          <strong>{tStep3(stepError === "rate-limit" ? "rateLimitTitle" : "errorTitle")}</strong>
          <br />
          <span style={{ fontSize: "0.875rem" }}>
            {tStep3(stepError === "rate-limit" ? "rateLimitSubtitle" : "errorSubtitle")}
          </span>
        </Box>
      )}
    </Modal>
  );
}
