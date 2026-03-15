"use client";

import { Box, Heading, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { ROUTES } from "@/lib/routes";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <Box minH="100vh" bg="canvas" display="flex" alignItems="center" justifyContent="center" p={6}>
      <Box layerStyle="cardBrutal" bg="card" p={8} textAlign="center" maxW="400px" w="100%">
        <Heading fontSize="6xl" fontWeight="black" mb={2}>
          {t("title")}
        </Heading>
        <Text fontWeight="bold" mb={6}>
          {t("message")}
        </Text>
        <Link href={ROUTES.HOME} style={{ fontWeight: "bold", textDecoration: "underline" }}>
          {t("backHome")}
        </Link>
      </Box>
    </Box>
  );
}
