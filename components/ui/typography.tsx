/**
 * Typography Components
 *
 * Reusable typography components with consistent styling,
 * responsive behavior, and accessibility features.
 */

import React from "react";
import { cn } from "@/lib/utils";
import { typographyScale } from "@/lib/theme/typography";

// Base Typography Props
interface BaseTypographyProps {
  className?: string;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  color?:
    | "default"
    | "muted"
    | "primary"
    | "accent"
    | "success"
    | "warning"
    | "error";
  gradient?: boolean;
  gradientType?: "primary" | "secondary" | "cyan" | "purple";
}

// Color mapping
const colorClasses = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary-700",
  accent: "text-accent-cyan",
  success: "text-success",
  warning: "text-warning",
  error: "text-error",
};

const gradientClasses = {
  primary: "gradient-text-primary",
  secondary: "gradient-text-secondary",
  cyan: "gradient-text-cyan",
  purple: "gradient-text-purple",
};

// Display Typography Components
interface DisplayProps extends BaseTypographyProps {
  size?: "xl" | "lg" | "md";
}

export function Display({
  size = "xl",
  className,
  children,
  as: Component = "h1",
  color = "default",
  gradient = false,
  gradientType = "primary",
  ...props
}: DisplayProps) {
  const sizeClasses = {
    xl: "text-display-xl",
    lg: "text-display-lg",
    md: "text-display-md",
  };

  return (
    <Component
      className={cn(
        "font-secondary font-extrabold tracking-tight",
        sizeClasses[size],
        gradient ? gradientClasses[gradientType] : colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// Heading Typography Components
interface HeadingProps extends BaseTypographyProps {
  size?: "xl" | "lg" | "md" | "sm";
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Heading({
  size = "lg",
  level,
  className,
  children,
  as,
  color = "default",
  gradient = false,
  gradientType = "primary",
  ...props
}: HeadingProps) {
  const sizeClasses = {
    xl: "text-heading-xl",
    lg: "text-heading-lg",
    md: "text-heading-md",
    sm: "text-heading-sm",
  };

  // Auto-determine component based on level or size
  const defaultComponent =
    as || (level ? (`h${level}` as keyof JSX.IntrinsicElements) : "h2");

  return React.createElement(
    defaultComponent,
    {
      className: cn(
        "font-primary font-bold tracking-tight",
        sizeClasses[size],
        gradient ? gradientClasses[gradientType] : colorClasses[color],
        className
      ),
      ...props,
    },
    children
  );
}

// Body Typography Components
interface BodyProps extends BaseTypographyProps {
  size?: "xl" | "lg" | "md" | "sm";
  weight?: "normal" | "medium" | "semibold";
}

export function Body({
  size = "lg",
  weight = "normal",
  className,
  children,
  as: Component = "p",
  color = "default",
  ...props
}: BodyProps) {
  const sizeClasses = {
    xl: "text-body-xl",
    lg: "text-body-lg",
    md: "text-body-md",
    sm: "text-body-sm",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
  };

  return (
    <Component
      className={cn(
        "font-primary",
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// Code Typography Components
interface CodeProps extends BaseTypographyProps {
  size?: "lg" | "md" | "sm";
  inline?: boolean;
}

export function Code({
  size = "md",
  inline = false,
  className,
  children,
  as,
  color = "default",
  ...props
}: CodeProps) {
  const sizeClasses = {
    lg: "text-code-lg",
    md: "text-code-md",
    sm: "text-code-sm",
  };

  const Component = as || (inline ? "code" : "pre");

  return (
    <Component
      className={cn(
        "font-mono",
        sizeClasses[size],
        inline
          ? "px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
          : "p-4 rounded-lg bg-muted overflow-x-auto",
        colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// Lead Text Component (Larger body text for introductions)
interface LeadProps extends BaseTypographyProps {
  size?: "lg" | "md";
}

export function Lead({
  size = "lg",
  className,
  children,
  as: Component = "p",
  color = "muted",
  ...props
}: LeadProps) {
  const sizeClasses = {
    lg: "text-xl",
    md: "text-lg",
  };

  return (
    <Component
      className={cn(
        "font-primary font-normal leading-relaxed",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// Muted Text Component
interface MutedProps extends BaseTypographyProps {
  size?: "md" | "sm";
}

export function Muted({
  size = "sm",
  className,
  children,
  as: Component = "span",
  ...props
}: MutedProps) {
  const sizeClasses = {
    md: "text-body-md",
    sm: "text-body-sm",
  };

  return (
    <Component
      className={cn(
        "font-primary font-normal",
        sizeClasses[size],
        "text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// List Components
interface ListProps
  extends React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  ordered?: boolean;
  children: React.ReactNode;
}

export function List({
  ordered = false,
  className,
  children,
  ...props
}: ListProps) {
  const Component = ordered ? "ol" : "ul";

  return (
    <Component
      className={cn(
        "space-y-2 text-body-lg font-primary",
        ordered ? "list-decimal list-inside" : "list-disc list-inside",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// Blockquote Component
interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode;
  cite?: string;
}

export function Blockquote({
  className,
  children,
  cite,
  ...props
}: BlockquoteProps) {
  return (
    <blockquote
      className={cn(
        "border-l-4 border-primary-500 pl-6 italic text-body-lg font-primary",
        "text-muted-foreground",
        className
      )}
      cite={cite}
      {...props}
    >
      {children}
    </blockquote>
  );
}

// Typography Showcase Component (for development/testing)
export function TypographyShowcase() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-heading-lg font-bold mb-4">Display Typography</h2>
        <div className="space-y-4">
          <Display size="xl">Display XL - Hero Headlines</Display>
          <Display size="lg">Display LG - Section Heroes</Display>
          <Display size="md">Display MD - Major Headings</Display>
        </div>
      </div>

      <div>
        <h2 className="text-heading-lg font-bold mb-4">Headings</h2>
        <div className="space-y-3">
          <Heading size="xl">Heading XL - H1</Heading>
          <Heading size="lg">Heading LG - H2</Heading>
          <Heading size="md">Heading MD - H3</Heading>
          <Heading size="sm">Heading SM - H4</Heading>
        </div>
      </div>

      <div>
        <h2 className="text-heading-lg font-bold mb-4">Body Text</h2>
        <div className="space-y-3">
          <Body size="xl">Body XL - Large body text for emphasis</Body>
          <Body size="lg">Body LG - Standard body text for most content</Body>
          <Body size="md">
            Body MD - Smaller body text for secondary content
          </Body>
          <Body size="sm">Body SM - Caption and fine print text</Body>
        </div>
      </div>

      <div>
        <h2 className="text-heading-lg font-bold mb-4">Gradient Text</h2>
        <div className="space-y-3">
          <Display size="lg" gradient gradientType="primary">
            Primary Gradient
          </Display>
          <Display size="lg" gradient gradientType="cyan">
            Cyan Gradient
          </Display>
          <Display size="lg" gradient gradientType="purple">
            Purple Gradient
          </Display>
        </div>
      </div>

      <div>
        <h2 className="text-heading-lg font-bold mb-4">Code</h2>
        <div className="space-y-3">
          <Body>
            Inline code: <Code inline>const hello = 'world';</Code>
          </Body>
          <Code>
            {`function greet(name: string) {
  return \`Hello, \${name}!\`;
}`}
          </Code>
        </div>
      </div>
    </div>
  );
}

// Export all typography components
export const Typography = {
  Display,
  Heading,
  Body,
  Code,
  Lead,
  Muted,
  List,
  Blockquote,
  Showcase: TypographyShowcase,
};
