'use client'

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {Plus, Trash2, RefreshCcw, Target, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Assignment {
  id: string;
  name: string;
  grade: string;
  weight: string;
}

export default function GradeCalculator() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: "1", name: "Assignments", grade: "90", weight: "20" },
    { id: "2", name: "Midterm", grade: "85", weight: "30" },
    { id: "3", name: "Final Exam", grade: "", weight: "50" },
  ]);

  const [targetGrade, setTargetGrade] = useState("90");

  const addAssignment = () => {
    setAssignments([
      ...assignments,
      { id: Math.random().toString(36).substr(2, 9), name: "", grade: "", weight: "" },
    ]);
  };

  const removeAssignment = (id: string) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  const updateAssignment = (id: string, field: keyof Assignment, value: string) => {
    setAssignments(
      assignments.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const stats = useMemo(() => {
    let currentGrade = 0;
    let totalWeight = 0;
    let gradedWeight = 0;

    assignments.forEach((a) => {
      const g = parseFloat(a.grade);
      const w = parseFloat(a.weight);
      if (!isNaN(w)) {
        totalWeight += w;
        if (!isNaN(g)) {
          currentGrade += (g * w) / 100;
          gradedWeight += w;
        }
      }
    });

    const average = gradedWeight > 0 ? (currentGrade / gradedWeight) * 100 : 0;
    const remainingWeight = totalWeight - gradedWeight;
    const target = parseFloat(targetGrade);
    
    let neededOnRemaining = null;
    if (!isNaN(target) && remainingWeight > 0) {
      neededOnRemaining = ((target - currentGrade) / remainingWeight) * 100;
    }

    return {
      currentGrade,
      gradedWeight,
      totalWeight,
      average,
      neededOnRemaining,
      remainingWeight
    };
  }, [assignments, targetGrade]);

  const reset = () => {
    setAssignments([
      { id: "1", name: "Assignments", grade: "90", weight: "20" },
      { id: "2", name: "Midterm", grade: "85", weight: "30" },
      { id: "3", name: "Final Exam", grade: "", weight: "50" },
    ]);
    setTargetGrade("90");
  };

  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl sm:text-3xl font-extrabold font-display">Grade <span className="text-primary">Calculator</span></h1>
        <p className="text-muted-foreground mt-2">Calculate your current class grade and what you need on finals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Assignments
                </CardTitle>
                <CardDescription>Add your course components and their weights</CardDescription>
              </div>
              <Button onClick={addAssignment} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" /> Add Row
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 px-2 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                  <div className="col-span-6">Name (Optional)</div>
                  <div className="col-span-3">Grade (%)</div>
                  <div className="col-span-2">Weight (%)</div>
                  <div className="col-span-1"></div>
                </div>
                {assignments.map((a) => (
                  <div key={a.id} className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                    <div className="col-span-6">
                      <Input
                        placeholder="e.g. Midterm"
                        value={a.name}
                        onChange={(e) => updateAssignment(a.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        placeholder="0-100"
                        value={a.grade}
                        onChange={(e) => updateAssignment(a.id, "grade", e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        placeholder="%"
                        value={a.weight}
                        onChange={(e) => updateAssignment(a.id, "weight", e.target.value)}
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeAssignment(a.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Target Grade
              </CardTitle>
              <CardDescription>What overall grade are you aiming for?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid items-center gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <Label htmlFor="target">Desired Grade (%)</Label>
                  <Input
                    id="target"
                    type="number"
                    value={targetGrade}
                    onChange={(e) => setTargetGrade(e.target.value)}
                  />
                </div>
                <div className="w-full">
                   {stats.neededOnRemaining !== null && (
                     <div className="p-4 bg-primary/5 rounded border border-primary/10">
                        <p className="text-xs font-bold uppercase text-primary mb-1">Needed on remaining</p>
                        <p className="text-2xl font-black">
                          {stats.neededOnRemaining.toFixed(2)}%
                        </p>
                     </div>
                   )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="h-fit">
          <Card className="border-t-4 border-t-primary h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Overall Result</CardTitle>
            </CardHeader>
            <CardContent className=" h-full flex flex-col gap-4">
            
              <div className="text-center py-6 bg-muted/30 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Current Average</p>
                <p className="text-5xl font-black text-primary">{stats.average.toFixed(2)}%</p>
              </div>

              <div className="space-y-4">
                <SummaryItem label="Graded Weight" value={`${stats.gradedWeight}%`} />
                <SummaryItem label="Remaining Weight" value={`${stats.remainingWeight}%`} />
                <SummaryItem label="Total Weight" value={`${stats.totalWeight}%`} color={stats.totalWeight !== 100 ? "text-orange-500" : ""} />
              </div>

              {stats.totalWeight !== 100 && (
                <p className="text-[10px] text-orange-500 font-medium leading-tight">
                  ⚠️ Your weights sum to {stats.totalWeight}%. For most classes, they should sum to 100%.
                </p>
              )}

            <div className="flex-1 flex flex-col justify-end">
               <Button variant="outline" className="w-full" onClick={reset}>
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset All
              </Button>
            </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value, color }: { label: string, value: string, color?: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0 border-muted/50">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className={cn("font-bold", color)}>{value}</span>
    </div>
  );
}
