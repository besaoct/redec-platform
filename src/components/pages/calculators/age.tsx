'use client'

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, RefreshCcw, Cake, Clock, History, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

  const ageData = useMemo(() => {
    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return null;

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      nextBirthday: getNextBirthday(birth, target)
    };
  }, [birthDate, targetDate]);

  function getNextBirthday(birth: Date, target: Date) {
    const next = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (next < target) next.setFullYear(target.getFullYear() + 1);
    
    const diff = next.getTime() - target.getTime();
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const m = Math.floor(d / 30.44); // Rough month
    return { months: m, days: d % 30 };
  }

  const reset = () => {
    setBirthDate("2000-01-01");
    setTargetDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl sm:text-3xl font-extrabold font-display">Age <span className="text-primary">Calculator</span></h1>
        <p className="text-muted-foreground mt-2">Calculate exact age and time since birth</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Date Selection
              </CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="birth">Date of Birth</Label>
                <Input
                  id="birth"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Age at the Date of</Label>
                <Input
                  id="target"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {ageData && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard label="Years" value={ageData.years} icon={History} color="text-blue-500" />
              <StatCard label="Months" value={ageData.months} icon={Clock} color="text-purple-500" />
              <StatCard label="Days" value={ageData.days} icon={Timer} color="text-orange-500" />
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Cake className="h-5 w-5 text-primary" />
                Next Birthday
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {ageData?.nextBirthday.months} months and {ageData?.nextBirthday.days} days remaining
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Total Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TotalItem label="Total Weeks" value={ageData?.totalWeeks.toLocaleString()} />
              <TotalItem label="Total Days" value={ageData?.totalDays.toLocaleString()} />
              <TotalItem label="Total Hours" value={ageData?.totalHours.toLocaleString()} />
              <TotalItem label="Total Minutes" value={ageData?.totalMinutes.toLocaleString()} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button variant="outline" onClick={reset}>
          <RefreshCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string, value: number, icon: any, color: string }) {
  return (
    <Card className="relative overflow-hidden border-b-4 border-b-muted hover:border-b-primary transition-all">
      <CardContent className="p-6 text-center">
        <Icon className={cn("h-8 w-8 mx-auto mb-3 opacity-20 absolute -right-2 -top-2 scale-150 rotate-12", color)} />
        <p className="text-4xl font-black mb-1">{value}</p>
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
      </CardContent>
    </Card>
  );
}

function TotalItem({ label, value }: { label: string, value?: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0 border-muted/50">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-mono font-bold">{value ?? "—"}</span>
    </div>
  );
}
