"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ReactQueryProvider } from "./ReactQueryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </ReactQueryProvider>
  );
}
