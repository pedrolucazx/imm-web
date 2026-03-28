import { renderHook, act } from "@testing-library/react";
import { usePronunciationRecorder } from "@/lib/hooks/usePronunciationRecorder";

const originalMediaRecorder = (global as Record<string, unknown>).MediaRecorder;

afterEach(() => {
  if (originalMediaRecorder === undefined) {
    delete (global as Record<string, unknown>).MediaRecorder;
  } else {
    (global as Record<string, unknown>).MediaRecorder = originalMediaRecorder;
  }
  jest.clearAllMocks();
});

describe("usePronunciationRecorder — isSupported", () => {
  it("returns isSupported=false when MediaRecorder is not defined", () => {
    delete (global as Record<string, unknown>).MediaRecorder;

    const { result } = renderHook(() => usePronunciationRecorder());

    expect(result.current.isSupported).toBe(false);
  });

  it("returns isSupported=true when MediaRecorder is available", () => {
    const mockMediaRecorder = Object.assign(jest.fn(), {
      isTypeSupported: jest.fn().mockReturnValue(true),
    });
    (global as Record<string, unknown>).MediaRecorder = mockMediaRecorder;

    const { result } = renderHook(() => usePronunciationRecorder());

    expect(result.current.isSupported).toBe(true);
  });
});

describe("usePronunciationRecorder — mimeType detection", () => {
  it("defaults to audio/webm when MediaRecorder is not defined", () => {
    delete (global as Record<string, unknown>).MediaRecorder;

    const { result } = renderHook(() => usePronunciationRecorder());

    expect(result.current.mimeType).toBe("audio/webm");
  });

  it("uses audio/webm when MediaRecorder supports it", () => {
    const mockMediaRecorder = Object.assign(jest.fn(), {
      isTypeSupported: jest.fn((mime: string) => mime === "audio/webm"),
    });
    (global as Record<string, unknown>).MediaRecorder = mockMediaRecorder;

    const { result } = renderHook(() => usePronunciationRecorder());

    expect(result.current.mimeType).toBe("audio/webm");
  });

  it("falls back to audio/mp4 when audio/webm is not supported", () => {
    const mockMediaRecorder = Object.assign(jest.fn(), {
      isTypeSupported: jest.fn().mockReturnValue(false),
    });
    (global as Record<string, unknown>).MediaRecorder = mockMediaRecorder;

    const { result } = renderHook(() => usePronunciationRecorder());

    expect(result.current.mimeType).toBe("audio/mp4");
  });
});

describe("usePronunciationRecorder — initial state", () => {
  it("starts in idle state", () => {
    delete (global as Record<string, unknown>).MediaRecorder;

    const { result } = renderHook(() => usePronunciationRecorder());

    expect(result.current.state).toBe("idle");
  });

  it("starts with audioBlob as null", () => {
    delete (global as Record<string, unknown>).MediaRecorder;

    const { result } = renderHook(() => usePronunciationRecorder());

    expect(result.current.audioBlob).toBeNull();
  });
});

describe("usePronunciationRecorder — start when not supported", () => {
  it("does not throw and stays idle when start is called without MediaRecorder support", async () => {
    delete (global as Record<string, unknown>).MediaRecorder;

    const { result } = renderHook(() => usePronunciationRecorder());

    await act(async () => {
      result.current.start();
    });

    expect(result.current.state).toBe("idle");
    expect(result.current.audioBlob).toBeNull();
  });
});

describe("usePronunciationRecorder — reset", () => {
  it("resets state to idle and clears audioBlob", async () => {
    delete (global as Record<string, unknown>).MediaRecorder;

    const { result } = renderHook(() => usePronunciationRecorder());

    await act(async () => {
      result.current.reset();
    });

    expect(result.current.state).toBe("idle");
    expect(result.current.audioBlob).toBeNull();
  });
});
