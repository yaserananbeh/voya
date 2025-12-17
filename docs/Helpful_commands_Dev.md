(echo '`text'; npx tree-node-cli -a -I "node_modules|dist|.git"; echo '`') > docs/PROJECT_STRUCTURE.md

find . -type d -empty -not -path "./node*modules/*" -not -path "./.git/\_" -exec touch {}/.gitkeep \;

pnpm run gen:api

# I added this comment to show from where this boilerplate project could be used (as reusable on the shelf template) for other projects

backend: https://travel-and-accommodation-booking-static.onrender.com

pnpm verify:stage

files to execlude from search
.config.js,.gitignore, README.md, tsconfig.*, *md,\__, reset.css, api.ts,.env_,_.json,_.yaml, \*.config.ts,.svg,*.yaml,*example, package*,*.config.ts,\_\*
