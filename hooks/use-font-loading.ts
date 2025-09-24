/**
 * Font Loading Optimization Hook
 *
 * Provides font loading status and optimization utilities
 * for better performance and user experience.
 */

import { useEffect, useState } from "react";

interface FontLoadingState {
  isLoading: boolean;
  isLoaded: boolean;
  hasError: boolean;
  loadedFonts: string[];
}

/**
 * Hook to monitor font loading status
 */
export function useFontLoading(
  fonts: string[] = ["Inter", "Poppins", "JetBrains Mono"]
): FontLoadingState {
  const [state, setState] = useState<FontLoadingState>({
    isLoading: true,
    isLoaded: false,
    hasError: false,
    loadedFonts: [],
  });

  useEffect(() => {
    if (typeof window === "undefined" || !("fonts" in document)) {
      // Fallback for environments without Font Loading API
      setState({
        isLoading: false,
        isLoaded: true,
        hasError: false,
        loadedFonts: fonts,
      });
      return;
    }

    const loadedFonts: string[] = [];
    let hasError = false;

    const checkFont = async (fontFamily: string) => {
      try {
        // Check if font is already loaded
        if (document.fonts.check(`1rem "${fontFamily}"`)) {
          loadedFonts.push(fontFamily);
          return;
        }

        // Load the font
        await document.fonts.load(`1rem "${fontFamily}"`);
        loadedFonts.push(fontFamily);
      } catch (error) {
        console.warn(`Failed to load font: ${fontFamily}`, error);
        hasError = true;
      }
    };

    const loadAllFonts = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));

      await Promise.all(fonts.map(checkFont));

      setState({
        isLoading: false,
        isLoaded: loadedFonts.length > 0,
        hasError,
        loadedFonts,
      });
    };

    loadAllFonts();
  }, [fonts]);

  return state;
}

/**
 * Hook to preload critical fonts
 */
export function usePreloadFonts() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const preloadLinks = [
      // Inter - Primary font (most common weights)
      "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
      // Poppins - Secondary font (most common weights)
      "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2",
    ];

    preloadLinks.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "font";
      link.type = "font/woff2";
      link.crossOrigin = "anonymous";
      link.href = href;
      document.head.appendChild(link);
    });
  }, []);
}

/**
 * Hook to add font-display: swap to existing font faces
 */
export function useFontDisplaySwap() {
  useEffect(() => {
    if (typeof window === "undefined" || !("fonts" in document)) return;

    // Add font-display: swap to improve loading performance
    const style = document.createElement("style");
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
      }
      
      @font-face {
        font-family: 'Poppins';
        font-display: swap;
      }
      
      @font-face {
        font-family: 'JetBrains Mono';
        font-display: swap;
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
}

/**
 * Hook to detect system font preferences
 */
export function useSystemFontPreference() {
  const [prefersSystemFonts, setPrefersSystemFonts] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for reduced data preference (could indicate preference for system fonts)
    const connection = (navigator as any).connection;
    if (connection && connection.saveData) {
      setPrefersSystemFonts(true);
      return;
    }

    // Check for slow connection
    if (
      connection &&
      connection.effectiveType &&
      ["slow-2g", "2g"].includes(connection.effectiveType)
    ) {
      setPrefersSystemFonts(true);
      return;
    }

    // Check localStorage preference
    const stored = localStorage.getItem("prefer-system-fonts");
    if (stored === "true") {
      setPrefersSystemFonts(true);
    }
  }, []);

  const setSystemFontPreference = (prefer: boolean) => {
    setPrefersSystemFonts(prefer);
    localStorage.setItem("prefer-system-fonts", prefer.toString());

    // Apply system fonts immediately
    if (prefer) {
      document.documentElement.style.setProperty(
        "--font-primary",
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      );
      document.documentElement.style.setProperty(
        "--font-secondary",
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      );
    } else {
      document.documentElement.style.removeProperty("--font-primary");
      document.documentElement.style.removeProperty("--font-secondary");
    }
  };

  return {
    prefersSystemFonts,
    setSystemFontPreference,
  };
}

/**
 * Comprehensive font optimization hook
 */
export function useFontOptimization() {
  const fontLoading = useFontLoading();
  const { prefersSystemFonts, setSystemFontPreference } =
    useSystemFontPreference();

  usePreloadFonts();
  useFontDisplaySwap();

  return {
    ...fontLoading,
    prefersSystemFonts,
    setSystemFontPreference,
  };
}
