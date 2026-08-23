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
          grey1: { value: "hsl(41,7%,20%)" },
          grey2: { value: "hsl(40,7%,34%)" },
          grey2b: { value: "hsl(40,7%,45%)" },
          grey3: { value: "hsl(39,7%,50%)" },
          grey4: { value: "hsl(39,7%,66%)" },
          grey4b: { value: "hsl(39,7%,66%)" },
          grey5: { value: "hsl(39,7%,78%)" },
          grey6: { value: "hsl(39,7%,83%)" },
          grey7: { value: "hsl(39,7%,90%)" },
          grey8: { value: "hsl(39,8%,95%)" },
          grey9: { value: "hsl(39,8%,97%)" },
        },
        fontWeights: {
          s1: { value: 400 },
          s2: { value: 550 },
          s3: { value: 600 },
          s4: { value: 700 },
        },
        fontSizes: {
          s3: { value: "12px" },
          s4: { value: "14px" },
          s5: { value: "16px" },
          s6: { value: "18px" },
          s7: { value: "20px" },
          s8: { value: "24px" },
          s9: { value: "30px" },
          s10: { value: "36px" },
          s11: { value: "48px" },
          s12: { value: "60px" },
          s13: { value: "72px" },
          s14: { value: "83px" },
        },
        sizes: {
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
          s15: { value: "368px" },
          s16: { value: "389px" },
          s17: { value: "439px" },
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
          s15: { value: "368px" },
          s16: { value: "398px" },
          s17: { value: "430px" },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
