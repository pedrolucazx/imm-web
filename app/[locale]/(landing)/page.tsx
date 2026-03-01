"use client";

import { Link } from "@/lib/navigation";
import { Box, Grid, Text, chakra } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { s } from "./landing.styles";

const ChakraLink = chakra(Link);

const phases = [
  {
    num: 1,
    daysKey: "phases.phase1.days" as const,
    titleKey: "phases.phase1.title" as const,
    descKey: "phases.phase1.desc" as const,
    bg: "surface.mint",
  },
  {
    num: 2,
    daysKey: "phases.phase2.days" as const,
    titleKey: "phases.phase2.title" as const,
    descKey: "phases.phase2.desc" as const,
    bg: "surface.yellow",
  },
  {
    num: 3,
    daysKey: "phases.phase3.days" as const,
    titleKey: "phases.phase3.title" as const,
    descKey: "phases.phase3.desc" as const,
    bg: "surface.coral",
  },
];

const agents = [
  {
    icon: "🧠",
    titleKey: "agents.habitPlanner.title" as const,
    descKey: "agents.habitPlanner.desc" as const,
    badgeKey: "agents.habitPlanner.badge" as const,
    bg: "surface.sky",
  },
  {
    icon: "📝",
    titleKey: "agents.languageTeacher.title" as const,
    descKey: "agents.languageTeacher.desc" as const,
    badgeKey: "agents.languageTeacher.badge" as const,
    bg: "surface.mint",
  },
  {
    icon: "🎯",
    titleKey: "agents.behavioralCoach.title" as const,
    descKey: "agents.behavioralCoach.desc" as const,
    badgeKey: "agents.behavioralCoach.badge" as const,
    bg: "surface.lavender",
  },
];

const features = [
  {
    icon: "📅",
    titleKey: "features.cycles.title" as const,
    descKey: "features.cycles.desc" as const,
  },
  {
    icon: "📊",
    titleKey: "features.analytics.title" as const,
    descKey: "features.analytics.desc" as const,
  },
  {
    icon: "✍️",
    titleKey: "features.journaling.title" as const,
    descKey: "features.journaling.desc" as const,
  },
  {
    icon: "🎙️",
    titleKey: "features.voice.title" as const,
    descKey: "features.voice.desc" as const,
  },
  {
    icon: "🌍",
    titleKey: "features.multilanguage.title" as const,
    descKey: "features.multilanguage.desc" as const,
  },
  {
    icon: "⚡",
    titleKey: "features.freeAI.title" as const,
    descKey: "features.freeAI.desc" as const,
  },
];

const ultralearningSteps = ["1️⃣", "2️⃣", "3️⃣"] as const;

export default function Home() {
  const t = useTranslations("landing");

  return (
    <Box {...s.pageWrapper}>
      {/* Nav */}
      <Box as="header" {...s.header}>
        <Box {...s.navContainer}>
          <Box {...s.navInner}>
            <Text {...s.navBrand}>🧠 Inside My Mind</Text>
            <Box {...s.navButtons}>
              <ChakraLink href="/login" {...s.navLoginBtn}>
                {t("nav.login")}
              </ChakraLink>
              <ChakraLink href="/register" {...s.navSignupBtn}>
                {t("nav.signup")}
              </ChakraLink>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Hero */}
      <Box as="section" {...s.heroSection}>
        <Box {...s.container}>
          <Box {...s.heroBox}>
            <Text as="h1" {...s.heroTitle}>
              {t("hero.titleLine1")}
              <br />
              <Box as="span" {...s.heroHighlight}>
                {t("hero.titleLine2")}
              </Box>
            </Text>
            <Text {...s.heroSubtitle}>{t("hero.subtitle")}</Text>
            <ChakraLink href="/register" {...s.heroCtaBtn}>
              {t("hero.cta")}
            </ChakraLink>
          </Box>
        </Box>
      </Box>

      {/* 66-Day Rule */}
      <Box as="section" {...s.sectionCard}>
        <Box {...s.container}>
          <Text as="h3" {...s.phasesTitle}>
            {t("phases.title")}
          </Text>
          <Text {...s.phasesSubtitle}>{t("phases.subtitle")}</Text>
          <Grid {...s.grid3}>
            {phases.map((p) => (
              <Box key={p.num} bg={p.bg} {...s.phaseCard}>
                <Text as="span" {...s.phaseNumber}>
                  {p.num}
                </Text>
                <Text {...s.phaseLabel}>
                  {t("phases.phaseLabel", { num: p.num, days: t(p.daysKey) })}
                </Text>
                <Text as="h4" {...s.phaseTitle}>
                  {t(p.titleKey)}
                </Text>
                <Text {...s.phaseDesc}>{t(p.descKey)}</Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Ultralearning */}
      <Box as="section" {...s.sectionBase}>
        <Box {...s.container}>
          <Text as="h3" {...s.ultralearningTitle}>
            {t("ultralearning.title")}
          </Text>
          <Text {...s.ultralearningSubtitle}>{t("ultralearning.subtitle")}</Text>
          <Box {...s.ultraCard}>
            <Text {...s.ultraCardHeading}>{t("ultralearning.howItWorks")}</Text>
            <Box {...s.ultraStepList}>
              {(["1", "2", "3"] as const).map((n, i) => (
                <Box key={n} {...s.ultraStepRow}>
                  <Text {...s.ultraStepEmoji}>{ultralearningSteps[i]}</Text>
                  <Text {...s.ultraStep}>{t(`ultralearning.steps.${n}`)}</Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 3 AI Agents */}
      <Box as="section" {...s.sectionCard}>
        <Box {...s.container}>
          <Text as="h3" {...s.agentsTitle}>
            {t("agents.title")}
          </Text>
          <Grid {...s.grid3}>
            {agents.map((a) => (
              <Box key={a.titleKey} bg={a.bg} {...s.agentCard}>
                <Text {...s.agentIcon}>{a.icon}</Text>
                <Text as="h4" {...s.agentTitle}>
                  {t(a.titleKey)}
                </Text>
                <Text {...s.agentDesc}>{t(a.descKey)}</Text>
                <Box as="span" {...s.agentBadge}>
                  {t(a.badgeKey)}
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Features Grid */}
      <Box as="section" {...s.sectionBase}>
        <Box {...s.container}>
          <Text as="h3" {...s.featuresTitle}>
            {t("features.title")}
          </Text>
          <Grid {...s.gridFeatures}>
            {features.map((f) => (
              <Box key={f.titleKey} {...s.featureCard}>
                <Text {...s.featureIcon}>{f.icon}</Text>
                <Text as="h4" {...s.featureTitle}>
                  {t(f.titleKey)}
                </Text>
                <Text {...s.featureDesc}>{t(f.descKey)}</Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Open Source */}
      <Box as="section" {...s.opensourceSection}>
        <Box {...s.centeredContent}>
          <Text as="h3" {...s.opensourceTitle}>
            {t("opensource.title")}
          </Text>
          <Text {...s.opensourceSubtitle}>{t("opensource.subtitle")}</Text>
          <chakra.a
            href="https://github.com/pedrolucazx/imm-web"
            target="_blank"
            rel="noopener noreferrer"
            {...s.githubBtn}
          >
            {t("opensource.cta")}
          </chakra.a>
        </Box>
      </Box>

      {/* Final CTA */}
      <Box as="section" {...s.ctaSection}>
        <Box {...s.centeredContent}>
          <Text as="h3" {...s.ctaTitle}>
            {t("cta.title")}
          </Text>
          <Text {...s.ctaSubtitle}>{t("cta.subtitle")}</Text>
          <ChakraLink href="/register" {...s.ctaBtn}>
            {t("cta.button")}
          </ChakraLink>
        </Box>
      </Box>

      {/* Footer */}
      <Box as="footer" {...s.footer}>
        <Box {...s.container}>
          <Box {...s.footerInner}>
            <Text {...s.footerText}>{t("footer.copy")}</Text>
            <chakra.a
              href="https://github.com/pedrolucazx/imm-web"
              target="_blank"
              rel="noopener noreferrer"
              {...s.footerLink}
            >
              {t("footer.github")}
            </chakra.a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
