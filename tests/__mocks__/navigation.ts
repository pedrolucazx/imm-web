import React from "react";

export const routing = {
  locales: ["pt-BR", "en-US", "es-ES"] as const,
  defaultLocale: "pt-BR" as const,
};

export const Link = ({ children }: { children?: React.ReactNode }) => children ?? null;
export const redirect = jest.fn();
export const usePathname = jest.fn(() => "/pt-BR");

const mockRouter = { push: jest.fn(), replace: jest.fn() };
export const useRouter = jest.fn(() => mockRouter);
