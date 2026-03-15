export interface LanguageTeacherFeedback {
  agentType: "language-teacher";
  targetSkill: string;
  linguistic: {
    grammarScore: number;
    vocabularyScore: number;
    fluencyScore: number;
  };
  errors: Array<{
    original: string;
    corrected: string;
    explanation: string;
  }>;
  modelSentence: string;
  nextChallenge: string;
}

export interface BehavioralCoachFeedback {
  agentType: "behavioral-coach";
  targetSkill: string;
  behavioral: {
    moodDetected: "motivated" | "fatigued" | "neutral" | "stressed" | "relaxed" | "anxious";
    energyLevel: "high" | "medium" | "low";
  };
  habitAlignmentScore: number;
  insights: string[];
  actionSuggestion: string;
}

export type AiFeedback = LanguageTeacherFeedback | BehavioralCoachFeedback;

export interface JournalEntry {
  id: string;
  userId: string;
  habitId: string;
  entryDate: string;
  content: string;
  wordCount: number | null;
  uiLanguageSnap: string | null;
  targetSkillSnap: string | null;
  moodScore: number | null;
  energyScore: number | null;
  aiFeedback: AiFeedback | null;
  aiAgentType: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJournalEntryInput {
  habitId: string;
  content: string;
  moodScore?: number;
  energyScore?: number;
}
