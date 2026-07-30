import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { type AvatarContentType } from "@/lib/user.service";
import { useAuthContext } from "@/lib/auth-context";
import { authService } from "@/lib/auth.service";
import { toaster } from "../../components/ui/toaster";
import { useTranslatedError } from "./useTranslatedError";
import { API_ERROR_MESSAGES } from "@/lib/api-error-messages";

const CONTENT_TYPE_MAP: Record<string, AvatarContentType> = {
  "image/jpeg": "image/jpeg",
  "image/jpg": "image/jpeg",
  "image/png": "image/png",
  "image/webp": "image/webp",
};

const REQUEST_TIMEOUT_MS = 30_000;

interface PresignedUrlResponse {
  signedUrl: string;
  publicUrl: string;
  requiredHeaders: Record<string, string>;
}

// fetch() rejects (timeout/abort/network) instead of resolving with a non-ok
// response — without this, the toast shows the native TimeoutError/AbortError
// message instead of a translated one.
async function fetchOrUnavailable(request: () => Promise<Response>): Promise<Response> {
  try {
    return await request();
  } catch {
    throw new Error(API_ERROR_MESSAGES.AVATAR_UPLOAD_UNAVAILABLE);
  }
}

export function useUploadAvatar(options?: { onError?: (_error: Error) => void }) {
  const t = useTranslations("errors");
  const { translateError } = useTranslatedError();
  const { accessToken, setAccessToken, setUser } = useAuthContext();

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
      if (!accessToken) throw new Error(API_ERROR_MESSAGES.REFRESH_TOKEN_EXPIRED);

      const lambdaUrl = process.env.NEXT_PUBLIC_LAMBDA_AVATAR_URL;
      if (!lambdaUrl) throw new Error(API_ERROR_MESSAGES.AVATAR_UPLOAD_UNAVAILABLE);

      const requestPresignedUrl = (token: string) =>
        fetch(lambdaUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ contentType, contentLength: file.size }),
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        });

      // Chamada direta no Lambda (Function URL) — não passa pelo axios/imm-api,
      // então o refresh automático de 401 (lib/api-client.ts) não roda sozinho.
      // Access token tem TTL de 15min; se expirou no meio de uma sessão longa
      // na tela de settings, refaz o refresh aqui e tenta de novo uma vez.
      let presignRes = await fetchOrUnavailable(() => requestPresignedUrl(accessToken));
      if (presignRes.status === 401) {
        const refreshed = await authService.refresh();
        setAccessToken(refreshed.token);
        setUser(refreshed.user);
        presignRes = await fetchOrUnavailable(() => requestPresignedUrl(refreshed.token));
      }

      if (!presignRes.ok) {
        if (presignRes.status === 422) throw new Error(API_ERROR_MESSAGES.AVATAR_INVALID_FILE);
        throw new Error(API_ERROR_MESSAGES.AVATAR_UPLOAD_UNAVAILABLE);
      }

      const rawData: Partial<PresignedUrlResponse> = await presignRes.json().catch(() => ({}));
      if (!rawData.signedUrl || !rawData.publicUrl || !rawData.requiredHeaders) {
        throw new Error(API_ERROR_MESSAGES.AVATAR_UPLOAD_UNAVAILABLE);
      }
      const { signedUrl, publicUrl, requiredHeaders } = rawData as PresignedUrlResponse;

      // requiredHeaders precisa bater com o que o Lambda assinou. Content-Type
      // é de fato aplicado pelo fetch; Content-Length é header proibido e o
      // browser sempre recalcula do File real — mantido aqui só pra deixar
      // explícito o contrato com o Lambda, não porque o fetch o respeite.
      const uploadRes = await fetchOrUnavailable(() =>
        fetch(signedUrl, {
          method: "PUT",
          body: file,
          headers: requiredHeaders,
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        })
      );

      if (!uploadRes.ok) throw new Error(API_ERROR_MESSAGES.AVATAR_UPLOAD_UNAVAILABLE);

      return publicUrl;
    },
  });
}
