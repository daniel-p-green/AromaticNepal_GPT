# Aromatic Nepal — Custom GPT Opportunities Brief

## Why Now (Local Context)
- Low general awareness of Nepali cuisine in Liberty, MO → high need for explainers and confidence-building.
- Current digital surface (site + PDF menu) is static; GPT can personalize choices and teach while selling.
- Menufy storefront confirms hours/address; easy to pair a QR-first GPT that accelerates ordering without POS change.

## Guest Value → Business ROI
- Story-led explainers: demystify MoMo, thali, spice scale → reduces friction and increases first-time conversion.
- Fast personalization: 3 questions to 2–3 picks → lowers decision time; improves table turns and online conversion.
- Smart attach: auto-suggest bread + lassi + side with each curry → raises add-on rate.
- Dietary clarity: halal/veg/gluten cues + explicit allergen check → reduces returns and staff interruptions.

## Where to Integrate (This Codebase)
- Site shell: `www.aromaticnepal.com/index.html:407` (View Full Menu) and `:416` (Order Now) — add a third CTA “Ask Aromatic Nepal (Beta)” that opens the GPT widget.
- Menu PDFs: keep as source-of-truth; GPT cites the PDF URLs already present in the site.
- New content files to add (non-breaking):
  - `stories.md` — micro “story cards” used by GPT for optional cultural context.
  - `prix_fixe_sets.md` — clearly named bundles (no prices in KB; pricing handled in POS/print).
  - `prompts.md` — approved guest-facing scripts and do-not-say list (mirrors brand voice).

## GPT Modules (Feature Set)
- Taste Calibrator: 30-second quiz (spice tolerance; creamy vs. tangy; protein/veg; adventurous vs. familiar).
- Cultural Microcards: 80–120 chars on MoMo, Thali, Chai, Halal, Spice Scale with phonetics.
- Allergen Guard: explicit confirmation step; auto-filter suggestions when a risk is declared.
- Pairing Engine: rule-based suggestions for breads, lassi, chai, and sides (already scaffolded).
- Language Toggle: English ↔ Nepali; optional Spanish later. Session-only, no PII.
- Staff Handoff: “Need a custom prep?” → summon server with a short note.

## Personalization Paths (Conversation Blueprints)
- Quick Pick: 3 questions → 2 dishes + 1 bread + 1 drink, each with a 1-line “why.”
- Guided Journey: explores creamy/tomato/grilled; spice; veg or halal; budget comfort.
- First-Timers Track: defaults to mild, familiar textures; offers a “Nepal 101” prix fixe.
- Allergen-First: begins with allergen declaration; only shows safe items + staff prompt for severe cases.
- Family Share: suggests a multi-dish table spread with breads and rice.

## Storytelling (Sample Cards)
- MoMo (MOH-moh): Nepali dumplings—steamed or in broth (jhol); classic Kathmandu comfort.
- Thali (THA-lee): A balanced platter of rice, lentils, veggies, pickles, and dessert.
- Chai (CHAI): Spiced milk tea that softens heat and pairs with snacks.
- Halal: Chicken & lamb prepared to halal standards per menu note.
- Spice Scale: Mild, medium, hot, extra hot; we can adjust on request.

## Menu Clarity & Bundles (Prix Fixe Strategy)
- Create named sets that anchor first-timers and drive attach without price in KB (pricing can live in POS/print):
  1) Nepal 101 (for 2):
     - App: Veg Samosa (share)
     - Mains: Butter Chicken (mild), Navaratna Korma (veg)
     - Bread: Plain Naan (share)
     - Drinks: 2 Lassi (mango/salted)
     - Dessert: Kheer (share)
  2) Himalayan Veg Journey (for 2):
     - App: Veg Pakora
     - Mains: Saag Paneer, Chana Masala
     - Bread: Garlic Naan
     - Drinks: Chai x2
  3) Comfort + Heat (for 2):
     - App: Chicken 65
     - Mains: Rogan Josh (medium), Chili MoMo (hot)
     - Bread: Bread Basket
     - Drinks: Salted Lassi + Water
  4) Family Share (for 4):
     - App Platter (samosa, pakora, momo)
     - 3 Mains: Butter Chicken, Kadai Veg, Handi Biryani
     - Bread Basket + Extra Rice
     - 4 Drinks (mix chai/lassi)
- Menu sectioning improvements (for print/online clarity):
  - Callouts under curries: “Creamy & mild”, “Tomato & tangy”, “Smoky & grilled”, “Dry & sizzlers”.
  - Show spice defaults and adjustability.
  - Icons: halal, vegetarian, gluten‑friendly.

## Content to Add (Markdown-first)
- `stories.md`: short cultural blurbs with phonetics and 1-line pairings.
- `prix_fixe_sets.md`: set definitions by name and composition (no prices stored in KB).
- `ops_prompts.md`: staff scripts for handoff, allergen advisories, and sold-out alternatives.

## Example Widget Copy (Approved Snippets)
- Greeting: “Namaste! Want a fast pick or a guided tour?”
- Quick ask: “Any dietary needs (veg/halal/gluten-free) and preferred spice (mild/medium/hot)?”
- Pairing nudge: “Plain naan balances creamy sauces. Add one?”
- Cultural opt-in: “Curious about MoMo or Thali? I can share a quick story.”

## Measurement & A/B Ideas
- KPIs: attach rate (bread/drink/side), uplift on 5 target dishes, time-to-choice, guest thumbs-up.
- A/B: 2 picks + 1 add-on (A) vs. 3 picks + 2 add-ons (B); keep copy length constant.
- Cohorts: first-timers track vs. returning (session-only heuristic based on onsite path).

## Risks & Controls
- Allergen safety: never claim absolute safety; escalate severe allergies to staff.
- Cultural tone: keep respectful, factual, short; avoid clichés.
- Data: session-only; no PII captured; cite official sources.
- Availability: never promise substitutions or sold-out timing; offer two alternatives.

## Implementation Backlog (Lean)
- Add `Ask Aromatic Nepal (Beta)` CTA to site shell near menu buttons.
- Publish `stories.md`, `prix_fixe_sets.md`, `ops_prompts.md` for GPT retrieval.
- Extend KB to include `prix_fixe` objects (composition only; no prices).
- Configure 3 flows: Quick, Guided, Allergen-first; add Nepali labels.
- Instrument basic metrics (session starts, pick shown, add-on clicks) without identifiers.

---

### Appendix: KB Extensions (JSON examples kept in Markdown)
- Prix Fixe (composition only):
```json
{
  "prix_fixe": [
    {
      "set_id": "set.nepal101.for2",
      "name": "Nepal 101 (for 2)",
      "includes": {
        "appetizers": ["dish.app.veg_samosa"],
        "mains": ["dish.curry.butter_chicken", "dish.curry.navaratna_korma"],
        "breads": ["bread.naan.plain"],
        "drinks": ["drink.lassi.mango", "drink.lassi.salt"],
        "desserts": ["dessert.kheer"]
      },
      "notes": "First-timer friendly; mild by default"
    }
  ]
}
```
- Story Cards (for retrieval):
```json
{
  "stories": [
    {"id": "story.momo", "title": "MoMo", "phonetic": "MOH-moh", "blurb": "Nepali dumplings—steamed or in broth (jhol); classic Kathmandu comfort.", "pairing_hint": "Chai or salted lassi"},
    {"id": "story.thali", "title": "Thali", "phonetic": "THA-lee", "blurb": "Balanced platter of rice, lentils, veg, pickles, and dessert.", "pairing_hint": "Plain naan on the side"}
  ]
}
```

### Notes
- Keep prices out of KB to avoid drift; cite menu PDFs for canonical details.
- Alcohol not observed on current menu [VERIFY]; if asked, prioritize non-alcoholic pairings.
