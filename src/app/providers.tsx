"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/common/theme-provider";

export default function AppProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="redec-theme">
      <TooltipProvider>
          {children}
      </TooltipProvider>
    </ThemeProvider>
  );
}
