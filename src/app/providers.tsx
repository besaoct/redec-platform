"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/common/theme-provider";
// import { useEffect } from "react";

export default function AppProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useEffect(() => {
  //   let scrollTimer: NodeJS.Timeout;
  //   const handleScroll = (e: Event) => {
  //     const target = e.target as HTMLElement;
  //     // Add data-scrolling to the scrolled element or body
  //     const element = target === document ? document.body : target;
      
  //     element.setAttribute("data-scrolling", "true");
      
  //     clearTimeout(scrollTimer);
  //     scrollTimer = setTimeout(() => {
  //       element.removeAttribute("data-scrolling");
  //     }, 1000);
  //   };

  //   window.addEventListener("scroll", handleScroll, true);
  //   return () => window.removeEventListener("scroll", handleScroll, true);
  // }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="redec-theme">
      <TooltipProvider>
          {children}
      </TooltipProvider>
    </ThemeProvider>
  );
}
