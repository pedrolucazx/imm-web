"use client";

import { Box, Text, chakra } from "@chakra-ui/react";
import { useId, useRef } from "react";
import { LANGUAGES, type UILanguage } from "@/lib/constants";
import { handleRovingKeyDown } from "@/lib/a11y";
import { s } from "./styles";

export type { UILanguage };

type Language = (typeof LANGUAGES)[number];

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
      {...s.radio}
      {...(isSelected ? s.radioSelected : s.radioUnselected)}
      aria-checked={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
    >
      <Text {...s.flagText}>{lang.flag}</Text>
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

  return (
    <Box w="100%">
      <Text id={labelId} {...s.label}>
        {label}
      </Text>
      <Box ref={langGroupRef} role="radiogroup" aria-labelledby={labelId} {...s.radioGroup}>
        {LANGUAGES.map((lang, index) => (
          <LanguageRadio
            key={lang.value}
            lang={lang}
            isSelected={value === lang.value}
            onSelect={() => onChange(lang.value)}
            onKeyDown={(e) =>
              handleRovingKeyDown(e, index, LANGUAGES.length, langGroupRef, (i) =>
                onChange(LANGUAGES[i].value)
              )
            }
          />
        ))}
      </Box>
      {error && <Text {...s.error}>{error}</Text>}
    </Box>
  );
}
