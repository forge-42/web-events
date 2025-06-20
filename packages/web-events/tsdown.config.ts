import { defineConfig } from "tsdown"

export default defineConfig({
	entry: ["src/index.ts", "src/react.ts"],
	sourcemap: true,
	dts: true,
	minify: false,
	format: ["esm", "cjs"],
	outDir: "dist",
})
