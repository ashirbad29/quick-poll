const validateString = (...values: string[]) => {
  return !values.some((val) => val.length === 0);
};

export default validateString;
