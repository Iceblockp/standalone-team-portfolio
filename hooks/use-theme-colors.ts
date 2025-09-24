/**
 * React Hook for Theme Colors
 *
 * Provides easy access to theme colors in React components
 * with TypeScript support and runtime validation.
 */

import { useCallback, useMemo } from "react";
import { themeColors, colorUtils, type ThemeColors } from "@/lib/theme";

export interface UseThemeColorsReturn {
  colors: ThemeColors;
  getColor: (path: string) => string;
  withOpacity: (color: string, opacity: number) => string;
  validateContrast: (foreground: string, background: string) => boolean;
  getCSSVar: (colorPath: string) => string;
}

/**
 * Hook to access theme colors and utilities
 */
export function useThemeColors(): UseThemeColorsReturn {
  const colors = useMemo(() => themeColors, []);

  const getColor = useCallback(
    (path: string): string => {
      const pathParts = path.split(".");
      let current: any = colors;

      for (const part of pathParts) {
        if (current && typeof current === "object" && part in current) {
          current = current[part];
        } else {
          console.warn(`Color path "${path}" not found in theme`);
          return "#000000"; // Fallback color
        }
      }

      return typeof current === "string" ? current : "#000000";
    },
    [colors]
  );

  const withOpacity = useCallback((color: string, opacity: number): string => {
    return colorUtils.withOpacity(color, opacity);
  }, []);

  const validateContrast = useCallback(
    (foreground: string, background: string): boolean => {
      return colorUtils.validateContrast(foreground, background);
    },
    []
  );

  const getCSSVar = useCallback((colorPath: string): string => {
    return colorUtils.getCSSVar(colorPath);
  }, []);

  return {
    colors,
    getColor,
    withOpacity,
    validateContrast,
    getCSSVar,
  };
}

/**
 * Hook to get specific color scales
 */
export function usePrimaryColors() {
  const { colors } = useThemeColors();
  return colors.primary;
}

export function useAccentColors() {
  const { colors } = useThemeColors();
  return colors.accent;
}

export function useNeutralColors() {
  const { colors } = useThemeColors();
  return colors.neutral;
}

export function useSemanticColors() {
  const { colors } = useThemeColors();
  return colors.semantic;
}

export function useGradients() {
  const { colors } = useThemeColors();
  return colors.gradients;
}
