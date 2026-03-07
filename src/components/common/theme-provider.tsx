"use client";

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { useEffect } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeColorManager />
      {children}
    </NextThemesProvider>
  );
}

// Component to handle the theme-color meta tag sync
function ThemeColorManager() {
  const { resolvedTheme } = useNextTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    // Remove any existing theme-color meta tags
    document.querySelectorAll('meta[name="theme-color"]').forEach(el => el.remove());
    
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    meta.setAttribute('content', resolvedTheme === 'dark' ? '#0c0b14' : '#fdfaf6');
    document.head.appendChild(meta);
  }, [resolvedTheme]);

  return null;
}

export const useTheme = () => {
  const context = useNextTheme();
  return context;
};
