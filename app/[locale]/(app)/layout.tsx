import { Box, HStack } from "@chakra-ui/react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { SIDEBAR_WIDTH } from "@/components/Sidebar/sidebar.styles";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <HStack minH="100vh" gap={0} align="stretch">
      <Sidebar />
      <Box as="main" flex="1" ml={SIDEBAR_WIDTH} minH="100vh">
        {children}
      </Box>
    </HStack>
  );
}
