"use client";

export { useAvatarUpload } from "./useAvatarUpload";

import { useRef } from "react";
import { Box, Text, chakra } from "@chakra-ui/react";
import { Avatar } from "@/components/ui";

const ACCEPTED = "image/jpeg,image/png,image/webp";
const MAX_BYTES = 2 * 1024 * 1024; // 2 MB

export interface AvatarUploadProps {
  currentUrl?: string | null;
  previewUrl?: string | null;
  name?: string;
  label?: string;
  changeLabel?: string;
  onFileChange: (_file: File) => void;
  onValidationError?: (_reason: "size" | "type", _file?: File) => void;
  size?: "xl" | "2xl";
}

export function AvatarUpload({
  currentUrl,
  previewUrl,
  name,
  label,
  changeLabel,
  onFileChange,
  onValidationError,
  size = "2xl",
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_BYTES) {
      onValidationError?.("size", file);
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      onValidationError?.("type", file);
      return;
    }

    onFileChange(file);
    e.target.value = "";
  }

  return (
    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
      {label && (
        <Text fontSize="sm" fontWeight="700" textTransform="uppercase" letterSpacing="wider">
          {label}
        </Text>
      )}
      <chakra.button
        type="button"
        onClick={() => inputRef.current?.click()}
        position="relative"
        cursor="pointer"
        borderRadius="0"
        _hover={{ opacity: 0.85 }}
        title={changeLabel || "Change avatar"}
        aria-label={changeLabel || "Change avatar"}
        background="none"
        border="none"
        padding="0"
      >
        <Avatar src={previewUrl ?? currentUrl ?? undefined} name={name} size={size} />
      </chakra.button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Box>
  );
}
