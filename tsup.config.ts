import { defineConfig } from 'tsup';
import { rmSync } from 'fs';

// Clean dist folder before build (only once)
try {
  rmSync('./dist', { recursive: true, force: true });
} catch {}

export default defineConfig([
  // Server-compatible utilities bundle (no "use client") - build first
  {
    entry: { 'lib/utils': 'src/lib/utils.ts' },
    format: ['esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    external: ['clsx', 'tailwind-merge'],
  },
  // Client components bundle (with "use client" directive) - build second
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    external: ['react', 'react-dom', 'next-themes'],
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      };
    },
  },
]);
