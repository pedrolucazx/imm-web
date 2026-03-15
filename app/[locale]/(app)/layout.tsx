import { Box } from "@chakra-ui/react";
import { Sidebar } from "@/components/Sidebar";
import { SIDEBAR_WIDTH } from "@/components/Sidebar/styles";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box minH="100vh" bg="canvas">
      <Sidebar />
      <Box as="main" ml={{ base: 0, md: SIDEBAR_WIDTH }} flex="1">
        {children}
      </Box>
    </Box>
  );
}
