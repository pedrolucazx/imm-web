import { getRequestConfig } from "next-intl/server";

const messageLoaders: Record<string, () => Promise<{ default: Record<string, unknown> }>> = {
  "pt-BR": () => import("./messages/pt-BR.json"),
  "en-US": () => import("./messages/en-US.json"),
  "es-ES": () => import("./messages/es-ES.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? "pt-BR";
  const loader = messageLoaders[locale] ?? messageLoaders["pt-BR"];

  return {
    locale,
    messages: (await loader()).default,
  };
});
