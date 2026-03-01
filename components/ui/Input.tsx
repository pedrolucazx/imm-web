import { Input as ChakraInput, Field } from "@chakra-ui/react";
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
          bg={hasError ? "errorBg" : "canvas"}
          fontWeight="medium"
          fontSize="base"
          _focus={{
            outline: "none",
            borderColor: hasError ? "error" : "black",
            boxShadow: hasError
              ? `0 0 0 2px var(--chakra-colors-error)`
              : `0 0 0 2px var(--chakra-colors-primary)`,
          }}
          _placeholder={{ color: "mutedFg" }}
          {...props}
        />
        {helperText && !hasError && <Field.HelperText>{helperText}</Field.HelperText>}
        {hasError && (
          <Field.ErrorText
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="wide"
            color="error"
            mt={1}
          >
            {error}
          </Field.ErrorText>
        )}
      </Field.Root>
    );
  }
);

Input.displayName = "Input";
