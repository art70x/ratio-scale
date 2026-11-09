import { defineConfig } from 'vite-plus'

export default defineConfig({
  pack: {
    platform: 'neutral',
    deps: {
      // tsdown <0.23 compatibility: resolve external dependency subpaths.
      // Remove to preserve subpath imports as written (the new default).
      // https://tsdown.dev/options/dependencies#deps-resolvedepsubpath
      resolveDepSubpath: true,
    },
    dts: {
      generator: 'tsgo',
    },
    exports: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['src/index.ts'],
    },
  },
  fmt: {
    semi: false,
    singleQuote: true,
    tabWidth: 2,
    printWidth: 100,
    sortImports: {
      type: 'natural',
      order: 'asc',
    },
    sortPackageJson: true,
    ignorePatterns: ['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock'],
  },
})
