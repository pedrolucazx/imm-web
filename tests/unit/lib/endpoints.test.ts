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

    it("generates the correct LOG url", () => {
      expect(ENDPOINTS.HABITS.LOG("abc123")).toBe("/habits/abc123/log");
    });
  });

  describe("JOURNAL", () => {
    it("has the correct LIST endpoint", () => {
      expect(ENDPOINTS.JOURNAL.LIST).toBe("/journal");
    });

    it("has the correct CREATE endpoint", () => {
      expect(ENDPOINTS.JOURNAL.CREATE).toBe("/journal");
    });

    it("generates the correct GET url", () => {
      expect(ENDPOINTS.JOURNAL.GET("entry1")).toBe("/journal/entry1");
    });

    it("generates the correct UPDATE url", () => {
      expect(ENDPOINTS.JOURNAL.UPDATE("entry1")).toBe("/journal/entry1");
    });

    it("generates the correct DELETE url", () => {
      expect(ENDPOINTS.JOURNAL.DELETE("entry1")).toBe("/journal/entry1");
    });
  });
});
