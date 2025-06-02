export const getCleanContent = (text: string): string => {
  return text
    .replace(/https?:\/\/[^\s]+/g, "") // Remove links
    .replace(/#[\w-]+/g, "") // Remove hashtags
    .replace(/\s+/g, " ") // Remove extra whitespaces
    .trim(); // Trim leading/trailing whitespace
};

export const extractLink = (text: string) => {
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const match = text.match(linkRegex);
  return match ? match[0] : null;
};
