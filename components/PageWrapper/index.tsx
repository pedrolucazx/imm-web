import { Box, Heading, Spinner } from "@chakra-ui/react";
import { SIDEBAR_WIDTH } from "@/components/Sidebar/styles";
import { s } from "./styles";

interface PageWrapperProps {
  title: string;
  actions?: React.ReactNode;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export function PageWrapper({ title, actions, isLoading, children }: PageWrapperProps) {
  return (
    <Box {...s.page}>
      <Box {...s.header}>
        <Heading as="h1" {...s.title}>
          {title}
        </Heading>
        {actions}
      </Box>

      {isLoading ? (
        <Box {...s.spinner} pl={{ base: 0, md: SIDEBAR_WIDTH }}>
          <Spinner size="xl" borderWidth="4px" color="primary" />
        </Box>
      ) : (
        children
      )}
    </Box>
  );
}
