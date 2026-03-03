import { Input as ChakraInput } from "@chakra-ui/react";
import type { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef } from "react";

export type InputProps = ChakraInputProps;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
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
));

Input.displayName = "Input";
