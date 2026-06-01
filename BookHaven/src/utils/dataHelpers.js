export const parseNumber = (value, fallback = 0) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};

export const parseMood = (value) => {
  if (Array.isArray(value)) {
    return value.filter((item) => item && item.toString().trim().length > 0);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};
