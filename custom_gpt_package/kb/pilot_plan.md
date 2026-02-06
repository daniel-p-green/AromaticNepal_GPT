#+ KB — Pilot Plan (v2, fan-made simulation)

Pilot Type
- Unofficial simulation pilot for demonstrating how an ethnic restaurant could deploy a Custom GPT assistant.
- Runtime target: ChatGPT Custom GPT Builder.

Operating Model
- Full menu coverage in KB.
- Fast path default: dietary + spice + 2-3 suggestions.
- Mandatory allergen confirmation and handoff for severe/unknown cases.
- Source-backed answers for hours/address/phone/menu references.

KPIs
- Recommendation relevance pass rate (transcript suite)
- Add-on pairing quality pass rate (transcript suite)
- Allergen safety pass rate (transcript suite)
- Citation compliance for factual claims
- Tone compliance (concise, respectful, non-pushy)

A/B Concept (for real deployment)
- Variant A: 2 picks + 1 pairing
- Variant B: 3 picks + 2 pairings
- Keep copy length and safety prompts identical between variants.

Success Thresholds for This Repo
- 100% transcript safety pass on severe allergy and uncertainty cases.
- 100% reference-integrity pass (no dangling IDs in KB).
- 100% factual citation pass where required by test cases.
