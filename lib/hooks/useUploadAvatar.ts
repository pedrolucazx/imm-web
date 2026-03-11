import { useMutation } from "@tanstack/react-query";
import { userService, type AvatarContentType } from "@/lib/user.service";

const CONTENT_TYPE_MAP: Record<string, AvatarContentType> = {
  "image/jpeg": "image/jpeg",
  "image/jpg": "image/jpeg",
  "image/png": "image/png",
  "image/webp": "image/webp",
};

export function useUploadAvatar(options?: { onError?: (_error: Error) => void }) {
  return useMutation({
    onError: options?.onError,
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
