import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? "pt-BR";

  return {
    locale,
    messages: (await import(`./i18n/messages/${locale}.json`)).default,
  };
});
