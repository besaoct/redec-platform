'use client'


import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function fleschScore(text: string) {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length || 1;
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length || 1;
  const syllables = words.reduce((acc, word) => {
    let count = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "")
      .replace(/^y/, "")
      .match(/[aeiouy]{1,2}/g)?.length || 1;
    return acc + count;
  }, 0);
  return 206.835 - 1.015 * (wordCount / sentences) - 84.6 * (syllables / wordCount);
}

function readabilityLabel(score: number) {
  if (score >= 90) return "Very Easy";
  if (score >= 80) return "Easy";
  if (score >= 70) return "Fairly Easy";
  if (score >= 60) return "Standard";
  if (score >= 50) return "Fairly Difficult";
  if (score >= 30) return "Difficult";
  return "Very Difficult";
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter((s) => s.trim()).length : 0;
    const paragraphs = trimmed ? trimmed.split(/\n\n+/).filter((p) => p.trim()).length : 0;
    const readingTime = Math.ceil(words / 200);
    const flesch = trimmed ? Math.round(fleschScore(trimmed)) : 0;
    return { words, chars, charsNoSpaces, sentences, paragraphs, readingTime, flesch };
  }, [text]);

  const copy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-4">
        <h1 className="text-xl sm:text-3xl font-extrabold font-display">Word {" "}  <span className="text-primary">Counter </span></h1>
        <div className="flex gap-2">
           <Tooltip open={copied}>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={copy} disabled={!text}>
                  {copied ? <Check className="mr-2 h-4 w-4 text-success" /> : <Copy className="mr-2 h-4 w-4" />}
                  Copy
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">Copied!</TooltipContent>
           </Tooltip>
          <Button variant="outline" size="sm" onClick={() => { setText(""); setCopied(false); }} disabled={!text}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
      </div>
      <p className="text-muted-foreground mb-6 text-sm sm:text-base">Count words, characters, and check readability</p>

      <Textarea
        placeholder="Paste or type your text here…"
        className="min-h-50 mb-6 text-base"
        value={text}
        onChange={(e) => { setText(e.target.value); setCopied(false); }}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters", value: stats.chars },
          { label: "No Spaces", value: stats.charsNoSpaces },
          { label: "Sentences", value: stats.sentences },
          { label: "Paragraphs", value: stats.paragraphs },
          { label: "Reading Time", value: `${stats.readingTime} min` },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold font-display text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Readability</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold font-display text-primary">
              {stats.flesch}
            </div>
            <div>
              <p className="font-semibold">{readabilityLabel(stats.flesch)}</p>
              <p className="text-sm text-muted-foreground">Flesch Reading Ease Score</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
