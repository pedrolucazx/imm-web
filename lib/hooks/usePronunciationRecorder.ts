"use client";

import { useState, useRef, useCallback } from "react";
import { logger } from "@/lib/logger";

export type RecorderState = "idle" | "recording" | "recorded";

export type UsePronunciationRecorderResult = {
  isSupported: boolean;
  state: RecorderState;
  audioBlob: Blob | null;
  mimeType: string;
  start: () => void;
  stop: () => void;
  reset: () => void;
};

function detectMimeType(): string {
  if (typeof MediaRecorder === "undefined") return "audio/webm";
  return MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4";
}

export function usePronunciationRecorder(): UsePronunciationRecorderResult {
  const isSupported = typeof window !== "undefined" && typeof MediaRecorder !== "undefined";
  const mimeType = isSupported ? detectMimeType() : "audio/webm";

  const [state, setState] = useState<RecorderState>("idle");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const isResettingRef = useRef(false);

  const start = useCallback(async () => {
    if (!isSupported) return;
    isResettingRef.current = false;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType });

      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        if (isResettingRef.current) {
          isResettingRef.current = false;
          return;
        }
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setAudioBlob(blob);
        setState("recorded");
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setState("recording");
    } catch (err) {
      logger.error("Failed to initialize microphone", err);
    }
  }, [isSupported, mimeType]);

  const stop = useCallback(() => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const reset = useCallback(() => {
    isResettingRef.current = true;
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    } else {
      // onstop won't fire — safe to clear the flag now
      isResettingRef.current = false;
    }
    mediaRecorderRef.current = null;
    chunksRef.current = [];
    setAudioBlob(null);
    setState("idle");
  }, []);

  return { isSupported, state, audioBlob, mimeType, start, stop, reset };
}
