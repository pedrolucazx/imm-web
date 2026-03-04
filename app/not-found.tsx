import { Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box minH="100vh" bg="canvas" display="flex" alignItems="center" justifyContent="center" p={6}>
      <Box layerStyle="cardBrutal" bg="card" p={8} textAlign="center" maxW="400px" w="100%">
        <Heading fontSize="6xl" fontWeight="black" mb={2}>
          404
        </Heading>
        <Text fontWeight="bold" mb={6}>
          Page not found.
        </Text>
        <Link href="/" style={{ fontWeight: "bold", textDecoration: "underline" }}>
          Go home
        </Link>
      </Box>
    </Box>
  );
}
