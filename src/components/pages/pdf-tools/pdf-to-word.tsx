'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Construction, FileType,  ChevronRight } from "lucide-react";

export default function PDFToWord() {
  return (
    <div className="max-w-5xl mr-auto animate-fade-in">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-xl sm:text-3xl font-extrabold font-display flex items-center gap-3">
            PDF to <span className="text-primary">Word</span>
          </h1>
          <p className="text-muted-foreground mt-2">Convert PDF documents into editable Microsoft Word files</p>
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
                <FileType className="h-8 w-8 text-primary opacity-50" />
              </div>
              <h3 className="text-lg font-semibold mb-2">PDF to Word is Coming Soon</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                We're working on a high-fidelity conversion engine to turn your PDFs into editable documents.
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
                The PDF to Word converter will allow you to transform non-editable PDF files into fully customizable Word documents (.docx). This tool is essential for reusing text, updating reports, or editing legacy documents without starting from scratch.
              </p>
              <p>
                We are focusing on preserving the original layout, fonts, and images as accurately as possible. Like all our tools, the conversion will be optimized for speed and privacy, handling your documents with care.
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
                <FeatureItem title="Layout Preservation" description="Keep your document's original formatting intact." />
                <FeatureItem title="Editable Text" description="Convert scanned or static text into modifiable content." />
                <FeatureItem title="Image Extraction" description="High-quality images are carried over to the Word file." />
                <FeatureItem title="Secure Conversion" description="Your documents are processed safely and privately." />
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
            description="Select the PDF document you need to edit." 
          />
          <StepItem 
            step="2" 
            title="Process" 
            description="Our engine analyzes and converts the document structure." 
          />
          <StepItem 
            step="3" 
            title="Download Word" 
            description="Get your new .docx file and start editing immediately." 
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
