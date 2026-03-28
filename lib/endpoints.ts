export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_VERIFICATION: "/auth/resend-verification",
  },
  USER: {
    ME: "/users/me",
    UPDATE: "/users/me",
    DELETE: "/users/me",
    AVATAR_UPLOAD_URL: "/users/me/avatar-upload-url",
  },
  CONSENTS: {
    SAVE: "/consents",
    LIST: "/consents",
  },
  HABITS: {
    LIST: "/habits",
    CREATE: "/habits",
    CREATE_WITH_PLAN: "/habits/create-with-plan",
    PREVIEW_PLAN: "/habits/preview-plan",
    GET: (id: string) => `/habits/${id}`,
    UPDATE: (id: string) => `/habits/${id}`,
    DELETE: (id: string) => `/habits/${id}`,
    LOG: (id: string) => `/habits/${id}/log`,
    REGENERATE_PLAN: (id: string) => `/habits/${id}/regenerate-plan`,
  },
  JOURNAL: {
    LIST: "/journal/entries",
    HISTORY: "/journal/history",
    CREATE: "/journal/entry",
  },
  ANALYTICS: {
    SUMMARY: "/analytics/summary",
  },
  AI: {
    ANALYZE: "/ai/analyze",
  },
  PRONUNCIATION: {
    UPLOAD_URL: "/pronunciation/upload-url",
    ANALYZE: "/pronunciation/analyze",
    WORD_CLOUD: "/pronunciation/word-cloud",
  },
} as const;
