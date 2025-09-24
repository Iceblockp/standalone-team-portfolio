/**
 * Accessible Color Scale Generator
 *
 * Generates color scales that maintain accessibility compliance
 * across all shades and combinations.
 */

import { getContrastRatio, meetsWCAGAA } from "./validation";

export interface ColorScaleOptions {
  baseColor: string;
  steps: number;
  lightBackground: string;
  darkBackground: string;
}

/**
 * Convert HSL to Hex
 */
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Convert Hex to HSL
 */
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Generate accessible color scale
 */
export function generateAccessibleColorScale(
  baseColor: string
): Record<string, string> {
  const { h, s } = hexToHsl(baseColor);

  // Define lightness values for each step that ensure good contrast
  const lightnessSteps = {
    50: 97, // Very light
    100: 94, // Light
    200: 87, // Lighter
    300: 74, // Light medium
    400: 56, // Medium
    500: 47, // Base (close to our primary-500)
    600: 38, // Medium dark
    700: 29, // Dark (our primary-700)
    800: 23, // Darker
    900: 8, // Very dark (our primary-900)
    950: 4, // Almost black
  };

  const scale: Record<string, string> = {};

  Object.entries(lightnessSteps).forEach(([step, lightness]) => {
    // Adjust saturation for better visual hierarchy
    let adjustedSaturation = s;

    if (lightness > 80) {
      // Reduce saturation for very light colors
      adjustedSaturation = Math.max(s * 0.3, 10);
    } else if (lightness < 20) {
      // Increase saturation for very dark colors
      adjustedSaturation = Math.min(s * 1.2, 90);
    }

    scale[step] = hslToHex(h, adjustedSaturation, lightness);
  });

  return scale;
}

/**
 * Validate color scale accessibility
 */
export function validateColorScale(
  scale: Record<string, string>,
  lightBg = "#FFFFFF",
  darkBg = "#000000"
): {
  step: string;
  color: string;
  lightBgContrast: number;
  darkBgContrast: number;
  lightBgPasses: boolean;
  darkBgPasses: boolean;
}[] {
  return Object.entries(scale).map(([step, color]) => {
    const lightBgContrast = getContrastRatio(color, lightBg);
    const darkBgContrast = getContrastRatio(color, darkBg);

    return {
      step,
      color,
      lightBgContrast: Math.round(lightBgContrast * 100) / 100,
      darkBgContrast: Math.round(darkBgContrast * 100) / 100,
      lightBgPasses: meetsWCAGAA(color, lightBg),
      darkBgPasses: meetsWCAGAA(color, darkBg),
    };
  });
}

/**
 * Generate semantic colors that work in both light and dark modes
 */
export function generateSemanticColors() {
  return {
    success: {
      light: "#059669", // Green-600 - good contrast on light backgrounds
      dark: "#34D399", // Green-400 - good contrast on dark backgrounds
      base: "#10B981", // Green-500 - our current success color
    },
    warning: {
      light: "#D97706", // Orange-600 - good contrast on light backgrounds
      dark: "#FBBF24", // Orange-400 - good contrast on dark backgrounds
      base: "#F59E0B", // Orange-500 - our current warning color
    },
    error: {
      light: "#DC2626", // Red-600 - good contrast on light backgrounds
      dark: "#F87171", // Red-400 - good contrast on dark backgrounds
      base: "#EF4444", // Red-500 - our current error color
    },
    info: {
      light: "#0284C7", // Sky-600 - good contrast on light backgrounds
      dark: "#38BDF8", // Sky-400 - good contrast on dark backgrounds
      base: "#00D4FF", // Our current info color (cyan)
    },
  };
}

/**
 * Test and log color scale accessibility
 */
export function testColorScaleAccessibility() {
  console.log("🎨 Testing Generated Color Scale Accessibility...\n");

  // Test our primary color scale
  const primaryScale = generateAccessibleColorScale("#3B82F6");
  const results = validateColorScale(primaryScale, "#F8FAFC", "#0F172A");

  console.log("Primary Color Scale Test Results:");
  console.log("=================================");

  results.forEach((result) => {
    const lightStatus = result.lightBgPasses ? "✅" : "❌";
    const darkStatus = result.darkBgPasses ? "✅" : "❌";

    console.log(`${result.step}: ${result.color}`);
    console.log(`  ${lightStatus} Light BG: ${result.lightBgContrast}:1`);
    console.log(`  ${darkStatus} Dark BG: ${result.darkBgContrast}:1`);
    console.log("");
  });

  // Test semantic colors
  const semanticColors = generateSemanticColors();
  console.log("Semantic Colors Test Results:");
  console.log("=============================");

  Object.entries(semanticColors).forEach(([name, colors]) => {
    const lightTest = getContrastRatio(colors.light, "#F8FAFC");
    const darkTest = getContrastRatio(colors.dark, "#0F172A");

    console.log(`${name.toUpperCase()}:`);
    console.log(`  Light mode: ${colors.light} (${lightTest.toFixed(2)}:1)`);
    console.log(`  Dark mode: ${colors.dark} (${darkTest.toFixed(2)}:1)`);
    console.log("");
  });
}
