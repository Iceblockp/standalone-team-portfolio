"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { IconButton } from "@/components/ui/modern-button";
import { ThemeToggle } from "@/components/site/theme-toggle";

import { useScrollDirection } from "@/hooks/use-scroll-animations";
import Image from "next/image";

const navItems = [
  { href: "#solutions", label: "Solutions", icon: "💡" },
  { href: "#process", label: "Process", icon: "⚡" },
  // { href: "#team", label: "Team", icon: "👥" },
  { href: "#projects", label: "Projects", icon: "🚀" },
  { href: "#tech", label: "Tech", icon: "⚙️" },
  { href: "#contact", label: "Contact", icon: "📧" },
];

// Modern Logo Component
function ModernLogo({ isScrolled }: { isScrolled: boolean }) {
  return (
    <Link href="/" className="relative group">
      <motion.div
        className="flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {/* Logo icon with glow effect */}
        <motion.div
          className="relative"
          animate={isScrolled ? { scale: 0.9 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-glow group-hover:shadow-glow-purple transition-all duration-300">
            {/* <Sparkles className="w-4 h-4 text-primary-foreground" /> */}
            <Image
              src={"/images/icon.png"}
              alt="logo"
              width={400}
              height={400}
              className=" w-8 h-8"
            />
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300 -z-10" />
        </motion.div>

        {/* Logo text */}
        <motion.div
          className="font-secondary font-bold"
          animate={
            isScrolled ? { fontSize: "1.25rem" } : { fontSize: "1.5rem" }
          }
          transition={{ duration: 0.3 }}
        >
          <span className="gradient-text-primary">
            INNO<span className="text-accent-cyan">BYTEX</span>
          </span>
        </motion.div>
      </motion.div>
    </Link>
  );
}

// Navigation Link Component
function NavLink({
  href,
  label,
  icon,
  onClick,
  isScrolled,
}: {
  href: string;
  label: string;
  icon: string;
  onClick?: () => void;
  isScrolled: boolean;
}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector(href);
      if (element) {
        const rect = element.getBoundingClientRect();
        setIsActive(rect.top <= 100 && rect.bottom >= 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [href]);

  return (
    <motion.div
      className="relative"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300",
          "text-sm font-medium",
          isActive
            ? isScrolled
              ? "text-primary-700 bg-primary-50 dark:text-primary-400 dark:bg-primary-950"
              : "text-primary-300 bg-primary-900/20 dark:text-primary-400 dark:bg-primary-950"
            : isScrolled
            ? "text-neutral-800 hover:text-neutral-900 hover:bg-neutral-100/80 dark:text-neutral-200 dark:hover:text-neutral-100 dark:hover:bg-neutral-800/80"
            : "text-white hover:text-primary-200 hover:bg-white/10 dark:text-neutral-200 dark:hover:text-neutral-100 dark:hover:bg-neutral-800/80"
        )}
      >
        <span className="text-xs">{icon}</span>
        <span>{label}</span>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-1/2 w-1 h-1 bg-primary-500 rounded-full"
            layoutId="activeIndicator"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ x: "-50%", y: "8px" }}
          />
        )}
      </Link>
    </motion.div>
  );
}

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollDirection = useScrollDirection();
  const { scrollY } = useScroll();

  // Transform for header hide/show based on scroll direction
  const headerY = useTransform(
    scrollY,
    [0, 100, 200],
    [
      0,
      scrollDirection === "down" ? -100 : 0,
      scrollDirection === "down" ? -100 : 0,
    ]
  );

  // Handle scroll event for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest("header")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        isScrolled
          ? "glass-header shadow-lg border-b border-white/10"
          : "bg-transparent"
      )}
      style={{ y: headerY }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Main header content */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <ModernLogo isScrolled={isScrolled} />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isScrolled={isScrolled}
              />
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle isScrolled={isScrolled} />

            {/* CTA Button - hidden on mobile */}
            <motion.div
              className="hidden md:block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="#contact"
                className="px-4 py-2 bg-gradient-primary text-primary-foreground text-sm font-medium rounded-lg shadow-md hover:shadow-button-hover transition-all duration-300"
              >
                Get Started
              </Link>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <IconButton
                icon={
                  isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )
                }
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                size="md"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className={cn(
                  "relative",
                  !isScrolled && "text-white hover:bg-white/10"
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden glass-header border-t border-neutral-200/50 dark:border-neutral-700/50"
          >
            <div className="container mx-auto px-4 py-6">
              {/* Mobile navigation links */}
              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <NavLink
                      href={item.href}
                      label={item.label}
                      icon={item.icon}
                      onClick={() => setIsOpen(false)}
                      isScrolled={isScrolled}
                    />
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <motion.div
                className="mt-6 pt-6 border-t border-neutral-200/50 dark:border-neutral-700/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Link
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-3 bg-gradient-primary text-primary-foreground text-center font-medium rounded-lg shadow-md hover:shadow-button-hover transition-all duration-300"
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-primary origin-left"
        style={{
          scaleX: useTransform(scrollY, [0, 2000], [0, 1]),
        }}
      />
    </motion.header>
  );
}
