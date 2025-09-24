/**
 * Glassmorphism UI Components
 *
 * Reusable components that implement glassmorphism effects
 * with proper theming and accessibility support.
 */

import React from "react";
import { cn } from "@/lib/utils";
import { glassmorphism } from "@/lib/theme/gradients";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "light" | "dark" | "card" | "header";
  intensity?: "subtle" | "medium" | "strong";
  children: React.ReactNode;
}

export function GlassCard({
  variant = "card",
  intensity = "medium",
  className,
  children,
  ...props
}: GlassCardProps) {
  const getGlassStyles = () => {
    const baseStyles = glassmorphism[variant];

    // Adjust intensity
    const intensityMultiplier = {
      subtle: 0.5,
      medium: 1,
      strong: 1.5,
    }[intensity];

    return {
      background: baseStyles.background,
      backdropFilter: `blur(${
        parseInt(baseStyles.backdropFilter.match(/\d+/)?.[0] || "10") *
        intensityMultiplier
      }px)`,
      border: baseStyles.border,
      boxShadow: baseStyles.boxShadow,
    };
  };

  return (
    <div
      className={cn("rounded-lg transition-all duration-300", className)}
      style={getGlassStyles()}
      {...props}
    >
      {children}
    </div>
  );
}

interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function GlassButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: GlassButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantStyles = {
    primary: {
      background: "rgba(0, 212, 255, 0.1)",
      border: "1px solid rgba(0, 212, 255, 0.3)",
      color: "var(--color-accent-cyan)",
    },
    secondary: {
      background: "rgba(124, 58, 237, 0.1)",
      border: "1px solid rgba(124, 58, 237, 0.3)",
      color: "var(--color-accent-purple)",
    },
    ghost: {
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      color: "var(--color-neutral-200)",
    },
  };

  return (
    <button
      className={cn(
        "rounded-lg backdrop-blur-md transition-all duration-300",
        "hover:backdrop-blur-lg hover:shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "active:scale-95",
        sizeClasses[size],
        className
      )}
      style={variantStyles[variant]}
      {...props}
    >
      {children}
    </button>
  );
}

interface GlassHeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  sticky?: boolean;
}

export function GlassHeader({
  children,
  sticky = true,
  className,
  ...props
}: GlassHeaderProps) {
  return (
    <header
      className={cn(
        "backdrop-blur-xl border-b transition-all duration-300",
        sticky && "sticky top-0 z-50",
        className
      )}
      style={{
        background: "rgba(255, 255, 255, 0.8)",
        borderColor: "rgba(255, 255, 255, 0.3)",
        boxShadow: "0 2px 16px 0 rgba(0, 0, 0, 0.1)",
      }}
      {...props}
    >
      {children}
    </header>
  );
}

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function GlassModal({
  isOpen,
  onClose,
  children,
  className,
}: GlassModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <div
        className={cn("max-w-md w-full rounded-xl p-6", className)}
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  gradient?: string;
  children: React.ReactNode;
}

export function GradientText({
  gradient = "var(--gradient-primary)",
  children,
  className,
  ...props
}: GradientTextProps) {
  return (
    <span
      className={cn("bg-clip-text text-transparent font-bold", className)}
      style={{
        backgroundImage: gradient,
      }}
      {...props}
    >
      {children}
    </span>
  );
}

interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: string;
  borderWidth?: number;
  children: React.ReactNode;
}

export function GradientBorder({
  gradient = "var(--gradient-primary)",
  borderWidth = 2,
  children,
  className,
  ...props
}: GradientBorderProps) {
  return (
    <div
      className={cn("rounded-lg p-px", className)}
      style={{
        backgroundImage: gradient,
      }}
      {...props}
    >
      <div
        className="h-full w-full rounded-lg bg-background"
        style={{
          margin: `-${borderWidth}px`,
          padding: `${borderWidth}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Export all glassmorphism components
export const Glass = {
  Card: GlassCard,
  Button: GlassButton,
  Header: GlassHeader,
  Modal: GlassModal,
  Text: GradientText,
  Border: GradientBorder,
};
