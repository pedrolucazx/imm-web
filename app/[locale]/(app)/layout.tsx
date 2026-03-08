import { Box } from "@chakra-ui/react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { SIDEBAR_WIDTH } from "@/components/Sidebar/sidebar.styles";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box display="flex" minH="100vh">
      <Sidebar />
      <Box as="main" flex="1" ml={SIDEBAR_WIDTH} minH="100vh">
        {children}
      </Box>
    </Box>
  );
}
