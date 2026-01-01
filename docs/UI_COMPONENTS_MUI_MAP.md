# UI Components Documentation

This document defines the full mapping between Voya UI components and their Material UI (MUI) equivalents, along with usage rules, guidelines, and examples.

---

# 🧩 1. Purpose

To keep the UI consistent and prevent re‑inventing components, all contributors MUST use the MUI components listed in this document. Custom components are allowed only when no MUI equivalent exists.

---

# 🧱 2. Core Mapping Table

Below is the official mapping of **UI kit → MUI components**.

## **2.1 Layout & Structure**

| UI Purpose                    | MUI Component                                       |
| ----------------------------- | --------------------------------------------------- |
| Page container                | `Container`                                         |
| Page sections                 | `Box`, `Stack`, `Grid`                              |
| Responsive layout             | `Grid`                                              |
| Modals / overlays             | `Dialog`                                            |
| Drawers / side menus          | `Drawer`                                            |
| Tabs                          | `Tabs`, `Tab`                                       |
| Expandable sections           | `Accordion`, `AccordionSummary`, `AccordionDetails` |
| Full‑screen overlay (gallery) | `Dialog` with `fullScreen`                          |

---

## **2.2 Navigation Components**

| UI Purpose              | MUI Component                      |
| ----------------------- | ---------------------------------- |
| Top navigation bar      | `AppBar`, `Toolbar`                |
| Side navigation (Admin) | `Drawer`, `List`, `ListItemButton` |
| Breadcrumbs             | `Breadcrumbs`                      |
| Navigation links        | `Link`                             |
| Pagination              | `Pagination`                       |

---

## **2.3 Form Inputs & Controls**

Used in: Login, Search Filters, Checkout, Admin CRUD forms.

| UI Purpose            | MUI Component                               |
| --------------------- | ------------------------------------------- |
| Text inputs           | `TextField`                                 |
| Password input        | `TextField` with type="password"            |
| Date pickers          | `TextField` with type="date" (native HTML5) |
| Dropdowns             | `Select`, `MenuItem`                        |
| Number inputs         | `TextField` type="number"                   |
| Toggle filters        | `Checkbox`, `Switch`                        |
| Star rating input     | `Rating`                                    |
| Sliders (price range) | `Slider`                                    |
| Grouped form sections | `FormControl`, `FormGroup`, `FormLabel`     |
| Submit buttons        | `Button`                                    |
| Icon-only actions     | `IconButton`                                |
| File upload           | `Button` + hidden `<input type="file">`     |

---

## **2.4 Display Components**

| UI Purpose            | MUI Component                                     |
| --------------------- | ------------------------------------------------- |
| Titles / text         | `Typography`                                      |
| Hotel cards           | `Card`, `CardContent`, `CardMedia`, `CardActions` |
| Price tags            | `Chip` or styled `Typography`                     |
| Amenity tags          | `Chip`                                            |
| User avatar           | `Avatar`                                          |
| Review lists          | `List`, `ListItem`, `Rating`                      |
| Data tables (Admin)   | `DataGrid` (`@mui/x-data-grid`)                   |
| Loading indicators    | `CircularProgress`, `LinearProgress`              |
| Skeleton placeholders | `Skeleton`                                        |
| Tooltips              | `Tooltip`                                         |
| Dividers              | `Divider`                                         |

---

## **2.5 Feedback Components**

| UI Purpose            | MUI Component             |
| --------------------- | ------------------------- |
| Success/Error banners | `Alert`                   |
| Toast messages        | `Snackbar` + `Alert`      |
| Confirmation dialogs  | `Dialog`, `DialogActions` |

---

# 🧩 3. Component Mapping by Feature

This section shows exactly which MUI components must be used in each screen.

## **3.1 Login Page**

- `TextField` → username, password
- `Button` → login
- `Alert` → authentication errors
- `Box` / `Container` → layout

## **3.2 Home Page**

### Search Bar

- `TextField` → destination field
- `DatePicker` → check‑in/out
- `Select` → adults/children/rooms
- `Button` → search
- `Grid` + `Box` → responsive layout

### Featured Deals / Recently Visited / Trending

- `Card`
- `CardMedia`
- `CardContent`
- `Rating`
- `Chip` (for amenities if needed)

## **3.3 Search Results Page**

### Filters Sidebar

- `Accordion`
- `Slider` (price range)
- `Checkbox` (amenities)

### Hotel List

- `Card`
- `Rating`
- `Chip`
- `Button` (view details)

## **3.4 Hotel Page**

- `Dialog fullScreen` → image gallery
- `Typography` → hotel info
- `Rating`
- `Card` → rooms list
- `Chip` → amenities
- `Button` → add to cart

## **3.5 Checkout Page**

- `TextField`
- `RadioGroup`
- `FormControl`
- `Button`
- `Alert` (errors)

## **3.6 Admin Pages**

- `Drawer` → left navigation
- `AppBar` → top bar
- `DataGrid` → tables
- `Dialog` → create/update forms
- `TextField`, `Select` → form fields

---

# 🧩 4. Rules for Using MUI

## **4.1 Always Prefer MUI Before Custom Components**

Do NOT create HTML-based components like:

```
<button>Submit</button>  // ❌ forbidden
<input type="text">    // ❌ forbidden
<div class="card">      // ❌ forbidden
```

Unless MUI has no equivalent.

## **4.2 Styling Rules**

- Use global theme overrides (in `src/theme/index.ts`)
- Avoid inline styles
- Use the `sx` prop or CSS modules when necessary

## **4.3 When Custom Components Are Allowed**

Only allowed when:

- No MUI equivalent exists (example: carousel)
- A larger composite UI element is needed (HotelCard, RoomCard)

---

# 🧩 5. Component Folder Structure

To stay consistent with the project’s real directory layout (as defined in the repository structure), UI components must follow these rules:

## **5.1 Shared UI Components (Global)**

These are components reused across multiple pages (e.g., Button wrappers, modals, cards, layout helpers).

They MUST live under:

```
src/components/
    ├── index.ts
    └── (shared reusable components go here)
```

Examples of what belongs here:

- `HotelCard` (used in Home, Search Results)
- `RoomCard`
- `SearchBar`
- `AppButton`, `AppTextField` (if you create wrapper components)
- `ImageGallery`
- `LoadingSpinner`

Anything reused in **more than one feature** belongs here.

---

## **5.2 Feature-Specific Components**

These components belong to a single feature ONLY.

They MUST stay inside the corresponding page folder:

```
src/pages/<Feature>/components/
```

Examples:

```
src/pages/Home/components/HeroBanner/
src/pages/Hotel/components/RoomTypeCard/
src/pages/Checkout/components/PaymentForm/
src/pages/Admin/components/AdminTableToolbar/
```

Rules:

- These components **must not** be reused across unrelated pages.
- If you find yourself reusing them, move them to `src/components/`.

---

## **5.3 Why This Structure?**

✔ Matches the existing project hierarchy exactly
✔ Clean separation of shared UI kit vs. feature components
✔ Prevents duplication
✔ Keeps global components discoverable and maintainable

---

# 🧩 6. Examples

Examples

## **Example: Creating a Hotel Card**

```tsx
<Card>
  <CardMedia component="img" height={180} image={hotel.image} />
  <CardContent>
    <Typography variant="h6">{hotel.name}</Typography>
    <Rating value={hotel.rating} readOnly />
    <Chip label={`${hotel.price}$ / night`} />
  </CardContent>
  <CardActions>
    <Button size="small">View Details</Button>
  </CardActions>
</Card>
```

## **Example: Search Filter Accordion**

```tsx
<Accordion>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>Price Range</AccordionSummary>
  <AccordionDetails>
    <Slider value={priceRange} onChange={handleChange} />
  </AccordionDetails>
</Accordion>
```

---

# 🧩 7. Summary

This document defines the **official and mandatory mapping** of UI components to MUI. All contributors must follow it to maintain consistency, quality, and speed of development.
