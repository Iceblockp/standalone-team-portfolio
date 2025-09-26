# 🔍 Work Process Brown Color Debug

## 🚨 Issue

The work process cards are still showing brown/orange backgrounds in dark theme, even after attempting to fix the active/inactive states.

## 🔧 Attempted Fixes

### 1. **Icon Background Fix**

```tsx
// Changed from always colored to conditional
isActive
  ? `${colorScheme.bg} ${colorScheme.glow}`
  : "bg-neutral-200 dark:bg-neutral-700";
```

### 2. **Card Background Fix**

```tsx
// Changed from bg-card to explicit colors
isActive
  ? "bg-gradient-to-br from-white to-primary-50/50 dark:from-neutral-800 dark:to-primary-950/50"
  : "bg-white dark:bg-[#1e293b]"; // Using explicit hex color
```

## 🤔 Possible Root Causes

### 1. **CSS Variable Override**

The `--card` CSS variable might be getting overridden somewhere:

```css
/* Current definition */
--card: 15 23 42; /* neutral-900 in dark theme */
```

### 2. **Browser Rendering**

Different browsers might render `neutral-900` differently, causing it to appear brownish.

### 3. **Inherited Styles**

There might be some parent element or global CSS causing the brown color.

### 4. **Theme Provider Issue**

The theme switching might not be applying the correct colors.

## 🔍 **Debugging Steps Needed**

### 1. **Check Computed Styles**

Inspect the actual computed CSS values in browser dev tools to see what colors are being applied.

### 2. **Check Parent Elements**

Look for any parent elements that might be applying background colors or filters.

### 3. **Check CSS Cascade**

Look for any CSS rules that might be overriding the background colors.

### 4. **Test with Explicit Colors**

Try using explicit hex colors instead of CSS variables to isolate the issue.

## 💡 **Recommended Next Steps**

### 1. **Use Explicit Hex Colors**

```tsx
// Instead of neutral-900, use explicit colors
isActive
  ? "bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-950"
  : "bg-white dark:bg-gray-800"; // Explicit gray instead of neutral
```

### 2. **Check CSS Variables**

```css
/* Ensure proper CSS variable definitions */
.dark {
  --card: 31 41 55; /* gray-800 instead of neutral-900 */
}
```

### 3. **Add Important Flag**

```tsx
// Force the background color
: "!bg-white dark:!bg-gray-800"
```

### 4. **Check Theme Provider**

Ensure the theme provider is correctly applying dark theme classes.

## 🎯 **Current Status**

The brown color persists despite multiple attempts to fix it. The issue likely stems from:

- CSS variable definitions
- Browser color rendering differences
- Inherited styles from parent elements
- Theme provider configuration

**Next action needed**: Inspect browser dev tools to identify the actual source of the brown color.
