import { defineConfig } from 'tsup';

export default defineConfig([
  // Client components bundle (with "use client" directive)
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom', 'next-themes'],
    esbuildOptions(options) {
      options.banner = {
        js: '"use client";',
      };
    },
  },
  // Server-compatible utilities bundle (no "use client")
  {
    entry: { 'lib/utils': 'src/lib/utils.ts' },
    format: ['esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    external: ['clsx', 'tailwind-merge'],
  },
]);
