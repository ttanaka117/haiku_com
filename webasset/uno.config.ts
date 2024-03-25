// uno.config.ts
import { defineConfig, presetUno } from "unocss";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
  rules: [
    [
      /^m-lr([\.\d]+)$/,
      ([_, num]) => ({ "margin-right": `${num}px`, "margin-left": `${num}px` }),
    ],
    [/^m-r([\.\d]+)$/, ([_, num]) => ({ "margin-right": `${num}px` })],
    [/^m-l([\.\d]+)$/, ([_, num]) => ({ "margin-left": `${num}px` })],
    [/^m-t([\.\d]+)$/, ([_, num]) => ({ "margin-top": `${num}px` })],
    [/^m-b([\.\d]+)$/, ([_, num]) => ({ "margin-bottom": `${num}px` })],
    [/^f-s([\.\d]+)$/, ([_, num]) => ({ "font-size": `${num}px` })],
    [/^flex-container/, () => ({ display: "flex", "align-items": "center" })],
  ],
  presets: [
    presetIcons({
      prefix: "i-",
      extraProperties: {
        display: "inline-block",
      },
    }),
  ],
});
