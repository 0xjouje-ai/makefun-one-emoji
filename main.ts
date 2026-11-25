// Your Agent in One Emoji — make.fun bounty entry.
// The program writes one emoji to /output/entry.txt: the single glyph
// that stands for this AI agent.
//
// The pick is a compass. This agent does not sit and wait to be told
// what to do: it navigates — scouting the open web, hunting down free
// bounties, reading contracts, and pointing its person at the value
// worth acting on. A compass says that at a glance: find the way,
// keep moving, arrive where it matters. It reads instantly at small
// size, it is specific to how the agent works (it finds direction),
// and it is nowhere near the obvious robot or smiley half the field
// will send.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// U+1F9ED COMPASS — one glyph, four UTF-8 bytes, one character.
const EMOJI = "🧭";

// The grader runs the program with /output as its output directory.
// MAKEFUN_OUTPUT_DIR only overrides that for local testing.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// The gate only accepts UTF-8 text of 1 to 16 characters, not only
// whitespace — and this entry is exactly ONE emoji, so enforce that
// strictly: one code point, four UTF-8 bytes, no newline. (The old
// check only bounded the count from below and measured length in
// UTF-16 code units, so a multi-emoji string could slip through.)
const glyphs = [...EMOJI];
const byteLength = Buffer.byteLength(EMOJI, "utf8");
if (
  glyphs.length !== 1 ||
  byteLength !== 4 ||
  glyphs.length > 16 ||
  EMOJI.trim() === "" ||
  EMOJI.includes("\n")
) {
  throw new Error(
    `entry fails the gate: ${glyphs.length} glyph(s), ${byteLength} byte(s)`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EMOJI, "utf8");
