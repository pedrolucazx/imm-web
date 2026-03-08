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
    DELETE: "/users/me",
  },
  HABITS: {
    LIST: "/habits",
    CREATE: "/habits",
    GET: (id: string) => `/habits/${id}`,
    UPDATE: (id: string) => `/habits/${id}`,
    DELETE: (id: string) => `/habits/${id}`,
    COMPLETE: (id: string) => `/habits/${id}/complete`,
  },
  JOURNAL: {
    LIST: "/journal",
    CREATE: "/journal",
    GET: (id: string) => `/journal/${id}`,
    UPDATE: (id: string) => `/journal/${id}`,
    DELETE: (id: string) => `/journal/${id}`,
  },
} as const;
