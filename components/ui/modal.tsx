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
import { s } from "./modal.styles";

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
    <DialogRoot
      open={open}
      onOpenChange={(e) => !e.open && onClose()}
      scrollBehavior="inside"
      placement="center"
    >
      <DialogContent {...s.content} maxW={maxW} style={{ overscrollBehavior: "contain" }}>
        <DialogHeader {...s.header}>
          <DialogTitle {...s.title}>{title}</DialogTitle>
          <chakra.button type="button" onClick={onClose} aria-label="Close" {...s.closeBtn}>
            ✕
          </chakra.button>
        </DialogHeader>
        <DialogBody p={0} overflowY="auto" flex="1" minH={0}>
          {children}
        </DialogBody>
        {footer && (
          <DialogFooter p={0} mt={4}>
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </DialogRoot>
  );
}
