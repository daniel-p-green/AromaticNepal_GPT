# Canonical Sources and Freshness Policy

## Purpose
This document defines source priority and refresh cadence for the fan-made Ethnic Restaurant Custom GPT Pilot Playbook.

## Source Priority
1. Operational facts (hours, address, phone, ordering status):
   - https://www.orderaromaticnepal.com/
2. Menu wording, item inventory, halal note, spice-scale note:
   - https://aromaticnepal.com/wp-content/uploads/2025/08/Menu_compressed.pdf
3. Local snapshot files in this repository:
   - For offline testing only; never higher priority than live canonical URLs.

## Verification Snapshot
- Snapshot date: 2026-02-06
- Source status at snapshot: public and reachable.

## Freshness Rules
- Before each release tag:
  - Re-check canonical menu URL availability.
  - Re-check ordering URL and operational facts.
- If conflict is found:
  - Mark the field `[VERIFY]` in KB/docs.
  - Do not provide a definitive answer in assistant outputs.
  - Route to staff handoff language.

## Safety Rules
- Allergens: if data is not explicitly supported by menu wording, use `unknown` and hand off.
- Prices: do not quote as guaranteed; direct users to canonical menu source.
- Availability and substitutions: do not promise; route to staff.

## Disclaimer Requirement
Any public artifact derived from this repo must state that it is unofficial/fan-made unless explicit restaurant authorization is obtained.
