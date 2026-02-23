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
          borderColor={hasError ? "hsl(0, 84%, 60%)" : "black"}
          borderRadius="0"
          bg={hasError ? "hsl(0, 100%, 98%)" : "hsl(60, 20%, 95%)"}
          fontWeight="medium"
          fontSize="base"
          _focus={{
            outline: "none",
            borderColor: hasError ? "hsl(0, 84%, 60%)" : "black",
            boxShadow: hasError ? "0 0 0 2px hsl(0, 84%, 60%)" : "0 0 0 2px hsl(54, 100%, 45%)",
          }}
          _placeholder={{ color: "hsl(0, 0%, 30%)" }}
          {...props}
        />
        {helperText && !hasError && <Field.HelperText>{helperText}</Field.HelperText>}
        {hasError && (
          <Text
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="wide"
            color="hsl(0, 84%, 45%)"
            mt={1}
          >
            {error}
          </Text>
        )}
      </Field.Root>
    );
  }
);

Input.displayName = "Input";
