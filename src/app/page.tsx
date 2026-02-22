"use client";

import { Box, Container, Heading, Text, Button, VStack } from "@chakra-ui/react";

export default function Home() {
  return (
    <Container maxW="lg" py={{ base: "12", md: "24" }}>
      <VStack gap={8}>
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to Inside My Mind
          </Heading>
          <Text fontSize="lg" color="gray.600">
            A habit tracking and AI-powered journaling SaaS
          </Text>
        </Box>

        <VStack gap={4} width="full">
          <Button colorScheme="blue" size="lg" width="full">
            Get Started
          </Button>
          <Button variant="outline" colorScheme="gray" size="lg" width="full">
            Learn More
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
}
