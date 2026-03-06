'use client'

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {  RefreshCcw, User, Users, Info, Heart,  } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AgeGapCalculator() {
  const [mode, setMode] = useState("dob");

  // DOB Mode State
  const [dob1, setDob1] = useState("1995-01-01");
  const [dob2, setDob2] = useState("2000-01-01");

  // Absolute Age Mode State
  const [age1, setAge1] = useState("30");
  const [age2, setAge2] = useState("25");

  const results = useMemo(() => {
    if (mode === "dob") {
      const d1 = new Date(dob1);
      const d2 = new Date(dob2);
      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;

      const diff = Math.abs(d1.getTime() - d2.getTime());
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      const years = Math.floor(totalDays / 365.25);
      const remainingDays = totalDays % 365.25;
      const months = Math.floor(remainingDays / 30.44);
      const days = Math.round(remainingDays % 30.44);

      const older = d1 < d2 ? "Person 1" : "Person 2";
      
      // Calculate current ages for the 'rule'
      const now = new Date();
      const age1Now = now.getFullYear() - d1.getFullYear() - (now < new Date(now.getFullYear(), d1.getMonth(), d1.getDate()) ? 1 : 0);
      const age2Now = now.getFullYear() - d2.getFullYear() - (now < new Date(now.getFullYear(), d2.getMonth(), d2.getDate()) ? 1 : 0);

      return {
        years,
        months,
        days,
        totalDays,
        older,
        ratio: Math.max(age1Now, age2Now) / Math.min(age1Now, age2Now) || 1,
        ruleCheck: checkRule(age1Now, age2Now)
      };
    } else {
      const a1 = parseFloat(age1);
      const a2 = parseFloat(age2);
      if (isNaN(a1) || isNaN(a2)) return null;

      return {
        years: Math.abs(a1 - a2),
        months: 0,
        days: 0,
        totalDays: Math.abs(a1 - a2) * 365,
        older: a1 > a2 ? "Person 1" : "Person 2",
        ratio: Math.max(a1, a2) / Math.min(a1, a2) || 1,
        ruleCheck: checkRule(a1, a2)
      };
    }
  }, [mode, dob1, dob2, age1, age2]);

  function checkRule(a1: number, a2: number) {
    const older = Math.max(a1, a2);
    const younger = Math.min(a1, a2);
    const minAge = (older / 2) + 7;
    return younger >= minAge;
  }

  const reset = () => {
    setDob1("1995-01-01");
    setDob2("2000-01-01");
    setAge1("30");
    setAge2("25");
  };

  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl sm:text-3xl font-extrabold font-display">Age Gap <span className="text-primary">Calculator</span></h1>
        <p className="text-muted-foreground mt-2">Find the age difference and relationship insights between two people</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Input Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={mode} onValueChange={setMode} className="w-full">
                  <div className="w-full overflow-x-auto">
                  <TabsList className="flex gap-1 mb-8">
                  <TabsTrigger value="dob">Date of Birth</TabsTrigger>
                  <TabsTrigger value="age">Current Ages</TabsTrigger>
                </TabsList>
                </div>

                <TabsContent value="dob" className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Person 1 DOB</Label>
                      <Input type="date" value={dob1} onChange={(e) => setDob1(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Person 2 DOB</Label>
                      <Input type="date" value={dob2} onChange={(e) => setDob2(e.target.value)} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="age" className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Person 1 Age</Label>
                      <Input type="number" value={age1} onChange={(e) => setAge1(e.target.value)} placeholder="e.g. 30" />
                    </div>
                    <div className="space-y-2">
                      <Label>Person 2 Age</Label>
                      <Input type="number" value={age2} onChange={(e) => setAge2(e.target.value)} placeholder="e.g. 25" />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 flex justify-end">
                <Button variant="outline" onClick={reset}>
                  <RefreshCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Visual Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Visual Comparison</CardTitle>
            </CardHeader>
            <CardContent className="py-10">
               <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Person 1</p>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center">
                    <div className="h-px w-full bg-muted-foreground/20 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 py-1 border rounded-full text-xs font-bold num">
                        {results?.years}Y {results?.months}M
                      </div>
                    </div>
                    <p className="mt-4 text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Difference</p>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center border-2 border-secondary/20">
                      <User className="h-8 w-8 text-secondary" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Person 2</p>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 h-fit">
          <Card className="h-full border-t-4 border-t-primary overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg">Result Insights</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
              <div className="text-center">
                <p className="text-6xl font-black text-primary num">
                  {results?.years}
                </p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground mt-2 tracking-widest">Years Difference</p>
              </div>

              <div className="space-y-4">
                <SummaryItem label="Older Person" value={results?.older} />
                <SummaryItem label="Total Days" value={results?.totalDays.toLocaleString()} />
                <SummaryItem label="Age Ratio" value={`${results?.ratio.toFixed(2)}x`} />
              </div>

              <div className={cn(
                "p-4 rounded-xl border flex gap-3",
                results?.ruleCheck ? "bg-green-500/5 border-green-500/20" : "bg-orange-500/5 border-orange-500/20"
              )}>
                <Heart className={cn("h-5 w-5 shrink-0", results?.ruleCheck ? "text-green-500" : "text-orange-500")} />
                <div>
                  <p className="text-xs font-bold uppercase mb-1">Standard Rule</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    According to the "Half your age plus seven" rule, this gap is 
                    <span className={cn("font-bold mx-1", results?.ruleCheck ? "text-green-600" : "text-orange-600")}>
                      {results?.ruleCheck ? "Socially Accepted" : "Outside Standard"}
                    </span>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 bg-muted/30 p-6 rounded-xl border">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" />
          The "Half Your Age Plus Seven" Rule
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          This rule is a common social guideline used to determine the minimum age of a person one could date without it being considered "creepy" or socially inappropriate. The formula is: <strong>(Older Age / 2) + 7 = Minimum Younger Age</strong>. For example, a 30-year-old's minimum partner age would be 22.
        </p>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string, value?: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0 border-muted/50">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-bold">{value ?? "—"}</span>
    </div>
  );
}
