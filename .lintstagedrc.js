export default {
  '**/*.{js,jsx,ts,tsx}': (files) => [
    `pnpm lint:strict ${files.map((f) => `"${f}"`).join(' ')}`,
    `pnpm format:write ${files.map((f) => `"${f}"`).join(' ')}`,
  ],
  '**/*.{html,json,md,css}': (files) =>
    `pnpm format:write ${files.map((f) => `"${f}"`).join(' ')}`,
};
