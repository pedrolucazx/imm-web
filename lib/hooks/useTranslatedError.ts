import { useTranslations } from "next-intl";
import { mapApiErrorToKey, isNetworkError } from "../api-error-messages";

export function useTranslatedError() {
  const t = useTranslations("errors");

  function translateError(error: Error): string {
    const errorKey = mapApiErrorToKey(error.message);

    if (errorKey) {
      return t(errorKey);
    }

    if (isNetworkError(error.message)) {
      return t("NETWORK_ERROR");
    }

    return error.message;
  }

  return { translateError };
}
