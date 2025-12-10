(echo '`text'; npx tree-node-cli -a -I "node_modules|.git"; echo '`') > docs/PROJECT_STRUCTURE.md

find . -type d -empty -not -path "./node_modules/*" -not -path "./.git/*" -exec touch {}/.gitkeep \;

pnpm run gen:api