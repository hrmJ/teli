import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          grey1: { value: "" },
        },
        spacing: {
          s1: { value: "4px" },
          s2: { value: "8px" },
          s3: { value: "12px" },
          s4: { value: "16px" },
          s5: { value: "24px" },
          s6: { value: "24px" },
          s7: { value: "32px" },
          s8: { value: "48px" },
          s9: { value: "64px" },
          s10: { value: "96px" },
          s11: { value: "128px" },
          s12: { value: "192px" },
          s13: { value: "256px" },
          s14: { value: "348px" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
