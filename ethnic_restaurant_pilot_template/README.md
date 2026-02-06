# Ethnic Restaurant Custom GPT Pilot Template

This package is a reusable starting point for a Custom GPT dining assistant pilot.

## Includes
- `SYSTEM_PROMPT_TEMPLATE.md`
- `TEMPLATE_VARIABLES.md`
- `ADAPTATION_CHECKLIST.md`
- `kb/` policy, menu, safety, and behavior templates

## Quick Start
1. Copy this folder and rename it for your restaurant.
2. Replace all variables from `TEMPLATE_VARIABLES.md`.
3. Fill `kb/menu.md` and `kb/allergens.md` with full menu coverage.
4. Update source links in `kb/faq.md` and `kb/retrieval_policies.md`.
5. Run transcript QA using the repository `qa/` tooling.

## Safety Baseline
- No guaranteed price quoting.
- No absolute allergen guarantees.
- No substitutions/availability promises.
- Staff handoff for severe allergy or ambiguity.
