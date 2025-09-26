"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 animate-pulse"></div>
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      className={cn(
        "relative w-10 h-10 rounded-lg transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
        "hover:scale-105 active:scale-95",
        isDark
          ? "bg-neutral-800 hover:bg-neutral-700 text-accent-cyan"
          : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Background glow effect */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-lg blur-md opacity-0 transition-opacity duration-300",
          isDark ? "bg-accent-cyan/20" : "bg-blue-500/20"
        )}
        animate={{ opacity: isDark ? 0.3 : 0.2 }}
      />

      {/* Icon container */}
      <div className="relative flex items-center justify-center w-full h-full">
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Sun className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: -90, scale: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Moon className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-current opacity-0"
        whileTap={{ opacity: 0.1, scale: 1 }}
        initial={{ scale: 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
}

// Alternative toggle switch style
export function ThemeToggleSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-12 h-6 rounded-full bg-neutral-200 animate-pulse"></div>
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      className={cn(
        "relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
        isDark ? "bg-primary-600" : "bg-neutral-300"
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Toggle thumb */}
      <motion.div
        className={cn(
          "absolute top-0.5 w-5 h-5 rounded-full shadow-md flex items-center justify-center",
          isDark ? "bg-accent-cyan" : "bg-white"
        )}
        animate={{
          x: isDark ? 24 : 2,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="sun-switch"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-3 h-3 text-neutral-800" />
            </motion.div>
          ) : (
            <motion.div
              key="moon-switch"
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -180 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-3 h-3 text-neutral-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
}
