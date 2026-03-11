import { Box, Field, Textarea as ChakraTextarea } from "@chakra-ui/react";
import type { TextareaProps as ChakraTextareaProps } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface TextareaProps extends ChakraTextareaProps {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, ...props }, ref) => {
    const textarea = (
      <ChakraTextarea
        ref={ref}
        minH="8rem"
        p={4}
        borderWidth="2px"
        borderColor="black"
        borderRadius="0"
        boxShadow="2px 2px 0px 0px black"
        bg="canvas"
        fontWeight="medium"
        fontSize="md"
        lineHeight="1.5rem"
        resize="vertical"
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

    if (!label && !error) return textarea;

    return (
      <Field.Root invalid={!!error}>
        {label && <Field.Label mb={0}>{label}</Field.Label>}
        {textarea}
        <Box h="1.25rem" mt={1}>
          <Field.ErrorText>{error}</Field.ErrorText>
        </Box>
      </Field.Root>
    );
  }
);

Textarea.displayName = "Textarea";
