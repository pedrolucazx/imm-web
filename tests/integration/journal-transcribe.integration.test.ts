/** @jest-environment node */
import "../__setup__/msw/server";
import { journalService } from "@/lib/journal.service";

type DebugInfo = {
  contentType: string;
  habitId: string;
  audioType: string | null;
  audioName: string | null;
  audioSize: number | null;
};

describe("journalService.transcribeAudio — MSW integration", () => {
  it("sends the audio as a real multipart/form-data part, not JSON", async () => {
    const audio = new Blob(["fake-audio-bytes"], { type: "audio/webm" });

    const result = (await journalService.transcribeAudio({
      audio,
      habitId: "550e8400-e29b-41d4-a716-446655440000",
    })) as { transcription: string; _debug: DebugInfo };

    expect(result._debug.contentType).toMatch(/^multipart\/form-data; boundary=/);
    expect(result._debug.habitId).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(result._debug.audioType).toBe("audio/webm");
    expect(result._debug.audioName).toBe("journal.webm");
    expect(result._debug.audioSize).toBe(audio.size);
  });

  it("names the file .mp4 when the recorder produced audio/mp4 (Safari/iOS)", async () => {
    const audio = new Blob(["fake-audio-bytes"], { type: "audio/mp4" });

    const result = (await journalService.transcribeAudio({
      audio,
      habitId: "550e8400-e29b-41d4-a716-446655440000",
    })) as { transcription: string; _debug: DebugInfo };

    expect(result._debug.audioType).toBe("audio/mp4");
    expect(result._debug.audioName).toBe("journal.mp4");
  });
});
