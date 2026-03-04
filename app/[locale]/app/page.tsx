"use client";

import { Link } from "@/lib/navigation";
import { Box, Heading, Text } from "@chakra-ui/react";
import { s, gearAnimations } from "./app.styles";

export default function AppPage() {
  return (
    <Box {...s.pageWrapper}>
      <Box {...s.card}>
        <Box {...s.gearsRow}>
          <Box as="span" {...s.gearBase} style={gearAnimations.small}>
            ⚙️
          </Box>
          <Box as="span" {...s.gearBase} style={gearAnimations.large}>
            ⚙️
          </Box>
          <Box as="span" {...s.gearBase} style={gearAnimations.medium}>
            ⚙️
          </Box>
        </Box>

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

        <Box {...s.statusRow}>
          <Box {...s.statusDot} style={gearAnimations.pulse} />
          <Text {...s.statusText}>Desenvolvimento ativo</Text>
        </Box>

        <Link href="/" style={{ textDecoration: "none" }}>
          <Box {...s.backLink}>← Voltar para o início</Box>
        </Link>
      </Box>
    </Box>
  );
}
