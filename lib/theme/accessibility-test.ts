/**
 * Accessibility Testing for Color System
 *
 * This file tests our color combinations to ensure WCAG AA compliance
 * Run this during development to validate color accessibility
 */

import { validateThemeAccessibility, colorAccessibility } from "./validation";

// Test our color system
console.log("🎨 Testing Color System Accessibility...\n");

const results = validateThemeAccessibility();

console.log("Color Combination Test Results:");
console.log("================================");

results.forEach((result) => {
  const status = result.passes ? "✅" : "❌";
  const ratio = result.ratio.toFixed(2);

  console.log(`${status} ${result.combination}`);
  console.log(`   Contrast Ratio: ${ratio}:1 (${result.level})`);
  console.log("");
});

// Summary
const passed = results.filter((r) => r.passes).length;
const total = results.length;
const percentage = Math.round((passed / total) * 100);

console.log(
  `Summary: ${passed}/${total} combinations pass WCAG AA (${percentage}%)`
);

if (percentage === 100) {
  console.log("🎉 All color combinations meet accessibility standards!");
} else {
  console.log("⚠️  Some color combinations need adjustment for accessibility.");
}

// Export for use in other files
export { results };
