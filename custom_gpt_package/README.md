#+ Aromatic Nepal — Worked Example Package (v2)

Purpose
- This folder is the worked example for the reusable Ethnic Restaurant Custom GPT pilot template.
- It is an unofficial, fan-made package intended for demonstration and testing.

Contents
- `SYSTEM_PROMPT.md` — operational prompt for the guest assistant
- `kb/menu.md` — full menu normalization (schema v2)
- `kb/allergens.md` — one allergen row per `dish_id`
- `kb/pairing_rules.md` — rule-based pairing suggestions (schema v2)
- `kb/faq.md` — canonical operational Q&A
- `kb/retrieval_policies.md` — source priority and freshness policy
- `kb/privacy_and_safety.md` — safety/PII guardrails
- `kb/brand_voice.md` — response style constraints
- `kb/glossary.md` — term phonetics and definitions
- `kb/stories.md` — optional cultural microcards
- `kb/prix_fixe_sets.md` — composition-only meal bundles
- `kb/behavior_blueprint.md` — step-by-step conversation behavior
- `kb/pilot_plan.md` — transcript-first pilot criteria

Snapshot Metadata
- Menu snapshot source: https://aromaticnepal.com/wp-content/uploads/2025/08/Menu_compressed.pdf
- Operations source: https://www.orderaromaticnepal.com/
- Snapshot verification date: 2026-02-06
- Normalized entries: 90 (includes 6 side lines)

Important Policies
- Do not quote prices as guaranteed.
- Do not promise substitutions or inventory status.
- Do not claim absolute allergen safety.
- Use staff handoff for high-risk/unknown cases.
