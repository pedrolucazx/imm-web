import { Button as ChakraButton } from "@chakra-ui/react";
import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

export interface ButtonProps extends ChakraButtonProps {
  isLoading?: boolean;
}

export function Button({ isLoading = false, children, ...props }: ButtonProps) {
  return (
    <ChakraButton loading={isLoading} {...props}>
      {children}
    </ChakraButton>
  );
}
