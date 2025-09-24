"use client";

/**
 * Theme Customizer Component
 *
 * Provides a UI for customizing theme colors with real-time preview
 * and accessibility validation.
 */

import React, { useState } from "react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { colorAccessibility } from "@/lib/theme/validation";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

function ColorPicker({ label, value, onChange, className }: ColorPickerProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1">
        <label className="text-sm font-medium text-foreground/80">
          {label}
        </label>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-8 h-8 rounded border border-border cursor-pointer"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-2 py-1 text-sm border border-border rounded bg-background"
            placeholder="#000000"
          />
        </div>
      </div>
    </div>
  );
}

interface AccessibilityBadgeProps {
  foreground: string;
  background: string;
  label: string;
}

function AccessibilityBadge({
  foreground,
  background,
  label,
}: AccessibilityBadgeProps) {
  const result = colorAccessibility.check(foreground, background);

  const getVariant = () => {
    if (result.level === "AAA") return "default";
    if (result.level === "AA") return "secondary";
    return "destructive";
  };

  return (
    <Badge variant={getVariant()} className="text-xs">
      {label}: {result.ratio}:1 ({result.level})
    </Badge>
  );
}

export function ThemeCustomizer() {
  const {
    colors,
    updateColors,
    resetColors,
    validateAccessibility,
    isDark,
    toggleTheme,
  } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handlePrimaryColorChange = (shade: string, color: string) => {
    updateColors({
      primary: {
        ...colors.primary,
        [shade]: color,
      },
    });
  };

  const handleAccentColorChange = (accent: string, color: string) => {
    updateColors({
      accent: {
        ...colors.accent,
        [accent]: color,
      },
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50"
      >
        🎨 Customize Theme
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-96 bg-background border-l border-border overflow-y-auto">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <CardTitle>Theme Customizer</CardTitle>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
              >
                ✕
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Theme Toggle */}
            <div>
              <h3 className="font-medium mb-3">Theme Mode</h3>
              <Button
                onClick={toggleTheme}
                variant="outline"
                className="w-full"
              >
                {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </Button>
            </div>

            {/* Primary Colors */}
            <div>
              <h3 className="font-medium mb-3">Primary Colors</h3>
              <div className="space-y-3">
                <ColorPicker
                  label="Primary 500 (Main)"
                  value={colors.primary[500]}
                  onChange={(color) => handlePrimaryColorChange("500", color)}
                />
                <ColorPicker
                  label="Primary 700 (Dark)"
                  value={colors.primary[700]}
                  onChange={(color) => handlePrimaryColorChange("700", color)}
                />
                <ColorPicker
                  label="Primary 900 (Darkest)"
                  value={colors.primary[900]}
                  onChange={(color) => handlePrimaryColorChange("900", color)}
                />
              </div>
            </div>

            {/* Accent Colors */}
            <div>
              <h3 className="font-medium mb-3">Accent Colors</h3>
              <div className="space-y-3">
                <ColorPicker
                  label="Cyan"
                  value={colors.accent.cyan}
                  onChange={(color) => handleAccentColorChange("cyan", color)}
                />
                <ColorPicker
                  label="Purple"
                  value={colors.accent.purple}
                  onChange={(color) => handleAccentColorChange("purple", color)}
                />
                <ColorPicker
                  label="Green"
                  value={colors.accent.green}
                  onChange={(color) => handleAccentColorChange("green", color)}
                />
                <ColorPicker
                  label="Orange"
                  value={colors.accent.orange}
                  onChange={(color) => handleAccentColorChange("orange", color)}
                />
              </div>
            </div>

            {/* Accessibility Check */}
            <div>
              <h3 className="font-medium mb-3">Accessibility</h3>
              <div className="space-y-2">
                <AccessibilityBadge
                  foreground={colors.primary[900]}
                  background={colors.neutral[50]}
                  label="Primary on Light"
                />
                <AccessibilityBadge
                  foreground={colors.neutral[50]}
                  background={colors.primary[900]}
                  label="Light on Primary"
                />
                <AccessibilityBadge
                  foreground={colors.accent.cyan}
                  background={colors.primary[900]}
                  label="Cyan on Primary"
                />
                <AccessibilityBadge
                  foreground={colors.accent.purple}
                  background={colors.neutral[50]}
                  label="Purple on Light"
                />
              </div>

              <Button
                onClick={validateAccessibility}
                variant="outline"
                size="sm"
                className="w-full mt-3"
              >
                Run Full Accessibility Check
              </Button>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-border">
              <Button
                onClick={resetColors}
                variant="outline"
                className="w-full"
              >
                Reset to Default
              </Button>

              <Button
                onClick={() => {
                  const config = JSON.stringify(colors, null, 2);
                  navigator.clipboard.writeText(config);
                  alert("Theme configuration copied to clipboard!");
                }}
                variant="secondary"
                className="w-full"
              >
                Export Theme
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
