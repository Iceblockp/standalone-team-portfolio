"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export function Hero({ data }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden" id="hero">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background z-0" />

      {/* Parallax background image with overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage: `url('${data.imageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 font-poppins"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={textVariants}
        >
          {data.title}
        </motion.h1>
        
        <motion.h2 
          className="text-xl md:text-2xl lg:text-3xl font-medium text-white/90 mb-6"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={textVariants}
        >
          {data.subtitle}
        </motion.h2>
        
        <motion.p 
          className="text-base md:text-lg text-white/80 max-w-2xl mb-8"
          initial="hidden"
          animate="visible"
          custom={2}
          variants={textVariants}
        >
          {data.description}
        </motion.p>
        
        {data.buttonText && data.buttonUrl && (
          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={textVariants}
          >
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href={data.buttonUrl}>{data.buttonText}</Link>
            </Button>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/70 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}