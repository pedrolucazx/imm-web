"use client";

import { Link } from "@/lib/navigation";
import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { s, gearAnimations } from "../app.styles";
import { ROUTES } from "@/lib/routes";

export default function DailyLabPage() {
  return (
    <Box {...s.pageWrapper}>
      <Box {...s.card}>
        <HStack {...s.gearsRow} aria-hidden="true">
          <Box as="span" {...s.gearBase} style={gearAnimations.small}>
            ⚙️
          </Box>
          <Box as="span" {...s.gearBase} style={gearAnimations.large}>
            ⚙️
          </Box>
          <Box as="span" {...s.gearBase} style={gearAnimations.medium}>
            ⚙️
          </Box>
        </HStack>

        <Box {...s.badge}>Em construção</Box>

        <Heading {...s.title}>
          Daily Lab
          <br />
          em breve
        </Heading>

        <Text {...s.subtitle}>
          O Daily Lab está sendo desenvolvido. Em breve você poderá acompanhar seus hábitos e
          registrar seu progresso diário aqui.
        </Text>

        <Box {...s.divider} />

        <HStack {...s.statusRow} role="status">
          <Box {...s.statusDot} style={gearAnimations.pulse} />
          <Text {...s.statusText}>Desenvolvimento ativo</Text>
        </HStack>

        <Box asChild {...s.backLink}>
          <Link href={ROUTES.HOME}>← Voltar para o início</Link>
        </Box>
      </Box>
    </Box>
  );
}
