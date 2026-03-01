"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { system } from "@/styles/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </ReactQueryProvider>
  );
}
