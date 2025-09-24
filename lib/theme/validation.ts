/**
 * Color Validation Utilities
 *
 * Provides accessibility validation and color contrast checking
 * to ensure WCAG AA compliance across the application.
 */

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 guidelines
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) {
    console.warn("Invalid color format provided to getContrastRatio");
    return 0;
  }

  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Check if color combination meets WCAG AA standards
 */
export function meetsWCAGAA(
  foreground: string,
  background: string,
  isLargeText = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  const requiredRatio = isLargeText ? 3 : 4.5;
  return ratio >= requiredRatio;
}

/**
 * Check if color combination meets WCAG AAA standards
 */
export function meetsWCAGAAA(
  foreground: string,
  background: string,
  isLargeText = false
): boolean {
  const ratio = getContrastRatio(foreground, background);
  const requiredRatio = isLargeText ? 4.5 : 7;
  return ratio >= requiredRatio;
}

/**
 * Get accessibility level for color combination
 */
export function getAccessibilityLevel(
  foreground: string,
  background: string,
  isLargeText = false
): "AAA" | "AA" | "FAIL" {
  if (meetsWCAGAAA(foreground, background, isLargeText)) {
    return "AAA";
  } else if (meetsWCAGAA(foreground, background, isLargeText)) {
    return "AA";
  } else {
    return "FAIL";
  }
}

/**
 * Validate all color combinations in our theme
 */
export function validateThemeAccessibility() {
  const results: Array<{
    combination: string;
    ratio: number;
    level: string;
    passes: boolean;
  }> = [];

  // Common color combinations to test
  const combinations = [
    { name: "Primary 900 on Neutral 50", fg: "#0A0E27", bg: "#F8FAFC" },
    { name: "Primary 700 on Neutral 50", fg: "#1E3A8A", bg: "#F8FAFC" },
    { name: "Neutral 50 on Primary 900", fg: "#F8FAFC", bg: "#0A0E27" },
    { name: "Neutral 50 on Primary 700", fg: "#F8FAFC", bg: "#1E3A8A" },
    { name: "Accent Cyan on Primary 900", fg: "#00D4FF", bg: "#0A0E27" },
    { name: "Accent Purple on Neutral 50", fg: "#7C3AED", bg: "#F8FAFC" },
    { name: "Success on Neutral 50", fg: "#10B981", bg: "#F8FAFC" },
    { name: "Error on Neutral 50", fg: "#EF4444", bg: "#F8FAFC" },
    { name: "Warning on Neutral 50", fg: "#F59E0B", bg: "#F8FAFC" },
  ];

  combinations.forEach(({ name, fg, bg }) => {
    const ratio = getContrastRatio(fg, bg);
    const level = getAccessibilityLevel(fg, bg);
    const passes = level !== "FAIL";

    results.push({
      combination: name,
      ratio: Math.round(ratio * 100) / 100,
      level,
      passes,
    });
  });

  return results;
}

/**
 * Generate accessible color suggestions
 */
export function suggestAccessibleColor(
  baseColor: string,
  backgroundColor: string,
  targetLevel: "AA" | "AAA" = "AA"
): string {
  // This is a simplified implementation
  // In a production app, you might want to use a more sophisticated algorithm
  const ratio = getContrastRatio(baseColor, backgroundColor);
  const targetRatio = targetLevel === "AAA" ? 7 : 4.5;

  if (ratio >= targetRatio) {
    return baseColor; // Already meets requirements
  }

  // For now, return the base color with a warning
  console.warn(
    `Color ${baseColor} does not meet ${targetLevel} standards against ${backgroundColor}`
  );
  return baseColor;
}

/**
 * Color accessibility checker for development
 */
export const colorAccessibility = {
  check: (foreground: string, background: string, isLargeText = false) => {
    const ratio = getContrastRatio(foreground, background);
    const level = getAccessibilityLevel(foreground, background, isLargeText);

    return {
      ratio: Math.round(ratio * 100) / 100,
      level,
      passes: level !== "FAIL",
      meetsAA: meetsWCAGAA(foreground, background, isLargeText),
      meetsAAA: meetsWCAGAAA(foreground, background, isLargeText),
    };
  },

  validateTheme: validateThemeAccessibility,
  suggest: suggestAccessibleColor,
};
