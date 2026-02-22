"use client";

import { Button, Input, toaster } from "@/components/ui";
import { useRegister } from "@/hooks/useAuth";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = (data: RegisterForm) => {
    register(data, {
      onSuccess: () => {
        toaster.create({
          title: "Account created!",
          description: "Welcome to your 66-day transformation journey.",
          type: "success",
          meta: { closable: true },
        });
        router.push("/app");
      },
      onError: (error) => {
        toaster.create({
          title: "Registration failed",
          description: error.message || "Please try again.",
          type: "error",
          meta: { closable: true },
        });
      },
    });
  };

  return (
    <Box
      minH="100vh"
      bg="hsl(60, 20%, 95%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={6}
      py={6}
    >
      <Box w="100%" maxW="md">
        <Link href="/">
          <Heading size="xl" fontWeight="bold" mb={10}>
            🧠 Inside My Mind
          </Heading>
        </Link>

        <Box
          p={8}
          bg="white"
          borderWidth="3px"
          borderColor="black"
          borderRadius="0"
          boxShadow="4px 4px 0px 0px black"
        >
          <Stack gap={8}>
            <Box>
              <Heading size="2xl" fontWeight="bold" mb={2}>
                Create Account
              </Heading>
              <Text fontSize="md" color="hsl(0, 0%, 30%)" fontWeight="medium">
                Start your 66-day transformation today.
              </Text>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={5}>
                <Input
                  label="NAME"
                  labelProps={{
                    fontSize: "sm",
                    fontWeight: "bold",
                    letterSpacing: "wider",
                    textTransform: "uppercase",
                    mb: 2,
                  }}
                  type="text"
                  placeholder="Your name"
                  p={4}
                  borderWidth="2px"
                  borderColor="black"
                  borderRadius="0"
                  bg="hsl(60, 20%, 95%)"
                  fontWeight="medium"
                  fontSize="base"
                  _focus={{
                    outline: "none",
                    borderColor: "black",
                    boxShadow: "0 0 0 2px hsl(54, 100%, 45%)",
                  }}
                  _placeholder={{ color: "hsl(0, 0%, 30%)" }}
                  error={errors.name?.message}
                  {...registerField("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />

                <Input
                  label="EMAIL"
                  labelProps={{
                    fontSize: "sm",
                    fontWeight: "bold",
                    letterSpacing: "wider",
                    textTransform: "uppercase",
                    mb: 2,
                  }}
                  type="email"
                  placeholder="your@email.com"
                  p={4}
                  borderWidth="2px"
                  borderColor="black"
                  borderRadius="0"
                  bg="hsl(60, 20%, 95%)"
                  fontWeight="medium"
                  fontSize="base"
                  _focus={{
                    outline: "none",
                    borderColor: "black",
                    boxShadow: "0 0 0 2px hsl(54, 100%, 45%)",
                  }}
                  _placeholder={{ color: "hsl(0, 0%, 30%)" }}
                  error={errors.email?.message}
                  {...registerField("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email",
                    },
                  })}
                />

                <Input
                  label="PASSWORD"
                  labelProps={{
                    fontSize: "sm",
                    fontWeight: "bold",
                    letterSpacing: "wider",
                    textTransform: "uppercase",
                    mb: 2,
                  }}
                  type="password"
                  placeholder="Min. 6 characters"
                  p={4}
                  borderWidth="2px"
                  borderColor="black"
                  borderRadius="0"
                  bg="hsl(60, 20%, 95%)"
                  fontWeight="medium"
                  fontSize="base"
                  _focus={{
                    outline: "none",
                    borderColor: "black",
                    boxShadow: "0 0 0 2px hsl(54, 100%, 45%)",
                  }}
                  _placeholder={{ color: "hsl(0, 0%, 30%)" }}
                  error={errors.password?.message}
                  {...registerField("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <Button
                  type="submit"
                  py={5}
                  fontSize="lg"
                  fontWeight="bold"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  bg="hsl(54, 100%, 45%)"
                  color="black"
                  borderWidth="3px"
                  borderColor="black"
                  borderRadius="0"
                  boxShadow="4px 4px 0px 0px black"
                  transition="all 0.1s ease"
                  _hover={{
                    transform: "translate(-2px, -2px)",
                    boxShadow: "6px 6px 0px black",
                  }}
                  _active={{
                    transform: "translate(2px, 2px)",
                    boxShadow: "2px 2px 0px black",
                  }}
                  isLoading={isPending}
                  width="100%"
                >
                  Start 66-Day Journey →
                </Button>
              </Stack>
            </form>

            <Text
              textAlign="center"
              fontSize="sm"
              color="hsl(0, 0%, 30%)"
              fontWeight="medium"
              mt={6}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                style={{
                  fontWeight: "bold",
                  color: "black",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Log In
              </Link>
            </Text>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
