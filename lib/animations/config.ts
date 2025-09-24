/**
 * Animation Configuration System
 *
 * Centralized animation configuration with consistent timing,
 * easing curves, and motion design principles.
 */

// Animation Durations
export const durations = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 750,
  slowest: 1000,
} as const;

// Easing Curves - Using Framer Motion compatible format
export const easings = {
  // Standard easings
  linear: "linear",
  easeIn: "easeIn",
  easeOut: "easeOut",
  easeInOut: "easeInOut",

  // Custom easings using arrays [x1, y1, x2, y2]
  smooth: [0.16, 1, 0.3, 1], // Smooth out
  bounce: [0.68, -0.55, 0.265, 1.55], // Bounce
  elastic: [0.175, 0.885, 0.32, 1.275], // Elastic

  // Entrance animations
  slideIn: [0.25, 0.46, 0.45, 0.94],
  fadeIn: [0.39, 0.575, 0.565, 1],

  // Exit animations
  slideOut: [0.55, 0.055, 0.675, 0.19],
  fadeOut: [0.25, 0.46, 0.45, 0.94],

  // Interactive elements
  button: [0.25, 0.46, 0.45, 0.94],
  hover: [0.4, 0, 0.2, 1],

  // Scroll-based animations
  parallax: [0.25, 0.1, 0.25, 1],
  reveal: [0.16, 1, 0.3, 1],
} as const;

// Animation Variants for Framer Motion
export const variants = {
  // Fade animations
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.fadeIn,
      },
    },
  },

  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.slideIn,
      },
    },
  },

  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.slideIn,
      },
    },
  },

  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.slideIn,
      },
    },
  },

  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.slideIn,
      },
    },
  },

  // Scale animations
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.smooth,
      },
    },
  },

  scaleInBounce: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: durations.slow / 1000,
        ease: easings.bounce,
      },
    },
  },

  // Stagger animations for lists
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.smooth,
      },
    },
  },

  // Hover animations
  buttonHover: {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: durations.fast / 1000,
        ease: easings.hover,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: durations.fast / 1000,
        ease: easings.button,
      },
    },
  },

  cardHover: {
    rest: {
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: durations.normal / 1000,
        ease: easings.hover,
      },
    },
  },

  // Loading animations
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: easings.easeInOut,
      },
    },
  },

  spin: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: easings.linear,
      },
    },
  },

  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.slow / 1000,
        ease: easings.smooth,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.fadeOut,
      },
    },
  },

  // Modal animations
  modalBackdrop: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.easeOut,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: durations.fast / 1000,
        ease: easings.easeIn,
      },
    },
  },

  modalContent: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: durations.normal / 1000,
        ease: easings.smooth,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: durations.fast / 1000,
        ease: easings.easeIn,
      },
    },
  },
};

// Scroll-based animation configurations
export const scrollAnimations = {
  // Parallax effects
  parallaxSlow: {
    y: [0, -50],
    transition: {
      ease: easings.parallax,
    },
  },

  parallaxMedium: {
    y: [0, -100],
    transition: {
      ease: easings.parallax,
    },
  },

  parallaxFast: {
    y: [0, -150],
    transition: {
      ease: easings.parallax,
    },
  },

  // Reveal animations
  revealUp: {
    y: [100, 0],
    opacity: [0, 1],
    transition: {
      duration: durations.slow / 1000,
      ease: easings.reveal,
    },
  },

  revealScale: {
    scale: [0.8, 1],
    opacity: [0, 1],
    transition: {
      duration: durations.slow / 1000,
      ease: easings.reveal,
    },
  },
};

// Micro-interaction configurations
export const microInteractions = {
  // Button interactions
  buttonPress: {
    scale: 0.95,
    transition: {
      duration: durations.fast / 1000,
      ease: easings.button,
    },
  },

  buttonRelease: {
    scale: 1,
    transition: {
      duration: durations.fast / 1000,
      ease: easings.button,
    },
  },

  // Input focus
  inputFocus: {
    scale: 1.02,
    borderColor: "var(--color-primary-500)",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
    transition: {
      duration: durations.fast / 1000,
      ease: easings.easeOut,
    },
  },

  inputBlur: {
    scale: 1,
    borderColor: "var(--color-neutral-300)",
    boxShadow: "0 0 0 0px rgba(59, 130, 246, 0)",
    transition: {
      duration: durations.fast / 1000,
      ease: easings.easeIn,
    },
  },

  // Toggle switches
  toggleOn: {
    x: 20,
    backgroundColor: "var(--color-primary-500)",
    transition: {
      duration: durations.normal / 1000,
      ease: easings.smooth,
    },
  },

  toggleOff: {
    x: 0,
    backgroundColor: "var(--color-neutral-400)",
    transition: {
      duration: durations.normal / 1000,
      ease: easings.smooth,
    },
  },
};

// Export animation configuration
export const animationConfig = {
  durations,
  easings,
  variants,
  scrollAnimations,
  microInteractions,
};
