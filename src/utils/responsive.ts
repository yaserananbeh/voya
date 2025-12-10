/**
 * Converts a pixel value to rem units.
 *
 * Use this helper ONLY when you have a raw pixel value that does not come
 * from the theme (e.g., a designer provided a fixed px measurement).
 *
 * This ensures the value scales correctly with the user's root font size
 * and stays consistent with MUI's rem-based typography system.
 *
 * Examples:
 *   fontSize: pxToRem(14)   // converts 14px → 0.875rem
 *   padding: `${pxToRem(12)} ${pxToRem(20)}`
 *
 * Do NOT use this for:
 *   - theme.spacing() values
 *   - values already expressed in rem
 *   - design tokens already defined in the theme
 */
export const pxToRem = (px: number): string => `${px / 16}rem`

/**
 * --- RESPONSIVENESS GUIDELINES ---
 *
 * We rely fully on MUI's built-in breakpoint system:
 *
 *  theme.breakpoints.up("md")
 *  theme.breakpoints.down("sm")
 *  theme.breakpoints.between("sm", "lg")
 *
 * Usage example:
 *
 *  sx={{
 *    p: { xs: 2, sm: 3, md: 4 },
 *    fontSize: { xs: pxToRem(14), md: pxToRem(16) },
 *    [theme.breakpoints.down("sm")]: {
 *      background: "red",
 *    },
 *  }}
 *
 * No custom breakpoint helpers are added to avoid duplication.
 */
