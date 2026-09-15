export const capitalize = (text) =>
  text.charAt(0).toUpperCase() +
  text.slice(1);

export const truncate = (
  text,
  length = 100
) =>
  text.length > length
    ? text.substring(0, length) + "..."
    : text;