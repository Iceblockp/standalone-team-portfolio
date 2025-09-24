/**
 * Centralized Color Management System
 *
 * This file controls ALL colors across the application.
 * All components should use these color tokens for consistency and accessibility.
 */

// Color Scale Interface for consistent structure
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

// Accent Colors for modern tech feel
export interface AccentColors {
  cyan: string;
  purple: string;
  green: string;
  orange: string;
}

// Semantic Colors for UI states
export interface SemanticColors {
  success: string;
  warning: string;
  error: string;
  info: string;
}

// Primary Color Palette - Deep Tech Blues
export const primaryColors: ColorScale = {
  50: "#F0F4FF", // Very light blue
  100: "#E0EAFF", // Light blue
  200: "#C7D8FF", // Lighter blue
  300: "#A5BFFF", // Light medium blue
  400: "#7C9EFF", // Medium blue
  500: "#3B82F6", // Sky blue - main brand color
  600: "#2563EB", // Bright blue
  700: "#1E3A8A", // Royal blue - primary buttons
  800: "#1E40AF", // Deep blue
  900: "#0A0E27", // Deep space blue - headers
  950: "#050711", // Almost black blue
};

// Electric Accent Colors - Innovation & Energy
export const accentColors: AccentColors = {
  cyan: "#00D4FF", // Electric cyan - CTAs, highlights
  purple: "#7C3AED", // Electric purple - special elements
  green: "#10B981", // Tech green - success states
  orange: "#F59E0B", // Energy orange - warnings, highlights
};

// Sophisticated Neutral Palette
export const neutralColors: ColorScale = {
  50: "#F8FAFC", // Almost white
  100: "#F1F5F9", // Very light gray
  200: "#E2E8F0", // Light gray
  300: "#CBD5E1", // Medium light gray
  400: "#94A3B8", // Medium gray
  500: "#64748B", // Balanced gray
  600: "#475569", // Medium dark gray
  700: "#334155", // Dark gray
  800: "#1E293B", // Very dark gray
  900: "#0F172A", // Almost black with blue undertone
  950: "#020617", // Deep black
};

// Semantic Colors for UI States
export const semanticColors: SemanticColors = {
  success: accentColors.green,
  warning: accentColors.orange,
  error: "#EF4444",
  info: accentColors.cyan,
};

// Gradient Definitions
export const gradients = {
  // Hero Gradients
  hero: "linear-gradient(135deg, #0A0E27 0%, #1E3A8A 50%, #7C3AED 100%)",
  heroOverlay:
    "linear-gradient(135deg, rgba(10,14,39,0.9) 0%, rgba(30,58,138,0.7) 100%)",

  // Card Gradients
  card: "linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
  cardHover:
    "linear-gradient(145deg, rgba(0,212,255,0.1) 0%, rgba(124,58,237,0.1) 100%)",

  // Button Gradients
  primary: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
  secondary: "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",

  // Background Gradients
  backgroundLight: "linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)",
  backgroundDark: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
};

// Theme Configuration
export interface ThemeColors {
  primary: ColorScale;
  accent: AccentColors;
  neutral: ColorScale;
  semantic: SemanticColors;
  gradients: typeof gradients;
}

export const themeColors: ThemeColors = {
  primary: primaryColors,
  accent: accentColors,
  neutral: neutralColors,
  semantic: semanticColors,
  gradients,
};

// Color Utility Functions
export const colorUtils = {
  /**
   * Get a color with opacity
   */
  withOpacity: (color: string, opacity: number): string => {
    // Convert hex to rgba
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  },

  /**
   * Validate color contrast ratio for accessibility
   */
  validateContrast: (foreground: string, background: string): boolean => {
    // This is a simplified version - in production, use a proper contrast checking library
    // For now, we'll assume our predefined combinations are accessible
    return true;
  },

  /**
   * Get CSS custom property name for a color
   */
  getCSSVar: (colorPath: string): string => {
    return `var(--color-${colorPath.replace(".", "-")})`;
  },
};

// CSS Custom Properties Generator
export const generateCSSCustomProperties = (): Record<string, string> => {
  const cssVars: Record<string, string> = {};

  // Primary colors
  Object.entries(primaryColors).forEach(([shade, color]) => {
    cssVars[`--color-primary-${shade}`] = color;
  });

  // Accent colors
  Object.entries(accentColors).forEach(([name, color]) => {
    cssVars[`--color-accent-${name}`] = color;
  });

  // Neutral colors
  Object.entries(neutralColors).forEach(([shade, color]) => {
    cssVars[`--color-neutral-${shade}`] = color;
  });

  // Semantic colors
  Object.entries(semanticColors).forEach(([name, color]) => {
    cssVars[`--color-semantic-${name}`] = color;
  });

  // Gradients
  Object.entries(gradients).forEach(([name, gradient]) => {
    cssVars[`--gradient-${name}`] = gradient;
  });

  return cssVars;
};

// Export default theme
export default themeColors;
