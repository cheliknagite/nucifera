# Resend: changelog feed (list)

Source: https://resend.com/changelog, observed 2026-10-22 at 390x844, dark.

**The idea:** a feed set like a magazine: a 64px serif masthead over a sans-serif working page, and every entry led by a real product screenshot already composed as a cover.

**Measured:**
- First screen: masthead, search, Subscribe, then 1 full entry (date, 342x181 image, title, one sentence, author) and the next date at the bottom edge.
- Masthead "Changelog": Domaine serif 64/400, tracking -0.64px, line-height 1.0.
- Entry title: ABC Favorit 36/400, tracking -1.8px (-0.05em), line-height 54px (1.5).
- Three typefaces, each with one job: serif masthead, display titles, Inter body (16px, 42% of characters).
- One grey #A1A4A5 carries 59% of the text; titles near-white.
- Colour: none (0 saturated colours).
- Motion on load: no entrance animation; 3 looping opacity dots (1000 ms) on a 4px indicator.

**Transfer:**
- Break the type scale once, at the top, with a different voice; everything below stays in the working face.
- Make each entry's image explain the change: a composed crop of the real feature, not decoration.
- Date first and small, above everything: time is the spine of a feed.
- One author face per entry gives a human source without a byline block.

**Do not copy:** the serif masthead (Resend's voice); a 1.5 line-height on 36px titles (Cyrillic display needs about 1.15, not more air); one entry per screen for anything people scan; the cover composition.

**With nucifera:** the size break belongs on landing and "what's new" pages: `.t-display` 48-64px for the page title only, in the house face. Entries are `.rows`: date `.t-time` 13px, title `--t-title` 22px, one 16px line in `--fg-2`, a real image at full clarity.
