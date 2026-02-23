"use client";

import { Button, Input, toaster } from "@/components/ui";
import { useLogin } from "@/lib/hooks/useAuth";
import { Link, useRouter } from "@/lib/navigation";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const t = useTranslations("auth.login");
  const tc = useTranslations("common");
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
          title: t("toastSuccessTitle"),
          description: t("toastSuccessDesc"),
          type: "success",
          meta: { closable: true },
        });
        router.push("/app");
      },
      onError: (error) => {
        toaster.create({
          title: t("toastErrorTitle"),
          description: error.message || t("toastErrorDesc"),
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
            {tc("appName")}
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
                {t("title")}
              </Heading>
              <Text fontSize="md" color="hsl(0, 0%, 30%)" fontWeight="medium">
                {t("subtitle")}
              </Text>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={5}>
                <Input
                  label={t("emailLabel")}
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  error={errors.email?.message}
                  {...register("email", {
                    required: t("emailRequired"),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t("emailInvalid"),
                    },
                  })}
                />

                <Input
                  label={t("passwordLabel")}
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  error={errors.password?.message}
                  {...register("password", {
                    required: t("passwordRequired"),
                    minLength: {
                      value: 6,
                      message: t("passwordMinLength"),
                    },
                  })}
                />

                <Button type="submit" isLoading={isPending} width="100%">
                  {t("submit")}
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
              {t("noAccount")}{" "}
              <Link
                href="/register"
                style={{
                  fontWeight: "bold",
                  color: "black",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                {t("registerLink")}
              </Link>
            </Text>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
