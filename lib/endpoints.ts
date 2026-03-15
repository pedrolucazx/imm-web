export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
  USER: {
    ME: "/users/me",
    UPDATE: "/users/me",
    AVATAR_UPLOAD_URL: "/users/me/avatar-upload-url",
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
    LIST: "/journal",
    CREATE: "/journal",
    GET: (id: string) => `/journal/${id}`,
    UPDATE: (id: string) => `/journal/${id}`,
    DELETE: (id: string) => `/journal/${id}`,
  },
} as const;
