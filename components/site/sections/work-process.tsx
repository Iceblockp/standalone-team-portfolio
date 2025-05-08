"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

const lucideIcons: Record<string, any> = {};

// const importIcon = (iconName: string) => {
//   if (lucideIcons[iconName]) return lucideIcons[iconName];

//   try {
//     const icon = dynamic(() =>
//       import("lucide-react").then((mod) => mod[iconName as keyof typeof import("lucide-react")])
//     );
//     lucideIcons[iconName] = icon;
//     return icon;
//   } catch (error) {
//     console.error(`Icon not found: ${iconName}`);
//     return dynamic(() => import("lucide-react").then((mod) => mod.HelpCircle));
//   }
// };

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

export function WorkProcess({ data }: WorkProcessProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      },
    },
  };

  return (
    <section id="process" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 font-poppins"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our Work Process
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            How we transform your ideas into reality
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {data.map((step, index) => {
            const Icon =
              (LucideIcons as any)[step.icon] || LucideIcons.HelpCircle;

            return (
              <motion.div
                key={step.id}
                className={cn(
                  "relative z-10",
                  "flex flex-col items-center text-center"
                )}
                variants={itemVariants}
              >
                <div className="mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            );
          })}

          {/* Connecting lines between steps */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary/10 -translate-y-1/2 hidden lg:block" />
        </motion.div>
      </div>
    </section>
  );
}
