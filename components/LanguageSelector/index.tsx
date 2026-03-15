"use client";

import { Box, Text, chakra } from "@chakra-ui/react";
import { useCallback, useId, useRef } from "react";

export const LANGUAGES = [
  { value: "pt-BR", label: "Português", flag: "🇧🇷" },
  { value: "en-US", label: "English", flag: "🇺🇸" },
  { value: "es-ES", label: "Español", flag: "🇪🇸" },
] as const;

export type UILanguage = (typeof LANGUAGES)[number]["value"];

type Language = (typeof LANGUAGES)[number];

const LANG_KEY_INDEX: Record<string, (_i: number) => number> = {
  ArrowRight: (i) => (i + 1) % LANGUAGES.length,
  ArrowDown: (i) => (i + 1) % LANGUAGES.length,
  ArrowLeft: (i) => (i - 1 + LANGUAGES.length) % LANGUAGES.length,
  ArrowUp: (i) => (i - 1 + LANGUAGES.length) % LANGUAGES.length,
  Home: (_i) => 0,
  End: (_i) => LANGUAGES.length - 1,
};

interface LanguageRadioProps {
  lang: Language;
  isSelected: boolean;
  onSelect: () => void;
  onKeyDown: (_e: React.KeyboardEvent) => void;
}

function LanguageRadio({ lang, isSelected, onSelect, onKeyDown }: LanguageRadioProps) {
  return (
    <chakra.button
      type="button"
      role="radio"
      p={3}
      borderWidth="2px"
      borderColor="border"
      boxShadow="brutal-sm"
      fontWeight="700"
      fontSize="sm"
      textAlign="center"
      cursor="pointer"
      transition="transform 0.1s ease, box-shadow 0.1s ease"
      _hover={{ transform: "translate(-2px, -2px)", boxShadow: "brutal" }}
      _active={{ transform: "translate(2px, 2px)", boxShadow: "none" }}
      bg={isSelected ? "primary" : "card"}
      aria-checked={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
    >
      <Text fontSize="xl" display="block" mb={1}>
        {lang.flag}
      </Text>
      {lang.label}
    </chakra.button>
  );
}

export interface LanguageSelectorProps {
  label: string;
  value: UILanguage;
  onChange: (_value: UILanguage) => void;
  error?: string;
}

export function LanguageSelector({ label, value, onChange, error }: LanguageSelectorProps) {
  const langGroupRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number): void => {
      const getIndex = LANG_KEY_INDEX[e.key];
      if (!getIndex) return;
      e.preventDefault();
      const targetIndex = getIndex(index);
      onChange(LANGUAGES[targetIndex].value);
      const radios = langGroupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]');
      radios?.[targetIndex]?.focus();
    },
    [onChange]
  );

  return (
    <Box w="100%">
      <Text
        id={labelId}
        fontSize="sm"
        fontWeight="700"
        textTransform="uppercase"
        letterSpacing="wider"
        mb={2}
      >
        {label}
      </Text>
      <Box
        ref={langGroupRef}
        role="radiogroup"
        aria-labelledby={labelId}
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap={2}
      >
        {LANGUAGES.map((lang, index) => (
          <LanguageRadio
            key={lang.value}
            lang={lang}
            isSelected={value === lang.value}
            onSelect={() => onChange(lang.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </Box>
      {error && (
        <Text fontSize="sm" color="red.500" mt={1}>
          {error}
        </Text>
      )}
    </Box>
  );
}
