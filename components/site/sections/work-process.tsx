"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Lightbulb,
  Code,
  Rocket,
  Target,
  Zap,
  Globe,
} from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { ScrollReveal } from "@/components/animations/motion-components";
import { AnimatedProgress } from "@/components/animations/micro-interactions";
import { SectionFloatingElements } from "@/components/ui/floating-elements";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

type WorkProcessStep = {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
};

type WorkProcessProps = {
  data: WorkProcessStep[];
};

// Enhanced Process Step Component
function ProcessStepCard({
  step,
  index,
  isActive,
  onClick,
}: {
  step: WorkProcessStep;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = (LucideIcons as any)[step.icon] || LucideIcons.HelpCircle;

  const stepColors = [
    { bg: "from-primary-500 to-primary-600", glow: "shadow-primary-500/30" },
    {
      bg: "from-accent-purple to-accent-purple/80",
      glow: "shadow-accent-purple/30",
    },
    {
      bg: "from-accent-green to-accent-green/80",
      glow: "shadow-accent-green/30",
    },
    {
      bg: "from-accent-green to-accent-green/80",
      glow: "shadow-accent-green/30",
    },
  ];

  const colorScheme = stepColors[index % stepColors.length];

  return (
    <motion.div
      className={cn(
        "relative cursor-pointer group",
        "p-6 rounded-2xl border transition-all duration-500",
        isActive
          ? "bg-gradient-to-br from-white to-primary-50/50 dark:from-neutral-800 dark:to-primary-950/50 border-primary-300 dark:border-primary-700 shadow-xl"
          : "bg-white dark:bg-slate-800 hover:bg-gradient-to-br hover:from-white hover:to-primary-50/30 dark:hover:from-slate-700 dark:hover:to-slate-800 border-gray-200 dark:border-slate-600 hover:border-primary-200 dark:hover:border-primary-800"
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
    >
      {/* Step number and icon */}
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          className={cn(
            "relative w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg",
            isActive
              ? `${colorScheme.bg} ${colorScheme.glow}`
              : "bg-neutral-200 dark:bg-neutral-700"
          )}
          animate={isActive ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon
            className={cn(
              "w-8 h-8",
              isActive ? "text-white" : "text-neutral-600 dark:text-neutral-300"
            )}
          />

          {/* Step number badge */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center text-xs font-bold text-primary-600 border-2 border-primary-200 dark:border-primary-800">
            {index + 1}
          </div>
        </motion.div>

        {/* Connection line */}
        {index < 3 && (
          <div className="hidden lg:block flex-1 h-px bg-gradient-to-r from-primary-300 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <Typography.Heading
          size="md"
          className={cn(
            "transition-colors duration-200",
            isActive ? "text-primary-600" : "group-hover:text-primary-600"
          )}
        >
          {step.title}
        </Typography.Heading>

        <Typography.Body size="md" color="muted" className="leading-relaxed">
          {step.description}
        </Typography.Body>

        {/* Progress indicator */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            className="mt-4"
          >
            <AnimatedProgress value={100} color="primary" size="sm" />
          </motion.div>
        )}
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

// Timeline Component
function ProcessTimeline({ data }: { data: WorkProcessStep[] }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="space-y-8">
      {/* Timeline header */}
      {/* <div className="text-center mb-12">
        <Typography.Heading size="lg" className="mb-4">
          Our Proven Methodology
        </Typography.Heading>
        <Typography.Body size="lg" color="muted" className="max-w-2xl mx-auto">
          Each project follows our structured approach, ensuring consistent
          quality and timely delivery.
        </Typography.Body>
      </div> */}

      {/* Interactive timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {data.map((step, index) => (
          <ProcessStepCard
            key={step.id}
            step={step}
            index={index}
            isActive={activeStep === index}
            onClick={() => setActiveStep(index)}
          />
        ))}
      </div>

      {/* Timeline details */}

      {/* <motion.div
        className="glass-card p-8 rounded-2xl"
        key={activeStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <Typography.Heading size="sm" className="mb-3 text-primary-600">
              Duration
            </Typography.Heading>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <Typography.Body size="md">
                {
                  ["1-2 weeks", "2-3 weeks", "4-8 weeks", "1-2 weeks"][
                    activeStep
                  ]
                }
              </Typography.Body>
            </div>
          </div>

          <div>
            <Typography.Heading size="sm" className="mb-3 text-primary-600">
              Team Involved
            </Typography.Heading>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <Typography.Body size="md">
                {
                  [
                    "PM, BA",
                    "Designer, Architect",
                    "Developers, QA",
                    "DevOps, Support",
                  ][activeStep]
                }
              </Typography.Body>
            </div>
          </div>

          <div>
            <Typography.Heading size="sm" className="mb-3 text-primary-600">
              Deliverables
            </Typography.Heading>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-muted-foreground" />
              <Typography.Body size="md">
                {
                  [
                    "Requirements Doc",
                    "Design System",
                    "Working Software",
                    "Live Application",
                  ][activeStep]
                }
              </Typography.Body>
            </div>
          </div>
        </div>
      </motion.div> */}
    </div>
  );
}

const ProcessSteps = () => {
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
};

export function WorkProcess({ data }: WorkProcessProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Sort steps by order
  const sortedSteps = [...data].sort((a, b) => a.order - b.order);

  return (
    <section
      id="process"
      className="relative py-20 bg-gradient-background-light dark:bg-gradient-background-dark overflow-hidden"
    >
      {/* Floating elements */}
      <SectionFloatingElements density="low" colors="primary" />

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
              Our Work Process
            </Typography.Display>
          </ScrollReveal>

          <ScrollReveal type="up" threshold={0.1}>
            <Typography.Body
              size="xl"
              color="muted"
              className="max-w-3xl mx-auto mb-8"
            >
              From initial concept to final deployment, we follow a systematic
              approach that ensures your project is delivered on time, within
              budget, and exceeds expectations.
            </Typography.Body>
          </ScrollReveal>

          {/* Process stats */}
          {/* <motion.div
            className="flex justify-center gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div>
              <Typography.Heading size="lg" className="text-primary-600">
                98%
              </Typography.Heading>
              <Typography.Body size="sm" color="muted">
                On-Time Delivery
              </Typography.Body>
            </div>
            <div>
              <Typography.Heading size="lg" className="text-accent-green">
                150+
              </Typography.Heading>
              <Typography.Body size="sm" color="muted">
                Projects Completed
              </Typography.Body>
            </div>
            <div>
              <Typography.Heading size="lg" className="text-accent-purple">
                4.9/5
              </Typography.Heading>
              <Typography.Body size="sm" color="muted">
                Client Satisfaction
              </Typography.Body>
            </div>
          </motion.div> */}
        </div>

        {/* Process Timeline */}
        <div ref={sectionRef}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <ProcessTimeline data={sortedSteps} />
          </motion.div>
        </div>

        {/* Why Choose Our Process */}
        {/* <ScrollReveal type="up">
          <div className="mt-20 text-center">
            <Typography.Heading size="lg" className="mb-8">
              Why Our Process Works
            </Typography.Heading>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Goal-Oriented",
                  description:
                    "Every step is aligned with your business objectives and success metrics.",
                },
                {
                  icon: Users,
                  title: "Collaborative",
                  description:
                    "We work closely with your team throughout the entire development process.",
                },
                {
                  icon: Rocket,
                  title: "Agile & Flexible",
                  description:
                    "We adapt quickly to changes and deliver value in iterative cycles.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="p-6 rounded-xl glass-card hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <Typography.Heading size="sm" className="mb-3">
                    {benefit.title}
                  </Typography.Heading>
                  <Typography.Body size="md" color="muted">
                    {benefit.description}
                  </Typography.Body>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal> */}
      </div>
    </section>
  );
}
