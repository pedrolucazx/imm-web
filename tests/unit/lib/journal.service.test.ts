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
  const audio = new Blob(["fake-audio-bytes"], { type: "audio/webm" });
  const input = {
    audio,
    habitId: "550e8400-e29b-41d4-a716-446655440000",
  };

  it("calls api.post with multipart audio", async () => {
    mockApi.post.mockResolvedValue({ transcription: "Hello world" });

    await journalService.transcribeAudio(input);

    const [endpoint, body] = mockApi.post.mock.calls[0];
    expect(endpoint).toBe(ENDPOINTS.JOURNAL.TRANSCRIBE);
    expect(body).toBeInstanceOf(FormData);
    expect(Array.from((body as FormData).keys())).toEqual(["habitId", "audio"]);
    expect((body as FormData).get("habitId")).toBe(input.habitId);
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
// createEntry
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
    createdAt: "2026-03-28T00:00:00.000Z",
    updatedAt: "2026-03-28T00:00:00.000Z",
  };

  it("sends the create-entry payload", async () => {
    mockApi.post.mockResolvedValue(mockEntry);

    const input = {
      habitId: "habit-uuid-1",
      content: "Text-only entry.",
      entryDate: "2026-03-28",
      moodScore: 3 as const,
      energyScore: 2 as const,
    };

    await journalService.createEntry(input);

    expect(mockApi.post).toHaveBeenCalledWith(ENDPOINTS.JOURNAL.CREATE, input);
  });
});
