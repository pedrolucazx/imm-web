"use client";

import type { BoxProps, ButtonProps, GroupProps, InputProps } from "@chakra-ui/react";
import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Text,
  mergeRefs,
  useControllableState,
} from "@chakra-ui/react";
import * as React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

// ─── Strength Meter ──────────────────────────────────────────────────────────

const STRENGTH_LEVELS = [
  { label: "Muito fraca", color: "hsl(0, 84%, 60%)" },
  { label: "Fraca", color: "hsl(30, 100%, 55%)" },
  { label: "Boa", color: "hsl(54, 100%, 45%)" },
  { label: "Forte", color: "hsl(152, 100%, 40%)" },
];

interface PasswordStrengthMeterProps extends BoxProps {
  max?: number;
  value: number;
}

export const PasswordStrengthMeter = React.forwardRef<HTMLDivElement, PasswordStrengthMeterProps>(
  function PasswordStrengthMeter(props, ref) {
    const { max = 4, value, ...rest } = props;
    const level = value > 0 ? STRENGTH_LEVELS[Math.min(value, max) - 1] : null;

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
            onPointerDown={(e) => {
              if (rest.disabled) return;
              if (e.button !== 0) return;
              e.preventDefault();
              setVisible(!visible);
            }}
          >
            {visible ? visibilityIcon.off : visibilityIcon.on}
          </VisibilityTrigger>
        }
        {...rootProps}
      >
        <Input
          {...rest}
          ref={mergeRefs(ref, inputRef)}
          type={visible ? "text" : "password"}
          h="3.75rem"
          p={4}
          borderWidth="2px"
          borderColor="black"
          borderRadius="0"
          boxShadow="2px 2px 0px 0px black"
          bg="canvas"
          fontWeight="medium"
          fontSize="md"
          lineHeight="1.5rem"
          css={{
            "--focus-color": "var(--chakra-colors-primary)",
            "--error-color": "var(--chakra-colors-error)",
          }}
          _placeholder={{ color: "mutedFg" }}
          _invalid={{
            borderColor: "error",
            bg: "errorBg",
          }}
        />
      </InputGroup>
    );
  }
);

const VisibilityTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function VisibilityTrigger(props, ref) {
    return (
      <IconButton
        tabIndex={-1}
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
