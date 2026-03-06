'use client'

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Landmark, RefreshCcw,  Calendar, Percent} from "lucide-react";
import { cn } from "@/lib/utils";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);

  const results = useMemo(() => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
      principal
    };
  }, [homePrice, downPayment, loanTerm, interestRate]);

  const reset = () => {
    setHomePrice(300000);
    setDownPayment(60000);
    setLoanTerm(30);
    setInterestRate(6.5);
  };

  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl sm:text-3xl font-extrabold font-display">Mortgage <span className="text-primary">Calculator</span></h1>
        <p className="text-muted-foreground mt-2">Estimate your monthly mortgage payments and total interest cost</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Landmark className="h-5 w-5 text-primary" />
                Loan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Home Price: {homePrice.toLocaleString()}</Label>
                  <Slider 
                    value={[homePrice]} 
                    min={50000} 
                    max={2000000} 
                    step={1000} 
                    onValueChange={(val) => setHomePrice(val[0])} 
                  />
                </div>
                <div className="space-y-4">
                  <Label>Down Payment: {downPayment.toLocaleString()}</Label>
                  <Slider 
                    value={[downPayment]} 
                    min={0} 
                    max={homePrice} 
                    step={1000} 
                    onValueChange={(val) => setDownPayment(val[0])} 
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="rate">Interest Rate (%)</Label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="rate" type="number" step="0.1" className="pl-10" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="term">Loan Term (Years)</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="term" type="number" className="pl-10" value={loanTerm} onChange={(e) => setLoanTerm(parseInt(e.target.value))} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <InfoCard label="Total Interest" value={`${results.totalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})}`} color="text-orange-500" />
             <InfoCard label="Total Cost" value={`${results.totalPayment.toLocaleString(undefined, {maximumFractionDigits: 0})}`} color="text-blue-500" />
          </div>
        </div>

        <div className="space-y-6">
          <Card className="h-full border-t-4 border-t-primary overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg">Monthly Payment</CardTitle>
            </CardHeader>
            <CardContent className="pt-8 space-y-8">
              <div className="text-center">
                <p className="text-6xl font-black text-primary">
                  {results.monthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 0})}
                </p>
                <p className="text-[10px] uppercase font-bold text-muted-foreground mt-2 tracking-widest">Per Month</p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Loan Amount:</span>
                  <span className="font-bold">{results.principal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Down Payment:</span>
                  <span className="font-bold">{downPayment.toLocaleString()}</span>
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

function InfoCard({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1 tracking-widest">{label}</p>
        <p className={cn("text-2xl font-black", color)}>{value}</p>
      </CardContent>
    </Card>
  );
}
