'use client'

import { useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Monitor, RefreshCcw, Share2, Maximize2, MoveHorizontal, MoveVertical, Smartphone, Laptop, Tv, Tablet } from "lucide-react";
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
      const height = Math.round((width * ratioH) / ratioW);
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
      const width = Math.round((height * ratioW) / ratioH);
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
      const height = Math.round((width * ratioH) / ratioW);
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
      const height = Math.round((width * ratioH) / ratioW);
      setH(height.toString());
      updateUrl({ rh: val, h: height.toString() });
    }
  };

  const applyCommonRatio = (ratioW: number, ratioH: number) => {
    setRw(ratioW.toString());
    setRh(ratioH.toString());
    const width = parseFloat(w);
    if (!isNaN(width)) {
      const height = Math.round((width * ratioH) / ratioW);
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
      }).catch(() => {
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!");
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  const getRatioIcon = (label: string) => {
    if (label === "9:16") return Smartphone;
    if (label === "16:9") return Tv;
    if (label === "21:9") return Monitor;
    if (label === "4:3") return Laptop;
    if (label === "3:2" || label === "2:3") return Tablet;
    return Maximize2;
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
              {COMMON_RATIOS.map((ratio) => {
                const Icon = getRatioIcon(ratio.label);
                return (
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
                      <div className="flex items-center gap-2">
                        <Icon className={cn("h-3.5 w-3.5")} />
                        <span className="font-bold">{ratio.label}</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Apply</span>
                    </div>
                    <p className="text-xs leading-snug">{ratio.description}</p>
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Visual Preview */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold mb-4 uppercase tracking-widest text-muted-foreground">Visual Preview</h3>
        <div className="w-full bg-muted/20 rounded-2xl p-4 sm:p-12 flex items-center justify-center min-h-100 border-2 border-dashed border-muted/50 overflow-hidden">
          <div 
            className="relative bg-background dark:bg-black border-12 border-border  rounded-[2.5rem] shadow-2xl transition-all duration-500 ease-in-out flex flex-col items-center justify-center overflow-hidden"
            style={{ 
              aspectRatio: `${rw}/${rh}`,
              maxWidth: '100%',
              width: '100%'
            }}
          >
            {/* Inner Content Area */}
            <div className="absolute inset-0 bg-primary/5 flex flex-col items-center justify-center p-6 text-center">
               <div className="p-4 rounded-2xl bg-background/80 backdrop-blur-sm border shadow-sm num animate-in zoom-in-95 duration-300">
                  <div className="text-3xl sm:text-5xl font-black text-primary mb-1">{rw}:{rh}</div>
                  <div className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-70">
                    {w} × {h} Pixels
                  </div>
               </div>
               
               {/* Small 'Screen' Details */}
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-foreground rounded-full opacity-20" />
               <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-foreground rounded-full opacity-20" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-muted/30 p-6 rounded-xl border">
        <h3 className="text-sm font-semibold mb-3">How it works</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Aspect ratio is the proportional relationship between its width and its height. It is commonly expressed as two numbers separated by a colon, as in 16:9. For an x:y aspect ratio, the image is x units wide and y units high. This tool allows you to calculate missing dimensions while maintaining a fixed ratio, or vice versa. The visual preview above simulates how the screen would look with your defined proportions.
        </p>
      </div>
    </div>
  );
}
