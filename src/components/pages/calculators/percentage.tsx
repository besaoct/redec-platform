'use client'

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Percent, RefreshCcw,  Copy, ArrowRight, TrendingUp, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PERCENTAGE_CONTENT } from "@/data/tools/calculators/percentage";

export default function PercentageCalculator() {
  const { title, description } = PERCENTAGE_CONTENT;

  // 1. What is P% of V?
  const [p1, setP1] = useState("10");
  const [v1, setV1] = useState("100");
  const r1 = (parseFloat(p1) / 100) * parseFloat(v1);

  // 2. V1 is what % of V2?
  const [v2_1, setV21] = useState("20");
  const [v2_2, setV22] = useState("100");
  const r2 = (parseFloat(v2_1) / parseFloat(v2_2)) * 100;

  // 3. What is the % increase/decrease from V1 to V2?
  const [v3_1, setV31] = useState("100");
  const [v3_2, setV32] = useState("120");
  const r3 = ((parseFloat(v3_2) - parseFloat(v3_1)) / parseFloat(v3_1)) * 100;

  const reset = () => {
    setP1("10"); setV1("100");
    setV21("20"); setV22("100");
    setV31("100"); setV32("120");
  };

  const copyToClipboard = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success(`Copied ${val} to clipboard!`);
  };

  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl sm:text-3xl font-extrabold font-display">
          {title.split(' ')[0]} <span className="text-primary">{title.split(' ').slice(1).join(' ')}</span>
        </h1>
        <p className="text-muted-foreground mt-2">{description}</p>
      </div>

      <div className="grid gap-6">
        {/* Tool 1: P% of V */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Percent className="h-5 w-5 text-primary" />
              Percentage of a value
            </CardTitle>
            <CardDescription>What is X% of Y?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-end gap-4">
              <div className="grid gap-2 w-full sm:w-32">
                <Label>Percentage (%)</Label>
                <Input type="number" value={p1} onChange={(e) => setP1(e.target.value)} />
              </div>
              <span className="mb-2.5 font-medium hidden sm:block text-muted-foreground">of</span>
              <div className="grid gap-2 w-full sm:flex-1">
                <Label>Value</Label>
                <Input type="number" value={v1} onChange={(e) => setV1(e.target.value)} />
              </div>
              <ArrowRight className="mb-2.5 h-5 w-5 text-muted-foreground hidden sm:block" />
              <div className="grid gap-2 w-full sm:flex-1">
                <Label>Result</Label>
                <div className="flex gap-2">
                  <Input readOnly value={isNaN(r1) ? "" : r1.toFixed(2)} className="bg-muted/50 font-bold text-primary" />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(r1.toString())}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tool 2: V1 is what % of V2 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Percentage ratio
            </CardTitle>
            <CardDescription>X is what percentage of Y?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-end gap-4">
              <div className="grid gap-2 w-full sm:flex-1">
                <Label>Value 1</Label>
                <Input type="number" value={v2_1} onChange={(e) => setV21(e.target.value)} />
              </div>
              <span className="mb-2.5 font-medium hidden sm:block text-muted-foreground">is what % of</span>
              <div className="grid gap-2 w-full sm:flex-1">
                <Label>Value 2</Label>
                <Input type="number" value={v2_2} onChange={(e) => setV22(e.target.value)} />
              </div>
              <ArrowRight className="mb-2.5 h-5 w-5 text-muted-foreground hidden sm:block" />
              <div className="grid gap-2 w-full sm:flex-1">
                <Label>Result (%)</Label>
                <div className="flex gap-2">
                  <Input readOnly value={isNaN(r2) ? "" : r2.toFixed(2) + "%"} className="bg-muted/50 font-bold text-primary" />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(r2.toString() + "%")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tool 3: % Increase/Decrease */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Percentage Change
            </CardTitle>
            <CardDescription>What is the percentage increase or decrease from X to Y?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-end gap-4">
              <div className="grid gap-2 w-full sm:flex-1">
                <Label>From</Label>
                <Input type="number" value={v3_1} onChange={(e) => setV31(e.target.value)} />
              </div>
              <span className="mb-2.5 font-medium hidden sm:block text-muted-foreground">to</span>
              <div className="grid gap-2 w-full sm:flex-1">
                <Label>To</Label>
                <Input type="number" value={v3_2} onChange={(e) => setV32(e.target.value)} />
              </div>
              <ArrowRight className="mb-2.5 h-5 w-5 text-muted-foreground hidden sm:block" />
              <div className="grid gap-2 w-full sm:flex-1">
                <Label>Result (%)</Label>
                <div className="flex gap-2">
                  <Input 
                    readOnly 
                    value={isNaN(r3) ? "" : (r3 > 0 ? "+" : "") + r3.toFixed(2) + "%"} 
                    className={cn(
                      "bg-muted/50 font-bold",
                      r3 > 0 ? "text-green-500" : r3 < 0 ? "text-red-500" : "text-primary"
                    )} 
                  />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(r3.toString() + "%")}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button variant="outline" onClick={reset}>
            <RefreshCcw className="mr-2 h-4 w-4" /> Reset All
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold mb-3">How it works</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Percentage calculations are fundamental in finance, science, and everyday life. 
          1. Percentage of a value: (P / 100) * V. 
          2. Percentage ratio: (V1 / V2) * 100. 
          3. Percentage change: ((V2 - V1) / V1) * 100.
        </p>
      </div>
    </div>
  );
}
