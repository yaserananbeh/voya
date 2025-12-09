# 🎨 Voya Theme Documentation

This document describes how the **global UI theme** is defined and managed within the Voya frontend project. It explains the rules, structure, and conventions developers must follow to ensure visual consistency across all pages.

The theme is implemented using **Material UI (MUI v5)** and is located at:

```
src/theme/index.ts
```

---

# 1. Theme Overview

The Voya theme centralizes all visual design tokens:

- Colors
- Typography
- Spacing scale
- Shadows / elevation
- Component shape (radius)
- Breakpoints

This ensures a uniform, predictable UI across the application.

---

# 2. Color Palette

The color palette follows a Booking.com-inspired scheme.

## Primary Colors

| Token           | Usage                                |
| --------------- | ------------------------------------ |
| `primary.main`  | Buttons, highlights, primary actions |
| `primary.dark`  | Hover states, emphasized elements    |
| `primary.light` | Background accents                   |

## Neutral Colors

| Token                 | Usage                   |
| --------------------- | ----------------------- |
| `grey.100`–`grey.900` | Text, borders, surfaces |
| `common.white`        | Cards, surfaces         |
| `error.main`          | Form errors             |
| `success.main`        | Positive actions        |

**Rules:**

- All button and interactive components must use theme-defined colors.
- Never hardcode hex values inside components. Use theme tokens.

---

# 3. Typography System

Typography is defined globally using MUI’s `typography` object.

## Font Family

```
fontFamily: 'Roboto, Helvetica, Arial, sans-serif'
```

(Replace with custom font if added later.)

## Text Styles

| Variant     | Size    | Usage                    |
| ----------- | ------- | ------------------------ |
| `h1`        | 32–36px | Page titles              |
| `h2`        | 24–28px | Section headers          |
| `h3`        | 18–20px | Card titles, hotel names |
| `subtitle1` | 14–16px | Metadata (city, rating)  |
| `body1`     | 14–16px | Standard text            |
| `caption`   | 12–13px | Form labels, helper text |

**Rules:**

- Always use `Typography` variants.
- Never manually set pixel-based font sizes.
- Follow hierarchy: h1 > h2 > h3 > body.

---

# 4. Spacing System (8px Grid)

The theme uses:

```
spacing: 8
```

Meaning:

- `theme.spacing(1)` → 8px
- `theme.spacing(2)` → 16px
- `theme.spacing(3)` → 24px

## Spacing Scale

| Level | Pixels | Usage                     |
| ----- | ------ | ------------------------- |
| 0.5   | 4px    | Very tight spacing        |
| 1     | 8px    | Buttons, labels           |
| 2     | 16px   | Card padding, form fields |
| 3     | 24px   | Section spacing           |
| 4     | 32px   | Page padding              |

**Rules:**

- Never hardcode `margin`/`padding` values. Use `theme.spacing()`.
- Maintain consistent white space within cards and between sections.

---

# 5. Shape / Border Radius

```
shape: {
  borderRadius: 8,
}
```

This creates a modern, soft-rounded UI.

**Rules:**

- All custom components must use the theme’s borderRadius.
- Never introduce random border radii.

---

# 6. Shadows (Elevation)

Shadows are defined explicitly inside the theme:

```
shadows: [
  'none',
  '0px 1px 3px rgba(0,0,0,0.12)',
  '0px 2px 6px rgba(0,0,0,0.12)',
  ...
]
```

## Shadow Usage

| Shadow Level | Usage                        |
| ------------ | ---------------------------- |
| `0`          | Flat surfaces, admin tables  |
| `1`          | Cards, hotel previews        |
| `2`          | Hover states, expanded cards |

**Rules:**

- Use `1` for standard cards.
- Increase to `2` for hover elevation.
- Never create inline box-shadows.

---

# 7. Breakpoints

MUI defaults are used:

```
xs: 0,
sm: 600,
md: 900,
lg: 1200,
xl: 1536
```

## Responsive Rules

- Mobile → stacked layout, full-width elements
- Tablet → 2-column layouts
- Desktop → full grid with sidebars (Search Results page)

**Rules:**

- All Grid components must use `md`, `sm`, `xs` props consistently.
- Never write custom media queries unless absolutely necessary.

---

# 8. Component Overrides

Components may be customized globally under `components: {}`.
Common overrides include:

- Button default styles
- Card default padding
- TextField label styling

**Rule:**
All component-level styling should be done **through the theme**, not inline.

---

# 9. Using the Theme in Components

Example:

```tsx
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'

const Example = () => {
  const theme = useTheme()

  return <Box padding={theme.spacing(2)}>Hello</Box>
}
```

**Rules:**

- Prefer `sx={{}}` with theme awareness.
- Never hardcode raw pixel values.

---

# 10. Dark Mode (Future Ready)

The theme is prepared for a future light/dark toggle.
Guidelines:

- Always depend on theme tokens instead of direct colors.
- Avoid forcing white/black backgrounds.

---

# 11. Where to Add New Theme Tokens

If you need to extend the theme:

- Add colors under `palette`.
- Add typography variants under `typography`.
- Add custom spacing helpers if required.
- Add component overrides inside `components`.

Never modify the MUI defaults in individual components.

---

# 12. Summary

| Category       | Rule                                |
| -------------- | ----------------------------------- |
| Colors         | Use theme palette only              |
| Typography     | Use theme variants                  |
| Spacing        | Use 8px scale via `theme.spacing()` |
| Shadows        | Use predefined values only          |
| Shapes         | Use theme borderRadius              |
| Overrides      | Update inside theme, not inline     |
| Responsiveness | Use MUI breakpoints                 |

The theme ensures the entire Voya platform remains visually consistent, scalable, and easy to maintain.
