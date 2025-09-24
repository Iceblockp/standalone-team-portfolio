/**
 * Modern Button Component
 *
 * Enhanced button component with gradient effects, animations,
 * and consistent styling using the centralized design system.
 */

"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModernButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    | "onDrag"
    | "onDragEnd"
    | "onDragStart"
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
  > {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  success?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  glow?: boolean;
  children: React.ReactNode;
}

export function ModernButton({
  variant = "primary",
  size = "md",
  loading = false,
  success = false,
  icon,
  iconPosition = "right",
  glow = false,
  className,
  children,
  disabled,
  ...props
}: ModernButtonProps) {
  // Filter out custom props that shouldn't be passed to DOM
  const buttonProps = props;
  const baseClasses = cn(
    "relative inline-flex items-center justify-center gap-2 font-semibold",
    "rounded-xl transition-all duration-300 ease-out",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "overflow-hidden group"
  );

  const variantClasses = {
    primary: cn(
      "bg-primary-700 text-white hover:bg-primary-600",
      "focus:ring-primary-500 shadow-md hover:shadow-lg",
      glow && "hover:shadow-glow"
    ),
    secondary: cn(
      "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
      "dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
      "focus:ring-neutral-500 shadow-sm hover:shadow-md"
    ),
    ghost: cn(
      "text-primary-700 hover:bg-primary-50",
      "dark:text-primary-400 dark:hover:bg-primary-950",
      "focus:ring-primary-500"
    ),
    outline: cn(
      "border-2 border-primary-500 text-primary-700 hover:bg-primary-50",
      "dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950",
      "focus:ring-primary-500"
    ),
    gradient: cn(
      "bg-gradient-primary text-white shadow-lg",
      "hover:shadow-button-hover focus:ring-primary-500",
      glow && "hover:shadow-glow"
    ),
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled || loading}
      {...buttonProps}
    >
      {/* Shimmer effect for gradient buttons */}
      {variant === "gradient" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/10 rounded-xl opacity-0"
        whileTap={{ opacity: 1, scale: 1 }}
        initial={{ scale: 0 }}
        transition={{ duration: 0.2 }}
      />

      {/* Content */}
      <div className="relative flex items-center gap-2">
        {/* Left icon */}
        {icon && iconPosition === "left" && (
          <motion.span
            className="flex-shrink-0"
            whileHover={{ x: -2 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}

        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Success checkmark */}
        {success && (
          <motion.svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        )}

        {/* Button text */}
        <span className="relative">{children}</span>

        {/* Right icon */}
        {icon && iconPosition === "right" && (
          <motion.span
            className="flex-shrink-0"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}

// Specialized CTA Button for hero sections
interface CTAButtonProps extends Omit<ModernButtonProps, "variant"> {
  variant?: "primary" | "secondary";
}

export function CTAButton({
  variant = "primary",
  glow = true,
  ...props
}: CTAButtonProps) {
  return (
    <ModernButton
      variant={variant === "primary" ? "gradient" : "secondary"}
      size="lg"
      glow={glow}
      {...props}
    />
  );
}

// Icon button variant
interface IconButtonProps extends Omit<ModernButtonProps, "children"> {
  icon: React.ReactNode;
  "aria-label": string;
}

export function IconButton({
  icon,
  size = "md",
  variant = "ghost",
  className,
  ...props
}: IconButtonProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-14 h-14",
  };

  return (
    <ModernButton
      variant={variant}
      className={cn("rounded-full p-0", sizeClasses[size], className)}
      {...props}
    >
      {icon}
    </ModernButton>
  );
}
