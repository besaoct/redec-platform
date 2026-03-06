'use client'

import { useState,  useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Monitor, RefreshCcw, Share2,  Maximize2, MoveHorizontal, MoveVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { COMMON_RATIOS } from "@/data/tools/calculators/aspect-ratio";

export default function AspectRatioCalculator() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [w, setW] = useState(searchParams.get("w") || "1920");
  const [h, setH] = useState(searchParams.get("h") || "1080");
  const [rw, setRw] = useState(searchParams.get("rw") || "16");
  const [rh, setRh] = useState(searchParams.get("rh") || "9");
  const [copied, setCopied] = useState(false);

  const calculateGcd = (a: number, b: number): number => {
    return b === 0 ? a : calculateGcd(b, a % b);
  };

  const updateUrl = useCallback((params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
      else newParams.delete(key);
    });
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const handleWidthChange = (val: string) => {
    setW(val);
    const width = parseFloat(val);
    const ratioW = parseFloat(rw);
    const ratioH = parseFloat(rh);
    if (!isNaN(width) && !isNaN(ratioW) && !isNaN(ratioH) && ratioW !== 0) {
      const height = (width * ratioH) / ratioW;
      setH(height.toString());
      updateUrl({ w: val, h: height.toString(), rw, rh });
    }
  };

  const handleHeightChange = (val: string) => {
    setH(val);
    const height = parseFloat(val);
    const ratioW = parseFloat(rw);
    const ratioH = parseFloat(rh);
    if (!isNaN(height) && !isNaN(ratioW) && !isNaN(ratioH) && ratioH !== 0) {
      const width = (height * ratioW) / ratioH;
      setW(width.toString());
      updateUrl({ w: width.toString(), h: val, rw, rh });
    }
  };

  const handleRatioWChange = (val: string) => {
    setRw(val);
    const ratioW = parseFloat(val);
    const width = parseFloat(w);
    const ratioH = parseFloat(rh);
    if (!isNaN(ratioW) && !isNaN(width) && !isNaN(ratioH) && ratioW !== 0) {
      const height = (width * ratioH) / ratioW;
      setH(height.toString());
      updateUrl({ rw: val, h: height.toString() });
    }
  };

  const handleRatioHChange = (val: string) => {
    setRh(val);
    const ratioH = parseFloat(val);
    const width = parseFloat(w);
    const ratioW = parseFloat(rw);
    if (!isNaN(ratioH) && !isNaN(width) && !isNaN(ratioW) && ratioW !== 0) {
      const height = (width * ratioH) / ratioW;
      setH(height.toString());
      updateUrl({ rh: val, h: height.toString() });
    }
  };

  const applyCommonRatio = (ratioW: number, ratioH: number) => {
    setRw(ratioW.toString());
    setRh(ratioH.toString());
    const width = parseFloat(w);
    if (!isNaN(width)) {
      const height = (width * ratioH) / ratioW;
      setH(height.toString());
      updateUrl({ rw: ratioW.toString(), rh: ratioH.toString(), h: height.toString() });
    }
  };

  const reset = () => {
    setW("1920");
    setH("1080");
    setRw("16");
    setRh("9");
    router.push(pathname, { scroll: false });
  };

  const share = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Aspect Ratio Calculation',
        text: `Aspect Ratio Calculation: ${w}x${h} with ratio ${rw}:${rh}`,
        url: url,
      }).catch(() => copyToClipboard(url));
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-xl sm:text-3xl font-extrabold font-display">Aspect Ratio <span className="text-primary">Calculator</span></h1>
        <p className="text-muted-foreground mt-2">Calculate dimensions, ratios, and common screen sizes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Maximize2 className="h-5 w-5 text-primary" />
                Dimensions
              </CardTitle>
              <CardDescription>Enter width or height to calculate the other based on ratio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="width">Width (px)</Label>
                  <div className="relative">
                    <MoveHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="width"
                      type="number"
                      placeholder="Width"
                      className="pl-10"
                      value={w}
                      onChange={(e) => handleWidthChange(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (px)</Label>
                  <div className="relative">
                    <MoveVertical className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="height"
                      type="number"
                      placeholder="Height"
                      className="pl-10"
                      value={h}
                      onChange={(e) => handleHeightChange(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Monitor className="h-5 w-5 text-primary" />
                Aspect Ratio
              </CardTitle>
              <CardDescription>Define the base ratio for calculation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ratioW">Ratio Width</Label>
                  <Input
                    id="ratioW"
                    type="number"
                    placeholder="Ratio Width"
                    value={rw}
                    onChange={(e) => handleRatioWChange(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ratioH">Ratio Height</Label>
                  <Input
                    id="ratioH"
                    type="number"
                    placeholder="Ratio Height"
                    value={rh}
                    onChange={(e) => handleRatioHChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button className="flex-1" onClick={share}>
                  <Share2 className="mr-2 h-4 w-4" /> Share Result
                </Button>
                <Button variant="outline" size="icon" onClick={reset}>
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Common Ratios</CardTitle>
              <CardDescription>Quick presets for standard sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {COMMON_RATIOS.map((ratio) => (
                <button
                  key={ratio.label}
                  onClick={() => applyCommonRatio(ratio.width, ratio.height)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border transition-all hover:bg-accent group",
                    rw === ratio.width.toString() && rh === ratio.height.toString()
                      ? "border-primary bg-primary/5"
                      : "border-transparent bg-muted/50"
                  )}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{ratio.label}</span>
                    <span className="text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Apply</span>
                  </div>
                  <p className="text-xs leading-snug">{ratio.description}</p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Visual Preview */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold mb-4">Visual Preview</h3>
        <div className="w-full bg-muted/30 rounded-xl p-8 flex items-center justify-center min-h-75 border-2 border-dashed border-muted">
          <div 
            className="bg-primary/10 border-2 border-primary rounded shadow-2xl flex items-center justify-center text-primary font-bold transition-all duration-500"
            style={{ 
              aspectRatio: `${rw}/${rh}`,
              maxWidth: '100%',
              maxHeight: '400px',
              width: '100%'
            }}
          >
            <div className="text-center p-4 num">
              <div className="text-2xl sm:text-4xl">{rw}:{rh}</div>
              <div className="text-sm sm:text-lg opacity-60">{w} x {h}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold mb-3">How it works</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Aspect ratio is the proportional relationship between its width and its height. It is commonly expressed as two numbers separated by a colon, as in 16:9. For an x:y aspect ratio, the image is x units wide and y units high. This tool allows you to calculate missing dimensions while maintaining a fixed ratio, or vice versa.
        </p>
      </div>
    </div>
  );
}
