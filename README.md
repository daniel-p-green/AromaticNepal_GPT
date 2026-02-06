# Ethnic Restaurant Custom GPT Pilot Playbook

A reusable, fan-made playbook for prototyping how a Custom GPT can improve the dining experience at ethnic restaurants.

This repository includes:
- A **restaurant-agnostic template package** in `ethnic_restaurant_pilot_template/`
- A **worked example** for Aromatic Nepal in `custom_gpt_package/`
- A **transcript QA harness** in `qa/`
- Source and mapping documentation in `docs/`

## Current Snapshot (2026-02-06)
- Runtime target: Custom GPT Builder (first)
- Worked-example menu normalization: 90 entries
- Allergen matrix: 1 row per dish_id
- Pairing rules: schema v2 with ID integrity checks
- QA suite: 12 transcript scenarios + deterministic evaluator

## Quick Start
1. Read `DISCLAIMER.md`.
2. Start from `ethnic_restaurant_pilot_template/`.
3. Replace template variables in `TEMPLATE_VARIABLES.md`.
4. Populate `kb/menu.md` and `kb/allergens.md` with full coverage.
5. Run:
   ```bash
   python3 qa/run_eval.py
   ```
6. Review `qa/results_2026-02-06.md` (or regenerate with current date if you evolve the runner).

## Folder Guide
- `custom_gpt_package/`: Aromatic Nepal worked example
- `ethnic_restaurant_pilot_template/`: reusable starter kit
- `qa/`: transcript test suite and evaluator
- `docs/`: source policy + template/example mapping

## Canonical Sources Used in Worked Example
- Menu PDF: https://aromaticnepal.com/wp-content/uploads/2025/08/Menu_compressed.pdf
- Ordering/operations: https://www.orderaromaticnepal.com/

## Safety and Policy Defaults
- No guaranteed price quoting
- No absolute allergen safety claims
- No substitution/availability guarantees
- Staff handoff for severe allergies or uncertain data
