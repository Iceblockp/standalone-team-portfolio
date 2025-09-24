"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Code,
  Palette,
  Smartphone,
  Globe,
  Database,
  Shield,
  Zap,
  Users,
} from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { ModernButton } from "@/components/ui/modern-button";
import {
  ScrollReveal,
  Stagger,
} from "@/components/animations/motion-components";
import { SectionFloatingElements } from "@/components/ui/floating-elements";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

type Solution = {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
};

type SolutionsProps = {
  data: Solution[];
};

// Enhanced Solution Card Component
function SolutionCard({
  solution,
  index,
}: {
  solution: Solution;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = (LucideIcons as any)[solution.icon] || LucideIcons.HelpCircle;

  // Different card styles based on index
  const getCardStyle = () => {
    const styles = [
      "from-primary-50 to-accent-cyan/10 border-primary-200/50",
      "from-accent-purple/10 to-primary-50 border-accent-purple/20",
      "from-accent-green/10 to-primary-50 border-accent-green/20",
      "from-accent-orange/10 to-primary-50 border-accent-orange/20",
      "from-primary-100/50 to-accent-cyan/5 border-primary-300/30",
      "from-accent-purple/5 to-primary-100/50 border-accent-purple/30",
    ];
    return styles[index % styles.length];
  };

  const getIconColor = () => {
    const colors = [
      "text-primary-600",
      "text-accent-purple",
      "text-accent-green",
      "text-accent-orange",
      "text-primary-700",
      "text-accent-purple",
    ];
    return colors[index % colors.length];
  };

  const getGlowColor = () => {
    const glows = [
      "shadow-primary-500/20",
      "shadow-accent-purple/20",
      "shadow-accent-green/20",
      "shadow-accent-orange/20",
      "shadow-primary-600/20",
      "shadow-accent-purple/20",
    ];
    return glows[index % glows.length];
  };

  return (
    <motion.div
      className={cn(
        "group relative p-8 rounded-2xl bg-gradient-to-br transition-all duration-500",
        "border hover:border-primary-300 dark:hover:border-primary-700",
        "hover:shadow-xl hover:shadow-primary-500/10",
        "backdrop-blur-sm",
        getCardStyle()
      )}
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -8,
        rotateX: 5,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10",
          getGlowColor()
        )}
      />

      {/* Icon */}
      <motion.div
        className="relative mb-6"
        animate={
          isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 0.3 }}
      >
        <div
          className={cn(
            "w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300",
            "group-hover:shadow-primary-500/30"
          )}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Sparkle effect */}
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-cyan flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={
            isHovered ? { scale: [1, 1.2, 1], rotate: [0, 180, 360] } : {}
          }
          transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
        >
          <Sparkles className="w-2 h-2 text-white" />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="space-y-4">
        <Typography.Heading
          size="lg"
          className="group-hover:text-primary-600 transition-colors duration-200"
        >
          {solution.title}
        </Typography.Heading>

        <Typography.Body size="md" color="muted" className="leading-relaxed">
          {solution.description}
        </Typography.Body>

        {/* Learn More Link */}
        <motion.div
          className="flex items-center gap-2 text-primary-600 font-medium cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300"
          whileHover={{ x: 5 }}
        >
          <span className="text-sm">Learn More</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

// Process Steps Component
function ProcessSteps() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "We analyze your needs and define project requirements",
      icon: Users,
    },
    {
      number: "02",
      title: "Strategy",
      description: "We create a comprehensive plan and technical roadmap",
      icon: Zap,
    },
    {
      number: "03",
      title: "Development",
      description: "We build your solution using cutting-edge technologies",
      icon: Code,
    },
    {
      number: "04",
      title: "Launch",
      description: "We deploy and provide ongoing support for your project",
      icon: Globe,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          className="relative text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          {/* Connection line */}
          {index < steps.length - 1 && (
            <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary-300 to-transparent z-0" />
          )}

          <div className="relative z-10">
            {/* Step number */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {step.number}
            </div>

            {/* Step icon */}
            <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary-50 dark:bg-primary-950 flex items-center justify-center">
              <step.icon className="w-5 h-5 text-primary-600" />
            </div>

            <Typography.Heading size="sm" className="mb-2">
              {step.title}
            </Typography.Heading>

            <Typography.Body size="sm" color="muted">
              {step.description}
            </Typography.Body>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function Solutions({ data }: SolutionsProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Sort solutions by order
  const sortedSolutions = [...data].sort((a, b) => a.order - b.order);

  return (
    <section
      id="solutions"
      className="relative py-20 bg-gradient-background-light dark:bg-gradient-background-dark overflow-hidden"
    >
      {/* Floating elements */}
      <SectionFloatingElements density="medium" colors="mixed" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal type="up">
            <Typography.Display
              size="md"
              className="mb-4"
              gradient
              gradientType="primary"
            >
              Our Solutions
            </Typography.Display>
          </ScrollReveal>

          <ScrollReveal type="up" threshold={0.1}>
            <Typography.Body
              size="xl"
              color="muted"
              className="max-w-3xl mx-auto mb-8"
            >
              We deliver comprehensive digital solutions that transform ideas
              into powerful, scalable applications that drive business growth
              and user engagement.
            </Typography.Body>
          </ScrollReveal>

          {/* Key benefits */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {[
              "Fast Delivery",
              "Scalable Solutions",
              "24/7 Support",
              "Modern Tech",
            ].map((benefit, index) => (
              <span
                key={benefit}
                className="px-4 py-2 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium border border-primary-200 dark:border-primary-800"
              >
                {benefit}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Solutions Grid */}
        <div ref={sectionRef} className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedSolutions.map((solution, index) => (
              <SolutionCard
                key={solution.id}
                solution={solution}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <ScrollReveal type="up">
            <div className="text-center mb-12">
              <Typography.Heading size="xl" className="mb-4">
                Our Process
              </Typography.Heading>
              <Typography.Body
                size="lg"
                color="muted"
                className="max-w-2xl mx-auto"
              >
                From concept to launch, we follow a proven methodology that
                ensures successful project delivery every time.
              </Typography.Body>
            </div>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <ProcessSteps />
          </motion.div>
        </div>

        {/* Call to Action */}
        <ScrollReveal type="up">
          <div className="text-center glass-card p-8 rounded-2xl">
            <Typography.Heading size="lg" className="mb-4">
              Ready to Get Started?
            </Typography.Heading>
            <Typography.Body
              size="lg"
              color="muted"
              className="mb-6 max-w-2xl mx-auto"
            >
              Let's discuss your project and explore how our solutions can help
              you achieve your goals.
            </Typography.Body>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ModernButton
                variant="gradient"
                size="lg"
                glow
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Start Your Project
              </ModernButton>
              <ModernButton variant="ghost" size="lg">
                View Portfolio
              </ModernButton>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
