# Case Study: Aromatic Nepal Worked Example

## Context
The original project explored a Custom GPT concept for a Nepali restaurant. Strategy assets were strong, but implementation assets were incomplete: partial menu normalization, dangling IDs in pairings, and no formal QA gate.

## What Was Implemented
- Full menu normalization in schema v2 (`custom_gpt_package/kb/menu.md`)
- Full allergen matrix with conservative `unknown` defaults (`custom_gpt_package/kb/allergens.md`)
- Rebuilt pairing rules using strict `suggest_dish_ids` references (`custom_gpt_package/kb/pairing_rules.md`)
- Updated policy/FAQ/voice/safety docs for source-grounded, unofficial usage
- Built a reusable template package (`ethnic_restaurant_pilot_template/`)
- Added transcript QA suite and evaluator (`qa/`)

## Key Design Choices
- **Template-first architecture**: generic package plus worked example.
- **Safety-first data model**: unknown is preferred over unsupported certainty.
- **Source-first operations policy**: canonical URLs drive factual responses.
- **Transcript-first validation**: shipping is blocked by policy and safety failures.

## Practical Outcome
This repository can now be used as a repeatable pilot blueprint for other ethnic restaurants with minimal adaptation work (source replacement + menu normalization + QA rerun).

## Remaining Gaps (Intentional)
- No live POS integration.
- No official restaurant endorsement assumed.
- No production guarantee for real-time availability or pricing.
