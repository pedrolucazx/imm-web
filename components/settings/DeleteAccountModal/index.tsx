"use client";

import { Box, Text } from "@chakra-ui/react";
import { useId } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/modal";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MIN_PASSWORD_LENGTH } from "@/lib/constants";
import { useDeleteAccount } from "@/lib/hooks/useDeleteAccount";
import { s } from "./styles";

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

export function DeleteAccountModal({ open, onClose }: DeleteAccountModalProps) {
  const t = useTranslations("settings");

  const { mutate: deleteAccount, isPending } = useDeleteAccount({
    onError: (error) => {
      const message = error.message.toLowerCase();
      if (message.includes("password") || message.includes("invalid")) {
        setError("password", { message: t("deleteModal.invalidPassword") });
      } else {
        setError("password", { message: t("deleteModal.error") });
      }
    },
  });

  const schema = z.object({
    password: z.string().min(MIN_PASSWORD_LENGTH, t("deleteModal.passwordRequired")),
  });

  type DeleteForm = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<DeleteForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: DeleteForm): void => {
    deleteAccount(data.password);
  };

  const formId = useId();

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={t("deleteModal.title")}
      maxW="420px"
      footer={
        <Box {...s.footerActions}>
          <Button
            type="button"
            variant="muted"
            onClick={handleClose}
            disabled={isPending}
            {...s.footerBtn}
          >
            {t("deleteModal.cancelBtn")}
          </Button>
          <Button type="submit" form={formId} loading={isPending} {...s.deleteBtn}>
            {t("deleteModal.confirmBtn")}
          </Button>
        </Box>
      }
    >
      <Box as="form" id={formId} onSubmit={handleSubmit(onSubmit)}>
        <Box {...s.warningBox}>
          <Text {...s.warningText}>{t("deleteModal.warning")}</Text>
        </Box>

        <Box {...s.field}>
          <PasswordInput
            label={t("deleteModal.passwordLabel")}
            placeholder={t("deleteModal.passwordPlaceholder")}
            autoComplete="current-password"
            error={errors.password?.message}
            autoFocus
            {...register("password")}
          />
        </Box>
      </Box>
    </Modal>
  );
}
