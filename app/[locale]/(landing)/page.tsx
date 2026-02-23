"use client";

import { Button } from "@/components/ui";
import { Link } from "@/lib/navigation";
import { Box, Flex, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

const features = [
  {
    bg: "hsl(var(--surface-mint))",
    icon: "🤖",
    titleKey: "features.ai.title" as const,
    descKey: "features.ai.description" as const,
  },
  {
    bg: "hsl(var(--surface-yellow))",
    icon: "⚡",
    titleKey: "features.ultralearning.title" as const,
    descKey: "features.ultralearning.description" as const,
  },
  {
    bg: "hsl(var(--surface-coral))",
    icon: "🔥",
    titleKey: "features.consistency.title" as const,
    descKey: "features.consistency.description" as const,
  },
];

export default function Home() {
  const t = useTranslations("landing");

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box
        as="header"
        bg="hsl(var(--card))"
        borderBottom="var(--brutal-border)"
        position="sticky"
        top={0}
        zIndex={10}
      >
        <Box maxW="6xl" mx="auto" px={6}>
          <Flex h="16" align="center" justify="space-between">
            <Heading as="span" fontSize="2xl" fontWeight="900">
              🧠 Inside My Mind
            </Heading>
            <Flex gap={3}>
              <Link href="/login">
                <Button variant="muted" px={6}>
                  {t("nav.login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" px={6}>
                  {t("nav.signup")}
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Box>
      </Box>

      <Box as="section" bg="hsl(var(--background))">
        <Box maxW="6xl" mx="auto" px={6} py={{ base: 20, md: 32 }}>
          <Box maxW="3xl">
            <Heading
              as="h2"
              fontSize={{ base: "5xl", md: "7xl" }}
              fontWeight="900"
              lineHeight="1.1"
              mb={6}
            >
              {t("hero.titleLine1")}
              <br />
              <Box as="span" bg="hsl(var(--primary))" px={2} display="inline-block" mt={2}>
                {t("hero.titleLine2")}
              </Box>
            </Heading>
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="500"
              color="hsl(var(--muted-foreground))"
              mb={10}
              maxW="xl"
            >
              {t("hero.subtitle")}
            </Text>
            <Link href="/register">
              <Box
                as="button"
                px={10}
                py={6}
                bg="hsl(var(--primary))"
                color="hsl(var(--primary-foreground))"
                fontWeight="900"
                fontSize="xl"
                textTransform="uppercase"
                letterSpacing="wider"
                border="var(--brutal-border)"
                boxShadow="var(--brutal-shadow)"
                borderRadius={0}
                _hover={{
                  transform: "translate(-2px, -2px)",
                  boxShadow: "var(--brutal-shadow-lg)",
                }}
                transition="all 0.1s"
              >
                {t("hero.cta")}
              </Box>
            </Link>
          </Box>
        </Box>
      </Box>

      {/* Features */}
      <Box as="section" bg="hsl(var(--card))">
        <Box maxW="6xl" mx="auto" px={6} pb={20}>
          <VStack gap={8} align="start">
            <Heading
              as="h3"
              fontSize="3xl"
              fontWeight="900"
              mb={8}
              textTransform="uppercase"
              letterSpacing="wider"
            >
              {t("features.title")}
            </Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} w="full">
              {features.map(({ bg, icon, titleKey, descKey }) => (
                <Box
                  key={titleKey}
                  bg={bg}
                  border="var(--brutal-border)"
                  boxShadow="var(--brutal-shadow)"
                  borderRadius={0}
                  p={8}
                >
                  <Text fontSize="5xl" mb={4} display="block">
                    {icon}
                  </Text>
                  <Heading as="h4" fontSize="2xl" fontWeight="900" mb={3}>
                    {t(titleKey)}
                  </Heading>
                  <Text fontSize="base" fontWeight="500">
                    {t(descKey)}
                  </Text>
                </Box>
              ))}
            </Grid>
          </VStack>
        </Box>
      </Box>

      {/* CTA */}
      <Box
        as="section"
        borderTop="var(--brutal-border)"
        bg="hsl(var(--foreground))"
        color="hsl(var(--card))"
      >
        <Box maxW="6xl" mx="auto" px={6} py={16} textAlign="center">
          <VStack gap={8}>
            <Heading as="h3" fontSize="4xl" fontWeight="900" mb={4}>
              {t("cta.title")}
            </Heading>
            <Text fontSize="lg" fontWeight="500" mb={8} opacity={0.8}>
              {t("cta.subtitle")}
            </Text>
            <Link href="/register">
              <Box
                as="button"
                px={10}
                py={5}
                bg="hsl(var(--primary))"
                color="hsl(var(--primary-foreground))"
                fontWeight="900"
                fontSize="lg"
                textTransform="uppercase"
                letterSpacing="wider"
                border="var(--brutal-border)"
                boxShadow="var(--brutal-shadow)"
                borderRadius={0}
                _hover={{
                  transform: "translate(-2px, -2px)",
                  boxShadow: "var(--brutal-shadow-lg)",
                }}
                transition="all 0.1s"
              >
                {t("cta.button")}
              </Box>
            </Link>
          </VStack>
        </Box>
      </Box>

      {/* Footer */}
      <Box as="footer" bg="hsl(var(--card))" borderTop="var(--brutal-border)" py={6}>
        <Box maxW="6xl" mx="auto" px={6} textAlign="center">
          <Text fontSize="sm" fontWeight="900" color="hsl(var(--muted-foreground))">
            {t("footer.copy")}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
