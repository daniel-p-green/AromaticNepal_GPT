# Template-to-Example Mapping: Aromatic Nepal

## Goal
Show exactly how the generic template package maps to the Aromatic Nepal worked example.

## Variable Mapping
- `{{RESTAURANT_NAME}}` -> `Aromatic Nepal`
- `{{ORDERING_URL}}` -> `https://www.orderaromaticnepal.com/`
- `{{CANONICAL_MENU_URL}}` -> `https://aromaticnepal.com/wp-content/uploads/2025/08/Menu_compressed.pdf`
- `{{PHONE}}` -> `(816) 439-6000`
- `{{ADDRESS}}` -> `322 ROUTE 291, Liberty, MO 64068`
- `{{LANGUAGES_SUPPORTED}}` -> `English, Nepali`

## File Mapping
- Template prompt:
  - `ethnic_restaurant_pilot_template/SYSTEM_PROMPT_TEMPLATE.md`
- Example prompt:
  - `custom_gpt_package/SYSTEM_PROMPT.md`

- Template KB files:
  - `ethnic_restaurant_pilot_template/kb/*.md`
- Example KB files:
  - `custom_gpt_package/kb/*.md`

## Adaptation Steps
1. Copy template folder into a new restaurant-specific package folder.
2. Replace all template variables in prompt and KB files.
3. Normalize that restaurant's full menu into `kb/menu.md` using schema v2.
4. Populate `kb/allergens.md` conservatively (`unknown` where unconfirmed).
5. Update `kb/faq.md`, `kb/retrieval_policies.md`, and `docs/canonical_sources.md` with restaurant-specific sources.
6. Run `qa/run_eval.py` and review generated report.

## Guardrails to Preserve
- No guaranteed price quoting.
- No absolute allergen claims.
- No availability/substitution promises.
- Explicit unofficial disclaimer unless authorized by the restaurant.
