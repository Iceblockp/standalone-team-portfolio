/**
 * Floating Elements Component
 *
 * Animated geometric shapes and particles that add visual interest
 * to hero sections and other prominent areas.
 */

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-scroll-animations";

interface FloatingElementsProps {
  variant?: "hero" | "section" | "minimal";
  density?: "low" | "medium" | "high";
  colors?: "primary" | "accent" | "mixed";
}

export function FloatingElements({
  variant = "hero",
  density = "medium",
  colors = "mixed",
}: FloatingElementsProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  const colorSchemes = {
    primary: {
      primary: "from-primary-500/10 to-primary-700/10",
      secondary: "from-primary-600/10 to-primary-800/10",
      accent: "from-primary-400/20 to-primary-600/20",
    },
    accent: {
      primary: "from-accent-cyan/10 to-accent-purple/10",
      secondary: "from-accent-purple/10 to-accent-green/10",
      accent: "from-accent-cyan/20 to-accent-purple/20",
    },
    mixed: {
      primary: "from-accent-cyan/10 to-accent-purple/10",
      secondary: "from-accent-purple/10 to-primary-700/10",
      accent: "from-accent-green/20 to-accent-cyan/20",
    },
  };

  const scheme = colorSchemes[colors];

  const densityConfig = {
    low: { shapes: 3, particles: 8, lines: 2 },
    medium: { shapes: 5, particles: 15, lines: 3 },
    high: { shapes: 8, particles: 25, lines: 5 },
  };

  const config = densityConfig[density];

  if (variant === "minimal") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Single large shape */}
        <motion.div
          className={`absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br ${scheme.primary} blur-3xl`}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Small accent */}
        <motion.div
          className={`absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full bg-gradient-to-br ${scheme.accent} blur-xl`}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  if (variant === "section") {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        {/* Medium floating shapes */}
        <motion.div
          className={`absolute top-1/4 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${scheme.primary} blur-2xl`}
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className={`absolute bottom-1/3 -left-20 w-32 h-32 rounded-full bg-gradient-to-br ${scheme.secondary} blur-xl`}
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    );
  }

  // Hero variant - full featured
  return <HeroFloatingElementsContent config={config} scheme={scheme} />;
}

// Hero floating elements with client-side generation
function HeroFloatingElementsContent({
  config,
  scheme,
}: {
  config: { shapes: number; particles: number; lines: number };
  scheme: { primary: string; secondary: string; accent: string };
}) {
  const [elements, setElements] = useState<{
    shapes: Array<{
      id: number;
      width: number;
      height: number;
      left: number;
      top: number;
      yRange: number;
      xRange: number;
      scaleRange: number;
      duration: number;
      delay: number;
      colorIndex: number;
    }>;
    lines: Array<{
      id: number;
      width: number;
      height: number;
      left: number;
      top: number;
      duration: number;
      delay: number;
      isHorizontal: boolean;
    }>;
    particles: Array<{
      id: number;
      left: number;
      top: number;
      yRange1: number;
      yRange2: number;
      duration: number;
      delay: number;
      colorIndex: number;
    }>;
  }>({ shapes: [], lines: [], particles: [] });

  useEffect(() => {
    // Generate all random values on client side
    const shapes = Array.from({ length: config.shapes }, (_, i) => ({
      id: i,
      width: Math.random() * 200 + 150,
      height: Math.random() * 200 + 150,
      left: Math.random() * 120 - 10,
      top: Math.random() * 120 - 10,
      yRange: Math.random() * 60 - 30,
      xRange: Math.random() * 40 - 20,
      scaleRange: Math.random() * 0.3 + 0.9,
      duration: Math.random() * 4 + 6,
      delay: Math.random() * 2,
      colorIndex: i % 3,
    }));

    const lines = Array.from({ length: config.lines }, (_, i) => ({
      id: i,
      width: i % 2 === 0 ? Math.random() * 100 + 50 : 1,
      height: i % 2 === 0 ? 1 : Math.random() * 100 + 50,
      left: Math.random() * 80 + 10,
      top: Math.random() * 80 + 10,
      duration: Math.random() * 2 + 3,
      delay: Math.random() * 2,
      isHorizontal: i % 2 === 0,
    }));

    const particles = Array.from({ length: config.particles }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      yRange1: -Math.random() * 200 - 100,
      yRange2: -Math.random() * 400 - 200,
      duration: Math.random() * 3 + 3,
      delay: Math.random() * 3,
      colorIndex: i % 3,
    }));

    setElements({ shapes, lines, particles });
  }, [config]);

  if (elements.shapes.length === 0) return null;

  const colors = [
    "rgba(0, 212, 255, 0.4)",
    "rgba(124, 58, 237, 0.4)",
    "rgba(16, 185, 129, 0.4)",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating shapes */}
      {elements.shapes.map((shape) => (
        <motion.div
          key={`shape-${shape.id}`}
          className={`absolute rounded-full bg-gradient-to-br blur-3xl ${
            shape.colorIndex === 0
              ? scheme.primary
              : shape.colorIndex === 1
              ? scheme.secondary
              : scheme.accent
          }`}
          style={{
            width: `${shape.width}px`,
            height: `${shape.height}px`,
            left: `${shape.left}%`,
            top: `${shape.top}%`,
          }}
          animate={{
            y: [0, shape.yRange, 0],
            x: [0, shape.xRange, 0],
            scale: [1, shape.scaleRange, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}

      {/* Geometric lines */}
      {elements.lines.map((line) => (
        <motion.div
          key={`line-${line.id}`}
          className={`absolute bg-gradient-to-r ${
            line.isHorizontal
              ? "from-transparent via-accent-cyan/30 to-transparent h-px"
              : "from-transparent via-accent-purple/30 to-transparent w-px"
          }`}
          style={{
            width: `${line.width}px`,
            height: `${line.height}px`,
            left: `${line.left}%`,
            top: `${line.top}%`,
          }}
          animate={{
            [line.isHorizontal ? "scaleX" : "scaleY"]: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: line.delay,
          }}
        />
      ))}

      {/* Floating particles */}
      {elements.particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            backgroundColor: colors[particle.colorIndex],
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, particle.yRange1, particle.yRange2],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Orbital elements */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative w-full h-full">
          <motion.div
            className="absolute top-0 left-1/2 w-2 h-2 bg-accent-cyan/60 rounded-full -translate-x-1/2"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-accent-purple/60 rounded-full -translate-x-1/2"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// Specialized variants
export function HeroFloatingElements(
  props: Omit<FloatingElementsProps, "variant">
) {
  return <FloatingElements variant="hero" {...props} />;
}

export function SectionFloatingElements(
  props: Omit<FloatingElementsProps, "variant">
) {
  return <FloatingElements variant="section" {...props} />;
}

export function MinimalFloatingElements(
  props: Omit<FloatingElementsProps, "variant">
) {
  return <FloatingElements variant="minimal" {...props} />;
}
