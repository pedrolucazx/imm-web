export interface OnboardingSession {
  currentStep: number;
  skipped: boolean;
  completed: boolean;
  completedAt: string | null;
}

export interface UpdateOnboardingInput {
  currentStep?: number;
  skipped?: boolean;
  completed?: boolean;
}
