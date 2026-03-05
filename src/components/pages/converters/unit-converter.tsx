'use client'

import { useState, useMemo } from "react";
import { ArrowLeftRight, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UnitCategory = {
  name: string;
  units: { label: string; value: string; toBase: (v: number) => number; fromBase: (v: number) => number }[];
};

const categories: UnitCategory[] = [
  {
    name: "Length",
    units: [
      { label: "Meters", value: "m", toBase: (v) => v, fromBase: (v) => v },
      { label: "Kilometers", value: "km", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { label: "Centimeters", value: "cm", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { label: "Millimeters", value: "mm", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { label: "Miles", value: "mi", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { label: "Feet", value: "ft", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { label: "Inches", value: "in", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ],
  },
  {
    name: "Weight",
    units: [
      { label: "Kilograms", value: "kg", toBase: (v) => v, fromBase: (v) => v },
      { label: "Grams", value: "g", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { label: "Milligrams", value: "mg", toBase: (v) => v / 1e6, fromBase: (v) => v * 1e6 },
      { label: "Pounds", value: "lb", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
      { label: "Ounces", value: "oz", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    ],
  },
  {
    name: "Temperature",
    units: [
      { label: "Celsius", value: "c", toBase: (v) => v, fromBase: (v) => v },
      { label: "Fahrenheit", value: "f", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
      { label: "Kelvin", value: "k", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  {
    name: "Speed",
    units: [
      { label: "m/s", value: "ms", toBase: (v) => v, fromBase: (v) => v },
      { label: "km/h", value: "kmh", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { label: "mph", value: "mph", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { label: "knots", value: "kn", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    ],
  },
  {
    name: "Volume",
    units: [
      { label: "Liters", value: "l", toBase: (v) => v, fromBase: (v) => v },
      { label: "Milliliters", value: "ml", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { label: "Gallons (US)", value: "gal", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      { label: "Cups", value: "cup", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
    ],
  },
];

export default function UnitConverter() {
  const [categoryIdx, setCategoryIdx] = useState(0);
  const [fromUnit, setFromUnit] = useState(categories[0].units[0].value);
  const [toUnit, setToUnit] = useState(categories[0].units[1].value);
  const [inputVal, setInputVal] = useState("1");
  const [copied, setCopied] = useState(false);

  const cat = categories[categoryIdx];
  const from = cat.units.find((u) => u.value === fromUnit)!;
  const to = cat.units.find((u) => u.value === toUnit)!;

  const result = useMemo(() => {
    const num = parseFloat(inputVal);
    if (isNaN(num)) return "";
    const base = from.toBase(num);
    return to.fromBase(base).toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [inputVal, from, to]);

  const handleCategoryChange = (val: string) => {
    const idx = parseInt(val);
    setCategoryIdx(idx);
    setFromUnit(categories[idx].units[0].value);
    setToUnit(categories[idx].units[1].value);
    setInputVal("1");
    setCopied(false);
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setCopied(false);
  };

  const copy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.toString());
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <h1 className="text-xl sm:text-3xl font-display mb-6 font-extrabold">Unit  
        {" "}
    <span className="text-primary">   Converter</span>

      </h1>
      <Card className="gap-2">
        <CardHeader className="px-6 pt-4 pb-4">
          <CardTitle className="text-base">Select category</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Select  value={String(categoryIdx)} onValueChange={handleCategoryChange}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {categories.map((c, i) => (
                <SelectItem key={c.name} value={String(i)}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid grid-cols-[1fr_auto_1fr]  items-end gap-3">
            <div className="flex flex-col gap-2">
              <Label>From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {cat.units.map((u) => (
                    <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input type="number" value={inputVal} onChange={(e) => { setInputVal(e.target.value); setCopied(false); }} />
            </div>

            <Button variant="ghost" size="icon" onClick={swap} className="mb-1">
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

              <div className="flex flex-col gap-2">
              <Label>To</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {cat.units.map((u) => (
                    <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative group">
                <Input readOnly value={result} className="bg-muted font-semibold pr-10" />
                <div className="absolute right-1 top-1/2 -translate-y-1/2">
                   <Tooltip open={copied}>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 rounded" onClick={copy} disabled={!result}>
                          {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Copied!</TooltipContent>
                   </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
