import { createSystem, defaultConfig, defineConfig, defineSlotRecipe } from "@chakra-ui/react";
import { fieldSlotRecipe } from "@chakra-ui/react/theme";

const customFieldRecipe = defineSlotRecipe({
  ...fieldSlotRecipe,
  base: {
    ...(fieldSlotRecipe.base ?? {}),
    label: {
      ...(fieldSlotRecipe.base?.label ?? {}),
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "wider",
      mb: 2,
    },
    errorText: {
      ...(fieldSlotRecipe.base?.errorText ?? {}),
      fontSize: "sm",
      lineHeight: "1.25rem",
      fontWeight: "bold",
      letterSpacing: "wide",
      color: "error",
    },
  },
});

const config = defineConfig({
  globalCss: {
    "html, body": {
      width: "100%",
      height: "100%",
      backgroundColor: "{colors.brand.background}",
      color: "black",
      fontFamily: "var(--font-sans), system-ui, sans-serif",
      fontWeight: "400",
    },
    "h1, h2, h3, h4, h5, h6": {
      fontWeight: "700",
      letterSpacing: "-0.025em",
    },
  },
  theme: {
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
      pulse: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0.3" },
      },
      "pulse-brutal": {
        "0%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.05)" },
        "100%": { transform: "scale(1)" },
      },
    },
    tokens: {
      colors: {
        brand: {
          yellow: { value: "hsl(54, 100%, 45%)" },
          mint: { value: "hsl(152, 100%, 40%)" },
          coral: { value: "hsl(0, 100%, 71%)" },
          muted: { value: "hsl(60, 10%, 90%)" },
          background: { value: "hsl(60, 20%, 95%)" },
        },
        surface: {
          yellow: { value: "hsl(54, 100%, 70%)" },
          mint: { value: "hsl(152, 80%, 70%)" },
          coral: { value: "hsl(0, 100%, 80%)" },
          sky: { value: "hsl(200, 90%, 75%)" },
          lavender: { value: "hsl(280, 80%, 80%)" },
        },
        habit: {
          gym: { value: "hsl(280, 80%, 60%)" },
          reading: { value: "hsl(200, 100%, 50%)" },
          english: { value: "hsl(30, 100%, 55%)" },
        },
      },
      shadows: {
        brutal: { value: "4px 4px 0px 0px black" },
        "brutal-sm": { value: "2px 2px 0px 0px black" },
        "brutal-lg": { value: "6px 6px 0px 0px black" },
      },
      animations: {
        "accordion-down": { value: "accordion-down 0.2s ease-out" },
        "accordion-up": { value: "accordion-up 0.2s ease-out" },
        "pulse-brutal": { value: "pulse-brutal 0.3s ease-in-out" },
        spin: { value: "spin 1s linear infinite" },
        pulse: { value: "pulse 2s ease-in-out infinite" },
      },
    },
    semanticTokens: {
      colors: {
        primary: { value: "{colors.brand.yellow}" },
        secondary: { value: "{colors.brand.mint}" },
        accent: { value: "{colors.brand.coral}" },
        muted: { value: "{colors.brand.muted}" },
        error: { value: "hsl(0, 84%, 60%)" },
        errorBg: { value: "hsl(0, 100%, 98%)" },
        info: { value: "hsl(200, 100%, 50%)" },
        canvas: { value: "{colors.brand.background}" },
        mutedFg: { value: "hsl(0, 0%, 30%)" },
        card: { value: "hsl(0, 0%, 100%)" },
        border: { value: "hsl(0, 0%, 0%)" },
        ring: { value: "{colors.brand.yellow}" },
        sidebar: {
          bg: { value: "{colors.brand.yellow}" },
          fg: { value: "hsl(0, 0%, 0%)" },
          primary: { value: "hsl(0, 0%, 0%)" },
          primaryFg: { value: "{colors.brand.yellow}" },
          accent: { value: "hsl(54, 100%, 55%)" },
          accentFg: { value: "hsl(0, 0%, 0%)" },
          border: { value: "hsl(0, 0%, 0%)" },
        },
      },
    },
    layerStyles: {
      cardBrutal: {
        value: {
          border: "3px solid black",
          boxShadow: "4px 4px 0px 0px black",
          borderRadius: "0",
        },
      },
      cardBrutalSm: {
        value: {
          border: "2px solid black",
          boxShadow: "2px 2px 0px 0px black",
          borderRadius: "0",
        },
      },
      brutalHover: {
        value: {
          transition: "transform 0.1s ease, box-shadow 0.1s ease",
          _hover: {
            transform: "translate(-2px, -2px)",
            boxShadow: "6px 6px 0px 0px black",
          },
          _active: {
            transform: "translate(2px, 2px)",
            boxShadow: "none",
          },
        },
      },
    },
    slotRecipes: {
      field: customFieldRecipe,
    },
    textStyles: {
      heroTitle: {
        value: {
          fontSize: { base: "3rem", md: "4.5rem" },
          fontWeight: "700",
          lineHeight: "1.1",
        },
      },
      sectionTitle: {
        value: {
          fontSize: { base: "1.875rem", md: "2.25rem" },
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        },
      },
      featuresTitle: {
        value: {
          fontSize: "1.875rem",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        },
      },
      sectionSubtitle: {
        value: {
          fontSize: { base: "1.125rem", md: "1.25rem" },
          fontWeight: "500",
          color: "mutedFg",
        },
      },
      label: {
        value: {
          fontSize: "0.875rem",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
