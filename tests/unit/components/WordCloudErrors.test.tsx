import React from "react";
import { screen } from "@testing-library/react";
import { WordCloudErrors } from "@/components/Analytics/WordCloudErrors";
import { renderWithProviders } from "../../__setup__/render";
import type { WordCloudItem } from "@/types/pronunciation";

const mockUseWordCloud = jest.fn();

jest.mock("@/lib/hooks/useWordCloud", () => ({
  useWordCloud: (...args: unknown[]) => mockUseWordCloud(...args),
}));

jest.mock("@/lib/auth-context", () => ({
  useAuthContext: () => ({ isLoading: false, accessToken: "token" }),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("WordCloudErrors — empty state", () => {
  it("renders null when data is an empty array", () => {
    mockUseWordCloud.mockReturnValue({ data: [] });

    const { container } = renderWithProviders(
      <WordCloudErrors habitId="habit-1" habitColor="bg-teal-400" />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders null when data is undefined (query not yet resolved)", () => {
    mockUseWordCloud.mockReturnValue({ data: undefined });

    const { container } = renderWithProviders(
      <WordCloudErrors habitId="habit-1" habitColor="bg-teal-400" />
    );

    expect(container.firstChild).toBeNull();
  });
});

describe("WordCloudErrors — renders words", () => {
  const items: WordCloudItem[] = [
    { word: "pronunciation", frequency: 10 },
    { word: "difficult", frequency: 5 },
    { word: "challenge", frequency: 1 },
  ];

  it("renders all words from data", () => {
    mockUseWordCloud.mockReturnValue({ data: items });

    renderWithProviders(<WordCloudErrors habitId="habit-1" habitColor="bg-teal-400" />);

    expect(screen.getByText("pronunciation")).toBeInTheDocument();
    expect(screen.getByText("difficult")).toBeInTheDocument();
    expect(screen.getByText("challenge")).toBeInTheDocument();
  });

  it("renders the section title", () => {
    mockUseWordCloud.mockReturnValue({ data: items });

    renderWithProviders(<WordCloudErrors habitId="habit-1" habitColor="bg-teal-400" />);

    expect(screen.getByText("wordCloud.title")).toBeInTheDocument();
  });

  it("passes habitId to useWordCloud", () => {
    mockUseWordCloud.mockReturnValue({ data: items });

    renderWithProviders(<WordCloudErrors habitId="habit-42" habitColor="bg-teal-400" />);

    expect(mockUseWordCloud).toHaveBeenCalledWith("habit-42");
  });
});

describe("WordCloudErrors — font size scaling", () => {
  it("renders a single word without crashing (min === max edge case)", () => {
    mockUseWordCloud.mockReturnValue({ data: [{ word: "only", frequency: 7 }] });

    renderWithProviders(<WordCloudErrors habitId="habit-1" habitColor="bg-teal-400" />);

    const onlySize = parseFloat(screen.getByText("only").getAttribute("data-fontsize") ?? "0");
    expect(onlySize).toBeGreaterThanOrEqual(0.8);
    expect(onlySize).toBeLessThanOrEqual(2);
  });

  it("highest-frequency word receives a larger font size than the lowest", () => {
    const words: WordCloudItem[] = [
      { word: "common", frequency: 20 },
      { word: "rare", frequency: 1 },
    ];
    mockUseWordCloud.mockReturnValue({ data: words });

    renderWithProviders(<WordCloudErrors habitId="habit-1" habitColor="bg-teal-400" />);

    const commonEl = screen.getByText("common");
    const rareEl = screen.getByText("rare");

    const commonSize = parseFloat(commonEl.getAttribute("data-fontsize") ?? "0");
    const rareSize = parseFloat(rareEl.getAttribute("data-fontsize") ?? "0");

    expect(commonSize).toBeCloseTo(2, 3);
    expect(rareSize).toBeCloseTo(0.8, 3);
  });
});
