import { Input as ChakraInput, Field } from "@chakra-ui/react";
import type { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface InputProps extends ChakraInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  labelProps?: React.ComponentProps<typeof Field.Label>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, labelProps, ...props }, ref) => {
    return (
      <Field.Root invalid={!!error}>
        {label && <Field.Label {...labelProps}>{label}</Field.Label>}
        <ChakraInput ref={ref} {...props} />
        {helperText && !error && <Field.HelperText>{helperText}</Field.HelperText>}
        {error && <Field.ErrorText>{error}</Field.ErrorText>}
      </Field.Root>
    );
  }
);

Input.displayName = "Input";
