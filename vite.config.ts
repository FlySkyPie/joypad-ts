import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    return {
      resolve: {
        alias: {
          "@joypad-ts": path.resolve(__dirname, "./src"),
        },
      },
      test: {
        environment: "jsdom",
      },
    };
  }

  //   if (mode === 'demo') {

  //     return {
  //       base: '',
  //       build: {
  //         outDir: path.resolve(__dirname, 'docs'),
  //         assetsInlineLimit: 0,
  //         rollupOptions: {
  //           input: {
  //             main: path.resolve(__dirname, "demo/ChibiSample/index.html"),
  //           },
  //         }
  //       },
  //     }
  //   };

  return {
    publicDir: false,
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "joypadTs",
        // formats: ['es'],
        fileName: "joypad-ts",
      },
    },
    plugins: [dts({ rollupTypes: true })],
  };
});
