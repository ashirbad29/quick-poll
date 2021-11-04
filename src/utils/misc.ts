export const validateString = (...values: string[]) => {
  return !values.some((val) => val.length === 0);
};

export const getRandomString = (length: number = 10) => {
  return Math.random()
    .toString(36)
    .replace(/[^a-z0-9]+/g, '')
    .slice(-length);
};
