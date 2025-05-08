"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
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

export function Solutions({ data }: SolutionsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="solutions" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 font-poppins"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our Solutions
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We offer a comprehensive range of digital services tailored to meet
            your business needs
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {data.map((solution, index) => {
            const Icon =
              (LucideIcons as any)[solution.icon] || LucideIcons.HelpCircle;

            return (
              <motion.div
                key={solution.id}
                className={cn(
                  "bg-card hover:bg-card/80 p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300",
                  "border border-border/50 hover:border-primary/20",
                  "flex flex-col items-center md:items-start text-center md:text-left"
                )}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                <p className="text-muted-foreground">{solution.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
