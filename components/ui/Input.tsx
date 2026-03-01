import { Input as ChakraInput, Field, Text } from "@chakra-ui/react";
import type { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface InputProps extends ChakraInputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, ...props }, ref) => {
    const hasError = !!error;

    return (
      <Field.Root invalid={hasError}>
        {label && (
          <Field.Label
            fontSize="sm"
            fontWeight="bold"
            letterSpacing="wider"
            textTransform="uppercase"
            mb={2}
          >
            {label}
          </Field.Label>
        )}
        <ChakraInput
          ref={ref}
          p={4}
          borderWidth="2px"
          borderColor={hasError ? "error" : "black"}
          borderRadius="0"
          bg={hasError ? "hsl(0, 100%, 98%)" : "canvas"}
          fontWeight="medium"
          fontSize="base"
          _focus={{
            outline: "none",
            borderColor: hasError ? "error" : "black",
            boxShadow: hasError
              ? `0 0 0 2px var(--chakra-colors-error)`
              : `0 0 0 2px var(--chakra-colors-primary)`,
          }}
          _placeholder={{ color: "hsl(0, 0%, 30%)" }}
          {...props}
        />
        {helperText && !hasError && <Field.HelperText>{helperText}</Field.HelperText>}
        {hasError && (
          <Text fontSize="xs" fontWeight="bold" letterSpacing="wide" color="error" mt={1}>
            {error}
          </Text>
        )}
      </Field.Root>
    );
  }
);

Input.displayName = "Input";
