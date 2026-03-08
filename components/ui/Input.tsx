import { Box, Field, Input as ChakraInput } from "@chakra-ui/react";
import type { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface InputProps extends ChakraInputProps {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  const input = (
    <ChakraInput
      ref={ref}
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
      {...props}
    />
  );

  if (!label && !error) return input;

  return (
    <Field.Root invalid={!!error}>
      {label && <Field.Label mb={0}>{label}</Field.Label>}
      {input}
      <Box h="1.25rem" mt={1}>
        <Field.ErrorText>{error}</Field.ErrorText>
      </Box>
    </Field.Root>
  );
});

Input.displayName = "Input";
