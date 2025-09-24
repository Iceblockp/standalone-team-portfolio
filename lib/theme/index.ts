/**
 * Theme System Entry Point
 *
 * Centralized theme configuration that controls all design tokens
 * across the application including colors, typography, spacing, and animations.
 */

export * from "./colors";

// Animation Configuration
export const animations = {
  durations: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
    slower: "750ms",
  },
  easings: {
    easeOut: "cubic-bezier(0.16, 1, 0.3, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
};

// Typography Scale
export const typography = {
  fontFamilies: {
    primary: ["Inter", "system-ui", "sans-serif"],
    secondary: ["Poppins", "system-ui", "sans-serif"],
    mono: ["JetBrains Mono", "Consolas", "Monaco", "monospace"],
  },
  sizes: {
    // Display Typography - Hero, Major Headlines
    "display-xl": "4.5rem", // 72px
    "display-lg": "3.75rem", // 60px
    "display-md": "3rem", // 48px

    // Heading Typography
    "heading-xl": "2.25rem", // 36px
    "heading-lg": "1.875rem", // 30px
    "heading-md": "1.5rem", // 24px
    "heading-sm": "1.25rem", // 20px

    // Body Typography
    "body-xl": "1.125rem", // 18px
    "body-lg": "1rem", // 16px
    "body-md": "0.875rem", // 14px
    "body-sm": "0.75rem", // 12px
  },
  weights: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
};

// Spacing Scale (4px base unit)
export const spacing = {
  0: "0",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
  32: "8rem", // 128px
  40: "10rem", // 160px
  48: "12rem", // 192px
  56: "14rem", // 224px
  64: "16rem", // 256px
};

// Breakpoints
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// Border Radius Scale
export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
};

// Shadow Scale
export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "0 0 #0000",
};

// Complete Theme Configuration
export const theme = {
  colors: {
    primary: {
      50: "#F0F4FF",
      100: "#E0EAFF",
      200: "#C7D8FF",
      300: "#A5BFFF",
      400: "#7C9EFF",
      500: "#3B82F6",
      600: "#2563EB",
      700: "#1E3A8A",
      800: "#1E40AF",
      900: "#0A0E27",
      950: "#050711",
    },
    accent: {
      cyan: "#00D4FF",
      purple: "#7C3AED",
      green: "#10B981",
      orange: "#F59E0B",
    },
    neutral: {
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B",
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F172A",
      950: "#020617",
    },
    semantic: {
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#00D4FF",
    },
  },
  typography,
  spacing,
  animations,
  breakpoints,
  borderRadius,
  shadows,
};

export type Theme = typeof theme;
export default theme;
