import { Box } from "@chakra-ui/react";
import { Sidebar } from "@/components/Sidebar/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box display="flex" minH="100vh">
      <Sidebar />
      <Box as="main" flex="1" ml="16rem" minH="100vh">
        {children}
      </Box>
    </Box>
  );
}
