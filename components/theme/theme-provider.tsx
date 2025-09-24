"use client";

/**
 * Dynamic Theme Provider
 *
 * Provides centralized theme management with dynamic color switching,
 * smooth transitions, and runtime validation.
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  themeColors,
  generateCSSCustomProperties,
  type ThemeColors,
} from "@/lib/theme";
import { colorAccessibility } from "@/lib/theme/validation";

interface ThemeContextType {
  colors: ThemeColors;
  updateColors: (newColors: Partial<ThemeColors>) => void;
  resetColors: () => void;
  validateAccessibility: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: "light" | "dark";
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "portfolio-theme",
}: ThemeProviderProps) {
  const [colors, setColors] = useState<ThemeColors>(themeColors);
  const [isDark, setIsDark] = useState(defaultTheme === "dark");
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);

    // Load theme from localStorage
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const { theme, colors: storedColors } = JSON.parse(stored);
        setIsDark(theme === "dark");
        if (storedColors) {
          setColors(storedColors);
        }
      } catch (error) {
        console.warn("Failed to parse stored theme:", error);
      }
    }
  }, [storageKey]);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Apply theme class
    root.classList.remove("light", "dark");
    root.classList.add(isDark ? "dark" : "light");

    // Apply custom properties
    const cssVars = generateCSSCustomProperties();
    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Store in localStorage
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        theme: isDark ? "dark" : "light",
        colors,
      })
    );
  }, [isDark, colors, mounted, storageKey]);

  const updateColors = useCallback((newColors: Partial<ThemeColors>) => {
    setColors((prev) => ({
      ...prev,
      ...newColors,
    }));
  }, []);

  const resetColors = useCallback(() => {
    setColors(themeColors);
  }, []);

  const validateAccessibility = useCallback(() => {
    const results = colorAccessibility.validateTheme();
    console.group("🎨 Theme Accessibility Validation");
    results.forEach((result) => {
      const status = result.passes ? "✅" : "❌";
      console.log(
        `${status} ${result.combination}: ${result.ratio}:1 (${result.level})`
      );
    });
    console.groupEnd();

    const passed = results.filter((r) => r.passes).length;
    const total = results.length;

    if (passed === total) {
      console.log("🎉 All color combinations pass accessibility standards!");
    } else {
      console.warn(`⚠️ ${total - passed} color combinations need attention`);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  const value: ThemeContextType = {
    colors,
    updateColors,
    resetColors,
    validateAccessibility,
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/**
 * Hook for accessing theme colors with runtime validation
 */
export function useThemeColor(colorPath: string, fallback = "#000000") {
  const { colors } = useTheme();

  const getColor = useCallback(() => {
    const pathParts = colorPath.split(".");
    let current: any = colors;

    for (const part of pathParts) {
      if (current && typeof current === "object" && part in current) {
        current = current[part];
      } else {
        console.warn(`Color path "${colorPath}" not found, using fallback`);
        return fallback;
      }
    }

    return typeof current === "string" ? current : fallback;
  }, [colors, colorPath, fallback]);

  return getColor();
}

/**
 * Hook for dynamic CSS custom properties
 */
export function useCSSCustomProperty(property: string) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const updateValue = () => {
      const computedValue = getComputedStyle(
        document.documentElement
      ).getPropertyValue(property);
      setValue(computedValue);
    };

    updateValue();

    // Listen for theme changes
    const observer = new MutationObserver(updateValue);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => observer.disconnect();
  }, [property]);

  return value;
}
