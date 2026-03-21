export const CONSENT_KEY = "imm_consent_given";
export const CONSENT_VERSION = "1.0";

export interface ConsentData {
  version: string;
  timestamp: string;
  accepted: boolean;
}

export function hasLocalConsent(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (!stored) return false;

  try {
    const parsed = JSON.parse(stored) as ConsentData;
    return parsed.version === CONSENT_VERSION;
  } catch {
    return stored === CONSENT_VERSION;
  }
}

export function setLocalConsent(): void {
  const consentData: ConsentData = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    accepted: true,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
}
