import { ArrowLeftRight, QrCode, KeyRound, FileText, Heart, Sparkles, Flame, Users, Wand2, Monitor, Percent, Sigma, Calendar, Divide, GraduationCap, ClipboardList, Target, Landmark, Coins, Activity } from "lucide-react";



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
    category: "Calculators",
    items: [
      { title: "Aspect Ratio", description: "Calculate screen dimensions and aspect ratios", icon: Monitor, url: "/aspect-ratio" },
      { title: "Percentage Calculator", description: "Calculate percentages, increases, and decreases", icon: Percent, url: "/percentage-calculator" },
      { title: "Average Calculator", description: "Calculate mean, median, mode and range", icon: Sigma, url: "/average-calculator" },
      { title: "Age Calculator", description: "Calculate your age in years, months, and days", icon: Calendar, url: "/age-calculator" },
      { title: "Fraction Calculator", description: "Add, subtract, multiply, and divide fractions", icon: Divide, url: "/fraction-calculator" },
      { title: "Grade Calculator", description: "Calculate your weighted grade for a course", icon: GraduationCap, url: "/grade-calculator" },
      { title: "GPA Calculator", description: "Calculate your semester and cumulative GPA", icon: ClipboardList, url: "/gpa-calculator" },
      { title: "Final Grade Calculator", description: "Calculate what you need on your final exam", icon: Target, url: "/final-grade-calculator" },
      { title: "Mortgage Calculator", description: "Estimate your monthly mortgage payments", icon: Landmark, url: "/mortgage-calculator" },
      { title: "Compound Interest", description: "Calculate the future value of your investments", icon: Coins, url: "/compound-interest-calculator" },
      { title: "BMI Calculator", description: "Calculate your Body Mass Index and health category", icon: Activity, url: "/bmi-calculator" },
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
      { title: "Nickname Generator", description: "Create unique and fun nicknames based on your vibe", icon: Wand2, url: "/nickname-generator" },
    ],
  },
];
