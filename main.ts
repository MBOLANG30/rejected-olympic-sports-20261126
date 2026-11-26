// Rejected Olympic Sports — make.fun entry.
// Writes one funny single-line sport the Olympics rejected to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// The line must stay a single line of 1-200 characters, with no
// leading/trailing whitespace and no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one invented Olympic event, absurd enough to be funny,
// real enough to sound like a broadcast.
const LINE =
  "Extreme Umbrella Holding: athletes keep one umbrella open in a hurricane; style points for not becoming airborne.";

const MAX_CHARS = 200;

function main(): void {
  // One line, no surrounding whitespace, within the gate's limit.
  // Length is counted in characters (the gate counts UTF-8 text of
  // 1-200 characters), and the line must not be whitespace-only.
  const line = LINE.trim();
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  // Never delete the output folder: the grader mounts it, so only
  // create it if missing and write the file inside it.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
}

main();
