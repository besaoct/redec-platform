'use client'

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Divide, RefreshCcw, Plus, Minus, X, Equal } from "lucide-react";
import { cn } from "@/lib/utils";

type Operation = "add" | "subtract" | "multiply" | "divide";

export default function FractionCalculator() {
  const [n1, setN1] = useState("1");
  const [d1, setD1] = useState("2");
  const [n2, setN2] = useState("1");
  const [d2, setD2] = useState("4");
  const [op, setOp] = useState<Operation>("add");

  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);

  const result = useMemo(() => {
    const num1 = parseInt(n1);
    const den1 = parseInt(d1);
    const num2 = parseInt(n2);
    const den2 = parseInt(d2);

    if (isNaN(num1) || isNaN(den1) || isNaN(num2) || isNaN(den2) || den1 === 0 || den2 === 0) return null;

    let resNum = 0;
    let resDen = 1;

    switch (op) {
      case "add":
        resNum = num1 * den2 + num2 * den1;
        resDen = den1 * den2;
        break;
      case "subtract":
        resNum = num1 * den2 - num2 * den1;
        resDen = den1 * den2;
        break;
      case "multiply":
        resNum = num1 * num2;
        resDen = den1 * den2;
        break;
      case "divide":
        resNum = num1 * den2;
        resDen = den1 * num2;
        break;
    }

    if (resDen === 0) return "Error";

    const common = Math.abs(gcd(resNum, resDen));
    const simplifiedNum = resNum / common;
    const simplifiedDen = resDen / common;

    return {
      num: simplifiedNum,
      den: simplifiedDen,
      decimal: (simplifiedNum / simplifiedDen).toFixed(4),
      mixed: {
        whole: Math.floor(Math.abs(simplifiedNum) / simplifiedDen) * (simplifiedNum < 0 ? -1 : 1),
        num: Math.abs(simplifiedNum) % simplifiedDen,
        den: simplifiedDen
      }
    };
  }, [n1, d1, n2, d2, op]);

  const reset = () => {
    setN1("1"); setD1("2");
    setN2("1"); setD2("4");
    setOp("add");
  };

  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl sm:text-3xl font-extrabold font-display">Fraction <span className="text-primary">Calculator</span></h1>
        <p className="text-muted-foreground mt-2">Perform arithmetic operations on fractions with simplification</p>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardContent className="pt-8">
            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-8 lg:gap-12">
              {/* Fraction 1 */}
              <FractionInput n={n1} d={d1} onNChange={setN1} onDChange={setD1} label="Fraction 1" />

              {/* Operator */}
              <div className="flex flex-wrap justify-center gap-2 lg:mt-6">
                <OpButton active={op === "add"} icon={Plus} onClick={() => setOp("add")} />
                <OpButton active={op === "subtract"} icon={Minus} onClick={() => setOp("subtract")} />
                <OpButton active={op === "multiply"} icon={X} onClick={() => setOp("multiply")} />
                <OpButton active={op === "divide"} icon={Divide} onClick={() => setOp("divide")} />
              </div>

              {/* Fraction 2 */}
              <FractionInput n={n2} d={d2} onNChange={setN2} onDChange={setD2} label="Fraction 2" />

              <div className="hidden lg:block lg:mt-6">
                <Equal className="h-8 w-8 text-muted-foreground" />
              </div>

              {/* Result */}
              <div className="flex flex-col items-center">
                <Label className="mb-4 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Result</Label>
                {typeof result === "object" && result ? (
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-black text-primary border-b-2 border-primary pb-1 px-4 mb-1">{result.num}</div>
                    <div className="text-3xl font-black text-primary pt-1 px-4">{result.den}</div>
                  </div>
                ) : (
                  <div className="text-3xl font-black text-destructive">{result === "Error" ? "Div by 0" : "—"}</div>
                )}
              </div>
            </div>

            <div className="mt-12 flex justify-center lg:justify-start">
              <Button variant="default" size="sm" onClick={reset}>
                <RefreshCcw className="mr-2 h-4 w-4" /> Reset Calculator
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && typeof result === "object" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mixed Number</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                  {Math.abs(result.mixed.whole) > 0 && <span>{result.mixed.whole}</span>}
                  {result.mixed.num > 0 && (
                    <div className="flex flex-col items-center text-sm">
                      <span className="border-b border-foreground px-1">{result.mixed.num}</span>
                      <span className="px-1">{result.mixed.den}</span>
                    </div>
                  )}
                  {result.mixed.whole === 0 && result.mixed.num === 0 && <span>0</span>}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Decimal Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black">{result.decimal}</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold mb-3">How it works</h3>
        <div className="text-xs text-muted-foreground space-y-2 leading-relaxed">
          <p><strong>Addition/Subtraction:</strong> To add or subtract fractions, they must have a common denominator. We multiply the numerators by the opposite denominators and then add/subtract the results.</p>
          <p><strong>Multiplication:</strong> Multiply the numerators together and the denominators together.</p>
          <p><strong>Division:</strong> Multiply the first fraction by the reciprocal (flipped version) of the second fraction.</p>
        </div>
      </div>
    </div>
  );
}

function FractionInput({ n, d, onNChange, onDChange, label }: any) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Label className="mb-2 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{label}</Label>
      <Input
        type="number"
        value={n}
        onChange={(e) => onNChange(e.target.value)}
        className="w-20 text-center font-bold text-lg border-0"
      />
      <div className="w-16 h-0.5 bg-muted-foreground/30" />
      <Input
        type="number"
        value={d}
        onChange={(e) => onDChange(e.target.value)}
        className={cn("w-20 text-center font-bold text-lg border-0", parseInt(d) === 0 && "border-destructive text-destructive")}
      />
    </div>
  );
}

function OpButton({ active, icon: Icon, onClick }: any) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      size="icon"
      className="h-10 w-10 rounded-full"
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
