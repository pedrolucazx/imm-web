type LogFn = (_message: string, ..._args: unknown[]) => void;

const noop: LogFn = () => {};

const isDev = process.env.NODE_ENV === "development";

export const logger = {
  info: isDev ? (((...args) => console.info("[INFO]", ...args)) as LogFn) : noop,
  warn: isDev ? (((...args) => console.warn("[WARN]", ...args)) as LogFn) : noop,
  error: isDev ? (((...args) => console.error("[ERROR]", ...args)) as LogFn) : noop,
  debug: isDev ? (((...args) => console.debug("[DEBUG]", ...args)) as LogFn) : noop,
};
