import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { type AvatarContentType } from "@/lib/user.service";
import { useAuthContext } from "@/lib/auth-context";
import { toaster } from "@/components/ui/toaster";
import { useTranslatedError } from "./useTranslatedError";

const CONTENT_TYPE_MAP: Record<string, AvatarContentType> = {
  "image/jpeg": "image/jpeg",
  "image/jpg": "image/jpeg",
  "image/png": "image/png",
  "image/webp": "image/webp",
};

interface PresignedUrlResponse {
  signedUrl: string;
  publicUrl: string;
  requiredHeaders: Record<string, string>;
}

export function useUploadAvatar(options?: { onError?: (_error: Error) => void }) {
  const t = useTranslations("errors");
  const { translateError } = useTranslatedError();
  const { accessToken } = useAuthContext();

  return useMutation({
    onError: (error: Error) => {
      toaster.create({
        title: t("title"),
        description: translateError(error),
        type: "error",
        meta: { closable: true },
      });
      options?.onError?.(error);
    },
    mutationFn: async (file: File): Promise<string> => {
      const contentType = CONTENT_TYPE_MAP[file.type];
      if (!contentType) throw new Error("Unsupported file type");
      if (!accessToken) throw new Error("Not authenticated");

      // Vai direto no Lambda (Function URL), não pelo imm-api — userId vem
      // do JWT verificado lá dentro, nunca é mandado no body.
      const presignRes = await fetch(process.env.NEXT_PUBLIC_LAMBDA_AVATAR_URL as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ contentType, contentLength: file.size }),
      });

      if (!presignRes.ok) throw new Error("Failed to get upload URL");

      const { signedUrl, publicUrl, requiredHeaders }: PresignedUrlResponse =
        await presignRes.json();

      // requiredHeaders vem do Lambda porque tem que bater exatamente com o
      // que foi assinado (content-type e content-length) — senão o S3 rejeita
      // o PUT com SignatureDoesNotMatch.
      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: requiredHeaders,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");

      return publicUrl;
    },
  });
}
