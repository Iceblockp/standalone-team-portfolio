"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Play, Star, Calendar } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { ModernButton } from "@/components/ui/modern-button";
import {
  ScrollReveal,
  Stagger,
} from "@/components/animations/motion-components";
import { AnimatedCard } from "@/components/animations/micro-interactions";
import { SectionFloatingElements } from "@/components/ui/floating-elements";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl?: string | null;
  category: string;
  technologies: string[];
  featured: boolean;
  order: number;
};

type ProjectsProps = {
  data: Project[];
};

// Modern Category Filter Component
function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categories.map((category, index) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <ModernButton
            variant={selectedCategory === category ? "gradient" : "ghost"}
            size="md"
            onClick={() => onCategoryChange(category)}
            className={cn(
              "capitalize transition-all duration-300",
              selectedCategory === category
                ? "shadow-glow"
                : "hover:bg-primary-50 dark:hover:bg-primary-950"
            )}
          >
            {category === "all" ? "All Projects" : category}
          </ModernButton>
        </motion.div>
      ))}
    </div>
  );
}

// Technology Badge Component
function TechBadge({ tech, index }: { tech: string; index: number }) {
  return (
    <motion.span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-primary-50 to-accent-cyan/10 text-primary-700 border border-primary-200/50 hover:border-primary-300 transition-colors duration-200"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
      whileHover={{ scale: 1.05 }}
    >
      {tech}
    </motion.span>
  );
}

// Modern Project Card Component
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  // Determine card size based on featured status and index
  const getCardSize = () => {
    if (project.featured && index === 0) return "lg:col-span-2 lg:row-span-2";
    if (project.featured) return "lg:col-span-2";
    return "lg:col-span-1";
  };

  const getImageHeight = () => {
    if (project.featured && index === 0) return "h-80 lg:h-96";
    if (project.featured) return "h-64";
    return "h-48";
  };

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 border border-border/50",
        "hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-500",
        getCardSize()
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className={cn("relative overflow-hidden", getImageHeight())}>
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured badge */}
        {project.featured && (
          <motion.div
            className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-primary text-white text-xs font-medium shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          >
            <Star className="w-3 h-3" />
            Featured
          </motion.div>
        )}

        {/* Hover overlay with actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {project.projectUrl && (
                <motion.a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-neutral-900 rounded-lg font-medium hover:bg-white transition-colors duration-200"
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{
                    delay: 0.1,
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  View Project
                </motion.a>
              )}

              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-primary-600/90 backdrop-blur-sm text-white rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200"
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-4 h-4" />
                Preview
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Typography.Heading
            size="md"
            className="group-hover:text-primary-600 transition-colors duration-200"
          >
            {project.title}
          </Typography.Heading>
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {project.category}
          </span>
        </div>

        <Typography.Body size="md" color="muted" className="mb-4 line-clamp-2">
          {project.description}
        </Typography.Body>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <TechBadge key={tech} tech={tech} index={techIndex} />
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Project Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>2024</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            <span>4.9</span>
          </div>
        </div>
      </div>

      {/* Card glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

export function Projects({ data }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const categories = [
    "all",
    ...Array.from(new Set(data.map((project) => project.category))),
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? data.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      : data.filter((project) => project.category === selectedCategory);

  return (
    <section
      id="projects"
      className="relative py-20 bg-gradient-background-light dark:bg-gradient-background-dark overflow-hidden"
    >
      {/* Floating elements */}
      <SectionFloatingElements density="low" colors="accent" />

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
              Featured Projects
            </Typography.Display>
          </ScrollReveal>

          <ScrollReveal type="up" threshold={0.1}>
            <Typography.Body
              size="xl"
              color="muted"
              className="max-w-3xl mx-auto mb-8"
            >
              Discover our portfolio of innovative digital solutions, from
              cutting-edge web applications to mobile experiences that drive
              real business results.
            </Typography.Body>
          </ScrollReveal>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </motion.div>
        </div>

        {/* Projects Grid - Bento Box Layout */}
        <div ref={sectionRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Typography.Body size="lg" color="muted" className="mb-6">
            Ready to bring your vision to life?
          </Typography.Body>
          <ModernButton
            variant="gradient"
            size="lg"
            glow
            icon={<ExternalLink className="w-5 h-5" />}
            iconPosition="right"
          >
            Start Your Project
          </ModernButton>
        </motion.div>
      </div>
    </section>
  );
}
