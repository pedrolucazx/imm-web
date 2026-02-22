import { Button as ChakraButton } from "@chakra-ui/react";
import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

export type ButtonVariant = "primary" | "secondary" | "accent" | "muted";

const variantMap: Record<ButtonVariant, { bg: string; color: string }> = {
  primary: { bg: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" },
  secondary: { bg: "hsl(var(--secondary))", color: "hsl(var(--secondary-foreground))" },
  accent: { bg: "hsl(var(--accent))", color: "hsl(var(--accent-foreground))" },
  muted: { bg: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" },
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
      border="var(--brutal-border)"
      borderRadius="0"
      boxShadow="var(--brutal-shadow)"
      transition="all 0.1s ease"
      _hover={{ transform: "translate(-2px, -2px)", boxShadow: "var(--brutal-shadow-lg)" }}
      _active={{ transform: "translate(2px, 2px)", boxShadow: "var(--brutal-shadow-sm)" }}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}
