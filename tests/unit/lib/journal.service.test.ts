import { journalService } from "@/lib/journal.service";
import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";

jest.mock("@/lib/api-client", () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const mockApi = api as jest.Mocked<typeof api>;

beforeEach(() => {
  jest.clearAllMocks();
});

// ---------------------------------------------------------------------------
// transcribeAudio — new method
// ---------------------------------------------------------------------------

describe("journalService.transcribeAudio", () => {
  const input = {
    audioUrl:
      "https://fake.supabase.co/storage/v1/object/public/audio-entries/user-uuid-1/file.webm",
    habitId: "550e8400-e29b-41d4-a716-446655440000",
  };

  it("calls api.post with ENDPOINTS.JOURNAL.TRANSCRIBE and the input payload", async () => {
    mockApi.post.mockResolvedValue({ transcription: "Hello world" });

    await journalService.transcribeAudio(input);

    expect(mockApi.post).toHaveBeenCalledWith(ENDPOINTS.JOURNAL.TRANSCRIBE, input);
  });

  it("returns the transcription string from the API response", async () => {
    mockApi.post.mockResolvedValue({ transcription: "Today I practiced English" });

    const result = await journalService.transcribeAudio(input);

    expect(result).toEqual({ transcription: "Today I practiced English" });
  });

  it("propagates errors thrown by api.post", async () => {
    mockApi.post.mockRejectedValue(new Error("Network error"));

    await expect(journalService.transcribeAudio(input)).rejects.toThrow("Network error");
  });

  it("uses ENDPOINTS.JOURNAL.TRANSCRIBE constant (/journal/transcribe)", () => {
    expect(ENDPOINTS.JOURNAL.TRANSCRIBE).toBe("/journal/transcribe");
  });
});

// ---------------------------------------------------------------------------
// createEntry — existing method (regression: audioUrl field)
// ---------------------------------------------------------------------------

describe("journalService.createEntry", () => {
  const mockEntry = {
    id: "entry-uuid-1",
    userId: "user-uuid-1",
    habitId: "habit-uuid-1",
    entryDate: "2026-03-28",
    content: "Today I practiced English.",
    wordCount: 5,
    uiLanguageSnap: "pt-BR",
    targetSkillSnap: "en-US",
    aiFeedback: null,
    aiAgentType: null,
    moodScore: 4,
    energyScore: 3,
    audioUrl:
      "https://fake.supabase.co/storage/v1/object/public/audio-entries/user-uuid-1/file.webm",
    createdAt: "2026-03-28T00:00:00.000Z",
    updatedAt: "2026-03-28T00:00:00.000Z",
  };

  it("forwards audioUrl when included in the input", async () => {
    mockApi.post.mockResolvedValue(mockEntry);

    const audioUrl =
      "https://fake.supabase.co/storage/v1/object/public/audio-entries/user-uuid-1/file.webm";
    const input = {
      habitId: "habit-uuid-1",
      content: "Today I practiced English.",
      entryDate: "2026-03-28",
      audioUrl,
      moodScore: 4 as const,
      energyScore: 3 as const,
    };

    await journalService.createEntry(input);

    expect(mockApi.post).toHaveBeenCalledWith(
      ENDPOINTS.JOURNAL.CREATE,
      expect.objectContaining({ audioUrl })
    );
  });

  it("sends payload without audioUrl when not provided", async () => {
    mockApi.post.mockResolvedValue({ ...mockEntry, audioUrl: null });

    const input = {
      habitId: "habit-uuid-1",
      content: "Text-only entry.",
      entryDate: "2026-03-28",
      moodScore: 3 as const,
      energyScore: 2 as const,
    };

    await journalService.createEntry(input);

    expect(mockApi.post).toHaveBeenCalledWith(ENDPOINTS.JOURNAL.CREATE, input);
    const callPayload = (mockApi.post as jest.Mock).mock.calls[0][1];
    expect(callPayload).not.toHaveProperty("audioUrl");
  });
});
