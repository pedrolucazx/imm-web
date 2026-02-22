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
    return (
      <Field.Root invalid={!!error}>
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
          borderColor="black"
          borderRadius="0"
          bg="hsl(60, 20%, 95%)"
          fontWeight="medium"
          fontSize="base"
          _focus={{
            outline: "none",
            borderColor: "black",
            boxShadow: "0 0 0 2px hsl(54, 100%, 45%)",
          }}
          _placeholder={{ color: "hsl(0, 0%, 30%)" }}
          {...props}
        />
        {helperText && !error && <Field.HelperText>{helperText}</Field.HelperText>}
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    );
  }
);

Input.displayName = "Input";
