export function resolveAuthReady(value: { isAuthReady?: boolean; isLoading: boolean }): boolean {
  return value.isAuthReady ?? !value.isLoading;
}
