/**
 * Runtime Color Validation System
 *
 * Provides real-time validation of color combinations to prevent
 * accessibility violations during theme customization.
 */

import { getContrastRatio, meetsWCAGAA, meetsWCAGAAA } from "./validation";

export interface ValidationRule {
  id: string;
  name: string;
  foreground: string;
  background: string;
  minRatio: number;
  isLargeText?: boolean;
}

export interface ValidationResult {
  rule: ValidationRule;
  ratio: number;
  passes: boolean;
  level: "AAA" | "AA" | "FAIL";
  severity: "error" | "warning" | "success";
}

/**
 * Default validation rules for common UI combinations
 */
export const defaultValidationRules: ValidationRule[] = [
  {
    id: "primary-text-light",
    name: "Primary text on light background",
    foreground: "var(--color-primary-900)",
    background: "var(--color-neutral-50)",
    minRatio: 4.5,
  },
  {
    id: "primary-text-dark",
    name: "Primary text on dark background",
    foreground: "var(--color-neutral-50)",
    background: "var(--color-primary-900)",
    minRatio: 4.5,
  },
  {
    id: "accent-cyan-primary",
    name: "Cyan accent on primary background",
    foreground: "var(--color-accent-cyan)",
    background: "var(--color-primary-900)",
    minRatio: 4.5,
  },
  {
    id: "accent-purple-light",
    name: "Purple accent on light background",
    foreground: "var(--color-accent-purple)",
    background: "var(--color-neutral-50)",
    minRatio: 4.5,
  },
  {
    id: "success-light",
    name: "Success color on light background",
    foreground: "var(--color-semantic-success)",
    background: "var(--color-neutral-50)",
    minRatio: 4.5,
  },
  {
    id: "error-light",
    name: "Error color on light background",
    foreground: "var(--color-semantic-error)",
    background: "var(--color-neutral-50)",
    minRatio: 4.5,
  },
  {
    id: "warning-light",
    name: "Warning color on light background",
    foreground: "var(--color-semantic-warning)",
    background: "var(--color-neutral-50)",
    minRatio: 4.5,
  },
];

/**
 * Get computed color value from CSS custom property
 */
function getComputedColor(cssVar: string): string {
  if (typeof window === "undefined") return "#000000";

  const computed = getComputedStyle(document.documentElement).getPropertyValue(
    cssVar.replace("var(", "").replace(")", "")
  );

  return computed.trim() || "#000000";
}

/**
 * Validate a single color combination rule
 */
export function validateRule(rule: ValidationRule): ValidationResult {
  const foregroundColor = getComputedColor(rule.foreground);
  const backgroundColor = getComputedColor(rule.background);

  const ratio = getContrastRatio(foregroundColor, backgroundColor);
  const passesAA = meetsWCAGAA(
    foregroundColor,
    backgroundColor,
    rule.isLargeText
  );
  const passesAAA = meetsWCAGAAA(
    foregroundColor,
    backgroundColor,
    rule.isLargeText
  );

  let level: "AAA" | "AA" | "FAIL";
  let severity: "error" | "warning" | "success";

  if (passesAAA) {
    level = "AAA";
    severity = "success";
  } else if (passesAA) {
    level = "AA";
    severity = "success";
  } else {
    level = "FAIL";
    severity = "error";
  }

  return {
    rule,
    ratio: Math.round(ratio * 100) / 100,
    passes: passesAA,
    level,
    severity,
  };
}

/**
 * Validate all rules
 */
export function validateAllRules(
  rules: ValidationRule[] = defaultValidationRules
): ValidationResult[] {
  return rules.map(validateRule);
}

/**
 * Get validation summary
 */
export function getValidationSummary(results: ValidationResult[]) {
  const total = results.length;
  const passed = results.filter((r) => r.passes).length;
  const failed = total - passed;
  const percentage = Math.round((passed / total) * 100);

  const errors = results.filter((r) => r.severity === "error").length;
  const warnings = results.filter((r) => r.severity === "warning").length;

  return {
    total,
    passed,
    failed,
    percentage,
    errors,
    warnings,
    isValid: failed === 0,
  };
}

/**
 * Runtime validation class for continuous monitoring
 */
export class RuntimeValidator {
  private rules: ValidationRule[];
  private callbacks: Array<(results: ValidationResult[]) => void> = [];
  private observer: MutationObserver | null = null;

  constructor(rules: ValidationRule[] = defaultValidationRules) {
    this.rules = rules;
  }

  /**
   * Start monitoring for theme changes
   */
  startMonitoring() {
    if (typeof window === "undefined") return;

    this.observer = new MutationObserver(() => {
      this.validate();
    });

    this.observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    // Initial validation
    this.validate();
  }

  /**
   * Stop monitoring
   */
  stopMonitoring() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  /**
   * Add validation callback
   */
  onValidation(callback: (results: ValidationResult[]) => void) {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  /**
   * Run validation and notify callbacks
   */
  validate() {
    const results = validateAllRules(this.rules);
    this.callbacks.forEach((callback) => callback(results));
    return results;
  }

  /**
   * Add custom validation rule
   */
  addRule(rule: ValidationRule) {
    this.rules.push(rule);
  }

  /**
   * Remove validation rule
   */
  removeRule(ruleId: string) {
    this.rules = this.rules.filter((rule) => rule.id !== ruleId);
  }

  /**
   * Update validation rule
   */
  updateRule(ruleId: string, updates: Partial<ValidationRule>) {
    const index = this.rules.findIndex((rule) => rule.id === ruleId);
    if (index > -1) {
      this.rules[index] = { ...this.rules[index], ...updates };
    }
  }
}

/**
 * Create a singleton validator instance
 */
export const runtimeValidator = new RuntimeValidator();

/**
 * React hook for runtime validation
 */
export function useRuntimeValidation() {
  const [results, setResults] = React.useState<ValidationResult[]>([]);

  React.useEffect(() => {
    const unsubscribe = runtimeValidator.onValidation(setResults);
    runtimeValidator.startMonitoring();

    return () => {
      unsubscribe();
      runtimeValidator.stopMonitoring();
    };
  }, []);

  const summary = React.useMemo(() => getValidationSummary(results), [results]);

  return {
    results,
    summary,
    validate: () => runtimeValidator.validate(),
    addRule: (rule: ValidationRule) => runtimeValidator.addRule(rule),
    removeRule: (ruleId: string) => runtimeValidator.removeRule(ruleId),
  };
}

// Import React for the hook
import React from "react";
