"use client";

import type { BoxProps, ButtonProps, GroupProps, InputProps } from "@chakra-ui/react";
import {
  Box,
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
    const level = value > 0 ? levels[Math.min(value, max) - 1] : null;

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
                backgroundColor: level && index < value ? level.color : "transparent",
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
}

export interface PasswordInputProps extends InputProps, PasswordVisibilityProps {
  rootProps?: GroupProps;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const {
      rootProps,
      defaultVisible,
      visible: visibleProp,
      onVisibleChange,
      visibilityIcon = { on: <LuEye />, off: <LuEyeOff /> },
      ...rest
    } = props;

    const [visible, setVisible] = useControllableState({
      value: visibleProp,
      defaultValue: defaultVisible || false,
      onChange: onVisibleChange,
    });

    const inputRef = React.useRef<HTMLInputElement>(null);

    return (
      <InputGroup
        endElement={
          <VisibilityTrigger
            disabled={rest.disabled}
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
        height="calc(100% - {spacing.2})"
        aria-label="Toggle password visibility"
        {...props}
      />
    );
  }
);
