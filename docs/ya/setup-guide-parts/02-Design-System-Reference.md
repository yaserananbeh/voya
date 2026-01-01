# Design System Reference

> **Reference Section**: This section provides design specifications for all UI components. Refer to this section when building components to ensure visual consistency with the original Voya design.

**Navigation**: [← Back to Index](00-README.md) | [← Previous: Foundation](01-Foundation-Common-Setup.md) | [Next: Feature 1 →](03-Feature-01-Home-Page.md)

---

## 📋 Overview

This section provides **design specifications** that ensure your implementation matches the original Voya design. Use this as a **reference** when building components - you don't need to memorize everything, just refer back when needed.

> **📝 CRITICAL**: For **exact design specifications** with precise values, exact code, and complete component implementations, see [Exact Implementation Reference](10-Exact-Implementation-Reference.md#exact-design-specifications). This section provides general guidelines; the Exact Implementation Reference provides pixel-perfect details.

> **📝 Note**: For complete theme documentation, see `docs/design.md` in the project root. This section provides quick reference for common design decisions.

---

## 🎨 Design Principles

1. **Use Theme Tokens**: Always use theme-defined colors, spacing, and typography
2. **8px Grid System**: All spacing uses multiples of 8px
3. **Responsive First**: Design mobile-first, then enhance for larger screens
4. **Consistent Elevation**: Use standard MUI elevation levels

---

## 🎨 Color Usage

| Token                  | Usage                             | Example                       |
| ---------------------- | --------------------------------- | ----------------------------- |
| `primary.main`         | Primary buttons, highlights       | "Book Now" buttons, logo icon |
| `primary.contrastText` | Text on primary backgrounds       | Hero section text             |
| `primary.dark`         | Hover states, emphasized elements | Button hover                  |
| `text.primary`         | Main body text                    | Card content, descriptions    |
| `text.secondary`       | Secondary text, metadata          | Ratings, dates, labels        |
| `background.paper`     | Cards, surfaces                   | Card backgrounds, footer      |
| `divider`              | Borders, separators               | Card dividers, borders        |
| `error.main`           | Form errors, error messages       | Validation errors             |
| `success.main`         | Positive actions, confirmations   | Success messages              |

**Rules:**

- Never hardcode hex values. Use theme tokens.
- All interactive components must use theme-defined colors.

---

## 📝 Typography Scale

| Variant   | Size    | Usage                    | Example                      |
| --------- | ------- | ------------------------ | ---------------------------- |
| `h1`      | 32-36px | Page titles              | Home page hero title         |
| `h2`      | 24-28px | Section headers          | "Featured Deals" heading     |
| `h4`      | 18-20px | Card titles, hotel names | Hotel card titles            |
| `h6`      | 16-18px | Subsection headers       | "Available Rooms" heading    |
| `body1`   | 14-16px | Standard text            | Card descriptions, body text |
| `body2`   | 12-14px | Secondary text, metadata | Ratings, dates, helper text  |
| `caption` | 12-13px | Form labels, helper text | Form field labels            |

**Rules:**

- Always use `Typography` variants.
- Never manually set pixel-based font sizes.
- Follow hierarchy: h1 > h2 > h4 > h6 > body1 > body2 > caption.

---

## 📏 Spacing System (8px Grid)

| Value          | Pixels | Usage              | Example                   |
| -------------- | ------ | ------------------ | ------------------------- |
| `spacing(0.5)` | 4px    | Very tight spacing | Icon padding              |
| `spacing(1)`   | 8px    | Tight spacing      | Button padding, icon gaps |
| `spacing(2)`   | 16px   | Standard spacing   | Form fields, card padding |
| `spacing(3)`   | 24px   | Section spacing    | Between sections          |
| `spacing(4)`   | 32px   | Large spacing      | Page padding, large gaps  |

**Common Patterns:**

- Card padding: `p: { xs: 3, sm: 4 }` (24px mobile, 32px desktop)
- Form field spacing: `sx={{ mb: 2 }}` (16px between fields)
- Section spacing: `spacing={3}` (24px between items)

**Rules:**

- Never hardcode `margin`/`padding` values. Use `theme.spacing()` or `sx` spacing props.
- Maintain consistent white space within cards and between sections.

---

## 🎴 Component Specifications

### Header/Navbar

**AppBar:**

- `position="sticky"` - Sticks to top on scroll
- `color="default"` - Uses default background
- `elevation={1}` - Subtle shadow

**Logo:**

- Icon: `FlightTakeoffIcon`
- Icon size: `{ xs: 24, sm: 32 }` (24px mobile, 32px desktop)
- Text: Font size `{ xs: '1.25rem', sm: '1.5rem' }`
- Text gradient: `linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)`
- Font weight: `700`

**Navigation:**

- Mobile menu: Hamburger icon at `sm` breakpoint (600px) and below
- Desktop: Button layout at `md` breakpoint (900px) and above
- Menu positioning: `anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}`

---

### Footer

**Styling:**

- Background: `bgcolor: 'background.paper'`
- Border: Top border with `borderColor: 'divider'`
- Padding: `py: 4` (32px vertical)
- Container: `maxWidth="lg"`

**Layout:**

- Stack with `direction={{ xs: 'column', md: 'row' }}`
- Spacing: `spacing={4}` (32px between sections)

**Typography:**

- Headings: `variant="h6"`
- Text: `variant="body2"` with `color="text.secondary"`
- Links: `color="text.secondary"`

**Copyright:**

- Centered text alignment
- `variant="body2"` with `color="text.secondary"`

---

### Hero Section

**Styling:**

- Background: `bgcolor: 'primary.main'`
- Text color: `color: 'primary.contrastText'`
- Padding: `py: 8` (64px vertical)
- Margin bottom: `mb: 4` (32px)

**Typography:**

- Title: `variant="h2"`
- Subtitle: `variant="h6"` with `opacity: 0.9`
- Alignment: Center aligned

**Container:**

- `maxWidth="lg"`

---

### Search Bar

**Layout:**

- Stack with `direction={{ xs: 'column', md: 'row' }}`
- Spacing: `spacing={2}` (16px between fields)

**Fields:**

- City field: `flex: { md: '1 1 40%' }`
- Date fields: `flex: { md: '1 1 30%' }` each
- Date picker: `size="small"` with `InputLabelProps={{ shrink: true }}`

**Button:**

- Height: `height: '56px'`
- Min width: `minWidth: { md: '120px' }`
- Full width on mobile

---

### Cards

**Styling:**

- Elevation: Default (1) for standard cards
- Padding: `p: { xs: 3, sm: 4 }` (24px mobile, 32px desktop)
- Border radius: `borderRadius: 3` (24px) for modern look
- Background: `bgcolor: 'background.paper'`

**Content:**

- CardContent spacing: Standard MUI spacing
- Image height: Typically 200px for room cards
- Typography: Use appropriate variants (h4 for titles, body2 for metadata)

---

### Buttons

**Primary Actions:**

- `variant="contained"`
- `color="primary"`
- Full width on mobile: `fullWidth` prop

**Icon Buttons:**

- `color="inherit"` or `color="primary"`
- Standard sizes: Default or `sx={{ fontSize: 40 }}` for large icons

**Disabled State:**

- Standard MUI disabled styling
- Opacity: `opacity: 0.6` for unavailable items

---

### Forms

**Field Spacing:**

- Between fields: `sx={{ mb: 2 }}` (16px)
- Form padding: Standard container padding

**Labels:**

- Standard MUI label positioning
- Use `InputLabelProps={{ shrink: true }}` for date pickers

**Errors:**

- Use `error` prop on TextField
- Use `helperText` for error messages
- Standard MUI error styling

**Validation:**

- Use Formik with Yup validation
- Display errors using `touched` and `errors` from Formik

---

### DataGrid (Admin Pages)

**Column Widths:**

- Flexible columns: `width: 200, flex: 1`
- Fixed columns: `width: 150` (e.g., actions column)

**Styling:**

- Standard MUI DataGrid styling
- Row hover: Default MUI hover effect
- Header: Standard MUI header styling

**Actions:**

- Icon buttons in action cells
- Size: Default icon button size
- Color: `color="primary"` for edit, `color="error"` for delete

---

### Dialogs/Modals

**Sizing:**

- Small forms: `maxWidth="sm"`
- Medium content: `maxWidth="md"`

**Padding:**

- Standard MUI Dialog padding
- Form fields: `margin="dense"` with `sx={{ mb: 2 }}` spacing

**Buttons:**

- Primary action: `variant="contained"` with `color="primary"`
- Secondary action: `variant="outlined"` or `variant="text"`
- Placement: Standard MUI DialogActions placement

---

### Loading States

**Spinner:**

- `CircularProgress` component
- Sizes: `size="small"` (24px), `size="medium"` (40px), `size="large"` (60px)
- Centered with flexbox: `display: 'flex', justifyContent: 'center', alignItems: 'center'`

**Skeleton:**

- Use `VoyaLoader` component for consistent loading
- Custom skeleton components for specific content types

---

### Error States

**Alerts:**

- `severity="error"` for errors
- `severity="warning"` for warnings
- `severity="success"` for success messages
- Standard MUI Alert styling

**Placement:**

- Top of form/page for form errors
- Inline with fields for field-specific errors

---

### Empty States

**Styling:**

- Typography: `variant="body2"` with `color="text.secondary"`
- Centered alignment
- Simple text messages (no illustrations in current design)

---

## 📱 Responsive Breakpoints

| Breakpoint | Width       | Usage                               |
| ---------- | ----------- | ----------------------------------- |
| `xs`       | 0-599px     | Mobile - Stacked layout, full width |
| `sm`       | 600-899px   | Tablet - 2-column layouts           |
| `md`       | 900-1199px  | Desktop - Full grid, sidebars       |
| `lg`       | 1200-1535px | Large desktop                       |
| `xl`       | 1536px+     | Extra large desktop                 |

**Common Patterns:**

- Mobile menu: `useMediaQuery(theme.breakpoints.down('sm'))`
- Responsive grid: `size={{ xs: 12, md: 6 }}`
- Responsive spacing: `spacing={{ xs: 2, md: 4 }}`
- Responsive padding: `p: { xs: 2, sm: 3, md: 4 }`

**Rules:**

- Design mobile-first
- Use MUI breakpoints consistently
- Never write custom media queries unless absolutely necessary

---

## 🎯 Icon Usage

**Common Icons:**

- Logo: `FlightTakeoffIcon`
- Menu: `MenuIcon`
- Auth: `LoginIcon`, `LogoutIcon`
- Actions: `EditIcon`, `DeleteIcon`, `AddIcon`
- Language: `LanguageIcon`
- Theme: `LightModeIcon`, `DarkModeIcon`

**Sizing:**

- Default: Standard MUI icon size (24px)
- Large: `sx={{ fontSize: 40 }}` for hero icons
- Small: `fontSize="small"` for inline icons

**Positioning:**

- With text: `startIcon` prop or `sx={{ mr: 1 }}` for spacing
- Standalone: Centered in containers

---

## 🎨 Special Effects

**Gradients:**

- Logo text: `linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)`
- Backgrounds: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`

**Opacity:**

- Subtitles: `opacity: 0.9`
- Disabled items: `opacity: 0.6`

---

## 📚 Quick Reference Checklist

When building a component, ensure:

- [ ] Colors use theme tokens (no hardcoded hex values)
- [ ] Typography uses theme variants (no pixel sizes)
- [ ] Spacing uses theme spacing (8px grid)
- [ ] Responsive breakpoints are used correctly
- [ ] Icons are appropriately sized
- [ ] Cards have consistent elevation and padding
- [ ] Forms have proper spacing and error handling
- [ ] Buttons use correct variants and colors

---

## 🔗 Additional Resources

- **Complete Theme Documentation**: See `docs/design.md` in the project root
- **MUI Documentation**: https://mui.com/
- **Material Design Guidelines**: https://material.io/design

---

**Next**: Continue to [Feature 1: Home Page](03-Feature-01-Home-Page.md) and refer back to this section as needed when building components.
