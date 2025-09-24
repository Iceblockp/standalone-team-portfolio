/**
 * Gradient and Visual Effects System
 *
 * Centralized gradient definitions and visual effects that work
 * with the color management system for consistent theming.
 */

import { themeColors } from "./colors";

// Gradient Types
export type GradientDirection =
  | "to-r"
  | "to-l"
  | "to-t"
  | "to-b"
  | "to-tr"
  | "to-tl"
  | "to-br"
  | "to-bl"
  | number; // Custom angle in degrees

export interface GradientStop {
  color: string;
  position?: number; // 0-100
}

export interface GradientConfig {
  direction: GradientDirection;
  stops: readonly GradientStop[];
}

/**
 * Convert gradient direction to CSS
 */
function getGradientDirection(direction: GradientDirection): string {
  if (typeof direction === "number") {
    return `${direction}deg`;
  }

  const directionMap: Record<string, string> = {
    "to-r": "to right",
    "to-l": "to left",
    "to-t": "to top",
    "to-b": "to bottom",
    "to-tr": "to top right",
    "to-tl": "to top left",
    "to-br": "to bottom right",
    "to-bl": "to bottom left",
  };

  return directionMap[direction] || "to right";
}

/**
 * Generate CSS gradient string
 */
export function createGradient(config: GradientConfig): string {
  const direction = getGradientDirection(config.direction);
  const stops = config.stops
    .map((stop) => `${stop.color}${stop.position ? ` ${stop.position}%` : ""}`)
    .join(", ");

  return `linear-gradient(${direction}, ${stops})`;
}

/**
 * Predefined gradient configurations using theme colors
 */
export const gradientConfigs = {
  // Hero Gradients
  hero: {
    direction: 135 as const,
    stops: [
      { color: "var(--color-primary-900)", position: 0 },
      { color: "var(--color-primary-700)", position: 50 },
      { color: "var(--color-accent-purple)", position: 100 },
    ],
  },

  heroOverlay: {
    direction: 135 as const,
    stops: [
      { color: "rgba(10, 14, 39, 0.9)", position: 0 },
      { color: "rgba(30, 58, 138, 0.7)", position: 100 },
    ],
  },

  // Card Gradients
  card: {
    direction: 145 as const,
    stops: [
      { color: "rgba(255, 255, 255, 0.1)", position: 0 },
      { color: "rgba(255, 255, 255, 0.05)", position: 100 },
    ],
  },

  cardHover: {
    direction: 145 as const,
    stops: [
      { color: "rgba(0, 212, 255, 0.1)", position: 0 },
      { color: "rgba(124, 58, 237, 0.1)", position: 100 },
    ],
  },

  cardDark: {
    direction: 145 as const,
    stops: [
      { color: "rgba(0, 0, 0, 0.2)", position: 0 },
      { color: "rgba(0, 0, 0, 0.1)", position: 100 },
    ],
  },

  // Button Gradients
  primary: {
    direction: 135 as const,
    stops: [
      { color: "var(--color-accent-cyan)", position: 0 },
      { color: "var(--color-accent-purple)", position: 100 },
    ],
  },

  secondary: {
    direction: 135 as const,
    stops: [
      { color: "var(--color-primary-700)", position: 0 },
      { color: "var(--color-primary-500)", position: 100 },
    ],
  },

  success: {
    direction: 135 as const,
    stops: [
      { color: "var(--color-semantic-success)", position: 0 },
      { color: "var(--color-accent-green)", position: 100 },
    ],
  },

  // Background Gradients
  backgroundLight: {
    direction: 135 as const,
    stops: [
      { color: "var(--color-neutral-50)", position: 0 },
      { color: "var(--color-neutral-100)", position: 100 },
    ],
  },

  backgroundDark: {
    direction: 135 as const,
    stops: [
      { color: "var(--color-neutral-900)", position: 0 },
      { color: "var(--color-neutral-800)", position: 100 },
    ],
  },

  // Accent Gradients
  cyan: {
    direction: 135 as const,
    stops: [
      { color: "var(--color-accent-cyan)", position: 0 },
      { color: "rgba(0, 212, 255, 0.7)", position: 100 },
    ],
  },

  purple: {
    direction: 135 as const,
    stops: [
      { color: "var(--color-accent-purple)", position: 0 },
      { color: "rgba(124, 58, 237, 0.7)", position: 100 },
    ],
  },

  // Mesh Gradients (Complex multi-stop)
  mesh1: {
    direction: 135 as const,
    stops: [
      { color: "var(--color-primary-900)", position: 0 },
      { color: "var(--color-accent-purple)", position: 25 },
      { color: "var(--color-accent-cyan)", position: 50 },
      { color: "var(--color-primary-700)", position: 75 },
      { color: "var(--color-primary-900)", position: 100 },
    ],
  },

  mesh2: {
    direction: 45 as const,
    stops: [
      { color: "var(--color-accent-cyan)", position: 0 },
      { color: "var(--color-primary-500)", position: 30 },
      { color: "var(--color-accent-purple)", position: 60 },
      { color: "var(--color-primary-900)", position: 100 },
    ],
  },
} as const;

/**
 * Generate all gradient CSS custom properties
 */
export function generateGradientCSS(): Record<string, string> {
  const cssVars: Record<string, string> = {};

  Object.entries(gradientConfigs).forEach(([name, config]) => {
    cssVars[`--gradient-${name}`] = createGradient(config);
  });

  return cssVars;
}

/**
 * Glassmorphism effect utilities
 */
export const glassmorphism = {
  light: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  },

  dark: {
    background: "rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  },

  card: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 16px 0 rgba(0, 0, 0, 0.1)",
  },

  header: {
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 2px 16px 0 rgba(0, 0, 0, 0.1)",
  },
};

/**
 * Shadow system with depth levels
 */
export const shadows = {
  // Elevation shadows
  xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",

  // Colored shadows
  glow: "0 0 20px rgba(0, 212, 255, 0.3)",
  glowPurple: "0 0 20px rgba(124, 58, 237, 0.3)",
  glowGreen: "0 0 20px rgba(16, 185, 129, 0.3)",

  // Interactive shadows
  cardHover:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  buttonHover: "0 8px 16px -4px rgba(0, 212, 255, 0.3)",

  // Inner shadows
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
  innerLg: "inset 0 4px 8px 0 rgba(0, 0, 0, 0.1)",
};

/**
 * Generate shadow CSS custom properties
 */
export function generateShadowCSS(): Record<string, string> {
  const cssVars: Record<string, string> = {};

  Object.entries(shadows).forEach(([name, shadow]) => {
    cssVars[`--shadow-${name}`] = shadow;
  });

  return cssVars;
}

/**
 * Utility functions for dynamic gradient creation
 */
export const gradientUtils = {
  /**
   * Create a gradient from theme colors
   */
  fromThemeColors: (
    colorPaths: string[],
    direction: GradientDirection = 135
  ): string => {
    const stops: GradientStop[] = colorPaths.map((path, index) => ({
      color: `var(--color-${path.replace(".", "-")})`,
      position: (index / (colorPaths.length - 1)) * 100,
    }));

    return createGradient({ direction, stops });
  },

  /**
   * Create a gradient with opacity
   */
  withOpacity: (
    baseColor: string,
    startOpacity: number,
    endOpacity: number
  ): string => {
    return createGradient({
      direction: 135,
      stops: [
        {
          color: `${baseColor}${Math.round(startOpacity * 255)
            .toString(16)
            .padStart(2, "0")}`,
          position: 0,
        },
        {
          color: `${baseColor}${Math.round(endOpacity * 255)
            .toString(16)
            .padStart(2, "0")}`,
          position: 100,
        },
      ],
    });
  },

  /**
   * Create a radial gradient
   */
  radial: (centerColor: string, edgeColor: string): string => {
    return `radial-gradient(circle, ${centerColor} 0%, ${edgeColor} 100%)`;
  },

  /**
   * Create a conic gradient
   */
  conic: (colors: string[]): string => {
    const stops = colors
      .map((color, index) => `${color} ${(index / colors.length) * 360}deg`)
      .join(", ");

    return `conic-gradient(from 0deg, ${stops})`;
  },
};

/**
 * Export all visual effects
 */
export const visualEffects = {
  gradients: gradientConfigs,
  glassmorphism,
  shadows,
  utils: gradientUtils,
  createGradient,
  generateGradientCSS,
  generateShadowCSS,
};
