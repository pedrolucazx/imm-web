import { pronunciationService } from "@/lib/pronunciation.service";
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

describe("pronunciationService.analyze", () => {
  it("sends fields before multipart audio", async () => {
    const audio = new Blob(["fake-audio-bytes"], { type: "audio/webm" });
    mockApi.post.mockResolvedValue({ id: "entry-id" });

    await pronunciationService.analyze({
      habitId: "habit-id",
      originalText: "hello world",
      entryDate: "2026-03-28",
      audio,
    });

    const [endpoint, body] = mockApi.post.mock.calls[0];
    expect(endpoint).toBe(ENDPOINTS.PRONUNCIATION.ANALYZE);
    expect(body).toBeInstanceOf(FormData);
    expect(Array.from((body as FormData).keys())).toEqual([
      "habitId",
      "originalText",
      "entryDate",
      "audio",
    ]);
  });
});
