import { format, parseISO } from "date-fns";
import { ptBR, enUS, es } from "date-fns/locale";
import type { Locale } from "date-fns";

const DATE_FNS_LOCALES: Record<string, Locale> = {
  "pt-BR": ptBR,
  "en-US": enUS,
  "es-ES": es,
};

export function getDateFnsLocale(uiLanguage: string): Locale {
  return DATE_FNS_LOCALES[uiLanguage] ?? ptBR;
}

export function toDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function formatEntryDate(dateStr: string, uiLanguage: string): string {
  const date = parseISO(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return format(date, "PPP", { locale: getDateFnsLocale(uiLanguage) });
}
