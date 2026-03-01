"use client";

import { Button, Input, toaster } from "@/components/ui";
import { useRegister } from "@/lib/hooks/useAuth";
import { Link, useRouter } from "@/lib/navigation";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { BrainIcon } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const tc = useTranslations("common");
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
      bg="canvas"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={6}
      py={6}
    >
      <Box w="100%" maxW="md">
        <Link href="/">
          <Heading size="xl" fontWeight="bold" mb={10}>
            <Flex align="center" gap={2}>
              <BrainIcon size={28} weight="fill" color="var(--chakra-colors-primary)" />
              {tc("appName")}
            </Flex>
          </Heading>
        </Link>

        <Box p={8} bg="white" layerStyle="cardBrutal">
          <Stack gap={8}>
            <Box>
              <Heading size="2xl" fontWeight="bold" mb={2}>
                {t("title")}
              </Heading>
              <Text fontSize="md" color="mutedFg" fontWeight="medium">
                {t("subtitle")}
              </Text>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={5}>
                <Input
                  label={t("nameLabel")}
                  type="text"
                  placeholder={t("namePlaceholder")}
                  error={errors.name?.message}
                  {...registerField("name", {
                    required: t("nameRequired"),
                    minLength: {
                      value: 2,
                      message: t("nameMinLength"),
                    },
                  })}
                />

                <Input
                  label={t("emailLabel")}
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  error={errors.email?.message}
                  {...registerField("email", {
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
                  {...registerField("password", {
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

            <Text textAlign="center" fontSize="sm" color="mutedFg" fontWeight="medium" mt={6}>
              {t("hasAccount")}{" "}
              <Link
                href="/login"
                style={{
                  fontWeight: "bold",
                  color: "black",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
              >
                {t("loginLink")}
              </Link>
            </Text>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
