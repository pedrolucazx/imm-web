import { Button as ChakraButton } from "@chakra-ui/react";
import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

export type ButtonVariant = "primary" | "secondary" | "accent" | "muted";

const variantMap: Record<ButtonVariant, { bg: string; color: string }> = {
  primary: { bg: "primary", color: "black" },
  secondary: { bg: "secondary", color: "black" },
  accent: { bg: "accent", color: "black" },
  muted: { bg: "muted", color: "black" },
};

export interface ButtonProps extends Omit<ChakraButtonProps, "variant"> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  isLoading = false,
  children,
  ...props
}: ButtonProps) {
  const { bg, color } = variantMap[variant];

  return (
    <ChakraButton
      loading={isLoading}
      bg={bg}
      color={color}
      py={5}
      fontSize="lg"
      fontWeight="bold"
      letterSpacing="wider"
      textTransform="uppercase"
      border="3px solid black"
      borderRadius="0"
      boxShadow="brutal"
      transition="all 0.1s ease"
      _hover={{ transform: "translate(-2px, -2px)", boxShadow: "brutal-lg" }}
      _active={{ transform: "translate(2px, 2px)", boxShadow: "brutal-sm" }}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}
