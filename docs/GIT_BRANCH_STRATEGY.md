# 🧩 Git Branch Strategy

This document describes the branching model and Git workflow used in the Voya Travel & Accommodation Booking Platform frontend project.

---

## 🔱 Branch Structure

```
main
└── feature/<feature-name>
```

### **`main`**

- Always contains **stable**, production-ready code.
- No direct development happens on this branch.
- Netlify deployments come from `main`.

### **`feature/*`**

Short-lived branches for all development tasks.

Examples:

- `feature/login-page`
- `feature/home-search`
- `feature/admin-cities-grid`
- `feature/api-integration-auth`
- `feature/setup-env`

---

## 🔄 Workflow

### **1. Create a new feature branch**

```sh
git checkout -b feature/<feature-name>
```

### **2. Work on the feature & commit frequently**

Use meaningful commit messages:

```sh
git commit -m "feat: implement search bar UI"
git commit -m "fix: correct validation schema"
```

### **3. Keep your branch updated with `main`**

```sh
git pull origin main
```

### **4. Merge back into `main`**

Once the feature is complete and tested:

```sh
git checkout main
git pull
git merge feature/<feature-name>
git push origin main
```

---

## ✏️ Commit Message Guidelines

Use **conventional commits** for clarity and consistency.

| Type        | Purpose                 | Example                               |
| ----------- | ----------------------- | ------------------------------------- |
| `feat:`     | New feature             | `feat: add hotel filters sidebar`     |
| `fix:`      | Bug fix                 | `fix: correct API date format`        |
| `refactor:` | Code restructuring      | `refactor: extract reusable dropdown` |
| `chore:`    | Tooling / configuration | `chore: update ESLint rules`          |
| `test:`     | Tests added/updated     | `test: add unit tests for login hook` |

---

## 🎯 Why This Strategy?

- Simple and effective for a **solo developer**.
- Maintains a clean Git history.
- Prevents broken code from reaching production.
- Works well with the project's modular structure.
- Aligns with project evaluation expectations for clean Git usage.
