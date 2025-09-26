/**
 * Micro-Interaction Components
 *
 * Small, delightful animations that enhance user experience
 * and provide feedback for user actions.
 */

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { durations, easings, microInteractions } from "@/lib/animations/config";
import { cn } from "@/lib/utils";

// Animated Button Component
interface AnimatedButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    | "onDrag"
    | "onDragEnd"
    | "onDragStart"
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
  > {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  success?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export function AnimatedButton({
  variant = "primary",
  size = "md",
  loading = false,
  success = false,
  icon,
  iconPosition = "right",
  className,
  children,
  disabled,
  ...props
}: AnimatedButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses =
    "relative overflow-hidden rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-gradient-primary text-primary-foreground hover:shadow-button-hover focus:ring-primary-500",
    secondary:
      "bg-gradient-secondary text-primary-foreground hover:shadow-lg focus:ring-primary-500",
    ghost: "text-primary-700 hover:bg-primary-50 focus:ring-primary-500",
    outline:
      "border-2 border-primary-500 text-primary-700 hover:bg-primary-50 focus:ring-primary-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={disabled || loading}
      {...props}
    >
      {/* Ripple effect */}
      <AnimatePresence>
        {isPressed && (
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-lg"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <motion.div
        className="flex items-center justify-center gap-2"
        animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
      >
        {/* Left icon */}
        {icon && iconPosition === "left" && !loading && !success && (
          <motion.span
            className="flex-shrink-0"
            whileHover={{ x: -2 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}

        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}

        {success ? (
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
        ) : null}

        <span>{children}</span>

        {/* Right icon */}
        {icon && iconPosition === "right" && !loading && !success && (
          <motion.span
            className="flex-shrink-0"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}
      </motion.div>
    </motion.button>
  );
}

// Animated Input Component
interface AnimatedInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    | "onDrag"
    | "onDragEnd"
    | "onDragStart"
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onAnimationIteration"
  > {
  label?: string;
  error?: string;
  success?: boolean;
}

export function AnimatedInput({
  label,
  error,
  success = false,
  className,
  ...props
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
    props.onBlur?.(e);
  };

  return (
    <div className="relative">
      <motion.div
        className="relative"
        animate={isFocused ? "focused" : "blurred"}
      >
        <motion.input
          className={cn(
            "w-full px-4 py-3 border-2 rounded-lg bg-white dark:bg-neutral-800 transition-colors duration-200",
            "focus:outline-none focus:ring-0",
            error
              ? "border-error text-error"
              : success
              ? "border-success"
              : "border-neutral-300 focus:border-primary-500 dark:border-neutral-600 dark:focus:border-primary-400",
            className
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          variants={{
            focused: microInteractions.inputFocus,
            blurred: microInteractions.inputBlur,
          }}
          {...props}
        />

        {/* Floating Label */}
        {label && (
          <motion.label
            className={cn(
              "absolute left-4 pointer-events-none transition-all duration-200",
              error
                ? "text-error"
                : success
                ? "text-success"
                : "text-muted-foreground"
            )}
            animate={{
              y: isFocused || hasValue ? -28 : 0,
              scale: isFocused || hasValue ? 0.85 : 1,
              color: isFocused
                ? "var(--color-primary-500)"
                : error
                ? "var(--color-semantic-error)"
                : "var(--color-neutral-500)",
            }}
            style={{ originX: 0, originY: 0 }}
          >
            {label}
          </motion.label>
        )}

        {/* Success/Error Icons */}
        <AnimatePresence>
          {(success || error) && (
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {success ? (
                <svg
                  className="w-5 h-5 text-success"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-error"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.p
            className="mt-1 text-sm text-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: durations.fast / 1000 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Animated Toggle Switch
interface AnimatedToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export function AnimatedToggle({
  checked,
  onChange,
  label,
  disabled = false,
  size = "md",
}: AnimatedToggleProps) {
  const sizeConfig = {
    sm: { width: 36, height: 20, thumbSize: 16, translateX: 16 },
    md: { width: 44, height: 24, thumbSize: 20, translateX: 20 },
    lg: { width: 52, height: 28, thumbSize: 24, translateX: 24 },
  };

  const config = sizeConfig[size];

  return (
    <div className="flex items-center gap-3">
      <motion.button
        className={cn(
          "relative rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        style={{
          width: config.width,
          height: config.height,
          backgroundColor: checked
            ? "var(--color-primary-500)"
            : "var(--color-neutral-400)",
        }}
        onClick={() => !disabled && onChange(!checked)}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        disabled={disabled}
      >
        <motion.div
          className="absolute top-0.5 left-0.5 bg-white rounded-full shadow-md"
          style={{
            width: config.thumbSize,
            height: config.thumbSize,
          }}
          animate={{
            x: checked ? config.translateX : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </motion.button>

      {label && (
        <span className={cn("text-sm font-medium", disabled && "opacity-50")}>
          {label}
        </span>
      )}
    </div>
  );
}

// Animated Card with Hover Effects
interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: "lift" | "scale" | "glow" | "none";
  clickable?: boolean;
  onClick?: () => void;
}

export function AnimatedCard({
  children,
  className,
  hoverEffect = "lift",
  clickable = false,
  onClick,
}: AnimatedCardProps) {
  const hoverEffects = {
    lift: {
      rest: { y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
      hover: { y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" },
    },
    scale: {
      rest: { scale: 1 },
      hover: { scale: 1.02 },
    },
    glow: {
      rest: { boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
      hover: { boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" },
    },
    none: {
      rest: {},
      hover: {},
    },
  };

  return (
    <motion.div
      className={cn(
        "rounded-lg bg-white dark:bg-slate-800 border border-border p-6 transition-colors duration-200",
        clickable && "cursor-pointer",
        className
      )}
      initial="rest"
      whileHover="hover"
      whileTap={clickable ? { scale: 0.98 } : {}}
      variants={hoverEffects[hoverEffect]}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// Animated Progress Bar
interface AnimatedProgressProps {
  value: number;
  max?: number;
  showValue?: boolean;
  color?: "primary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AnimatedProgress({
  value,
  max = 100,
  showValue = false,
  color = "primary",
  size = "md",
  className,
}: AnimatedProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const colorClasses = {
    primary: "bg-gradient-primary",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
  };

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "w-full bg-neutral-200 rounded-full overflow-hidden",
          sizeClasses[size]
        )}
      >
        <motion.div
          className={cn("h-full rounded-full", colorClasses[color])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{
            duration: 1,
            ease: easings.smooth,
          }}
        />
      </div>

      {showValue && (
        <motion.span
          className="absolute right-0 top-full mt-1 text-sm font-medium text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {Math.round(percentage)}%
        </motion.span>
      )}
    </div>
  );
}

// Export all micro-interaction components
export const MicroInteractions = {
  AnimatedButton,
  AnimatedInput,
  AnimatedToggle,
  AnimatedCard,
  AnimatedProgress,
};
