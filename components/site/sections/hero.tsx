"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { FadeIn, Stagger } from "@/components/animations/motion-components";
import { AnimatedButton } from "@/components/animations/micro-interactions";
import { Typography } from "@/components/ui/typography";
import { useReducedMotion } from "@/hooks/use-scroll-animations";

type HeroProps = {
  data: {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    buttonText?: string | null;
    buttonUrl?: string | null;
  };
};

// Floating geometric shapes component
function FloatingShapes() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large floating circle */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 blur-3xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Medium floating shape */}
      <motion.div
        className="absolute top-1/3 -left-32 w-64 h-64 rounded-full bg-gradient-to-br from-accent-purple/10 to-primary-700/10 blur-2xl"
        animate={{
          y: [0, 40, 0],
          x: [0, -15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Small floating elements */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-accent-green/20 to-accent-cyan/20 blur-xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Geometric lines */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-accent-cyan/30 to-transparent"
        animate={{
          scaleY: [1, 1.5, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/3 w-24 h-px bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent"
        animate={{
          scaleX: [1, 1.5, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
}

// Particle system component
function ParticleSystem() {
  const prefersReducedMotion = useReducedMotion();
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      left: number;
      top: number;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    // Generate particles only on client side to avoid hydration mismatch
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  if (prefersReducedMotion || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-accent-cyan/40 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -100, -200],
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
    </div>
  );
}

export function Hero({ data }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.8]);

  // Advanced text animation variants
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom smooth easing
        delay: 0.2,
      },
    },
  };

  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.5,
      },
    },
  };

  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.8,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: 1.1,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      id="hero"
    >
      {/* Dynamic gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-hero z-0"
        style={{ y: backgroundY }}
      />

      {/* Animated overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-hero-overlay z-[1]"
        style={{ opacity: overlayOpacity }}
      />

      {/* Parallax background image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${data.imageUrl}')`,
            filter: "brightness(0.4) contrast(1.1)",
          }}
        />
      </motion.div>

      {/* Floating geometric shapes */}
      <FloatingShapes />

      {/* Particle system */}
      <ParticleSystem />

      {/* Main content */}
      <motion.div
        className="container relative z-10 mx-auto px-4 py-20"
        style={{ y: contentY }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Asymmetrical layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
            {/* Text content - takes up more space on larger screens */}
            <div className="lg:col-span-8 text-left">
              {/* Main title with gradient text */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={titleVariants}
              >
                <Typography.Display
                  size="xl"
                  className="mb-6 leading-none"
                  gradient
                  gradientType="primary"
                >
                  {data.title}
                </Typography.Display>
              </motion.div>

              {/* Subtitle */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={subtitleVariants}
              >
                <Typography.Heading
                  size="lg"
                  className="text-white/90 mb-6 font-normal"
                >
                  {data.subtitle}
                </Typography.Heading>
              </motion.div>

              {/* Description */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={descriptionVariants}
              >
                <Typography.Body
                  size="xl"
                  className="text-white/80 mb-8 max-w-2xl leading-relaxed"
                >
                  {data.description}
                </Typography.Body>
              </motion.div>

              {/* CTA Button */}
              {data.buttonText && data.buttonUrl && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={buttonVariants}
                >
                  <Link href={data.buttonUrl}>
                    <AnimatedButton
                      variant="primary"
                      size="lg"
                      className="px-8 py-4 text-lg font-semibold shadow-button-hover hover:shadow-glow transition-all duration-300"
                    >
                      {data.buttonText}
                      <motion.svg
                        className="ml-2 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </motion.svg>
                    </AnimatedButton>
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Visual element - floating card or graphic */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <FadeIn direction="right" delay={1.2}>
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glassmorphism card */}
                  <div className="glass-card p-8 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse"></div>
                        <span className="text-white/80 text-sm">
                          Live Portfolio
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gradient-primary rounded-full w-full"></div>
                        <div className="h-2 bg-white/20 rounded-full w-3/4"></div>
                        <div className="h-2 bg-white/10 rounded-full w-1/2"></div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <div className="w-8 h-8 rounded-full bg-accent-cyan/20 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-accent-cyan"></div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-accent-purple"></div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-accent-green/20 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-accent-green"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-20 blur-xl -z-10"></div>
                </motion.div>
              </FadeIn>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modern scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => {
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-white/60 text-sm font-medium group-hover:text-white/80 transition-colors">
            Scroll to explore
          </span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2 group-hover:border-white/60 transition-colors">
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full group-hover:bg-white/80 transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
