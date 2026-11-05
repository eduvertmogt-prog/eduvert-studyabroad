#!/usr/bin/env node
import { spawn } from "node:child_process";

const action = process.argv[2];

if (action === "--help" || action === "-h") {
  console.log("opennextjs-cloudflare build   -> pnpm run build");
  console.log("opennextjs-cloudflare deploy  -> pnpm run deploy");
  process.exit(0);
}

const script = action === "deploy" || action === "preview" ? "deploy" : "build";

const child = spawn("pnpm", ["run", script], {
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
