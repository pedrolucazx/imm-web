import { AgentCard, FeatureCard, PhaseCard } from "@/components/landing";
import { ROUTES } from "@/lib/routes";
import { Box, Grid, Text, chakra } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";
import { SiFastify, SiNextdotjs, SiPostgresql } from "react-icons/si";
import { ChakraLink } from "./ChakraLink";
import { s } from "./landing.styles";

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

interface LandingClientProps {
  locale: string;
}

export async function LandingClient({ locale }: LandingClientProps) {
  const t = await getTranslations({ locale, namespace: "landing" });

  return (
    <Box {...s.pageWrapper}>
      <Box as="header" {...s.header}>
        <Box {...s.navContainer}>
          <Box {...s.navInner}>
            <Text {...s.navBrand}>🧠 Inside My Mind</Text>
            <Box {...s.navButtons}>
              <ChakraLink href={ROUTES.LOGIN} {...s.navLoginBtn}>
                {t("nav.login")}
              </ChakraLink>
              <ChakraLink href={ROUTES.REGISTER} {...s.navSignupBtn}>
                {t("nav.signup")}
              </ChakraLink>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box as="main">
        <Box as="section" {...s.heroSection}>
          <Box {...s.container}>
            <Box {...s.heroBox}>
              <Box as="span" {...s.heroBadge}>
                {t("hero.badge")}
              </Box>
              <Text as="h1" {...s.heroTitle}>
                {t("hero.titleLine1")}
                <br />
                <Box as="span" {...s.heroHighlight}>
                  {t("hero.titleLine2")}
                </Box>
              </Text>
              <Text {...s.heroSubtitle}>{t("hero.subtitle")}</Text>
              <Box {...s.heroButtons}>
                <ChakraLink href={ROUTES.REGISTER} {...s.heroCtaBtn}>
                  {t("hero.cta")}
                </ChakraLink>
                <chakra.a
                  href="https://github.com/pedrolucazx/imm-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...s.heroGithubBtn}
                >
                  {t("hero.githubCta")}
                </chakra.a>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box as="section" {...s.sectionCard}>
          <Box {...s.container}>
            <Text as="h2" {...s.phasesTitle}>
              {t("phases.title")}
            </Text>
            <Text {...s.phasesSubtitle}>{t("phases.subtitle")}</Text>
            <Grid {...s.grid3}>
              {phases.map((p) => (
                <PhaseCard
                  key={p.num}
                  num={p.num}
                  bg={p.bg}
                  label={t("phases.phaseLabel", { num: p.num, days: t(p.daysKey) })}
                  title={t(p.titleKey)}
                  desc={t(p.descKey)}
                />
              ))}
            </Grid>
          </Box>
        </Box>

        <Box as="section" {...s.sectionBase}>
          <Box {...s.container}>
            <Text as="h2" {...s.ultralearningTitle}>
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

        <Box as="section" {...s.sectionCard}>
          <Box {...s.container}>
            <Text as="h2" {...s.agentsTitle}>
              {t("agents.title")}
            </Text>
            <Grid {...s.grid3}>
              {agents.map((a) => (
                <AgentCard
                  key={a.titleKey}
                  icon={a.icon}
                  bg={a.bg}
                  title={t(a.titleKey)}
                  desc={t(a.descKey)}
                  badge={t(a.badgeKey)}
                />
              ))}
            </Grid>
          </Box>
        </Box>

        <Box as="section" {...s.sectionBase}>
          <Box {...s.container}>
            <Text as="h2" {...s.featuresTitle}>
              {t("features.title")}
            </Text>
            <Grid {...s.gridFeatures}>
              {features.map((f) => (
                <FeatureCard
                  key={f.titleKey}
                  icon={f.icon}
                  title={t(f.titleKey)}
                  desc={t(f.descKey)}
                />
              ))}
            </Grid>
          </Box>
        </Box>

        <Box as="section" {...s.opensourceSection}>
          <Box {...s.centeredContent}>
            <Text as="h2" {...s.opensourceTitle}>
              {t("opensource.title")}
            </Text>
            <Text {...s.opensourceSubtitle}>{t("opensource.subtitle")}</Text>
            <Text {...s.opensourceBuildInPublic}>{t("opensource.buildInPublic")}</Text>
            <Text {...s.opensourceStack}>{t("opensource.stack")}</Text>
            <Box {...s.opensourceButtons}>
              <chakra.a
                href="https://github.com/pedrolucazx/imm-web"
                target="_blank"
                rel="noopener noreferrer"
                {...s.githubBtn}
              >
                {t("opensource.cta")}
              </chakra.a>
              <chakra.a
                href="https://github.com/pedrolucazx/imm-api"
                target="_blank"
                rel="noopener noreferrer"
                {...s.githubBtn}
              >
                {t("opensource.ctaApi")}
              </chakra.a>
            </Box>
          </Box>
        </Box>

        <Box as="section" {...s.ctaSection}>
          <Box {...s.centeredContent}>
            <Text as="h2" {...s.ctaTitle}>
              {t("cta.title")}
            </Text>
            <Text {...s.ctaSubtitle}>{t("cta.subtitle")}</Text>
            <ChakraLink href={ROUTES.REGISTER} {...s.ctaBtn}>
              {t("cta.button")}
            </ChakraLink>
          </Box>
        </Box>
      </Box>

      <Box as="footer" {...s.footer}>
        <Box {...s.container}>
          <Box {...s.footerInner}>
            <Text {...s.footerText}>{t("footer.copy")}</Text>
            <Box {...s.footerLinks}>
              <ChakraLink href={ROUTES.LOGIN} {...s.footerLink}>
                {t("footer.login")}
              </ChakraLink>
              <ChakraLink href={ROUTES.REGISTER} {...s.footerLink}>
                {t("footer.register")}
              </ChakraLink>
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
          <Box {...s.footerStack}>
            <chakra.a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Next.js"
              {...s.stackIconLink}
            >
              <SiNextdotjs />
            </chakra.a>
            <chakra.a
              href="https://fastify.dev"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fastify"
              {...s.stackIconLink}
            >
              <SiFastify />
            </chakra.a>
            <chakra.a
              href="https://www.postgresql.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="PostgreSQL"
              {...s.stackIconLink}
            >
              <SiPostgresql />
            </chakra.a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
