import * as React from "react";
import { chakra } from "@chakra-ui/react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "./dialog";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  footer?: React.ReactNode;
  maxW?: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, footer, maxW = "520px", children }: ModalProps) {
  return (
    <DialogRoot open={open} onOpenChange={(e) => !e.open && onClose()}>
      <DialogContent
        bg="card"
        border="3px solid black"
        boxShadow="brutal"
        maxW={maxW}
        w="100%"
        maxH="90vh"
        overflowY="auto"
        p={6}
      >
        <DialogHeader
          p={0}
          mb={6}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <DialogTitle fontSize="2xl" fontWeight="800" textTransform="uppercase" flex={1} pr={4}>
            {title}
          </DialogTitle>
          <chakra.button
            type="button"
            onClick={onClose}
            w={10}
            h={10}
            border="3px solid black"
            bg="accent"
            color="white"
            fontWeight="900"
            fontSize="lg"
            cursor="pointer"
            boxShadow="brutal-sm"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            transition="transform 0.1s ease, box-shadow 0.1s ease"
            _hover={{ transform: "translate(-1px, -1px)", boxShadow: "brutal" }}
            _active={{ transform: "translate(1px, 1px)", boxShadow: "none" }}
          >
            ✕
          </chakra.button>
        </DialogHeader>
        <DialogBody p={0}>{children}</DialogBody>
        {footer && (
          <DialogFooter p={0} mt={6}>
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </DialogRoot>
  );
}
