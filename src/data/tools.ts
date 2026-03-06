import { ArrowLeftRight, QrCode, KeyRound, FileText, Heart, Sparkles, Flame, Users } from "lucide-react";


export const tools = [
  {
    category: "Converters",
    items: [
      { title: "Unit Converter", description: "Convert lengths, weights, temperatures and more", icon: ArrowLeftRight, url: "/unit-converter" },
    ],
  },
  {
    category: "Generators",
    items: [
      { title: "QR Code Generator", description: "Generate QR codes from URLs or text instantly", icon: QrCode, url: "/qr-generator" },
      { title: "Password Generator", description: "Create strong, customizable passwords", icon: KeyRound, url: "/password-generator" },
    ],
  },
  {
    category: "Text Tools",
    items: [
      { title: "Word Counter", description: "Count words, characters, and check readability", icon: FileText, url: "/word-counter" },
    ],
  },
  {
    category: "Fun Tools",
    items: [
      { title: "FLAMES", description: "Discover your relationship status with the classic FLAMES game", icon: Heart, url: "/flames" },
      { title: "Aura Reader", description: "Discover the color of your energy based on your name and mood", icon: Sparkles, url: "/aura-reader" },
      { title: "Love Calculator", description: "Test the romantic compatibility between two names", icon: Flame, url: "/love-calculator" },
      { title: "Bond Tester", description: "Analyze the deep, algorithmic nature of your friendship", icon: Users, url: "/bond-tester" },
    ],
  },
];
