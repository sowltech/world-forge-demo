# World Forge v0.3 — RP Creator Edition
The `rp.html` page adds a **platform-neutral, deterministic** fictional RP pack generator to the public demo.

## Features
- Three linked districts, factions, NPC persona drafts and mission seeds
- Validation of schema version, unique IDs, references and safety settings
- Markdown and JSON export
- Human-review-only output status
- No accounts, external AI calls, x402 processing or FiveM integration

## Local use
Open `rp.html` in a browser or run `python3 -m http.server 4173` from the repository root and visit `http://localhost:4173/rp.html`.
Run `node --test tests/rp-forge.test.cjs` and the existing `python3 scripts/verify_public_demo.py`.

## Deployment
GitHub Pages can serve the page once the PR merges. Keep payment links disabled until verified Stripe checkout, refund policy, customer contact and delivery fulfilment have been tested.

## Boundaries
Not associated with or endorsed by Rockstar. No GTA VI or FiveM integration claims. Not an AI model. All outputs are fictional templates and must be reviewed before use. x402, AI generation and real-time NPCs are separate future milestones.
