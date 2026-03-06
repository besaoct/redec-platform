export const FLAMES_MAP = {
  F: { label: "Friends", color: "text-blue-500", icon: "🤝" },
  L: { label: "Lovers", color: "text-red-500", icon: "❤️" },
  A: { label: "Affection", color: "text-pink-500", icon: "🥰" },
  M: { label: "Marriage", color: "text-purple-500", icon: "💍" },
  E: { label: "Enemies", color: "text-orange-500", icon: "😈" },
  S: { label: "Siblings", color: "text-green-500", icon: "👫" },
} as const;

export type FlamesResult = keyof typeof FLAMES_MAP;
