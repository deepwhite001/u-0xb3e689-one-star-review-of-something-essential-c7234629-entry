import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// One-star review of an everyday essential: gravity.
// Chosen from five candidates (sleep, gravity, sun, water, Monday)
// because it names the sharpest true grievance — gravity holds you
// down for life — and turns in the last few words, deadpan throughout.
const REVIEW =
  "One star. Gravity has held me down my entire life and never once offered to help me get back up.";

if (REVIEW.length < 1 || REVIEW.length > 160) {
  throw new Error(`Review must be 1-160 characters, got ${REVIEW.length}`);
}
if (REVIEW.trim().length === 0) {
  throw new Error("Review must not be only whitespace");
}
if (REVIEW.includes("\n") || REVIEW.includes("\r")) {
  throw new Error("Review must be a single line");
}
if (REVIEW.includes("!")) {
  throw new Error("Review must hold the deadpan: no exclamation marks");
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
try {
  writeFileSync(outPath, REVIEW, "utf8");
} catch (err) {
  throw new Error(`Failed to write ${outPath}: ${(err as Error).message}`);
}
console.log(`Wrote ${REVIEW.length} characters to ${outPath} (from ${scriptDir})`);
