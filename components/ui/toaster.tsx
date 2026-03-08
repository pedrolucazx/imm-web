"use client";

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
} from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "top-end",
  pauseOnPageIdle: true,
  gap: 3,
});

const TOAST_BG_MAP: Record<string, string> = {
  success: "secondary",
  error: "error",
  info: "info",
};

function getToastBg(type: string | undefined): string {
  return (type && TOAST_BG_MAP[type]) ?? "primary";
}

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }} width={{ md: "356px" }}>
        {(toast) => (
          <Toast.Root
            width="full"
            bg="white"
            borderWidth="3px"
            borderColor="black"
            borderRadius="0"
            boxShadow="brutal"
            p={4}
          >
            {toast.type === "loading" ? (
              <Spinner size="sm" color="black" borderWidth="2px" />
            ) : (
              <Toast.Indicator bg={getToastBg(toast.type)} borderWidth="2px" borderColor="black" />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && (
                <Toast.Title fontWeight="bold" fontSize="md" color="black" letterSpacing="tight">
                  {toast.title}
                </Toast.Title>
              )}
              {toast.description && (
                <Toast.Description fontWeight="medium" fontSize="sm" color="mutedFg">
                  {toast.description}
                </Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger
                bg="primary"
                color="black"
                fontWeight="bold"
                fontSize="sm"
                px={3}
                py={2}
                borderWidth="2px"
                borderColor="black"
                borderRadius="0"
                transition="all 0.1s ease"
                _hover={{
                  transform: "translate(-1px, -1px)",
                  boxShadow: "2px 2px 0px black",
                }}
                _active={{
                  transform: "translate(1px, 1px)",
                  boxShadow: "1px 1px 0px black",
                }}
              >
                {toast.action.label}
              </Toast.ActionTrigger>
            )}
            {toast.meta?.closable && (
              <Toast.CloseTrigger
                color="black"
                fontWeight="bold"
                fontSize="lg"
                _hover={{
                  bg: "muted",
                }}
              />
            )}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
