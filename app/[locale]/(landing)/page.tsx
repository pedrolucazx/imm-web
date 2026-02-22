"use client";

import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Textarea,
  Input,
  SimpleGrid,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [habitCompleted, setHabitCompleted] = useState(false);
  const [journal, setJournal] = useState("");

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={12}>
        <Heading as="h1" size="2xl" mb={2} fontWeight="900">
          Inside My Mind
        </Heading>
        <Text fontSize="lg" color="hsl(var(--muted-foreground))">
          Neo Brutalist Habit Tracker Theme Test
        </Text>
      </Box>

      {/* Color Palette Test */}
      <Box mb={12}>
        <Heading as="h2" size="lg" mb={4} fontWeight="900">
          Design Tokens
        </Heading>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} gap={4}>
          <Box
            bg="hsl(var(--primary))"
            color="hsl(var(--primary-foreground))"
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow)"
            borderRadius={0}
            p={4}
          >
            <Heading size="md" mb={1}>
              Primary
            </Heading>
            <Text fontSize="sm">hsl(54 100% 45%)</Text>
          </Box>

          <Box
            bg="hsl(var(--secondary))"
            color="hsl(var(--secondary-foreground))"
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow)"
            borderRadius={0}
            p={4}
          >
            <Heading size="md" mb={1}>
              Secondary
            </Heading>
            <Text fontSize="sm">hsl(152 100% 40%)</Text>
          </Box>

          <Box
            bg="hsl(var(--accent))"
            color="hsl(var(--accent-foreground))"
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow)"
            borderRadius={0}
            p={4}
          >
            <Heading size="md" mb={1}>
              Accent
            </Heading>
            <Text fontSize="sm">hsl(0 100% 71%)</Text>
          </Box>

          <Box
            bg="hsl(var(--surface-yellow))"
            color="hsl(var(--foreground))"
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow)"
            borderRadius={0}
            p={4}
          >
            <Heading size="md" mb={1}>
              Surface Yellow
            </Heading>
            <Text fontSize="sm">hsl(54 100% 70%)</Text>
          </Box>

          <Box
            bg="hsl(var(--surface-mint))"
            color="hsl(var(--foreground))"
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow)"
            borderRadius={0}
            p={4}
          >
            <Heading size="md" mb={1}>
              Surface Mint
            </Heading>
            <Text fontSize="sm">hsl(152 80% 70%)</Text>
          </Box>

          <Box
            bg="hsl(var(--surface-coral))"
            color="hsl(var(--foreground))"
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow)"
            borderRadius={0}
            p={4}
          >
            <Heading size="md" mb={1}>
              Surface Coral
            </Heading>
            <Text fontSize="sm">hsl(0 100% 80%)</Text>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Buttons Test */}
      <Box mb={12}>
        <Heading as="h2" size="lg" mb={4} fontWeight="900">
          Buttons
        </Heading>
        <HStack gap={4} flexWrap="wrap">
          <Button
            bg="hsl(var(--primary))"
            color="hsl(var(--primary-foreground))"
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow)"
            borderRadius={0}
            px={6}
            py={6}
            fontWeight="900"
            _hover={{
              boxShadow: "var(--brutal-shadow-lg)",
              transform: "translate(-2px, -2px)",
            }}
          >
            Primary Button
          </Button>
          <Button
            bg="hsl(var(--secondary))"
            color="hsl(var(--secondary-foreground))"
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow)"
            borderRadius={0}
            px={6}
            py={6}
            fontWeight="900"
            _hover={{
              boxShadow: "var(--brutal-shadow-lg)",
              transform: "translate(-2px, -2px)",
            }}
          >
            Secondary Button
          </Button>
          <Button
            bg="hsl(var(--accent))"
            color="hsl(var(--accent-foreground))"
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow)"
            borderRadius={0}
            px={6}
            py={6}
            fontWeight="900"
            _hover={{
              boxShadow: "var(--brutal-shadow-lg)",
              transform: "translate(-2px, -2px)",
            }}
          >
            Accent Button
          </Button>
          <Button
            bg="hsl(var(--muted))"
            color="hsl(var(--muted-foreground))"
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow)"
            borderRadius={0}
            px={6}
            py={6}
            fontWeight="900"
            _hover={{
              boxShadow: "var(--brutal-shadow-lg)",
              transform: "translate(-2px, -2px)",
            }}
          >
            Muted Button
          </Button>
        </HStack>
      </Box>

      {/* Habit Card Example */}
      <Box mb={12}>
        <Heading as="h2" size="lg" mb={4} fontWeight="900">
          Habit Toggle
        </Heading>
        <Box
          bg={habitCompleted ? "hsl(var(--surface-mint))" : "hsl(var(--card))"}
          border="var(--brutal-border)"
          boxShadow="var(--brutal-shadow)"
          borderRadius={0}
          transition="all 0.2s"
          p={6}
        >
          <HStack justify="space-between">
            <VStack align="start" gap={1}>
              <Heading size="md" fontWeight="900">
                💪 Gym Session
              </Heading>
              <Text color="hsl(var(--muted-foreground))">
                {habitCompleted ? "Completed ✓" : "Not yet"}
              </Text>
            </VStack>
            <input
              type="checkbox"
              checked={habitCompleted}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setHabitCompleted(e.target.checked)
              }
              style={{
                width: "24px",
                height: "24px",
                cursor: "pointer",
              }}
            />
          </HStack>
        </Box>
      </Box>

      {/* Journal Input Test */}
      <Box mb={12}>
        <Heading as="h2" size="lg" mb={4} fontWeight="900">
          Journal
        </Heading>
        <VStack align="stretch" gap={4}>
          <Textarea
            placeholder="Write your daily reflection..."
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            minH="150px"
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow)"
            borderRadius={0}
            _focus={{
              boxShadow: "var(--brutal-shadow-lg)",
              borderColor: "hsl(var(--foreground))",
            }}
            fontSize="md"
          />
          <Button
            bg="hsl(var(--accent))"
            color="hsl(var(--accent-foreground))"
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow)"
            borderRadius={0}
            px={6}
            py={6}
            fontWeight="900"
            _hover={{
              boxShadow: "var(--brutal-shadow-lg)",
              transform: "translate(-2px, -2px)",
            }}
          >
            🤖 Save & Get AI Analysis
          </Button>
        </VStack>
      </Box>

      {/* Input Test */}
      <Box mb={12}>
        <Heading as="h2" size="lg" mb={4} fontWeight="900">
          Inputs
        </Heading>
        <VStack gap={4}>
          <Input
            type="text"
            placeholder="Text input test..."
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow)"
            borderRadius={0}
            _focus={{
              boxShadow: "var(--brutal-shadow-lg)",
              borderColor: "hsl(var(--foreground))",
            }}
          />
          <Input
            type="email"
            placeholder="Email input test..."
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow)"
            borderRadius={0}
            _focus={{
              boxShadow: "var(--brutal-shadow-lg)",
              borderColor: "hsl(var(--foreground))",
            }}
          />
        </VStack>
      </Box>

      {/* Shadow Examples */}
      <Box mb={12}>
        <Heading as="h2" size="lg" mb={4} fontWeight="900">
          Shadow Effects
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
          <Box
            p={8}
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow-sm)"
            bg="hsl(var(--primary))"
            textAlign="center"
            borderRadius={0}
          >
            <Text fontWeight="900">Small Shadow</Text>
          </Box>
          <Box
            p={8}
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow)"
            bg="hsl(var(--secondary))"
            textAlign="center"
            borderRadius={0}
          >
            <Text fontWeight="900">Normal Shadow</Text>
          </Box>
          <Box
            p={8}
            border="var(--brutal-border)"
            boxShadow="var(--brutal-shadow-lg)"
            bg="hsl(var(--accent))"
            textAlign="center"
            borderRadius={0}
          >
            <Text fontWeight="900">Large Shadow</Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Container>
  );
}
