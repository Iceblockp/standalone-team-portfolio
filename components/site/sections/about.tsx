"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

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

export function About({ data }: AboutProps) {
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
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Image */}
          <motion.div
            variants={itemVariants}
            className="relative rounded-lg overflow-hidden"
          >
            <Image
              src={data.imageUrl}
              alt="About Us"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Content */}
          <div>
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4 font-poppins"
            >
              {data.title}
            </motion.h2>

            <motion.h3
              variants={itemVariants}
              className="text-xl font-medium text-primary mb-4"
            >
              {data.subtitle}
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-muted-foreground mb-6"
            >
              {data.description}
            </motion.p>

            <motion.div variants={containerVariants} className="space-y-3">
              {data.features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-2"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
