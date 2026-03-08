"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { AuthProvider } from "./AuthProvider";
import { system } from "@/styles/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ChakraProvider value={system}>
        <AuthProvider>{children}</AuthProvider>
      </ChakraProvider>
    </ReactQueryProvider>
  );
}
