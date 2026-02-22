"use client";

import { Button, Input, toaster } from "@/components/ui";
import { useLogin } from "@/lib/hooks/useAuth";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    login(data, {
      onSuccess: () => {
        toaster.create({
          title: "Welcome back!",
          description: "You've successfully logged in.",
          type: "success",
          meta: { closable: true },
        });
        router.push("/app");
      },
      onError: (error) => {
        toaster.create({
          title: "Login failed",
          description: error.message || "Invalid email or password.",
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
                Log In
              </Heading>
              <Text fontSize="md" color="hsl(0, 0%, 30%)" fontWeight="medium">
                Welcome back. Let&apos;s keep the streak alive.
              </Text>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={5}>
                <Input
                  label="EMAIL"
                  type="email"
                  placeholder="your@email.com"
                  error={errors.email?.message}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email",
                    },
                  })}
                />

                <Input
                  label="PASSWORD"
                  type="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <Button type="submit" isLoading={isPending}>
                  Log In →
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
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                style={{
                  fontWeight: "bold",
                  color: "black",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                Sign Up
              </Link>
            </Text>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
