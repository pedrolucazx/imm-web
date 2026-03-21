export const API_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password",
  INVALID_PASSWORD: "Invalid password",
  EMAIL_ALREADY_EXISTS: "User with this email already exists",
  VALIDATION_FAILED: "Validation failed",
  INTERNAL_SERVER_ERROR: "Internal server error",
  NOT_FOUND: "Resource not found",
  HABIT_NOT_FOUND: "Habit not found",
  JOURNAL_ENTRY_NOT_FOUND: "Journal entry not found",
  HABITS_LIMIT_REACHED: "Limit of active habits reached",
  PLAN_ALREADY_GENERATING: "Plan is already being generated",
  HABIT_INACTIVE: "Habit is not active",
  AI_RATE_LIMIT: "AI rate limit exceeded",
  AI_TIMEOUT: "AI request timed out",
  AI_NOT_CONFIGURED: "AI service not configured",
  REFRESH_TOKEN_EXPIRED: "Session expired",
  INVALID_REFRESH_TOKEN: "Invalid session",
  FORBIDDEN: "Access denied",
  NETWORK_ERROR: "Network error",
} as const;

export type ApiErrorKey = keyof typeof API_ERROR_MESSAGES;

export function mapApiErrorToKey(message: string): ApiErrorKey | null {
  const normalizedMessage = message.toLowerCase().trim();

  if (normalizedMessage.includes("invalid email or password")) {
    return "INVALID_CREDENTIALS";
  }

  if (normalizedMessage.includes("invalid password")) {
    return "INVALID_PASSWORD";
  }

  if (
    normalizedMessage.includes("user with this email already exists") ||
    normalizedMessage.includes("email already exists") ||
    normalizedMessage.includes("duplicate key")
  ) {
    return "EMAIL_ALREADY_EXISTS";
  }

  if (normalizedMessage.includes("validation failed")) {
    return "VALIDATION_FAILED";
  }

  if (
    normalizedMessage.includes("internal server error") ||
    normalizedMessage.includes("unexpected error")
  ) {
    return "INTERNAL_SERVER_ERROR";
  }

  if (normalizedMessage.includes("journal entry not found")) {
    return "JOURNAL_ENTRY_NOT_FOUND";
  }

  if (normalizedMessage.includes("habit not found")) {
    return "HABIT_NOT_FOUND";
  }

  if (
    normalizedMessage.includes("not found") ||
    normalizedMessage.includes("profile not found") ||
    normalizedMessage.includes("user not found")
  ) {
    return "NOT_FOUND";
  }

  if (
    normalizedMessage.includes("limit of") &&
    normalizedMessage.includes("active habits reached")
  ) {
    return "HABITS_LIMIT_REACHED";
  }

  if (normalizedMessage.includes("plan is already being generated")) {
    return "PLAN_ALREADY_GENERATING";
  }

  if (normalizedMessage.includes("habit is not active")) {
    return "HABIT_INACTIVE";
  }

  if (
    normalizedMessage.includes("gemini rate limit") ||
    normalizedMessage.includes("ai rate limit") ||
    normalizedMessage.includes("rate limit exceeded")
  ) {
    return "AI_RATE_LIMIT";
  }

  if (
    normalizedMessage.includes("ai request timed out") ||
    normalizedMessage.includes("gemini timeout")
  ) {
    return "AI_TIMEOUT";
  }

  if (
    normalizedMessage.includes("gemini") ||
    normalizedMessage.includes("ai service") ||
    normalizedMessage.includes("not configured") ||
    normalizedMessage.includes("api key")
  ) {
    return "AI_NOT_CONFIGURED";
  }

  if (normalizedMessage.includes("refresh token expired")) {
    return "REFRESH_TOKEN_EXPIRED";
  }

  if (
    normalizedMessage.includes("invalid or expired refresh token") ||
    normalizedMessage.includes("invalid session") ||
    normalizedMessage.includes("invalid refresh token")
  ) {
    return "INVALID_REFRESH_TOKEN";
  }

  if (normalizedMessage.includes("access denied") || normalizedMessage.includes("forbidden")) {
    return "FORBIDDEN";
  }

  return null;
}

export function isNetworkError(message: string): boolean {
  const normalizedMessage = message.toLowerCase();
  return (
    normalizedMessage.includes("network") ||
    normalizedMessage.includes("fetch") ||
    normalizedMessage.includes("econnrefused") ||
    normalizedMessage.includes("timeout") ||
    normalizedMessage.includes("abort") ||
    normalizedMessage.includes("failed to fetch") ||
    normalizedMessage.includes("net::")
  );
}
