import { useMutation } from "@tanstack/react-query";
import { userService, type AvatarContentType } from "@/lib/user.service";
import { toaster } from "@/components/ui/toaster";
import { useTranslatedError } from "./useTranslatedError";

const CONTENT_TYPE_MAP: Record<string, AvatarContentType> = {
  "image/jpeg": "image/jpeg",
  "image/jpg": "image/jpeg",
  "image/png": "image/png",
  "image/webp": "image/webp",
};

export function useUploadAvatar(options?: { onError?: (_error: Error) => void }) {
  const { translateError } = useTranslatedError();

  return useMutation({
    onError: (error: Error) => {
      toaster.create({
        title: "Error",
        description: translateError(error),
        type: "error",
        meta: { closable: true },
      });
      options?.onError?.(error);
    },
    mutationFn: async (file: File): Promise<string> => {
      const contentType = CONTENT_TYPE_MAP[file.type];
      if (!contentType) throw new Error("Unsupported file type");

      const { signedUrl, publicUrl } = await userService.getAvatarUploadUrl(contentType);

      const res = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": contentType },
      });

      if (!res.ok) throw new Error("Upload failed");

      return publicUrl;
    },
  });
}
