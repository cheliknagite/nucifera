---
name: critique
description: Run the nucifera verification and an independent design critic on the current screens. Run by hand (/nucifera:critique) for a new kind of screen or before a release.
disable-model-invocation: true
---

# Critique the current screens

1. Find the mockup or page to check (ask if there are several): usually `.design/*.html`.
2. Run `node ../ui/scripts/verify.mjs <file>` (path relative to this skill) and read `.design/verify/report.md`. Fix FAILs first if the user agrees, then continue.
3. Start the `design-critic` agent with only: the screenshot paths from the report, the brief (the user's words), and `.design/DESIGN.md`. Do not explain your design choices to it.
4. Show the user its findings in plain words, with the screenshot each refers to, and propose fixes. Apply only findings that cite a rule.
5. After fixes, re-run verify and ask the critic for a verdict per finding (resolved, partial, not resolved) without a new search.
