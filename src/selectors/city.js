export const firstLetterToUpper = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const restToLower = (string) => string.replace(/\S*/g, (word) => word.charAt(0) + word.slice(1).toLowerCase());
