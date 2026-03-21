import { api } from "./api-client";
import { ENDPOINTS } from "./endpoints";

export type ConsentType = "privacy_policy" | "terms_of_use" | "cookie_consent";

export interface ConsentResponse {
  success: boolean;
  consent: {
    type: string;
    version: string;
    accepted: boolean;
    createdAt: string;
  };
}

export const consentService = {
  async saveConsent(type: ConsentType): Promise<ConsentResponse> {
    return api.post<ConsentResponse>(ENDPOINTS.CONSENTS.SAVE, { type });
  },

  async getConsents(): Promise<ConsentResponse[]> {
    return api.get<ConsentResponse[]>(ENDPOINTS.CONSENTS.LIST);
  },
};
