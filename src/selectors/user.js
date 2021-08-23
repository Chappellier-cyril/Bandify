/* eslint-disable import/prefer-default-export */
export const getAge = (date) => {
  const birthdate = new Date(date);
  const now = Date.now();
  return parseInt(((now - birthdate) / (1000 * 60 * 60 * 24 * 365)), 10);
};
