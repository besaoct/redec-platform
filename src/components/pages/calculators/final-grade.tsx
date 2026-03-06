'use client'

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Target, RefreshCcw, Percent, GraduationCap, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export default function FinalGradeCalculator() {
  const [currentGrade, setCurrentGrade] = useState("85");
  const [targetGrade, setTargetGrade] = useState("90");
  const [finalWeight, setFinalWeight] = useState("20");

  const needed = useMemo(() => {
    const current = parseFloat(currentGrade);
    const target = parseFloat(targetGrade);
    const weight = parseFloat(finalWeight);

    if (isNaN(current) || isNaN(target) || isNaN(weight) || weight === 0) return null;

    const w = weight / 100;
    const res = (target - (current * (1 - w))) / w;
    return res;
  }, [currentGrade, targetGrade, finalWeight]);

  const reset = () => {
    setCurrentGrade("85");
    setTargetGrade("90");
    setFinalWeight("20");
  };

  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl sm:text-3xl font-extrabold font-display">Final Grade <span className="text-primary">Calculator</span></h1>
        <p className="text-muted-foreground mt-2">Find out what score you need on your final exam to get the grade you want</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Exam Details</CardTitle>
              <CardDescription>Enter your current progress and final exam weight</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                   <div className="grid gap-2">
                  <Label htmlFor="current">Current Grade (%)</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="current" type="number" className="pl-10" value={currentGrade} onChange={(e) => setCurrentGrade(e.target.value)} />
                  </div>
                </div>
                   <div className="grid gap-2">
                  <Label htmlFor="target">Target Grade (%)</Label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="target" type="number" className="pl-10" value={targetGrade} onChange={(e) => setTargetGrade(e.target.value)} />
                  </div>
                </div>
              </div>
                 <div className="grid gap-2">
                <Label htmlFor="weight">Final Exam Weight (%)</Label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="weight" type="number" className="pl-10" value={finalWeight} onChange={(e) => setFinalWeight(e.target.value)} />
                </div>
              </div>
              <Button variant="outline" className="w-full" onClick={reset}>
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="h-full border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-lg">Required Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8 bg-muted/30 rounded-xl relative overflow-hidden">
                <Award className="absolute -right-4 -top-4 h-24 w-24 opacity-5 text-primary rotate-12" />
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-2 tracking-widest">You need a</p>
                <p className={cn(
                  "text-6xl font-black",
                  needed && needed > 100 ? "text-destructive" : "text-primary"
                )}>
                  {needed !== null ? needed.toFixed(1) + "%" : "—"}
                </p>
              </div>

              {needed !== null && (
                <div className="space-y-4">
                  {needed > 100 ? (
                    <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-xs font-medium leading-relaxed">
                      ⚠️ You need more than 100% to reach your target. You might need to adjust your goals or ask for extra credit!
                    </div>
                  ) : needed < 0 ? (
                    <div className="p-4 bg-green-500/10 text-green-600 rounded-lg text-xs font-medium leading-relaxed">
                      🎉 You already reached your target! Even with a 0% on the final, you're good.
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground leading-relaxed italic text-center">
                      Good luck! You can do this.
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
