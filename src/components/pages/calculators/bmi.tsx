'use client'

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, RefreshCcw, Info, User, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BMICalculator() {
  const [unit, setUnit] = useState("metric");
  
  // Metric
  const [weightKg, setWeightKg] = useState("70");
  const [heightCm, setHeightCm] = useState("175");

  // Imperial
  const [weightLbs, setWeightLbs] = useState("154");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");

  const bmiData = useMemo(() => {
    let bmi = 0;
    if (unit === "metric") {
      const w = parseFloat(weightKg);
      const h = parseFloat(heightCm) / 100;
      if (w > 0 && h > 0) bmi = w / (h * h);
    } else {
      const w = parseFloat(weightLbs);
      const h = (parseFloat(heightFt) * 12) + parseFloat(heightIn);
      if (w > 0 && h > 0) bmi = (w / (h * h)) * 703;
    }

    if (bmi === 0 || isNaN(bmi)) return null;

    let category = "";
    let color = "";
    if (bmi < 18.5) { category = "Underweight"; color = "text-blue-500"; }
    else if (bmi < 25) { category = "Normal weight"; color = "text-green-500"; }
    else if (bmi < 30) { category = "Overweight"; color = "text-orange-500"; }
    else { category = "Obese"; color = "text-red-500"; }

    return { bmi, category, color };
  }, [unit, weightKg, heightCm, weightLbs, heightFt, heightIn]);

  const reset = () => {
    setWeightKg("70"); setHeightCm("175");
    setWeightLbs("154"); setHeightFt("5"); setHeightIn("9");
  };

  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl sm:text-3xl font-extrabold font-display">BMI <span className="text-primary">Calculator</span></h1>
        <p className="text-muted-foreground mt-2">Calculate your Body Mass Index (BMI) to find your health category</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Your Measurements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={unit} onValueChange={setUnit} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="metric">Metric (kg/cm)</TabsTrigger>
                  <TabsTrigger value="imperial">Imperial (lb/in)</TabsTrigger>
                </TabsList>
                
                <TabsContent value="metric" className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="weight-kg">Weight (kg)</Label>
                      <Input id="weight-kg" type="number" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height-cm">Height (cm)</Label>
                      <Input id="height-cm" type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="imperial" className="space-y-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="weight-lb">Weight (lbs)</Label>
                      <Input id="weight-lb" type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="height-ft">Height (ft)</Label>
                        <Input id="height-ft" type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height-in">Height (in)</Label>
                        <Input id="height-in" type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} />
                      </div>
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
        </div>

        <div className="space-y-6">
          <Card className="h-full border-t-4 border-t-primary overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg text-center">Your BMI Result</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-8 text-center">
              <div>
                <p className="text-7xl font-black text-primary mb-2">
                  {bmiData?.bmi.toFixed(1) || "—"}
                </p>
                <p className={cn("text-xl font-bold uppercase tracking-widest", bmiData?.color)}>
                  {bmiData?.category || "Enter Data"}
                </p>
              </div>

              <div className="p-4 bg-muted/50 rounded-xl space-y-2 text-left">
                 <div className="flex justify-between text-xs py-1 border-b border-muted">
                    <span className="text-muted-foreground">Underweight:</span>
                    <span className="font-medium">Below 18.5</span>
                 </div>
                 <div className="flex justify-between text-xs py-1 border-b border-muted">
                    <span className="text-muted-foreground">Normal:</span>
                    <span className="font-medium text-green-600">18.5 – 24.9</span>
                 </div>
                 <div className="flex justify-between text-xs py-1 border-b border-muted">
                    <span className="text-muted-foreground">Overweight:</span>
                    <span className="font-medium text-orange-600">25 – 29.9</span>
                 </div>
                 <div className="flex justify-between text-xs py-1">
                    <span className="text-muted-foreground">Obese:</span>
                    <span className="font-medium text-red-600">30 or greater</span>
                 </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg text-left">
                 <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                 <p className="text-[10px] text-muted-foreground leading-relaxed">
                   BMI is a useful measure of overweight and obesity. It is calculated from your height and weight. BMI is an estimate of body fat and a good gauge of your risk for diseases that can occur with more body fat.
                 </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
