import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { UserProfile, UpdateProfileInput } from "@/types/user";

export type AvatarContentType = "image/jpeg" | "image/png" | "image/webp";

export const userService = {
  async getMe(): Promise<UserProfile> {
    return api.get<UserProfile>(ENDPOINTS.USER.ME);
  },

  async updateMe(data: UpdateProfileInput): Promise<UserProfile> {
    return api.put<UserProfile>(ENDPOINTS.USER.UPDATE, data);
  },

  async getAvatarUploadUrl(
    contentType: AvatarContentType
  ): Promise<{ signedUrl: string; publicUrl: string; path: string }> {
    return api.post(ENDPOINTS.USER.AVATAR_UPLOAD_URL, { contentType });
  },
};
