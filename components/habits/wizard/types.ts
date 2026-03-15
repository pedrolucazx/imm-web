import { z } from "zod";

export type Level = "beginner" | "intermediate" | "advanced";

export const LEVELS: Level[] = ["beginner", "intermediate", "advanced"];

export const step1Schema = z.object({
  name: z.string().min(1),
  targetSkill: z.string().min(1),
});

export const step2SkillSchema = z.object({
  struggles: z.string().min(1),
  availableMinutes: z.number().int().min(5).max(120),
  level: z.enum(["beginner", "intermediate", "advanced"]),
});

export const step2TrackingSchema = z.object({
  wantPlan: z.boolean(),
  barrier: z.string(),
  availableMinutes: z.number().int().min(5).max(120),
  level: z.enum(["beginner", "intermediate", "advanced"]),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2SkillData = z.infer<typeof step2SkillSchema>;
export type Step2TrackingData = z.infer<typeof step2TrackingSchema>;

export const WIZARD_FORM_ID = "habit-wizard-form";
