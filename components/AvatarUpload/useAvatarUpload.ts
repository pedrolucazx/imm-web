"use client";

import { useEffect, useRef, useState } from "react";
import { useUploadAvatar } from "@/lib/hooks/useUploadAvatar";

export function useAvatarUpload(
  currentUrl?: string | null,
  options?: { onUploadError?: (_error: Error) => void }
) {
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAvatarReady, setIsAvatarReady] = useState(false);
  const previewUrlRef = useRef(previewUrl);

  const { mutateAsync: upload, isPending: isUploading } = useUploadAvatar({
    onError: options?.onUploadError,
  });

  useEffect(() => {
    if (!currentUrl) {
      setIsAvatarReady(true);
      return;
    }
    setIsAvatarReady(false);
    const img = new Image();
    img.onload = () => setIsAvatarReady(true);
    img.onerror = () => setIsAvatarReady(true);
    img.src = currentUrl;
  }, [currentUrl]);

  function handleFileChange(file: File) {
    setPendingFile(file);
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      previewUrlRef.current = URL.createObjectURL(file);
      return previewUrlRef.current;
    });
  }

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  async function uploadIfPending(): Promise<string | undefined> {
    if (!pendingFile) return undefined;
    const url = await upload(pendingFile);
    setPendingFile(null);
    return url;
  }

  return { previewUrl, isAvatarReady, isUploading, handleFileChange, uploadIfPending };
}
