import { renderHook } from "@testing-library/react";
import { useTranslatedError } from "@/lib/hooks/useTranslatedError";

const translations = {
  INVALID_CREDENTIALS: "Invalid email or password.",
  INVALID_PASSWORD: "Invalid password.",
  EMAIL_ALREADY_EXISTS: "An account with this email already exists.",
  VALIDATION_FAILED: "Please check your information and try again.",
  INTERNAL_SERVER_ERROR: "Something went wrong. Please try again later.",
  NOT_FOUND: "Resource not found.",
  HABIT_NOT_FOUND: "Habit not found.",
  JOURNAL_ENTRY_NOT_FOUND: "Journal entry not found.",
  HABITS_LIMIT_REACHED: "You've reached the maximum number of active habits.",
  PLAN_ALREADY_GENERATING: "Plan is already being generated.",
  HABIT_INACTIVE: "This habit is no longer active.",
  AI_RATE_LIMIT: "AI service is busy. Please wait a moment and try again.",
  AI_TIMEOUT: "AI request timed out. Please try again.",
  AI_UNAVAILABLE: "AI service is temporarily unavailable. Please try again in a moment.",
  AI_NOT_CONFIGURED: "AI service is not available at the moment.",
  REFRESH_TOKEN_EXPIRED: "Your session has expired. Please log in again.",
  INVALID_REFRESH_TOKEN: "Your session is invalid. Please log in again.",
  FORBIDDEN: "You don't have permission to perform this action.",
  NETWORK_ERROR: "Unable to connect to the server. Please check your connection.",
};

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => translations[key as keyof typeof translations] || key,
}));

const backendErrors = {
  INVALID_CREDENTIALS: "Invalid email or password",
  INVALID_PASSWORD: "Invalid password",
  EMAIL_ALREADY_EXISTS: "User with this email already exists",
  VALIDATION_FAILED: "Validation failed",
  INTERNAL_SERVER_ERROR: "Internal server error",
  UNEXPECTED_ERROR: "Unexpected error",
  DUPLICATE_KEY: "duplicate key error",
  NETWORK_ERROR: "Network error",
  FETCH_FAILED: "fetch failed",
  CONNREFUSED: "ECONNREFUSED",
  TIMEOUT: "timeout",
  UNKNOWN: "Some random error",
} as const;

describe("useTranslatedError", () => {
  describe("maps backend errors to translated messages", () => {
    it("INVALID_CREDENTIALS → Invalid email or password.", () => {
      const { result } = renderHook(() => useTranslatedError());
      expect(result.current.translateError(new Error(backendErrors.INVALID_CREDENTIALS))).toBe(
        translations.INVALID_CREDENTIALS
      );
    });

    it("INVALID_PASSWORD → Invalid password.", () => {
      const { result } = renderHook(() => useTranslatedError());
      expect(result.current.translateError(new Error(backendErrors.INVALID_PASSWORD))).toBe(
        translations.INVALID_PASSWORD
      );
    });

    it("EMAIL_ALREADY_EXISTS → An account with this email already exists.", () => {
      const { result } = renderHook(() => useTranslatedError());
      expect(result.current.translateError(new Error(backendErrors.EMAIL_ALREADY_EXISTS))).toBe(
        translations.EMAIL_ALREADY_EXISTS
      );
    });

    it("VALIDATION_FAILED → Please check your information and try again.", () => {
      const { result } = renderHook(() => useTranslatedError());
      expect(result.current.translateError(new Error(backendErrors.VALIDATION_FAILED))).toBe(
        translations.VALIDATION_FAILED
      );
    });

    it("INTERNAL_SERVER_ERROR → Something went wrong. Please try again later.", () => {
      const { result } = renderHook(() => useTranslatedError());
      expect(result.current.translateError(new Error(backendErrors.INTERNAL_SERVER_ERROR))).toBe(
        translations.INTERNAL_SERVER_ERROR
      );
    });

    it("UNEXPECTED_ERROR → Something went wrong. Please try again later.", () => {
      const { result } = renderHook(() => useTranslatedError());
      expect(result.current.translateError(new Error(backendErrors.UNEXPECTED_ERROR))).toBe(
        translations.INTERNAL_SERVER_ERROR
      );
    });

    it("DUPLICATE_KEY → An account with this email already exists.", () => {
      const { result } = renderHook(() => useTranslatedError());
      expect(result.current.translateError(new Error(backendErrors.DUPLICATE_KEY))).toBe(
        translations.EMAIL_ALREADY_EXISTS
      );
    });

    it("NETWORK_ERROR → Unable to connect to the server.", () => {
      const { result } = renderHook(() => useTranslatedError());
      expect(result.current.translateError(new Error(backendErrors.NETWORK_ERROR))).toBe(
        translations.NETWORK_ERROR
      );
    });

    it("FETCH_FAILED → Unable to connect to the server.", () => {
      const { result } = renderHook(() => useTranslatedError());
      expect(result.current.translateError(new Error(backendErrors.FETCH_FAILED))).toBe(
        translations.NETWORK_ERROR
      );
    });

    it("CONNREFUSED → Unable to connect to the server.", () => {
      const { result } = renderHook(() => useTranslatedError());
      expect(result.current.translateError(new Error(backendErrors.CONNREFUSED))).toBe(
        translations.NETWORK_ERROR
      );
    });

    it("TIMEOUT → Unable to connect to the server.", () => {
      const { result } = renderHook(() => useTranslatedError());
      expect(result.current.translateError(new Error(backendErrors.TIMEOUT))).toBe(
        translations.NETWORK_ERROR
      );
    });

    it("UNKNOWN → original message", () => {
      const { result } = renderHook(() => useTranslatedError());
      expect(result.current.translateError(new Error(backendErrors.UNKNOWN))).toBe(
        backendErrors.UNKNOWN
      );
    });
  });

  describe("case-insensitive matching", () => {
    it("should match uppercase error messages", () => {
      const { result } = renderHook(() => useTranslatedError());
      expect(result.current.translateError(new Error("INVALID EMAIL OR PASSWORD"))).toBe(
        translations.INVALID_CREDENTIALS
      );
      expect(result.current.translateError(new Error("INTERNAL SERVER ERROR"))).toBe(
        translations.INTERNAL_SERVER_ERROR
      );
    });

    it("should match mixed case error messages", () => {
      const { result } = renderHook(() => useTranslatedError());
      expect(result.current.translateError(new Error("User With This Email Already Exists"))).toBe(
        translations.EMAIL_ALREADY_EXISTS
      );
    });
  });

  describe("translation keys exist in all locale files", () => {
    const requiredKeys = [
      "title",
      "INVALID_CREDENTIALS",
      "INVALID_PASSWORD",
      "EMAIL_ALREADY_EXISTS",
      "VALIDATION_FAILED",
      "INTERNAL_SERVER_ERROR",
      "NOT_FOUND",
      "HABIT_NOT_FOUND",
      "JOURNAL_ENTRY_NOT_FOUND",
      "HABITS_LIMIT_REACHED",
      "PLAN_ALREADY_GENERATING",
      "HABIT_INACTIVE",
      "AI_RATE_LIMIT",
      "AI_TIMEOUT",
      "AI_UNAVAILABLE",
      "AI_NOT_CONFIGURED",
      "REFRESH_TOKEN_EXPIRED",
      "INVALID_REFRESH_TOKEN",
      "FORBIDDEN",
      "NETWORK_ERROR",
    ];

    const localeFiles = {
      "en-US": require("@/i18n/messages/en-US.json"),
      "pt-BR": require("@/i18n/messages/pt-BR.json"),
      "es-ES": require("@/i18n/messages/es-ES.json"),
    };

    it.each(requiredKeys)("key '%s' exists in en-US.json", (key) => {
      expect(localeFiles["en-US"].errors[key]).toBeDefined();
      expect(typeof localeFiles["en-US"].errors[key]).toBe("string");
    });

    it.each(requiredKeys)("key '%s' exists in pt-BR.json", (key) => {
      expect(localeFiles["pt-BR"].errors[key]).toBeDefined();
      expect(typeof localeFiles["pt-BR"].errors[key]).toBe("string");
    });

    it.each(requiredKeys)("key '%s' exists in es-ES.json", (key) => {
      expect(localeFiles["es-ES"].errors[key]).toBeDefined();
      expect(typeof localeFiles["es-ES"].errors[key]).toBe("string");
    });

    it("all locales have the same set of error keys", () => {
      const enKeys = Object.keys(localeFiles["en-US"].errors).sort();
      const ptKeys = Object.keys(localeFiles["pt-BR"].errors).sort();
      const esKeys = Object.keys(localeFiles["es-ES"].errors).sort();

      expect(enKeys).toEqual(ptKeys);
      expect(enKeys).toEqual(esKeys);
    });
  });
});
