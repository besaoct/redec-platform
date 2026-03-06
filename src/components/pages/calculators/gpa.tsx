'use client'

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, RefreshCcw, School } from "lucide-react";
import { GRADE_VALUES } from "@/data/tools/calculators/gpa";

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: string;
}

export default function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Course 1", grade: "A", credits: "3" },
    { id: "2", name: "Course 2", grade: "B+", credits: "4" },
    { id: "3", name: "Course 3", grade: "A-", credits: "3" },
  ]);

  const [priorGPA, setPriorGPA] = useState("");
  const [priorCredits, setPriorCredits] = useState("");

  const addCourse = () => {
    setCourses([...courses, { id: Math.random().toString(36).substr(2, 9), name: "", grade: "A", credits: "3" }]);
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const gpaStats = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(c => {
      const gradeVal = GRADE_VALUES[c.grade];
      const creditsVal = parseFloat(c.credits);
      if (!isNaN(creditsVal)) {
        totalPoints += gradeVal * creditsVal;
        totalCredits += creditsVal;
      }
    });

    const semesterGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;

    // Cumulative
    const pGPA = parseFloat(priorGPA);
    const pCredits = parseFloat(priorCredits);
    let cumulativeGPA = semesterGPA;
    let combinedCredits = totalCredits;

    if (!isNaN(pGPA) && !isNaN(pCredits)) {
      const priorPoints = pGPA * pCredits;
      cumulativeGPA = (priorPoints + totalPoints) / (pCredits + totalCredits);
      combinedCredits = pCredits + totalCredits;
    }

    return {
      semesterGPA,
      cumulativeGPA,
      totalCredits,
      combinedCredits
    };
  }, [courses, priorGPA, priorCredits]);

  const reset = () => {
    setCourses([
      { id: "1", name: "Course 1", grade: "A", credits: "3" },
      { id: "2", name: "Course 2", grade: "B+", credits: "4" },
    ]);
    setPriorGPA("");
    setPriorCredits("");
  };

  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl sm:text-3xl font-extrabold font-display">GPA <span className="text-primary">Calculator</span></h1>
        <p className="text-muted-foreground mt-2">Calculate your semester and cumulative Grade Point Average</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <School className="h-5 w-5 text-primary" />
                  Current Semester
                </CardTitle>
              </div>
              <Button onClick={addCourse} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" /> Add Course
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((c) => (
                  <div key={c.id} className="grid grid-cols-12 gap-2 sm:gap-4 items-center">
                    <div className="col-span-5 sm:col-span-6">
                      <Input
                        placeholder="Course Name"
                        value={c.name}
                        onChange={(e) => updateCourse(c.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <Select value={c.grade} onValueChange={(val) => updateCourse(c.id, "grade", val)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(GRADE_VALUES).map(g => (
                            <SelectItem key={g} value={g}>{g}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3 sm:col-span-2">
                      <Input
                        type="number"
                        placeholder="Credits"
                        value={c.credits}
                        onChange={(e) => updateCourse(c.id, "credits", e.target.value)}
                      />
                    </div>
                    <div className="col-span-1">
                      <Button variant="ghost" size="icon" onClick={() => removeCourse(c.id)}>
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
              <CardTitle className="text-lg">Prior Cumulative GPA (Optional)</CardTitle>
              <CardDescription>Include your previous records for cumulative calculation</CardDescription>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Prior GPA</Label>
                <Input type="number" step="0.01" value={priorGPA} onChange={(e) => setPriorGPA(e.target.value)} placeholder="e.g. 3.50" />
              </div>
              <div className="space-y-2">
                <Label>Prior Credits</Label>
                <Input type="number" value={priorCredits} onChange={(e) => setPriorCredits(e.target.value)} placeholder="e.g. 60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="h-full border-t-4 border-t-primary overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg">Results</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-8">
              <div className="text-center">
                <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1 tracking-widest">Semester GPA</p>
                <p className="text-6xl font-black text-primary">{gpaStats.semesterGPA.toFixed(2)}</p>
              </div>

              {priorGPA && (
                <div className="text-center p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <p className="text-[10px] uppercase font-bold text-primary mb-1 tracking-widest">Cumulative GPA</p>
                  <p className="text-4xl font-black">{gpaStats.cumulativeGPA.toFixed(2)}</p>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Semester Credits:</span>
                  <span className="font-bold">{gpaStats.totalCredits}</span>
                </div>
                {priorCredits && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Credits:</span>
                    <span className="font-bold">{gpaStats.combinedCredits}</span>
                  </div>
                )}
              </div>

              <Button variant="outline" className="w-full" onClick={reset}>
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
