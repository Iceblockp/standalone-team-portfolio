"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import {
  Code,
  Database,
  Cloud,
  Smartphone,
  Palette,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { ScrollReveal } from "@/components/animations/motion-components";
import { SectionFloatingElements } from "@/components/ui/floating-elements";
import { cn } from "@/lib/utils";

type Technology = {
  id: string;
  name: string;
  imageUrl: string;
  order: number;
};

type TechStackProps = {
  data: Technology[];
};

// Tech Category Component
function TechCategory({
  title,
  icon: Icon,
  technologies,
  color,
  index,
}: {
  title: string;
  icon: any;
  technologies: Technology[];
  color: string;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "p-6 rounded-2xl border transition-all duration-500",
        "hover:shadow-xl hover:shadow-primary-500/10",
        "bg-gradient-to-br from-white to-primary-50/30 dark:from-neutral-800 dark:to-primary-950/30",
        "border-border hover:border-primary-200 dark:hover:border-primary-800"
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Category header */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          className={cn(
            "w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg",
            isHovered && "shadow-primary-500/30"
          )}
          animate={
            isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }
          }
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>

        <Typography.Heading
          size="md"
          className="group-hover:text-primary-600 transition-colors duration-200"
        >
          {title}
        </Typography.Heading>
      </div>

      {/* Technologies grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {technologies.map((tech, techIndex) => (
          <motion.div
            key={tech.id}
            className="group/tech flex flex-col items-center p-3 rounded-xl bg-white/50 dark:bg-neutral-800/50 hover:bg-white dark:hover:bg-neutral-700 transition-all duration-300 hover:shadow-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.1 + techIndex * 0.05,
              duration: 0.4,
            }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="relative w-10 h-10 mb-2 group-hover/tech:scale-110 transition-transform duration-200">
              <Image
                src={tech.imageUrl}
                alt={tech.name}
                fill
                className="object-contain"
              />
            </div>
            <Typography.Body
              size="sm"
              className="text-center font-medium group-hover/tech:text-primary-600 transition-colors duration-200"
            >
              {tech.name}
            </Typography.Body>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Floating Tech Icons Component
function FloatingTechIcons({ technologies }: { technologies: Technology[] }) {
  const [floatingIcons, setFloatingIcons] = useState<
    Array<{
      id: string;
      left: number;
      top: number;
      duration: number;
      delay: number;
      tech: Technology;
    }>
  >([]);

  useEffect(() => {
    // Generate floating icon positions only on client side to avoid hydration mismatch
    const icons = technologies.slice(0, 6).map((tech) => ({
      id: tech.id,
      left: Math.random() * 80 + 10,
      top: Math.random() * 80 + 10,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 2,
      tech,
    }));
    setFloatingIcons(icons);
  }, [technologies]);

  if (floatingIcons.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingIcons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute opacity-10 dark:opacity-5"
          style={{
            left: `${icon.left}%`,
            top: `${icon.top}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            delay: icon.delay,
          }}
        >
          <div className="w-16 h-16 relative">
            <Image
              src={icon.tech.imageUrl}
              alt={icon.tech.name}
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function TechStack({ data }: TechStackProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Sort technologies by order
  const sortedTechnologies = [...data].sort((a, b) => a.order - b.order);

  // Categorize technologies (you might want to add category field to your data model)
  const categories = [
    {
      title: "Frontend",
      icon: Code,
      color: "primary",
      technologies: sortedTechnologies.filter((tech) =>
        ["React", "TypeScript", "Next.js", "Vue.js", "Angular"].includes(
          tech.name
        )
      ),
    },
    {
      title: "Backend",
      icon: Database,
      color: "purple",
      technologies: sortedTechnologies.filter((tech) =>
        ["Node.js", "Python", "Java", "PostgreSQL", "MongoDB"].includes(
          tech.name
        )
      ),
    },
    {
      title: "Mobile",
      icon: Smartphone,
      color: "green",
      technologies: sortedTechnologies.filter((tech) =>
        ["React Native", "Flutter", "Swift", "Kotlin"].includes(tech.name)
      ),
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      color: "green",
      technologies: sortedTechnologies.filter((tech) =>
        ["AWS", "Docker", "Kubernetes", "Vercel"].includes(tech.name)
      ),
    },
    {
      title: "Design",
      icon: Palette,
      color: "cyan",
      technologies: sortedTechnologies.filter((tech) =>
        ["Figma", "Adobe", "Sketch"].includes(tech.name)
      ),
    },
    {
      title: "Tools",
      icon: Zap,
      color: "primary",
      technologies: sortedTechnologies.filter(
        (tech) =>
          ![
            "React",
            "TypeScript",
            "Next.js",
            "Vue.js",
            "Angular",
            "Node.js",
            "Python",
            "Java",
            "PostgreSQL",
            "MongoDB",
            "React Native",
            "Flutter",
            "Swift",
            "Kotlin",
            "AWS",
            "Docker",
            "Kubernetes",
            "Vercel",
            "Figma",
            "Adobe",
            "Sketch",
          ].includes(tech.name)
      ),
    },
  ].filter((category) => category.technologies.length > 0);

  return (
    <section
      id="tech"
      className="relative py-20 bg-gradient-background-light dark:bg-gradient-background-dark overflow-hidden"
    >
      {/* Floating tech icons */}
      {/* <FloatingTechIcons technologies={sortedTechnologies} /> */}

      {/* Floating elements */}
      {/* <SectionFloatingElements density="low" colors="accent" /> */}

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
              Our Tech Stack
            </Typography.Display>
          </ScrollReveal>

          <ScrollReveal type="up" threshold={0.1}>
            <Typography.Body
              size="xl"
              color="muted"
              className="max-w-3xl mx-auto mb-8"
            >
              We leverage cutting-edge technologies and proven frameworks to
              build scalable, performant, and maintainable solutions that stand
              the test of time.
            </Typography.Body>
          </ScrollReveal>

          {/* Tech stats */}
          {/* <motion.div
            className="flex justify-center gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div>
              <Typography.Heading size="lg" className="text-primary-600">
                {sortedTechnologies.length}+
              </Typography.Heading>
              <Typography.Body size="sm" color="muted">
                Technologies
              </Typography.Body>
            </div>
            <div>
              <Typography.Heading size="lg" className="text-accent-green">
                5+
              </Typography.Heading>
              <Typography.Body size="sm" color="muted">
                Years Experience
              </Typography.Body>
            </div>
            <div>
              <Typography.Heading size="lg" className="text-accent-purple">
                100%
              </Typography.Heading>
              <Typography.Body size="sm" color="muted">
                Modern Stack
              </Typography.Body>
            </div>
          </motion.div> */}
        </div>

        {/* Tech Categories */}
        {/* <div ref={sectionRef} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <TechCategory
                key={category.title}
                title={category.title}
                icon={category.icon}
                technologies={category.technologies}
                color={category.color}
                index={index}
              />
            ))}
          </div>
        </div> */}

        {/* All Technologies Showcase */}
        {sortedTechnologies.length > 0 && (
          <ScrollReveal type="up">
            <div className="glass-card p-8 rounded-2xl">
              {/* <Typography.Heading size="lg" className="text-center mb-8">
                Complete Technology Arsenal
              </Typography.Heading> */}

              <motion.div
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                {sortedTechnologies.map((tech, index) => (
                  <motion.div
                    key={tech.id}
                    className="group flex flex-col items-center p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-950 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.02, duration: 0.3 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <div className="relative w-12 h-12 mb-2 group-hover:scale-110 transition-transform duration-200">
                      <Image
                        src={tech.imageUrl}
                        alt={tech.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <Typography.Body
                      size="sm"
                      className="text-center font-medium group-hover:text-primary-600 transition-colors duration-200"
                    >
                      {tech.name}
                    </Typography.Body>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>
        )}

        {/* Why Our Stack */}
        <ScrollReveal type="up">
          <div className="mt-16 text-center">
            <Typography.Heading size="lg" className="mb-8">
              Why We Choose These Technologies
            </Typography.Heading>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Performance",
                  description:
                    "Optimized for speed, scalability, and exceptional user experiences.",
                },
                {
                  icon: Shield,
                  title: "Security",
                  description:
                    "Enterprise-grade security with industry best practices and compliance.",
                },
                {
                  icon: Globe,
                  title: "Future-Proof",
                  description:
                    "Modern, actively maintained technologies with strong community support.",
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
        </ScrollReveal>
      </div>
    </section>
  );
}
