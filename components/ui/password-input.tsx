"use client";

import type { BoxProps, ButtonProps, GroupProps } from "@chakra-ui/react";
import {
  Box,
  Field,
  HStack,
  IconButton,
  InputGroup,
  Text,
  mergeRefs,
  useControllableState,
} from "@chakra-ui/react";
import * as React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Input } from "./Input";
import type { InputProps } from "./Input";

// ─── Strength Meter ──────────────────────────────────────────────────────────

export interface StrengthLevel {
  label: string;
  color: string;
}

const DEFAULT_LEVELS: StrengthLevel[] = [
  { label: "Very weak", color: "hsl(0, 84%, 60%)" },
  { label: "Weak", color: "hsl(30, 100%, 55%)" },
  { label: "Good", color: "hsl(54, 100%, 45%)" },
  { label: "Strong", color: "hsl(152, 100%, 40%)" },
];

interface PasswordStrengthMeterProps extends BoxProps {
  max?: number;
  value: number;
  levels?: StrengthLevel[];
}

export const PasswordStrengthMeter = React.forwardRef<HTMLDivElement, PasswordStrengthMeterProps>(
  function PasswordStrengthMeter(props, ref) {
    const { max = 4, value, levels = DEFAULT_LEVELS, ...rest } = props;
    const normalizedValue = Number.isFinite(value) ? Math.floor(value) : 0;
    const clampedValue = Math.max(0, Math.min(normalizedValue, max));
    const levelIndex = clampedValue > 0 ? Math.min(clampedValue, levels.length) - 1 : -1;
    const level = levelIndex >= 0 ? levels[levelIndex] : null;

    return (
      <Box ref={ref} {...rest}>
        <HStack gap={1} mb={1}>
          {Array.from({ length: max }).map((_, index) => (
            <Box
              key={index}
              h="8px"
              flex="1"
              borderRadius="0"
              border="2px solid black"
              style={{
                backgroundColor: level && index < clampedValue ? level.color : "transparent",
                transition: "background-color 0.2s ease",
              }}
            />
          ))}
        </HStack>
        <Text
          fontSize="xs"
          fontWeight="700"
          textTransform="uppercase"
          letterSpacing="wider"
          style={{ color: level ? level.color : "transparent" }}
        >
          {level ? level.label : "\u00A0"}
        </Text>
      </Box>
    );
  }
);

// ─── Password Input ───────────────────────────────────────────────────────────

export interface PasswordVisibilityProps {
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibleChange?: (_visible: boolean) => void;
  visibilityIcon?: { on: React.ReactNode; off: React.ReactNode };
  visibilityLabel?: { show: string; hide: string };
}

export interface PasswordInputProps extends InputProps, PasswordVisibilityProps {
  rootProps?: GroupProps;
  strengthValue?: number;
  strengthLevels?: StrengthLevel[];
  showStrength?: boolean;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const {
      rootProps,
      defaultVisible,
      visible: visibleProp,
      onVisibleChange,
      visibilityIcon = { on: <LuEye />, off: <LuEyeOff /> },
      visibilityLabel = { show: "Show password", hide: "Hide password" },
      label,
      error,
      strengthValue,
      strengthLevels,
      showStrength,
      ...rest
    } = props;

    const [visible, setVisible] = useControllableState({
      value: visibleProp,
      defaultValue: defaultVisible || false,
      onChange: onVisibleChange,
    });

    const inputRef = React.useRef<HTMLInputElement>(null);

    const inputGroup = (
      <InputGroup
        endElement={
          <VisibilityTrigger
            disabled={rest.disabled}
            aria-label={visible ? visibilityLabel.hide : visibilityLabel.show}
            aria-pressed={visible}
            onPointerDown={(e) => e.preventDefault()}
            onClick={() => {
              if (rest.disabled) return;
              setVisible(!visible);
            }}
          >
            {visible ? visibilityIcon.off : visibilityIcon.on}
          </VisibilityTrigger>
        }
        {...rootProps}
      >
        <Input {...rest} ref={mergeRefs(ref, inputRef)} type={visible ? "text" : "password"} />
      </InputGroup>
    );

    if (!label && !error && strengthValue === undefined) return inputGroup;

    return (
      <Field.Root invalid={!!error}>
        {label && <Field.Label>{label}</Field.Label>}
        {inputGroup}
        {strengthValue !== undefined ? (
          <Box mt={1} position="relative" w="full">
            <PasswordStrengthMeter
              value={strengthValue}
              max={4}
              levels={strengthLevels}
              w="full"
              opacity={showStrength ? 1 : 0}
            />
            <Field.ErrorText position="absolute" top={0} left={0} lineHeight="1.25rem">
              {error}
            </Field.ErrorText>
          </Box>
        ) : (
          <Box h="1.25rem" mt={1}>
            <Field.ErrorText>{error}</Field.ErrorText>
          </Box>
        )}
      </Field.Root>
    );
  }
);

const VisibilityTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function VisibilityTrigger(props, ref) {
    return (
      <IconButton
        ref={ref}
        me="-2"
        aspectRatio="square"
        size="sm"
        variant="ghost"
        height="calc(100% - var(--chakra-spacing-2))"
        {...props}
      />
    );
  }
);
