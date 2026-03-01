import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    "html, body": {
      width: "100%",
      height: "100%",
      backgroundColor: "{colors.brand.background}",
      color: "black",
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontWeight: "400",
    },
    "h1, h2, h3, h4, h5, h6": {
      fontWeight: "900",
      letterSpacing: "-0.02em",
    },
  },
  theme: {
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
      },
      shadows: {
        brutal: { value: "4px 4px 0px 0px black" },
        "brutal-sm": { value: "2px 2px 0px 0px black" },
        "brutal-lg": { value: "6px 6px 0px 0px black" },
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
      },
    },
    layerStyles: {
      cardBrutal: {
        border: "3px solid black",
        boxShadow: "brutal",
        borderRadius: "0",
      },
      cardBrutalSm: {
        border: "2px solid black",
        boxShadow: "brutal-sm",
        borderRadius: "0",
      },
    },
    textStyles: {
      heroTitle: {
        fontSize: { base: "5xl", md: "7xl" },
        fontWeight: "900",
        lineHeight: "1.1",
      },
      sectionTitle: {
        fontSize: { base: "2xl", md: "4xl" },
        fontWeight: "900",
        textTransform: "uppercase",
        letterSpacing: "wider",
      },
      featuresTitle: {
        fontSize: "3xl",
        fontWeight: "900",
        textTransform: "uppercase",
        letterSpacing: "wider",
      },
      sectionSubtitle: {
        fontSize: { base: "lg", md: "xl" },
        fontWeight: "500",
        color: "mutedFg",
      },
      label: {
        fontSize: "sm",
        fontWeight: "900",
        textTransform: "uppercase",
        letterSpacing: "wider",
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
