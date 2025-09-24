/**
 * Animation System Entry Point
 *
 * Centralized exports for all animation utilities, components,
 * and configuration.
 */

// Configuration
export * from "./config";

// Re-export motion components
export { Motion } from "@/components/animations/motion-components";
export { MicroInteractions } from "@/components/animations/micro-interactions";

// Re-export scroll animation hooks
export { ScrollAnimations } from "@/hooks/use-scroll-animations";

// Animation presets for common use cases
export const animationPresets = {
  // Page transitions
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },

  pageExit: {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeIn" },
  },

  // Modal animations
  modalEnter: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: "easeOut" },
  },

  modalExit: {
    initial: { opacity: 1, scale: 1 },
    animate: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.2, ease: "easeIn" },
  },

  // Card hover effects
  cardHover: {
    whileHover: { y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" },
    transition: { duration: 0.3, ease: "easeOut" },
  },

  // Button interactions
  buttonTap: {
    whileTap: { scale: 0.95 },
    transition: { duration: 0.1, ease: "easeOut" },
  },

  // Loading states
  loadingPulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  loadingSpin: {
    animate: { rotate: 360 },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Utility functions
export const animationUtils = {
  /**
   * Create a stagger animation for lists
   */
  createStagger: (itemCount: number, delay: number = 0.1) => ({
    animate: {
      transition: {
        staggerChildren: delay,
        delayChildren: 0.2,
      },
    },
  }),

  /**
   * Create a parallax effect
   */
  createParallax: (speed: number = 0.5) => ({
    y: [0, -100 * speed],
    transition: { ease: "linear" },
  }),

  /**
   * Create a reveal animation
   */
  createReveal: (direction: "up" | "down" | "left" | "right" = "up") => {
    const directions = {
      up: { y: 50 },
      down: { y: -50 },
      left: { x: 50 },
      right: { x: -50 },
    };

    return {
      initial: { opacity: 0, ...directions[direction] },
      animate: { opacity: 1, x: 0, y: 0 },
      transition: { duration: 0.6, ease: "easeOut" },
    };
  },

  /**
   * Create a scale animation
   */
  createScale: (from: number = 0.8, to: number = 1) => ({
    initial: { opacity: 0, scale: from },
    animate: { opacity: 1, scale: to },
    transition: { duration: 0.4, ease: "easeOut" },
  }),

  /**
   * Create a fade animation
   */
  createFade: (duration: number = 0.3) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration, ease: "easeInOut" },
  }),
};

// Performance optimization utilities
export const performanceUtils = {
  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion: () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  },

  /**
   * Get optimized animation config based on user preferences
   */
  getOptimizedConfig: (config: any) => {
    if (performanceUtils.prefersReducedMotion()) {
      return {
        ...config,
        transition: { duration: 0.01 },
        animate: config.initial || {},
      };
    }
    return config;
  },

  /**
   * Create a performance-aware animation
   */
  createPerformantAnimation: (config: any) => {
    return performanceUtils.getOptimizedConfig(config);
  },
};

// Export everything as a single animations object
export const animations = {
  config: require("./config"),
  presets: animationPresets,
  utils: animationUtils,
  performance: performanceUtils,
};
