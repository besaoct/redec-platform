'use client'

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {  RefreshCcw, Wallet, Calendar, Percent } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CompoundInterestCalculator() {
  const [initialAmount, setInitialInvestment] = useState("5000");
  const [monthlyContribution, setMonthlyContribution] = useState("100");
  const [years, setYears] = useState("10");
  const [interestRate, setInterestRate] = useState("7");
  const [compoundFrequency, setCompoundFrequency] = useState("12");

  const results = useMemo(() => {
    const P = parseFloat(initialAmount);
    const PMT = parseFloat(monthlyContribution);
    const t = parseFloat(years);
    const r = parseFloat(interestRate) / 100;
    const n = parseInt(compoundFrequency);

    if (isNaN(P) || isNaN(PMT) || isNaN(t) || isNaN(r) || isNaN(n)) return null;

    // A = P(1 + r/n)^(nt) + PMT * (((1 + r/n)^(nt) - 1) / (r/n))
    const nt = n * t;
    const rn = r / n;
    const compoundFactor = Math.pow(1 + rn, nt);
    
    const principalFutureValue = P * compoundFactor;
    const contributionsFutureValue = PMT * ((compoundFactor - 1) / rn);
    
    // Adjust for monthly contribution compounding (rough estimate if n != 12)
    // For simplicity, we assume contributions happen at the end of the period
    const totalValue = principalFutureValue + contributionsFutureValue;
    const totalContributions = P + (PMT * 12 * t);
    const totalInterest = totalValue - totalContributions;

    return {
      totalValue,
      totalContributions,
      totalInterest
    };
  }, [initialAmount, monthlyContribution, years, interestRate, compoundFrequency]);

  const reset = () => {
    setInitialInvestment("5000");
    setMonthlyContribution("100");
    setYears("10");
    setInterestRate("7");
    setCompoundFrequency("12");
  };

  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl sm:text-3xl font-extrabold font-display">Compound Interest <span className="text-primary">Calculator</span></h1>
        <p className="text-muted-foreground mt-2">Calculate how your investments grow over time with compound interest</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                Investment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                   <div className="grid gap-2">
                  <Label htmlFor="initial">Initial Investment (Money)</Label>
                  <Input id="initial" type="number" value={initialAmount} onChange={(e) => setInitialInvestment(e.target.value)} />
                </div>
                   <div className="grid gap-2">
                  <Label htmlFor="monthly">Monthly Contribution (Money)</Label>
                  <Input id="monthly" type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                   <div className="grid gap-2">
                  <Label htmlFor="years">Time Horizon (Years)</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="years" type="number" className="pl-10" value={years} onChange={(e) => setYears(e.target.value)} />
                  </div>
                </div>
                   <div className="grid gap-2">
                  <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="rate" type="number" step="0.1" className="pl-10" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                  </div>
                </div>
              </div>

                 <div className="grid gap-2">
                <Label>Compounding Frequency</Label>
                <Select value={compoundFrequency} onValueChange={setCompoundFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Annually</SelectItem>
                    <SelectItem value="2">Semi-Annually</SelectItem>
                    <SelectItem value="4">Quarterly</SelectItem>
                    <SelectItem value="12">Monthly</SelectItem>
                    <SelectItem value="365">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <ResultCard label="Total Contributions" value={`${results?.totalContributions.toLocaleString(undefined, {maximumFractionDigits: 0})}`} color="text-blue-500" />
             <ResultCard label="Total Interest" value={`${results?.totalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})}`} color="text-green-500" />
          </div>
        </div>

        <div className="space-y-6 h-fit">
          <Card className="h-full border-t-4 border-t-primary overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg">Future Value</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
              <div className="text-center">
                <p className="text-5xl font-black text-primary">
                  {results?.totalValue.toLocaleString(undefined, {maximumFractionDigits: 0})}
                </p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground mt-2 tracking-widest">Estimated Balance</p>
              </div>

              <div className="p-4 bg-muted/50 rounded-xl space-y-4">
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Investment Period:</span>
                    <span className="font-bold">{years} Years</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Interest Earned:</span>
                    <span className="font-bold text-green-600">
                      +{((results?.totalInterest || 0) / (results?.totalContributions || 1) * 100).toFixed(1)}%
                    </span>
                 </div>
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

function ResultCard({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1 tracking-widest">{label}</p>
        <p className={cn("text-2xl font-black", color)}>{value}</p>
      </CardContent>
    </Card>
  );
}
