import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "tests/**/*.test.ts",
      "src/**/*.test.ts",
      "research/raw-data/torque-specs/__tests__/*.test.ts",
    ],
    exclude: [
      "node_modules",
      "research/raw-data/torque-specs/__tests__/*.mjs",
    ],
  },
});
