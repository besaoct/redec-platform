'use client'

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sigma, RefreshCcw, Copy, Hash, ArrowUp01, Equal, List, FormInput, Text,  } from "lucide-react";
import { toast } from "sonner";

export default function AverageCalculator() {
  const [input, setInput] = useState("10, 20, 30, 40, 50");

  const stats = useMemo(() => {
    const nums = input
      .split(/[,\s\n]+/)
      .map((n) => parseFloat(n.trim()))
      .filter((n) => !isNaN(n));

    if (nums.length === 0) return null;

    const sorted = [...nums].sort((a, b) => a - b);
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    
    // Median
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 
      ? sorted[mid] 
      : (sorted[mid - 1] + sorted[mid]) / 2;

    // Mode
    const counts: Record<number, number> = {};
    let maxCount = 0;
    nums.forEach(n => {
      counts[n] = (counts[n] || 0) + 1;
      if (counts[n] > maxCount) maxCount = counts[n];
    });
    const modes = Object.keys(counts)
      .filter(k => counts[parseFloat(k)] === maxCount)
      .map(Number);
    const mode = maxCount > 1 ? modes : "No unique mode";

    // Range
    const range = sorted[sorted.length - 1] - sorted[0];

    return {
      count: nums.length,
      sum,
      mean,
      median,
      mode: Array.isArray(mode) ? mode.join(", ") : mode,
      range,
      min: sorted[0],
      max: sorted[sorted.length - 1]
    };
  }, [input]);

  const copyToClipboard = (val: string, label: string) => {
    navigator.clipboard.writeText(val);
    toast.success(`Copied ${label}: ${val}`);
  };

  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl sm:text-3xl font-extrabold font-display">Average <span className="text-primary">Calculator</span></h1>
        <p className="text-muted-foreground mt-2">Calculate statistical values from a set of numbers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Text className="h-5 w-5 text-primary" />
                Input Data
              </CardTitle>
              <CardDescription>Enter numbers separated by commas, spaces, or new lines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="data">Numbers</Label>
                <Textarea
                  id="data"
                  placeholder="e.g. 10, 20, 30..."
                  className="min-h-37.5 font-mono"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button variant="default" className="flex-1" onClick={() => setInput("")}>
                  <RefreshCcw className="mr-2 h-4 w-4" /> Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard label="Mean (Average)" value={stats?.mean.toFixed(2)} icon={Sigma} onCopy={() => copyToClipboard(stats?.mean.toFixed(2) || "", "Mean")} />
            <ResultCard label="Median" value={stats?.median.toString()} icon={Equal} onCopy={() => copyToClipboard(stats?.median.toString() || "", "Median")} />
            <ResultCard label="Mode" value={stats?.mode.toString()} icon={Hash} onCopy={() => copyToClipboard(stats?.mode.toString() || "", "Mode")} />
            <ResultCard label="Range" value={stats?.range.toString()} icon={ArrowUp01} onCopy={() => copyToClipboard(stats?.range.toString() || "", "Range")} />
          </div>
        </div>

        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Quick Summary</CardTitle>
              <CardDescription>Overall dataset statistics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <SummaryItem label="Count" value={stats?.count} />
              <SummaryItem label="Sum" value={stats?.sum} />
              <SummaryItem label="Minimum" value={stats?.min} />
              <SummaryItem label="Maximum" value={stats?.max} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold mb-3">Definitions</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-xs text-muted-foreground leading-relaxed">
          <p><strong>Mean:</strong> The sum of all values divided by the number of values.</p>
          <p><strong>Median:</strong> The middle value when the data set is ordered from least to greatest.</p>
          <p><strong>Mode:</strong> The value that appears most frequently in the data set.</p>
          <p><strong>Range:</strong> The difference between the highest and lowest values.</p>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ label, value, icon: Icon, onCopy }: { label: string, value?: string, icon: any, onCopy: () => void }) {
  return (
    <Card className="relative overflow-hidden group">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">{label}</p>
            <p className="text-xl font-extrabold">{value ?? "—"}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={onCopy}>
          <Copy className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

function SummaryItem({ label, value }: { label: string, value?: any }) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0 border-muted/50">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-bold">{value ?? "—"}</span>
    </div>
  );
}
