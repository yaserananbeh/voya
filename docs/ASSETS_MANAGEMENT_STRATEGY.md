# 📂 Asset Management Strategy

To keep all visual and static resources organized, Voya uses a structured and scalable asset management approach. All assets live inside:

```
src/assets/
│── fonts/
│── icons/
│── images/
└── index.ts
```

---

## 🎨 1. Folder Structure & Purpose

### **`/images`**

Used for **photos, backgrounds, hotel images, destination thumbnails**, room images, and all visual media.

Examples:

- `hotel-default.jpg`
- `destination-paris.png`

### **`/icons`**

Used for **SVG icons**, UI symbols, and reusable visual elements.

Examples:

- `search.svg`
- `calendar.svg`
- `star-filled.svg`

### **`/fonts`**

Used for **custom font files**, `.woff`, `.woff2`, etc.

Example:

- `Inter-Regular.woff2`

---

## ⚙️ 2. How SVGs Are Imported

### **Option A — Import SVG as React Component (Recommended for UI icons)**

Useful for icons that change size/color via props.

```tsx
import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg'

export const Input = () => <SearchIcon width={20} height={20} />
```

### **Option B — Use SVG as a static asset (Recommended for images)**

```tsx
import hotelImg from '@/assets/images/hotel-1.svg'
;<img src={hotelImg} alt="Hotel" />
```

**Rule of thumb:**

- **Icons → ReactComponent**
- **Images → static import (`img src=""`)**

---

## 📦 3. Centralized Asset Export via `src/assets/index.ts`

To avoid long and inconsistent imports across the app, **ALL assets must be exported from a single place**.

**Example `src/assets/index.ts`:**

```ts
// IMAGES
import heroBg from './images/hero-bg.jpg'
import defaultHotelImg from './images/hotel-default.jpg'

// ICONS
import { ReactComponent as SearchIcon } from './icons/search.svg'
import { ReactComponent as StarIcon } from './icons/star.svg'

// FONTS (optional)
import interRegular from './fonts/Inter-Regular.woff2'

export { heroBg, defaultHotelImg, SearchIcon, StarIcon, interRegular }
```

Now you can import assets cleanly:

```ts
import { SearchIcon, heroBg } from '@/assets'
```

---

## 🔧 4. Importing Images from API (Dynamic Assets)

When the backend returns image URLs:

```tsx
<img src={room.roomPhotoUrl} alt={room.roomType} loading="lazy" />
```

Local assets should only be used for:

- Placeholders
- Static illustrations
- Default images

---

## 🧹 5. Naming Conventions

| Asset Type | Naming Rule                       |
| ---------- | --------------------------------- |
| Images     | `hotel-card-1.jpg`, `bg-hero.png` |
| Icons      | `search.svg`, `arrow-right.svg`   |
| Fonts      | `Inter-Regular.woff2`             |
| Folders    | lowercase, descriptive            |

---

## 🛠️ 6. Usage Rules

### ✔ **Do:**

- Keep everything under `src/assets/`
- Export all assets from `src/assets/index.ts`
- Use React components for icons
- Use static image imports for photos
- Maintain clean and semantic file names

### ❌ **Don't:**

- Import assets using long relative paths like `../../../../assets/...`
- Store images inside component folders
- Mix icons and images in the same folder
- Use vague filenames like `img1.png`

---

## 🧩 7. Why This Strategy?

This approach ensures:

- Clean, maintainable imports
- Predictable folder structure
- Reusability and scalability
- Organized asset handling across the entire codebase
- Higher code quality and easier onboarding for contributors
