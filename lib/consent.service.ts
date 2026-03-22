import { api } from "./api-client";
import { ENDPOINTS } from "./endpoints";

export type ConsentType = "privacy_policy" | "terms_of_use" | "cookie_consent";

export interface ConsentResponse {
  id: string;
  type: ConsentType;
  version: string;
  acceptedAt: string;
}

export const consentService = {
  async saveConsent(type: ConsentType): Promise<ConsentResponse> {
    return api.post<ConsentResponse>(ENDPOINTS.CONSENTS.SAVE, { type });
  },

  async getConsents(): Promise<ConsentResponse[]> {
    return api.get<ConsentResponse[]>(ENDPOINTS.CONSENTS.LIST);
  },
};
