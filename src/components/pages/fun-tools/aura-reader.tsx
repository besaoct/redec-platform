'use client'

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sparkles, RefreshCcw, User, Share2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const AURA_COLORS = [
  { 
    name: "Red", 
    color: "bg-red-500", 
    textColor: "text-red-500",
    description: "Your aura is Red! This signifies energy, passion, and a strong-willed nature. You are grounded and full of life force today.",
    traits: ["Energetic", "Grounded", "Passionate"]
  },
  { 
    name: "Orange", 
    color: "bg-orange-500", 
    textColor: "text-orange-500",
    description: "Your aura is Orange! This represents creativity, vitality, and emotional strength. You are in a phase of growth and social connection.",
    traits: ["Creative", "Social", "Vital"]
  },
  { 
    name: "Yellow", 
    color: "bg-yellow-400", 
    textColor: "text-yellow-500",
    description: "Your aura is Yellow! This reflects optimism, intelligence, and enlightenment. You are radiating joy and mental clarity right now.",
    traits: ["Optimistic", "Intelligent", "Joyful"]
  },
  { 
    name: "Green", 
    color: "bg-green-500", 
    textColor: "text-green-500",
    description: "Your aura is Green! This symbolizes healing, balance, and peace. You have a nurturing spirit and are in harmony with your surroundings.",
    traits: ["Healer", "Balanced", "Peaceful"]
  },
  { 
    name: "Blue", 
    color: "bg-blue-500", 
    textColor: "text-blue-500",
    description: "Your aura is Blue! This indicates calmness, intuition, and clear communication. You are deeply connected to your inner truth.",
    traits: ["Calm", "Intuitive", "Communicative"]
  },
  { 
    name: "Indigo", 
    color: "bg-indigo-600", 
    textColor: "text-indigo-600",
    description: "Your aura is Indigo! This represents deep wisdom, spiritual awakening, and mystery. You possess a strong sense of knowing.",
    traits: ["Wise", "Spiritual", "Mysterious"]
  },
  { 
    name: "Violet", 
    color: "bg-purple-500", 
    textColor: "text-purple-500",
    description: "Your aura is Violet! This is the color of vision, imagination, and high spiritual energy. You are a dreamer with great potential.",
    traits: ["Visionary", "Imaginative", "Spiritual"]
  },
  { 
    name: "Gold", 
    color: "bg-yellow-600", 
    textColor: "text-yellow-700",
    description: "Your aura is Gold! This signifies divine protection, enlightenment, and wisdom. You are reaching a peak of spiritual and personal power.",
    traits: ["Protected", "Enlightened", "Powerful"]
  },
  { 
    name: "Pink", 
    color: "bg-pink-400", 
    textColor: "text-pink-500",
    description: "Your aura is Pink! This reflects love, compassion, and a gentle heart. You are radiating kindness and emotional warmth.",
    traits: ["Loving", "Gentle", "Kind"]
  },
  { 
    name: "Turquoise", 
    color: "bg-cyan-400", 
    textColor: "text-cyan-600",
    description: "Your aura is Turquoise! This represents harmony, dynamic energy, and deep compassion. You are a natural multitasker and a sensitive soul.",
    traits: ["Harmonious", "Sensitive", "Compassionate"]
  },
  { 
    name: "White", 
    color: "bg-slate-100", 
    textColor: "text-slate-500",
    description: "Your aura is White! This is the rarest color, signifying purity, transcendence, and a connection to the divine. You are starting a fresh spiritual chapter.",
    traits: ["Pure", "Transcendent", "Enlightened"]
  },
  { 
    name: "Silver", 
    color: "bg-slate-300", 
    textColor: "text-slate-500",
    description: "Your aura is Silver! This reflects high intuition, mystery, and cosmic connection. You are receiving deep insights from your subconscious right now.",
    traits: ["Insightful", "Mystical", "Abundant"]
  },
  { 
    name: "Magenta", 
    color: "bg-fuchsia-500", 
    textColor: "text-fuchsia-600",
    description: "Your aura is Magenta! This combines the energy of Red and the spirituality of Violet. You are a unique thinker who marches to the beat of your own drum.",
    traits: ["Original", "Non-conformist", "Creative"]
  },
  { 
    name: "Gray", 
    color: "bg-gray-400", 
    textColor: "text-gray-600",
    description: "Your aura is Gray! This represents a period of transition, deep contemplation, and quiet strength. You are currently processing and refining your energy.",
    traits: ["Contemplative", "Quiet", "Transitioning"]
  },
];

const MOODS = [
  { emoji: "😊", label: "Happy", value: 1 },
  { emoji: "😌", label: "Calm", value: 2 },
  { emoji: "🚀", label: "Energetic", value: 3 },
  { emoji: "🤔", label: "Thoughtful", value: 4 },
  { emoji: "😴", label: "Tired", value: 5 },
  { emoji: "🤩", label: "Inspired", value: 6 },
  { emoji: "😔", label: "Sad", value: 7 },
  { emoji: "😤", label: "Frustrated", value: 8 },
  { emoji: "😰", label: "Anxious", value: 9 },
  { emoji: "🧘", label: "Zen", value: 10 },
  { emoji: "🎨", label: "Creative", value: 11 },
  { emoji: "💖", label: "Loving", value: 12 },
];

export default function AuraReader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [name, setName] = useState(searchParams.get("name") || "");
  const [selectedMood, setSelectedMood] = useState<number | null>(
    searchParams.get("mood") ? parseInt(searchParams.get("mood")!) : null
  );
  const [resultIndex, setResultIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const calculateAura = useCallback((userName: string, moodValue: number) => {
    if (!userName || !moodValue) return null;

    // Simple deterministic hash based on name and mood
    const nameValue = userName.toLowerCase().split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const totalValue = nameValue + (moodValue * 10);
    return totalValue % AURA_COLORS.length;
  }, []);

  useEffect(() => {
    const n = searchParams.get("name");
    const m = searchParams.get("mood");

    if (n && m) {
      const idx = calculateAura(n, parseInt(m));
      if (idx !== null) {
        setResultIndex(idx);
      }
    } else {
      setResultIndex(null);
    }
  }, [searchParams, calculateAura]);

  const handleCalculate = () => {
    if (name && selectedMood !== null) {
      const idx = calculateAura(name, selectedMood);
      if (idx !== null) {
        setResultIndex(idx);
        const params = new URLSearchParams(searchParams.toString());
        params.set("name", name);
        params.set("mood", selectedMood.toString());
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }
  };

  const reset = () => {
    setName("");
    setSelectedMood(null);
    setResultIndex(null);
    router.push(pathname, { scroll: false });
  };

  const share = () => {
    const url = window.location.href;
    const aura = resultIndex !== null ? AURA_COLORS[resultIndex] : null;
    if (navigator.share) {
      navigator.share({
        title: 'My Aura Color Reading',
        text: `My aura color today is ${aura?.name}! ${aura?.description}`,
        url: url,
      }).catch(() => {
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const aura = resultIndex !== null ? AURA_COLORS[resultIndex] : null;

  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl sm:text-3xl font-extrabold font-display">Aura <span className="text-primary">Reader</span></h1>
        <p className="text-muted-foreground mt-2">Discover the color of your energy based on your name and mood</p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Your Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label>How are you feeling today?</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {MOODS.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 break-all rounded-xl border-2  transition-all hover:bg-accent",
                      selectedMood === mood.value 
                        ? "border-primary/80 bg-primary/5 scale-102" 
                        : "border-primary/10 bg-muted/50"
                    )}
                  >
                    <span className="text-2xl mb-1">{mood.emoji}</span>
                    <span className="text-[10px] font-medium uppercase tracking-wider">{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1" onClick={handleCalculate} disabled={!name || selectedMood === null}>
                <Sparkles className="mr-2 h-4 w-4 fill-current" /> Read My Aura
              </Button>
              <Button variant="outline" size="icon" onClick={reset}>
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {aura && (
        <Card className="animate-in zoom-in-95 duration-500 relative overflow-hidden border-none shadow-2xl">
          {/* Background Glow */}
          <div className={cn("absolute inset-0 opacity-10 blur-3xl", aura.color)} />
          
           <div className="absolute top-4 right-4 z-10">
             <Tooltip open={copied}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm" onClick={share}>
                    {copied ? <Check className="h-4 w-4 text-success" /> : <Share2 className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Link Copied!</TooltipContent>
             </Tooltip>
          </div>

          <CardContent className="text-center py-12 relative z-10">
            <div className="relative inline-block mb-6">
              <div className={cn("w-24 h-24 rounded-full mx-auto animate-pulse blur-xl absolute inset-0", aura.color)} />
              <div className={cn("w-24 h-24 rounded-full mx-auto relative border-4 border-background shadow-inner", aura.color)} />
            </div>
            
            <CardTitle className={cn("text-5xl font-black font-display tracking-tighter uppercase mb-4", aura.textColor)}>
              {aura.name}
            </CardTitle>
            
            <div className="max-w-md mx-auto">
              <p className="text-lg font-medium leading-relaxed mb-6">
                {aura.description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {aura.traits.map(trait => (
                  <span key={trait} className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-background/50 backdrop-blur-sm border", aura.textColor)}>
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-8">
        <h3 className="text-sm font-semibold mb-3">How it works</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The Aura Reader uses a combination of your name's numerological value and your current emotional vibration (mood) to determine your energy's primary frequency. 
          Each color corresponds to different psychological and spiritual states, offering a glimpse into your current energetic presence.
        </p>
      </div>
    </div>
  );
}
