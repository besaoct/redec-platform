'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Construction, Scissors, ChevronRight } from "lucide-react";

export default function SplitPDF() {
  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-xl sm:text-3xl font-extrabold font-display flex items-center gap-3">
            Split <span className="text-primary">PDF</span>
          </h1>
          <p className="text-muted-foreground mt-2">Extract pages or split one PDF into multiple files</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider animate-pulse">
          <Construction className="h-3.5 w-3.5" />
          Development in Progress
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-dashed border-2 bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Scissors className="h-8 w-8 text-primary opacity-50" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Split PDF is Coming Soon</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                We're developing a seamless way to extract specific pages or ranges from your PDF documents safely.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                About this Tool
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Our Split PDF tool will give you the flexibility to take a large document and break it down into smaller, more manageable parts. Whether you need to extract a single page or split a document by ranges, we've got you covered.
              </p>
              <p>
                Security is our priority—all splitting operations will take place within your browser. Your files are never uploaded to any server, keeping your data completely private and under your control.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="h-full border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-lg">Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <FeatureItem title="Page Extraction" description="Pick specific pages to save as a new PDF." />
                <FeatureItem title="Range Splitting" description="Split documents into multiple files by custom ranges." />
                <FeatureItem title="Instant Preview" description="See thumbnails of pages before you split them." />
                <FeatureItem title="Privacy First" description="Local processing means your files stay on your device." />
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 bg-muted/30 p-6 rounded border">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <ChevronRight className="h-4 w-4 text-primary" />
          How it will work
        </h3>
        <div className="grid sm:grid-cols-3 gap-6 mt-4">
          <StepItem 
            step="1" 
            title="Upload PDF" 
            description="Drop your PDF file into the upload area to get started." 
          />
          <StepItem 
            step="2" 
            title="Select Method" 
            description="Choose to extract individual pages or split by ranges." 
          />
          <StepItem 
            step="3" 
            title="Split & Save" 
            description="Process your document and download the new files immediately." 
          />
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ title, description }: { title: string, description: string }) {
  return (
    <li className="flex gap-3">
      <div className="mt-1">
        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
      </div>
      <div>
        <p className="text-xs font-bold text-foreground uppercase tracking-tight mb-0.5">{title}</p>
        <p className="text-[11px] leading-relaxed">{description}</p>
      </div>
    </li>
  );
}

function StepItem({ step, title, description }: { step: string, title: string, description: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-[10px] font-black">{step}</span>
        <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">{title}</h4>
      </div>
      <p className="text-[11px] leading-relaxed text-muted-foreground pl-9">{description}</p>
    </div>
  );
}
