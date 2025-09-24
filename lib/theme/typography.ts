/**
 * Advanced Typography System
 *
 * Comprehensive typography configuration with responsive scaling,
 * proper font loading, and accessibility considerations.
 */

// Font Configuration
export const fontConfig = {
  families: {
    primary: {
      name: "Inter",
      fallback: [
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "sans-serif",
      ],
      weights: [300, 400, 500, 600, 700, 800],
      variable: "--font-inter",
    },
    secondary: {
      name: "Poppins",
      fallback: [
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "sans-serif",
      ],
      weights: [300, 400, 500, 600, 700, 800],
      variable: "--font-poppins",
    },
    mono: {
      name: "JetBrains Mono",
      fallback: ["Consolas", "Monaco", "Courier New", "monospace"],
      weights: [300, 400, 500, 600, 700],
      variable: "--font-jetbrains-mono",
    },
  },

  // Google Fonts URL
  googleFontsUrl:
    "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap",
};

// Typography Scale with Responsive Sizing
export const typographyScale = {
  // Display Typography - Hero, Major Headlines
  "display-xl": {
    fontSize: {
      base: "3rem", // 48px mobile
      sm: "3.75rem", // 60px tablet
      lg: "4.5rem", // 72px desktop
    },
    lineHeight: "1",
    letterSpacing: "-0.025em",
    fontWeight: "800",
    fontFamily: "var(--font-poppins)",
  },

  "display-lg": {
    fontSize: {
      base: "2.5rem", // 40px mobile
      sm: "3rem", // 48px tablet
      lg: "3.75rem", // 60px desktop
    },
    lineHeight: "1.1",
    letterSpacing: "-0.025em",
    fontWeight: "700",
    fontFamily: "var(--font-poppins)",
  },

  "display-md": {
    fontSize: {
      base: "2rem", // 32px mobile
      sm: "2.5rem", // 40px tablet
      lg: "3rem", // 48px desktop
    },
    lineHeight: "1.1",
    letterSpacing: "-0.025em",
    fontWeight: "700",
    fontFamily: "var(--font-poppins)",
  },

  // Heading Typography
  "heading-xl": {
    fontSize: {
      base: "1.875rem", // 30px mobile
      sm: "2rem", // 32px tablet
      lg: "2.25rem", // 36px desktop
    },
    lineHeight: "1.2",
    letterSpacing: "-0.025em",
    fontWeight: "700",
    fontFamily: "var(--font-inter)",
  },

  "heading-lg": {
    fontSize: {
      base: "1.5rem", // 24px mobile
      sm: "1.75rem", // 28px tablet
      lg: "1.875rem", // 30px desktop
    },
    lineHeight: "1.3",
    letterSpacing: "-0.025em",
    fontWeight: "600",
    fontFamily: "var(--font-inter)",
  },

  "heading-md": {
    fontSize: {
      base: "1.25rem", // 20px mobile
      sm: "1.375rem", // 22px tablet
      lg: "1.5rem", // 24px desktop
    },
    lineHeight: "1.4",
    letterSpacing: "-0.025em",
    fontWeight: "600",
    fontFamily: "var(--font-inter)",
  },

  "heading-sm": {
    fontSize: {
      base: "1.125rem", // 18px mobile
      sm: "1.1875rem", // 19px tablet
      lg: "1.25rem", // 20px desktop
    },
    lineHeight: "1.5",
    letterSpacing: "-0.025em",
    fontWeight: "600",
    fontFamily: "var(--font-inter)",
  },

  // Body Typography
  "body-xl": {
    fontSize: {
      base: "1rem", // 16px mobile
      sm: "1.0625rem", // 17px tablet
      lg: "1.125rem", // 18px desktop
    },
    lineHeight: "1.6",
    letterSpacing: "0",
    fontWeight: "400",
    fontFamily: "var(--font-inter)",
  },

  "body-lg": {
    fontSize: {
      base: "0.9375rem", // 15px mobile
      sm: "1rem", // 16px tablet
      lg: "1rem", // 16px desktop
    },
    lineHeight: "1.6",
    letterSpacing: "0",
    fontWeight: "400",
    fontFamily: "var(--font-inter)",
  },

  "body-md": {
    fontSize: {
      base: "0.875rem", // 14px mobile
      sm: "0.875rem", // 14px tablet
      lg: "0.875rem", // 14px desktop
    },
    lineHeight: "1.6",
    letterSpacing: "0",
    fontWeight: "400",
    fontFamily: "var(--font-inter)",
  },

  "body-sm": {
    fontSize: {
      base: "0.75rem", // 12px mobile
      sm: "0.75rem", // 12px tablet
      lg: "0.75rem", // 12px desktop
    },
    lineHeight: "1.6",
    letterSpacing: "0",
    fontWeight: "400",
    fontFamily: "var(--font-inter)",
  },

  // Code Typography
  "code-lg": {
    fontSize: {
      base: "0.9375rem", // 15px mobile
      sm: "1rem", // 16px tablet
      lg: "1rem", // 16px desktop
    },
    lineHeight: "1.5",
    letterSpacing: "0",
    fontWeight: "400",
    fontFamily: "var(--font-jetbrains-mono)",
  },

  "code-md": {
    fontSize: {
      base: "0.875rem", // 14px mobile
      sm: "0.875rem", // 14px tablet
      lg: "0.875rem", // 14px desktop
    },
    lineHeight: "1.5",
    letterSpacing: "0",
    fontWeight: "400",
    fontFamily: "var(--font-jetbrains-mono)",
  },

  "code-sm": {
    fontSize: {
      base: "0.75rem", // 12px mobile
      sm: "0.75rem", // 12px tablet
      lg: "0.75rem", // 12px desktop
    },
    lineHeight: "1.5",
    letterSpacing: "0",
    fontWeight: "400",
    fontFamily: "var(--font-jetbrains-mono)",
  },
};

// Font Weight Scale
export const fontWeights = {
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
};

// Line Height Scale
export const lineHeights = {
  none: "1",
  tight: "1.1",
  snug: "1.2",
  normal: "1.4",
  relaxed: "1.6",
  loose: "1.8",
};

// Letter Spacing Scale
export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
};

// Generate CSS Custom Properties for Typography
export function generateTypographyCSS(): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // Font families
  Object.entries(fontConfig.families).forEach(([key, config]) => {
    cssVars[`--font-${key}`] = `"${config.name}", ${config.fallback.join(
      ", "
    )}`;
  });

  // Typography scale
  Object.entries(typographyScale).forEach(([key, config]) => {
    const prefix = `--typography-${key}`;

    // Base font size (mobile)
    cssVars[`${prefix}-size`] =
      typeof config.fontSize === "string"
        ? config.fontSize
        : config.fontSize.base;

    // Responsive font sizes
    if (typeof config.fontSize === "object") {
      Object.entries(config.fontSize).forEach(([breakpoint, size]) => {
        if (breakpoint !== "base") {
          cssVars[`${prefix}-size-${breakpoint}`] = size;
        }
      });
    }

    cssVars[`${prefix}-line-height`] = config.lineHeight;
    cssVars[`${prefix}-letter-spacing`] = config.letterSpacing;
    cssVars[`${prefix}-font-weight`] = config.fontWeight;
    cssVars[`${prefix}-font-family`] = config.fontFamily;
  });

  // Font weights
  Object.entries(fontWeights).forEach(([key, weight]) => {
    cssVars[`--font-weight-${key}`] = weight;
  });

  // Line heights
  Object.entries(lineHeights).forEach(([key, height]) => {
    cssVars[`--line-height-${key}`] = height;
  });

  // Letter spacing
  Object.entries(letterSpacing).forEach(([key, spacing]) => {
    cssVars[`--letter-spacing-${key}`] = spacing;
  });

  return cssVars;
}

// Typography Utility Functions
export const typographyUtils = {
  /**
   * Get responsive font size CSS
   */
  getResponsiveFontSize: (scale: keyof typeof typographyScale): string => {
    const config = typographyScale[scale];
    if (typeof config.fontSize === "string") {
      return config.fontSize;
    }

    let css = `font-size: ${config.fontSize.base};`;

    if (config.fontSize.sm) {
      css += `
        @media (min-width: 640px) {
          font-size: ${config.fontSize.sm};
        }`;
    }

    if (config.fontSize.lg) {
      css += `
        @media (min-width: 1024px) {
          font-size: ${config.fontSize.lg};
        }`;
    }

    return css;
  },

  /**
   * Get complete typography styles for a scale
   */
  getTypographyStyles: (
    scale: keyof typeof typographyScale
  ): Record<string, string> => {
    const config = typographyScale[scale];

    return {
      fontSize:
        typeof config.fontSize === "string"
          ? config.fontSize
          : config.fontSize.base,
      lineHeight: config.lineHeight,
      letterSpacing: config.letterSpacing,
      fontWeight: config.fontWeight,
      fontFamily: config.fontFamily,
    };
  },

  /**
   * Generate Tailwind CSS classes for typography
   */
  generateTailwindClasses: (): Record<string, Record<string, string>> => {
    const classes: Record<string, Record<string, string>> = {};

    Object.entries(typographyScale).forEach(([key, config]) => {
      classes[`.text-${key}`] = {
        fontSize:
          typeof config.fontSize === "string"
            ? config.fontSize
            : config.fontSize.base,
        lineHeight: config.lineHeight,
        letterSpacing: config.letterSpacing,
        fontWeight: config.fontWeight,
        fontFamily: config.fontFamily,
      };
    });

    return classes;
  },
};

// Font Loading Strategy
export const fontLoadingStrategy = {
  /**
   * Preload critical fonts
   */
  preloadFonts: (): string[] => {
    return [
      // Inter - Primary font
      "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
      // Poppins - Secondary font
      "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2",
    ];
  },

  /**
   * Generate font-display CSS
   */
  getFontDisplayCSS: (): string => {
    return `
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
  },
};

// Export complete typography system
export const typography = {
  config: fontConfig,
  scale: typographyScale,
  weights: fontWeights,
  lineHeights,
  letterSpacing,
  utils: typographyUtils,
  loading: fontLoadingStrategy,
  generateCSS: generateTypographyCSS,
};
