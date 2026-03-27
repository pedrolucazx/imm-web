import type React from "react";

const ROVING_KEY_INDEX: Record<string, (_i: number, _len: number) => number> = {
  ArrowRight: (i, len) => (i + 1) % len,
  ArrowDown: (i, len) => (i + 1) % len,
  ArrowLeft: (i, len) => (i - 1 + len) % len,
  ArrowUp: (i, len) => (i - 1 + len) % len,
  Home: (_i, _len) => 0,
  End: (_i, len) => len - 1,
};

/**
 * Handles keyboard navigation for roving tabindex radio groups.
 * Supports Arrow keys, Home, and End.
 */
export function handleRovingKeyDown(
  e: React.KeyboardEvent,
  index: number,
  length: number,
  groupRef: React.RefObject<HTMLElement | null>,
  onSelect: (_targetIndex: number) => void
): void {
  const getIndex = ROVING_KEY_INDEX[e.key];
  if (!getIndex || length <= 0) return;
  e.preventDefault();
  const targetIndex = getIndex(index, length);
  onSelect(targetIndex);
  const radios = groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
  radios?.[targetIndex]?.focus();
}
