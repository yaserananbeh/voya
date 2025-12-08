# ✨ Contributing Guide

Welcome to the **Voya – Travel & Accommodation Booking Platform** frontend project.
This document describes how to contribute, follow standards, and work efficiently.

---

# 📁 Project Structure

Refer to `docs/PROJECT_STRUCTURE.md` for the full project layout.
Follow existing conventions when adding new pages, hooks, utils, or API modules.

---

# 🧭 Development Workflow

## 1. Branching Strategy

Refer to `docs/GIT_BRANCH_STRATEGY.md` to know the branching strategy we use in this project.

Create a new branch for every task — never commit directly to `main`.

---

# 📝 Commit Message Convention

This project uses a simplified **Conventional Commits** format.

## Format

```
<type>: <short description>

[optional body]
[optional footer]
```

## Allowed Types

| Type     | Description                                 |
| -------- | ------------------------------------------- |
| feat     | New feature                                 |
| fix      | Bug fix                                     |
| chore    | Maintenance, configs, dependencies          |
| refactor | Code refactoring without functional changes |
| style    | Formatting, spacing, CSS tweaks             |
| docs     | Documentation updates                       |
| test     | Adding or updating tests                    |
| perf     | Performance improvements                    |
| build    | Build-related changes (env, Vite config)    |
| ci       | CI/CD pipeline changes                      |

### Examples

```
feat: implement featured deals carousel
fix: correct date formatting in checkout
docs: add commit message convention to CONTRIBUTING.md
chore: update API_BASE_URL environment variable
refactor: simplify hotel filters logic
```

### Rules

- Use **imperative tone** ("add" not "added").
- Keep the summary under **72 characters**.
- One logical change per commit.

---

# 🧪 Testing Guidelines

- All tests belong inside their page/hook/util `tests` folders.
- Use **React Testing Library** + **MSW**.
- Cover both expected behavior and edge cases.

Example folder structure:

```
src/pages/Home/tests/
src/hooks/tests/
src/utils/tests/
```

---

# 🧱 Coding Standards

## TypeScript

- Always type API responses and function signatures.
- Use shared types from `src/types`.

## React

- Use **function components** only.
- Use **custom hooks** for shared logic.
- Apply React patterns when applicable:
  - HOC
  - Render Props
  - Compound Components
  - Context Provider
  - Container/Presentational
  - Prop Getters

- Keep components **reusable** and **decoupled**.

## MUI

- Use the central theme in `src/theme`.
- Use **CSS modules** for custom styling.
- Avoid inline CSS.

## API Layer

- Place API logic inside `src/api/*`.
- Never hardcode URLs — always read from `.env`.
- Keep modules small, single-purpose, and typed.

---

# 🌿 Environment Variables

Environment configurations live at project root:

```
.env
.env.example
```

Whenever you add a new env variable:

1. Add it to `.env.example` for others.
2. Never commit real secrets.

---

# 📚 Documentation Rules

Update documentation when you:

- Add a new feature
- Create a new global component or hook
- Introduce new environment variables
- Add reusable utilities or patterns

Documentation goes inside:

```
docs/
  ├── CONTRIBUTING.md
  ├── PROJECT_STRUCTURE.md
```

---

# 🧵 Code Style

This repository uses:

- **ESLint** (custom config)
- **Prettier**
- **EditorConfig**

Your code must pass lint checks before committing.

---

# 🚀 Workflow Summary

1. Create a feature branch
2. Implement code following project conventions
3. Add/update tests
4. Commit using the allowed commit format
5. Push branch & open PR
6. Request review if needed

---

# ❤️ Thank You
