import { Button as ChakraButton } from "@chakra-ui/react";
import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

export interface ButtonProps extends ChakraButtonProps {
  isLoading?: boolean;
}

export function Button({ isLoading = false, children, ...props }: ButtonProps) {
  return (
    <ChakraButton
      loading={isLoading}
      width="100%"
      py={5}
      fontSize="lg"
      fontWeight="bold"
      letterSpacing="wider"
      textTransform="uppercase"
      bg="hsl(54, 100%, 45%)"
      color="black"
      borderWidth="3px"
      borderColor="black"
      borderRadius="0"
      boxShadow="4px 4px 0px 0px black"
      transition="all 0.1s ease"
      _hover={{ transform: "translate(-2px, -2px)", boxShadow: "6px 6px 0px black" }}
      _active={{ transform: "translate(2px, 2px)", boxShadow: "2px 2px 0px black" }}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}
