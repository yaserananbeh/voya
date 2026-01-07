# Helpful Development Commands

## Update Project Structure Documentation

Generate the project structure tree:

````bash
(echo '```text'; npx tree-node-cli -a -I "node_modules|dist|.git"; echo '```') > docs/PROJECT_STRUCTURE.md
````

## Create .gitkeep Files for Empty Directories

```bash
find . -type d -empty -not -path "./node*modules/*" -not -path "./.git/\_" -exec touch {}/.gitkeep \;
```

## Generate API Types

Generate TypeScript types from OpenAPI spec (requires local backend running on port 5000):

```bash
pnpm run gen:api
```

**Note**: This command connects to `http://localhost:5000/swagger.json`. Make sure your local backend is running.

## Backend API URL

Production backend: `https://travel-and-accommodation-booking-static.onrender.com`

## Verify Staged Files

Run all checks (typecheck, lint, test, build) on staged files:

```bash
pnpm verify:stage
```

## Files to Exclude from Search

When searching the codebase, you may want to exclude these patterns:

```
.config.js,.gitignore, README.md, tsconfig.*, *md,\__, reset.css, api.ts,.env_,_.json,_.yaml, \*.config.ts,.svg,*.yaml,*example, package*,*.config.ts,\_\*,_redirects,*.txt,generate-sitemap.js,sitemap.xml
```

---

**Note**: This file contains useful commands and patterns for development. The project structure can be regenerated using the tree-node-cli command above.
