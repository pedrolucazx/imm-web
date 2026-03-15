import * as React from "react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
} from "./dialog";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
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
        <DialogHeader p={0} mb={6}>
          <DialogTitle fontSize="2xl" fontWeight="800" textTransform="uppercase">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogBody p={0}>{children}</DialogBody>
        {footer && (
          <DialogFooter p={0} mt={6}>
            {footer}
          </DialogFooter>
        )}
        <DialogCloseTrigger position="absolute" top={4} right={4} />
      </DialogContent>
    </DialogRoot>
  );
}
