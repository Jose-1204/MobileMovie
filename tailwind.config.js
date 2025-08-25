module.exports = {
  content: [
    // "/(tabs)/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",   // 👈 agrega esta línea
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
