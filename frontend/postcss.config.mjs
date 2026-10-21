import fs from "node:fs";

let realCwd = process.cwd();
try {
  realCwd = fs.realpathSync.native(process.cwd());
} catch {
  // ignore
}
const cwd = process.cwd();

const normalizeSubstPathsPlugin = {
  postcssPlugin: "normalize-subst-paths",
  OnceExit(root, { result }) {
    if (realCwd.toLowerCase() === cwd.toLowerCase()) return;
    for (const msg of result.messages) {
      if (msg.file && typeof msg.file === "string" && msg.file.toLowerCase().startsWith(realCwd.toLowerCase())) {
        msg.file = cwd + msg.file.slice(realCwd.length);
      }
      if (msg.dir && typeof msg.dir === "string" && msg.dir.toLowerCase().startsWith(realCwd.toLowerCase())) {
        msg.dir = cwd + msg.dir.slice(realCwd.length);
      }
    }
  },
};

const config = {
  plugins: [
    ["@tailwindcss/postcss", {}],
    normalizeSubstPathsPlugin,
  ],
};

export default config;

