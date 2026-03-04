"use client";

import { Link } from "@/lib/navigation";
import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import { s, gearAnimations } from "./app.styles";

export default function AppPage() {
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
          Ainda estamos
          <br />
          construindo isso
        </Heading>

        <Text {...s.subtitle}>
          O app está sendo desenvolvido com muito café e linhas de código. Em breve você vai poder
          acompanhar seus hábitos por aqui.
        </Text>

        <Box {...s.divider} />

        <HStack {...s.statusRow} role="status">
          <Box {...s.statusDot} style={gearAnimations.pulse} />
          <Text {...s.statusText}>Desenvolvimento ativo</Text>
        </HStack>

        <Box asChild {...s.backLink}>
          <Link href="/">← Voltar para o início</Link>
        </Box>
      </Box>
    </Box>
  );
}
