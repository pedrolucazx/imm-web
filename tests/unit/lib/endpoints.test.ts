import { ENDPOINTS } from "@/lib/endpoints";

describe("ENDPOINTS", () => {
  describe("AUTH", () => {
    it("has the correct register endpoint", () => {
      expect(ENDPOINTS.AUTH.REGISTER).toBe("/auth/register");
    });

    it("has the correct login endpoint", () => {
      expect(ENDPOINTS.AUTH.LOGIN).toBe("/auth/login");
    });
  });

  describe("USER", () => {
    it("has the correct ME endpoint", () => {
      expect(ENDPOINTS.USER.ME).toBe("/users/me");
    });

    it("has the correct UPDATE endpoint", () => {
      expect(ENDPOINTS.USER.UPDATE).toBe("/users/me");
    });

    it("has the correct AVATAR_UPLOAD_URL endpoint", () => {
      expect(ENDPOINTS.USER.AVATAR_UPLOAD_URL).toBe("/users/me/avatar-upload-url");
    });
  });

  describe("HABITS", () => {
    it("has the correct LIST endpoint", () => {
      expect(ENDPOINTS.HABITS.LIST).toBe("/habits");
    });

    it("has the correct CREATE endpoint", () => {
      expect(ENDPOINTS.HABITS.CREATE).toBe("/habits");
    });

    it("generates the correct GET url", () => {
      expect(ENDPOINTS.HABITS.GET("abc123")).toBe("/habits/abc123");
    });

    it("generates the correct UPDATE url", () => {
      expect(ENDPOINTS.HABITS.UPDATE("abc123")).toBe("/habits/abc123");
    });

    it("generates the correct DELETE url", () => {
      expect(ENDPOINTS.HABITS.DELETE("abc123")).toBe("/habits/abc123");
    });

    it("has the correct CREATE_WITH_PLAN endpoint", () => {
      expect(ENDPOINTS.HABITS.CREATE_WITH_PLAN).toBe("/habits/create-with-plan");
    });

    it("has the correct PREVIEW_PLAN endpoint", () => {
      expect(ENDPOINTS.HABITS.PREVIEW_PLAN).toBe("/habits/preview-plan");
    });

    it("generates the correct LOG url", () => {
      expect(ENDPOINTS.HABITS.LOG("abc123")).toBe("/habits/abc123/log");
    });

    it("generates the correct REGENERATE_PLAN url", () => {
      expect(ENDPOINTS.HABITS.REGENERATE_PLAN("abc123")).toBe("/habits/abc123/regenerate-plan");
    });
  });

  describe("JOURNAL", () => {
    it("has the correct LIST endpoint", () => {
      expect(ENDPOINTS.JOURNAL.LIST).toBe("/journal/entries");
    });

    it("has the correct CREATE endpoint", () => {
      expect(ENDPOINTS.JOURNAL.CREATE).toBe("/journal/entry");
    });

    it("generates the correct GET_BY_DATE url", () => {
      expect(ENDPOINTS.JOURNAL.GET_BY_DATE("2026-03-15")).toBe("/journal/entry/2026-03-15");
    });

    it("generates the correct UPDATE url", () => {
      expect(ENDPOINTS.JOURNAL.UPDATE("entry1")).toBe("/journal/entry/entry1");
    });
  });

  describe("AI", () => {
    it("has the correct ANALYZE endpoint", () => {
      expect(ENDPOINTS.AI.ANALYZE).toBe("/ai/analyze");
    });
  });
});
