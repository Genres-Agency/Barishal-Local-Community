export const getCleanContent = (text: string): string => {
  return text
    .replace(/https?:\/\/[^\s]+/g, "") // Remove links
    .replace(/#[\w-]+/g, ""); // Remove hashtags
  // .replace(/\s+/g, " ") // Remove extra whitespaces
  // .trim(); // Trim leading/trailing whitespace
};

export const extractLink = (text: string) => {
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const match = text.match(linkRegex);
  return match ? match[0] : null;
};

export const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "accepted":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
