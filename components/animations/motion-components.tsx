/**
 * Motion Components
 *
 * Reusable animation components built on Framer Motion
 * with consistent timing and easing curves.
 */

"use client";

import React from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { variants, durations, easings } from "@/lib/animations/config";
import { cn } from "@/lib/utils";

// Fade In Animation Component
interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = durations.normal,
  className,
  once = true,
}: FadeInProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: 0.1 });

  const variantMap = {
    up: variants.fadeInUp,
    down: variants.fadeInDown,
    left: variants.fadeInLeft,
    right: variants.fadeInRight,
    none: variants.fadeIn,
  };

  const selectedVariant = variantMap[direction];

  // Override duration if provided
  const customVariant = {
    ...selectedVariant,
    visible: {
      ...selectedVariant.visible,
      transition: {
        ...selectedVariant.visible.transition,
        duration: duration / 1000,
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scale In Animation Component
interface ScaleInProps {
  children: React.ReactNode;
  bounce?: boolean;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function ScaleIn({
  children,
  bounce = false,
  delay = 0,
  duration = durations.normal,
  className,
  once = true,
}: ScaleInProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: 0.1 });

  const selectedVariant = bounce ? variants.scaleInBounce : variants.scaleIn;

  const customVariant = {
    ...selectedVariant,
    visible: {
      ...selectedVariant.visible,
      transition: {
        ...selectedVariant.visible.transition,
        duration: duration / 1000,
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger Animation Component
interface StaggerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  childDelay?: number;
  className?: string;
  once?: boolean;
}

export function Stagger({
  children,
  staggerDelay = 0.1,
  childDelay = 0.2,
  className,
  once = true,
}: StaggerProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: 0.1 });

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariant}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={variants.staggerItem}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Hover Animation Component
interface HoverAnimationProps {
  children: React.ReactNode;
  type?: "button" | "card" | "scale" | "lift";
  className?: string;
}

export function HoverAnimation({
  children,
  type = "button",
  className,
}: HoverAnimationProps) {
  const variantMap = {
    button: variants.buttonHover,
    card: variants.cardHover,
    scale: {
      rest: { scale: 1 },
      hover: { scale: 1.05 },
      tap: { scale: 0.95 },
    },
    lift: {
      rest: { y: 0 },
      hover: { y: -5 },
    },
  };

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={variantMap[type]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax Component
interface ParallaxProps {
  children: React.ReactNode;
  speed?: "slow" | "medium" | "fast";
  className?: string;
}

export function Parallax({
  children,
  speed = "medium",
  className,
}: ParallaxProps) {
  const { scrollY } = useScroll();

  const speedMap = {
    slow: 0.2,
    medium: 0.5,
    fast: 0.8,
  };

  const y = useTransform(scrollY, [0, 1000], [0, -1000 * speedMap[speed]]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// Scroll Reveal Component
interface ScrollRevealProps {
  children: React.ReactNode;
  type?: "up" | "scale" | "fade";
  threshold?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  type = "up",
  threshold = 0.1,
  className,
}: ScrollRevealProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const variantMap = {
    up: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: durations.slow / 1000,
          ease: easings.smooth,
        },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: durations.slow / 1000,
          ease: easings.smooth,
        },
      },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: durations.slow / 1000,
          ease: easings.fadeIn,
        },
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variantMap[type]}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Loading Animation Component
interface LoadingAnimationProps {
  type?: "pulse" | "spin" | "bounce" | "dots";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingAnimation({
  type = "pulse",
  size = "md",
  className,
}: LoadingAnimationProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const animations = {
    pulse: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: easings.easeInOut,
      },
    },
    spin: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: easings.linear,
      },
    },
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: easings.bounce,
      },
    },
    dots: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: easings.easeInOut,
      },
    },
  };

  if (type === "dots") {
    return (
      <div className={cn("flex space-x-1", className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn("bg-primary-500 rounded-full", sizeClasses[size])}
            animate={animations.dots}
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "bg-primary-500 rounded-full",
        sizeClasses[size],
        className
      )}
      animate={animations[type]}
    />
  );
}

// Page Transition Component
interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants.pageTransition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Modal Animation Component
interface ModalAnimationProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ModalAnimation({
  isOpen,
  onClose,
  children,
  className,
}: ModalAnimationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants.modalBackdrop}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants.modalContent}
            className={cn(
              "fixed inset-0 z-50 flex items-center justify-center p-4",
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Export all motion components
export const Motion = {
  FadeIn,
  ScaleIn,
  Stagger,
  HoverAnimation,
  Parallax,
  ScrollReveal,
  LoadingAnimation,
  PageTransition,
  ModalAnimation,
};
