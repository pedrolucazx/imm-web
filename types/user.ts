import type { UILanguage } from "@/components/LanguageSelector";

export interface UserProfileData {
  uiLanguage: UILanguage;
  bio: string | null;
  timezone: string;
  aiRequestsToday: number;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  profile: UserProfileData;
}

export interface UpdateProfileInput {
  name?: string;
  avatarUrl?: string | null;
  uiLanguage?: UILanguage;
  bio?: string | null;
  timezone?: string;
}
