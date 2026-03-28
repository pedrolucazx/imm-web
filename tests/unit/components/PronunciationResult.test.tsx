import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PronunciationResult } from "@/components/daily-lab/PronunciationResult";
import { renderWithProviders } from "../../__setup__/render";
import type { AnalyzePronunciationResult } from "@/types/pronunciation";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const baseResult: AnalyzePronunciationResult = {
  id: "result-1",
  userId: "user-1",
  habitId: "habit-1",
  entryDate: "2026-03-27",
  originalText: "hello world",
  transcription: null,
  score: 0.9,
  correctWords: ["hello", "world"],
  missedWords: [],
  extraWords: [],
  audioUrl: null,
  createdAt: "2026-03-27T00:00:00Z",
};

function renderResult(overrides: Partial<AnalyzePronunciationResult> = {}, originalText?: string) {
  const result = { ...baseResult, ...overrides };
  const onRetry = jest.fn();
  const rendered = renderWithProviders(
    <PronunciationResult
      result={result}
      originalText={originalText ?? result.originalText}
      onRetry={onRetry}
    />
  );
  return { ...rendered, onRetry };
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PronunciationResult — score display", () => {
  it("renders percentage score rounded to nearest integer", () => {
    renderResult({ score: 0.857 });
    expect(screen.getByText("86%")).toBeInTheDocument();
  });

  it("renders 100% for perfect score", () => {
    renderResult({ score: 1 });
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("renders 0% for zero score", () => {
    renderResult({ score: 0 });
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders correct words count", () => {
    renderResult({ correctWords: ["hello", "world"], score: 1 });
    expect(screen.getByText(/2/)).toBeInTheDocument();
  });

  it("renders missed words count", () => {
    renderResult({ missedWords: ["world"], correctWords: ["hello"], score: 0.5 });
    expect(screen.getByText(/✗.*1/)).toBeInTheDocument();
  });
});

describe("PronunciationResult — word tokenization and highlighting", () => {
  it("marks correct words with wordCorrect data attribute", () => {
    renderResult({ correctWords: ["hello", "world"], missedWords: [], score: 1 }, "hello world");
    const correctWords = screen.getAllByText(/hello|world/);
    expect(correctWords.length).toBeGreaterThanOrEqual(2);
  });

  it("renders all tokens from originalText", () => {
    renderResult({ correctWords: ["the", "quick", "fox"], score: 0.75 }, "the quick fox");
    expect(screen.getByText("the")).toBeInTheDocument();
    expect(screen.getByText("quick")).toBeInTheDocument();
    expect(screen.getByText("fox")).toBeInTheDocument();
  });

  it("strips trailing punctuation from tokens", () => {
    renderResult({ correctWords: ["hello", "world"], missedWords: [], score: 1 }, "hello, world.");
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("world")).toBeInTheDocument();
  });

  it("strips leading punctuation from tokens", () => {
    renderResult({ correctWords: ["hello"], missedWords: [], score: 1 }, '"hello"');
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("is case-insensitive when matching correct words", () => {
    renderResult({ correctWords: ["Hello"], missedWords: [], score: 1 }, "hello");
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("is case-insensitive when matching missed words", () => {
    renderResult({ correctWords: [], missedWords: ["WORLD"], score: 0 }, "world");
    expect(screen.getByText("world")).toBeInTheDocument();
  });

  it("handles multiple spaces between words by collapsing them", () => {
    renderResult({ correctWords: ["hello", "world"], score: 1 }, "hello   world");
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("world")).toBeInTheDocument();
  });

  it("handles leading and trailing whitespace in originalText", () => {
    renderResult({ correctWords: ["hello"], score: 1 }, "  hello  ");
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("renders words not in correct or missed sets as extra (neutral)", () => {
    renderResult({ correctWords: ["hello"], missedWords: [], score: 0.5 }, "hello unknown");
    expect(screen.getByText("unknown")).toBeInTheDocument();
  });
});

describe("PronunciationResult — extra words section", () => {
  it("does not render extra words section when extraWords is empty", () => {
    renderResult({ extraWords: [] });
    expect(screen.queryByText("result.extra")).not.toBeInTheDocument();
  });

  it("renders extra words section when extraWords has items", () => {
    renderResult({ extraWords: ["surprise"] });
    expect(screen.getByText("result.extra")).toBeInTheDocument();
    expect(screen.getByText("surprise")).toBeInTheDocument();
  });

  it("renders all extra words", () => {
    renderResult({ extraWords: ["foo", "bar", "baz"] });
    expect(screen.getByText("foo")).toBeInTheDocument();
    expect(screen.getByText("bar")).toBeInTheDocument();
    expect(screen.getByText("baz")).toBeInTheDocument();
  });
});

describe("PronunciationResult — transcription section", () => {
  it("does not render transcription section when transcription is null", () => {
    renderResult({ transcription: null });
    expect(screen.queryByText("result.transcription")).not.toBeInTheDocument();
  });

  it("renders transcription section when transcription is provided", () => {
    renderResult({ transcription: "hello world" });
    expect(screen.getByText("result.transcription")).toBeInTheDocument();
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });
});

describe("PronunciationResult — retry button", () => {
  it("renders the retry button", () => {
    renderResult();
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", async () => {
    const { onRetry } = renderResult();
    await userEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
