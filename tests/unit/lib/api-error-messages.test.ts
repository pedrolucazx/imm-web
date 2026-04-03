import { mapApiErrorToKey, API_ERROR_MESSAGES, isNetworkError } from "@/lib/api-error-messages";

describe("api-error-messages", () => {
  describe("API_ERROR_MESSAGES", () => {
    it("should have all required error keys", () => {
      expect(API_ERROR_MESSAGES.INVALID_CREDENTIALS).toBe("Invalid email or password");
      expect(API_ERROR_MESSAGES.INVALID_PASSWORD).toBe("Invalid password");
      expect(API_ERROR_MESSAGES.EMAIL_ALREADY_EXISTS).toBe("User with this email already exists");
      expect(API_ERROR_MESSAGES.VALIDATION_FAILED).toBe("Validation failed");
      expect(API_ERROR_MESSAGES.INTERNAL_SERVER_ERROR).toBe("Internal server error");
      expect(API_ERROR_MESSAGES.NOT_FOUND).toBe("Resource not found");
      expect(API_ERROR_MESSAGES.HABIT_NOT_FOUND).toBe("Habit not found");
      expect(API_ERROR_MESSAGES.JOURNAL_ENTRY_NOT_FOUND).toBe("Journal entry not found");
      expect(API_ERROR_MESSAGES.HABITS_LIMIT_REACHED).toBe("Limit of active habits reached");
      expect(API_ERROR_MESSAGES.PLAN_ALREADY_GENERATING).toBe("Plan is already being generated");
      expect(API_ERROR_MESSAGES.HABIT_INACTIVE).toBe("Habit is not active");
      expect(API_ERROR_MESSAGES.AI_RATE_LIMIT).toBe("AI rate limit exceeded");
      expect(API_ERROR_MESSAGES.AI_TIMEOUT).toBe("AI request timed out");
      expect(API_ERROR_MESSAGES.AI_UNAVAILABLE).toBe("AI service is temporarily unavailable");
      expect(API_ERROR_MESSAGES.AI_NOT_CONFIGURED).toBe("AI service not configured");
      expect(API_ERROR_MESSAGES.REFRESH_TOKEN_EXPIRED).toBe("Session expired");
      expect(API_ERROR_MESSAGES.INVALID_REFRESH_TOKEN).toBe("Invalid session");
      expect(API_ERROR_MESSAGES.FORBIDDEN).toBe("Access denied");
      expect(API_ERROR_MESSAGES.NETWORK_ERROR).toBe("Network error");
    });
  });

  describe("mapApiErrorToKey", () => {
    describe("INVALID_CREDENTIALS", () => {
      it("should map 'Invalid email or password' to INVALID_CREDENTIALS", () => {
        expect(mapApiErrorToKey("Invalid email or password")).toBe("INVALID_CREDENTIALS");
      });

      it("should map 'invalid email or password' (lowercase) to INVALID_CREDENTIALS", () => {
        expect(mapApiErrorToKey("invalid email or password")).toBe("INVALID_CREDENTIALS");
      });

      it("should map 'INVALID EMAIL OR PASSWORD' (uppercase) to INVALID_CREDENTIALS", () => {
        expect(mapApiErrorToKey("INVALID EMAIL OR PASSWORD")).toBe("INVALID_CREDENTIALS");
      });

      it("should map message with extra whitespace to INVALID_CREDENTIALS", () => {
        expect(mapApiErrorToKey("  Invalid email or password  ")).toBe("INVALID_CREDENTIALS");
      });
    });

    describe("INVALID_PASSWORD", () => {
      it("should map 'Invalid password' to INVALID_PASSWORD", () => {
        expect(mapApiErrorToKey("Invalid password")).toBe("INVALID_PASSWORD");
      });
    });

    describe("EMAIL_ALREADY_EXISTS", () => {
      it("should map 'User with this email already exists' to EMAIL_ALREADY_EXISTS", () => {
        expect(mapApiErrorToKey("User with this email already exists")).toBe(
          "EMAIL_ALREADY_EXISTS"
        );
      });

      it("should map 'email already exists' to EMAIL_ALREADY_EXISTS", () => {
        expect(mapApiErrorToKey("email already exists")).toBe("EMAIL_ALREADY_EXISTS");
      });

      it("should map 'duplicate key' to EMAIL_ALREADY_EXISTS", () => {
        expect(mapApiErrorToKey("duplicate key error")).toBe("EMAIL_ALREADY_EXISTS");
      });

      it("should map case-insensitively to EMAIL_ALREADY_EXISTS", () => {
        expect(mapApiErrorToKey("USER WITH THIS EMAIL ALREADY EXISTS")).toBe(
          "EMAIL_ALREADY_EXISTS"
        );
      });
    });

    describe("VALIDATION_FAILED", () => {
      it("should map 'Validation failed' to VALIDATION_FAILED", () => {
        expect(mapApiErrorToKey("Validation failed")).toBe("VALIDATION_FAILED");
      });

      it("should map 'validation failed' (lowercase) to VALIDATION_FAILED", () => {
        expect(mapApiErrorToKey("validation failed")).toBe("VALIDATION_FAILED");
      });

      it("should map validation error with details to VALIDATION_FAILED", () => {
        expect(mapApiErrorToKey("Validation failed: field x is required")).toBe(
          "VALIDATION_FAILED"
        );
      });
    });

    describe("INTERNAL_SERVER_ERROR", () => {
      it("should map 'Internal server error' to INTERNAL_SERVER_ERROR", () => {
        expect(mapApiErrorToKey("Internal server error")).toBe("INTERNAL_SERVER_ERROR");
      });

      it("should map 'Unexpected error' to INTERNAL_SERVER_ERROR", () => {
        expect(mapApiErrorToKey("Unexpected error")).toBe("INTERNAL_SERVER_ERROR");
      });

      it("should map case-insensitively to INTERNAL_SERVER_ERROR", () => {
        expect(mapApiErrorToKey("INTERNAL SERVER ERROR")).toBe("INTERNAL_SERVER_ERROR");
      });
    });

    describe("NOT_FOUND", () => {
      it("should map 'Profile not found' to NOT_FOUND", () => {
        expect(mapApiErrorToKey("Profile not found")).toBe("NOT_FOUND");
      });

      it("should map 'User not found' to NOT_FOUND", () => {
        expect(mapApiErrorToKey("User not found")).toBe("NOT_FOUND");
      });

      it("should map 'not found' to NOT_FOUND", () => {
        expect(mapApiErrorToKey("not found")).toBe("NOT_FOUND");
      });
    });

    describe("HABIT_NOT_FOUND", () => {
      it("should map 'Habit not found' to HABIT_NOT_FOUND", () => {
        expect(mapApiErrorToKey("Habit not found")).toBe("HABIT_NOT_FOUND");
      });
    });

    describe("JOURNAL_ENTRY_NOT_FOUND", () => {
      it("should map 'Journal entry not found' to JOURNAL_ENTRY_NOT_FOUND", () => {
        expect(mapApiErrorToKey("Journal entry not found")).toBe("JOURNAL_ENTRY_NOT_FOUND");
      });
    });

    describe("HABITS_LIMIT_REACHED", () => {
      it("should map 'Limit of X active habits reached' to HABITS_LIMIT_REACHED", () => {
        expect(mapApiErrorToKey("Limit of 5 active habits reached")).toBe("HABITS_LIMIT_REACHED");
      });
    });

    describe("PLAN_ALREADY_GENERATING", () => {
      it("should map 'Plan is already being generated' to PLAN_ALREADY_GENERATING", () => {
        expect(mapApiErrorToKey("Plan is already being generated")).toBe("PLAN_ALREADY_GENERATING");
      });
    });

    describe("HABIT_INACTIVE", () => {
      it("should map 'Habit is not active' to HABIT_INACTIVE", () => {
        expect(mapApiErrorToKey("Habit is not active")).toBe("HABIT_INACTIVE");
      });
    });

    describe("AI_RATE_LIMIT", () => {
      it("should map 'Gemini rate limit exceeded' to AI_RATE_LIMIT", () => {
        expect(mapApiErrorToKey("Gemini rate limit exceeded")).toBe("AI_RATE_LIMIT");
      });

      it("should map 'AI rate limit exceeded' to AI_RATE_LIMIT", () => {
        expect(mapApiErrorToKey("AI rate limit exceeded")).toBe("AI_RATE_LIMIT");
      });

      it("should map 'AI service is busy' to AI_RATE_LIMIT", () => {
        expect(mapApiErrorToKey("AI service is busy. Please wait a moment and try again.")).toBe(
          "AI_RATE_LIMIT"
        );
      });

      it("should map 'rate limit exceeded' to AI_RATE_LIMIT", () => {
        expect(mapApiErrorToKey("rate limit exceeded")).toBe("AI_RATE_LIMIT");
      });
    });

    describe("AI_TIMEOUT", () => {
      it("should map 'AI request timed out' to AI_TIMEOUT", () => {
        expect(mapApiErrorToKey("AI request timed out")).toBe("AI_TIMEOUT");
      });

      it("should map 'Gemini timeout' to AI_TIMEOUT", () => {
        expect(mapApiErrorToKey("Gemini timeout")).toBe("AI_TIMEOUT");
      });
    });

    describe("AI_UNAVAILABLE", () => {
      it("should map 'AI service is temporarily unavailable' to AI_UNAVAILABLE", () => {
        expect(mapApiErrorToKey("AI service is temporarily unavailable")).toBe("AI_UNAVAILABLE");
      });

      it("should map 'AI assistant service unavailable' to AI_UNAVAILABLE", () => {
        expect(mapApiErrorToKey("AI assistant service unavailable")).toBe("AI_UNAVAILABLE");
      });

      it("should map '503 Service Unavailable' to AI_UNAVAILABLE", () => {
        expect(mapApiErrorToKey("Gemini API temporary error: 503 Service Unavailable")).toBe(
          "AI_UNAVAILABLE"
        );
      });

      it("should NOT map generic service-unavailable messages to AI_UNAVAILABLE", () => {
        expect(mapApiErrorToKey("Service temporarily unavailable")).toBeNull();
      });

      it("should NOT map generic model messages to AI_UNAVAILABLE", () => {
        expect(mapApiErrorToKey("Profile model mismatch")).toBeNull();
      });

      it("should NOT map generic assistant messages to AI_UNAVAILABLE", () => {
        expect(mapApiErrorToKey("Assistant manager temporarily unavailable")).toBeNull();
      });
    });

    describe("AI_NOT_CONFIGURED", () => {
      it("should map 'AI service not configured' to AI_NOT_CONFIGURED", () => {
        expect(mapApiErrorToKey("AI service not configured")).toBe("AI_NOT_CONFIGURED");
      });

      it("should map 'AI service is not available at the moment' to AI_NOT_CONFIGURED", () => {
        expect(mapApiErrorToKey("AI service is not available at the moment.")).toBe(
          "AI_NOT_CONFIGURED"
        );
      });

      it("should map 'GEMINI_API_KEY is not configured' to AI_NOT_CONFIGURED", () => {
        expect(mapApiErrorToKey("GEMINI_API_KEY is not configured")).toBe("AI_NOT_CONFIGURED");
      });

      it("should NOT map generic 'gemini' to AI_NOT_CONFIGURED", () => {
        expect(mapApiErrorToKey("gemini returned invalid json")).toBeNull();
      });

      it("should NOT map 'api key' alone to AI_NOT_CONFIGURED", () => {
        expect(mapApiErrorToKey("api key is required")).toBeNull();
      });
    });

    describe("REFRESH_TOKEN_EXPIRED", () => {
      it("should map 'Refresh token expired' to REFRESH_TOKEN_EXPIRED", () => {
        expect(mapApiErrorToKey("Refresh token expired")).toBe("REFRESH_TOKEN_EXPIRED");
      });
    });

    describe("INVALID_REFRESH_TOKEN", () => {
      it("should map 'Invalid or expired refresh token' to INVALID_REFRESH_TOKEN", () => {
        expect(mapApiErrorToKey("Invalid or expired refresh token")).toBe("INVALID_REFRESH_TOKEN");
      });

      it("should map 'Invalid session' to INVALID_REFRESH_TOKEN", () => {
        expect(mapApiErrorToKey("Invalid session")).toBe("INVALID_REFRESH_TOKEN");
      });

      it("should map 'Invalid refresh token' to INVALID_REFRESH_TOKEN", () => {
        expect(mapApiErrorToKey("Invalid refresh token")).toBe("INVALID_REFRESH_TOKEN");
      });
    });

    describe("FORBIDDEN", () => {
      it("should map 'Access denied' to FORBIDDEN", () => {
        expect(mapApiErrorToKey("Access denied")).toBe("FORBIDDEN");
      });

      it("should map 'Forbidden' to FORBIDDEN", () => {
        expect(mapApiErrorToKey("Forbidden")).toBe("FORBIDDEN");
      });
    });

    describe("unknown errors", () => {
      it("should return null for unknown error messages", () => {
        expect(mapApiErrorToKey("Some unknown error")).toBeNull();
      });

      it("should return null for empty string", () => {
        expect(mapApiErrorToKey("")).toBeNull();
      });

      it("should return null for partial matches that do not contain full phrase", () => {
        expect(mapApiErrorToKey("The validation has failed")).toBeNull();
        expect(mapApiErrorToKey("Invalid credentials for email")).toBeNull();
      });
    });
  });

  describe("isNetworkError", () => {
    it("should detect network-related errors", () => {
      expect(isNetworkError("Network error")).toBe(true);
      expect(isNetworkError("fetch failed")).toBe(true);
      expect(isNetworkError("ECONNREFUSED")).toBe(true);
      expect(isNetworkError("timeout")).toBe(true);
      expect(isNetworkError("Request aborted")).toBe(true);
      expect(isNetworkError("Failed to fetch")).toBe(true);
      expect(isNetworkError("net::ERR_CONNECTION_REFUSED")).toBe(true);
    });

    it("should return false for non-network errors", () => {
      expect(isNetworkError("Invalid email or password")).toBe(false);
      expect(isNetworkError("User not found")).toBe(false);
      expect(isNetworkError("Validation failed")).toBe(false);
    });
  });
});
