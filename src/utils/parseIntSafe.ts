export const parseIntSafe = <T = number>(
  rawValue: string | undefined | null,
  defaultValue: T,
): number | T => {
  if (rawValue === undefined || rawValue === null) {
    return defaultValue;
  }

  const parsed = parseInt(rawValue, 10);

  if (!Number.isFinite(parsed)) {
    return defaultValue;
  }

  return parsed;
};
