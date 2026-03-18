export const routing = {
  locales: ["pt-BR", "en-US", "es-ES"] as const,
  defaultLocale: "pt-BR" as const,
};

export const Link = () => null;
export const redirect = jest.fn();
export const usePathname = jest.fn(() => "/pt-BR");
export const useRouter = jest.fn(() => ({ push: jest.fn(), replace: jest.fn() }));
