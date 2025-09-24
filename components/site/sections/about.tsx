"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import {
  CheckCircle2,
  Users,
  Target,
  Lightbulb,
  Award,
  TrendingUp,
  Globe,
  Heart,
  Zap,
  Shield,
} from "lucide-react";
import { Typography } from "@/components/ui/typography";
import {
  ScrollReveal,
  Parallax,
} from "@/components/animations/motion-components";
import { AnimatedProgress } from "@/components/animations/micro-interactions";
import { MinimalFloatingElements } from "@/components/ui/floating-elements";
import { cn } from "@/lib/utils";

type AboutData = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  features: string[];
};

type AboutProps = {
  data: AboutData;
};

// Feature Card Component
function FeatureCard({
  feature,
  index,
  icon: Icon,
}: {
  feature: string;
  index: number;
  icon: any;
}) {
  return (
    <motion.div
      className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-white/50 to-white/20 dark:from-neutral-800/50 dark:to-neutral-900/20 backdrop-blur-sm border border-white/20 dark:border-neutral-700/20 hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300 group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <Typography.Body
          size="md"
          className="group-hover:text-primary-600 transition-colors duration-200"
        >
          {feature}
        </Typography.Body>
      </div>
    </motion.div>
  );
}

// Stats Component
function StatsSection() {
  const stats = [
    { label: "Projects Completed", value: 150, suffix: "+", icon: Target },
    { label: "Happy Clients", value: 98, suffix: "%", icon: Heart },
    { label: "Team Members", value: 25, suffix: "+", icon: Users },
    { label: "Years Experience", value: 8, suffix: "+", icon: Award },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center p-6 rounded-xl glass-card hover:shadow-lg transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <Typography.Heading size="xl" className="text-primary-600 mb-1">
            {stat.value}
            {stat.suffix}
          </Typography.Heading>
          <Typography.Body size="sm" color="muted">
            {stat.label}
          </Typography.Body>
        </motion.div>
      ))}
    </div>
  );
}

// Values Section Component
function ValuesSection() {
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace cutting-edge technologies and creative solutions to solve complex challenges.",
    },
    {
      icon: Shield,
      title: "Quality",
      description:
        "Every project is crafted with meticulous attention to detail and highest standards.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and transparent communication with our clients.",
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description:
        "We're committed to continuous learning and helping our clients achieve sustainable growth.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {values.map((value, index) => (
        <motion.div
          key={value.title}
          className="p-6 rounded-xl bg-gradient-to-br from-primary-50/50 to-accent-cyan/5 dark:from-primary-950/50 dark:to-accent-cyan/5 border border-primary-100 dark:border-primary-900 hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -3 }}
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
              <value.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <Typography.Heading
                size="sm"
                className="mb-2 group-hover:text-primary-600 transition-colors duration-200"
              >
                {value.title}
              </Typography.Heading>
              <Typography.Body size="sm" color="muted">
                {value.description}
              </Typography.Body>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function About({ data }: AboutProps) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const featureIcons = [
    Users,
    Target,
    Lightbulb,
    Shield,
    TrendingUp,
    Globe,
    Heart,
    Zap,
  ];

  return (
    <section
      id="about"
      className="relative py-20 bg-gradient-background-light dark:bg-gradient-background-dark overflow-hidden"
    >
      {/* Floating elements */}
      <MinimalFloatingElements colors="primary" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20"
        >
          {/* Content Side */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <ScrollReveal type="up">
                <Typography.Display
                  size="md"
                  className="mb-4"
                  gradient
                  gradientType="primary"
                >
                  {data.title}
                </Typography.Display>
              </ScrollReveal>

              <ScrollReveal type="up" threshold={0.1}>
                <Typography.Heading size="lg" className="text-primary-600 mb-6">
                  {data.subtitle}
                </Typography.Heading>
              </ScrollReveal>

              <ScrollReveal type="up" threshold={0.1}>
                <Typography.Body
                  size="xl"
                  color="muted"
                  className="leading-relaxed"
                >
                  {data.description}
                </Typography.Body>
              </ScrollReveal>
            </div>

            {/* Features List */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {data.features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  feature={feature}
                  index={index}
                  icon={featureIcons[index % featureIcons.length]}
                />
              ))}
            </motion.div>
          </div>

          {/* Image Side */}
          <div className="lg:col-span-5">
            <ScrollReveal type="scale" threshold={0.1}>
              <div className="relative">
                {/* Main image */}
                <motion.div
                  ref={imageRef}
                  className="relative rounded-2xl overflow-hidden shadow-2xl"
                  style={{ y: imageY }}
                >
                  <Image
                    src={data.imageUrl}
                    alt="About Us"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" />
                </motion.div>

                {/* Floating stats card */}
                <motion.div
                  className="absolute -bottom-6 -left-6 p-4 glass-card rounded-xl shadow-lg"
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0, y: 0 }
                      : { opacity: 0, x: -20, y: 20 }
                  }
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <Typography.Heading
                        size="sm"
                        className="text-primary-600"
                      >
                        150+ Projects
                      </Typography.Heading>
                      <Typography.Body size="sm" color="muted">
                        Successfully Delivered
                      </Typography.Body>
                    </div>
                  </div>
                </motion.div>

                {/* Floating experience badge */}
                <motion.div
                  className="absolute -top-4 -right-4 p-3 bg-accent-green text-white rounded-full shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  transition={{
                    delay: 1,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                >
                  <Award className="w-6 h-6" />
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <StatsSection />
        </motion.div>

        {/* Values Section */}
        <div className="mb-16">
          <ScrollReveal type="up">
            <div className="text-center mb-12">
              <Typography.Heading size="xl" className="mb-4">
                Our Core Values
              </Typography.Heading>
              <Typography.Body
                size="lg"
                color="muted"
                className="max-w-2xl mx-auto"
              >
                The principles that guide everything we do and shape our
                approach to every project.
              </Typography.Body>
            </div>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <ValuesSection />
          </motion.div>
        </div>

        {/* Skills Progress Bars */}
        <ScrollReveal type="up">
          <div className="glass-card p-8 rounded-2xl">
            <Typography.Heading size="lg" className="mb-8 text-center">
              Our Expertise
            </Typography.Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { skill: "Frontend Development", level: 95 },
                { skill: "Backend Development", level: 90 },
                { skill: "UI/UX Design", level: 88 },
                { skill: "Mobile Development", level: 85 },
                { skill: "DevOps & Cloud", level: 82 },
                { skill: "Digital Strategy", level: 90 },
              ].map((item, index) => (
                <div key={item.skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Typography.Body size="md" className="font-medium">
                      {item.skill}
                    </Typography.Body>
                    <Typography.Body size="sm" color="muted">
                      {item.level}%
                    </Typography.Body>
                  </div>
                  <AnimatedProgress
                    value={item.level}
                    color="primary"
                    size="md"
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
