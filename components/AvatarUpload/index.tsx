"use client";

export { useAvatarUpload } from "./useAvatarUpload";
import { useId, useRef } from "react";
import { Box, Text, chakra } from "@chakra-ui/react";
import { Avatar } from "@/components/ui";
import { s } from "./styles";

const ACCEPTED = "image/jpeg,image/png,image/webp";
const MAX_BYTES = 2 * 1024 * 1024;

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
  const inputId = `${useId()}-avatar-file-input`;

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
    <Box {...s.container}>
      {label && <Text {...s.label}>{label}</Text>}
      <chakra.button
        type="button"
        onClick={() => inputRef.current?.click()}
        title={changeLabel || "Change avatar"}
        aria-label={changeLabel || "Change avatar"}
        aria-controls={inputId}
        {...s.avatarBtn}
      >
        <Avatar src={previewUrl ?? currentUrl ?? undefined} name={name} size={size} />
      </chakra.button>
      <chakra.input
        id={inputId}
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        display="none"
        onChange={handleFileChange}
      />
    </Box>
  );
}
