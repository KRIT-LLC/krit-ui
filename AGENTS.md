# Agent Instructions

## Package Identity

- This repository publishes the npm package `@chrome-consulting/krit-ui`.
- Keep `package.json` and `package-lock.json` aligned:
  - `name`: `@chrome-consulting/krit-ui`
  - no `private: true`
  - the same `version` in both files
- Before changing publication metadata, check the currently published package:

```bash
npm view @chrome-consulting/krit-ui version name
```

## Development

- Edit source files under `lib/`; do not edit `dist/` as source.
- Run checks before opening or updating a PR:

```bash
npm run build
npm run lint
npm pack --dry-run
```

- If changing public component props, verify generated declarations in `dist/**/*.d.ts` after build.
- If changing behavior used by TORO web, update stories or documentation with the expected usage.

## Publishing Flow

- Do not publish from an unmerged feature branch unless explicitly requested.
- Normal flow:
  1. Open a PR in `krit-ui`.
  2. Merge the PR to `main`.
  3. Pull fresh `main`.
  4. Build and dry-run pack.
  5. Publish the new version.
  6. Update `@chrome-consulting/krit-ui` in TORO `web`.

## TORO Web Consumer Notes

- TORO `web` consumes `@chrome-consulting/krit-ui` from npm.
- Temporary `patch-package` changes in `web/patches/` must be removed after the fixed npm version is published and installed.
- After updating the package in `web`, run at least:

```bash
npm run typecheck
```
