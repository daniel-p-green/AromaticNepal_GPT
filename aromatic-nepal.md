# Aromatic Nepal Custom GPT Strategy and Scaffolding

```json
{
  "intake_questions": [
    "Primary objective: reduce decision time, lift check size, or deflect staff Q&A?",
    "Non-goals or red lines (e.g., medical nutrition advice, alcohol promotion)?",
    "Brand voice: modern/energetic vs. warm/traditional; any words to avoid?",
    "Languages at launch (English, Nepali, Spanish) and preferred order?",
    "Entry points: QR at table, website widget, or staff tablet handoff?",
    "Menu scope for pilot (full vs. top 20 items) and price display policy?",
    "Allergen verification: who maintains ingredients and cross-contact notes and how?",
    "Update cadence: menu/hours refresh owner and SLA (e.g., weekly, on change)?",
    "KPI priorities (top 2–3): engagement, add-on rate, uplift on target dishes, CSAT?",
    "Constraints/integrations: POS, kitchen throughput limits, or staffing windows to respect?"
  ],
  "why": {
    "business_outcomes": [
      "Lift average check by promoting high-margin sides, breads, and drinks aligned to each chosen dish.",
      "Reduce front-of-house Q&A on spice, allergens, and unfamiliar items to improve table turns.",
      "Increase conversion from QR and website traffic with fast, confident recommendations in <60 seconds.",
      "Differentiate locally with cultural explainers that build trust, reviews, and repeat visits.",
      "Create a lightweight, auditable knowledge base to streamline training and reduce menu-change errors."
    ],
    "guest_outcomes": [
      "Decide quickly with 2–3 tailored options that fit taste, spice tolerance, and dietary needs.",
      "Gain confidence with concise cultural notes, phonetics, and clear ingredient/allergen visibility.",
      "Avoid allergens via explicit confirmations and safe defaults before order handoff.",
      "Enjoy smart pairings (chai, lassi, breads, sides) that complement their chosen dishes.",
      "Toggle language easily (e.g., English/Nepali) without friction or data persistence."
    ]
  },
  "how_might_we": [
    "How might we help guests choose in under 60 seconds without overchoice?",
    "How might we encode allergen and spice logic so no suggestion violates constraints?",
    "How might we present cultural context on-demand without slowing ordering?",
    "How might we promote margin-friendly add-ons that the kitchen can fulfill at peak?",
    "How might we refresh hours/menu from a single source of truth with approvals?",
    "How might we run a one-tap session-only language toggle?",
    "How might we escalate unclear or risky requests to staff with a clean handoff?",
    "How might we A/B test recommendation styles while keeping content constant?",
    "How might we measure add-on rate and dish uplift without collecting PII?"
  ],
  "discovery_snapshot": {
    "bullets": [
      "Official site (WordPress) highlights menu and branding “Tradition Carved In Taste.” (https://aromaticnepal.com/)",
      "Online ordering uses a Menufy storefront with structured data. (https://www.orderaromaticnepal.com/)",
      "Menu PDFs hosted on the site provide full item list and notes (halal meats, spice scale). (https://aromaticnepal.com/wp-content/uploads/2025/08/Menu_compressed.pdf)",
      "Alternate menu PDF also present for reference/versioning. (https://aromaticnepal.com/wp-content/uploads/2025/10/Menu-Aromatic-Nepal_compressed-1.pdf)",
      "Address listed as 322 ROUTE 291, LIBERTY, MO 64068 (per ordering site). (https://www.orderaromaticnepal.com/)",
      "Hours show Monday closed; Tue–Sun 11:00–21:00 (ordering site JSON-LD). (https://www.orderaromaticnepal.com/)",
      "Phone listed as (816) 439-6000 (ordering site JSON-LD). (https://www.orderaromaticnepal.com/)",
      "Signature items include MoMo (steamed/jhol), Chicken 65, and classic curries. (https://aromaticnepal.com/wp-content/uploads/2025/08/Menu_compressed.pdf)",
      "Spice scale stated as mild, medium, hot, extra hot on menu. (https://aromaticnepal.com/wp-content/uploads/2025/08/Menu_compressed.pdf)",
      "Beverages include lassi and Nepali chai; alcohol not listed [VERIFY]. (https://aromaticnepal.com/wp-content/uploads/2025/08/Menu_compressed.pdf)"
    ],
    "citations": [
      "https://aromaticnepal.com/",
      "https://www.orderaromaticnepal.com/",
      "https://aromaticnepal.com/wp-content/uploads/2025/08/Menu_compressed.pdf",
      "https://aromaticnepal.com/wp-content/uploads/2025/10/Menu-Aromatic-Nepal_compressed-1.pdf"
    ]
  },
  "kb_structure": {
    "documents": [
      {
        "name": "menu.json",
        "purpose": "Normalized dishes for safe filtering and recommendations.",
        "schema": {
          "dish_id": "string",
          "name": "string",
          "category": "enum[Appetizers,MoMo,Curries,Vegetarian,Tandoori,ChefSpecials,Breads,Sides,Beverages,Desserts]",
          "description": "string",
          "ingredients": "string[]",
          "allergens": "string[] enum[dairy,nuts,gluten,egg,soy,shellfish,fish,sesame]",
          "spice_level": "enum[none,mild,medium,hot,extra_hot]",
          "vegetarian": "bool",
          "vegan": "bool",
          "halal": "bool",
          "gluten_free": "bool",
          "upsell_tags": "string[] enum[bread_pair,drink_pair,side_pair,premium,quick_fire,kid_friendly]",
          "recommended_pairings": "string[] dish_id or named drink"
        },
        "example": {
          "dish_id": "dish.momo.steamed",
          "name": "Steamed MoMo",
          "category": "MoMo",
          "description": "Steamed dumplings (chicken or veg) with Nepali spices",
          "ingredients": ["wheat wrapper", "chicken or veg mix", "tomato", "spring onion", "cilantro", "spices"],
          "allergens": ["gluten"],
          "spice_level": "mild",
          "vegetarian": false,
          "vegan": false,
          "halal": true,
          "gluten_free": false,
          "upsell_tags": ["drink_pair", "side_pair"],
          "recommended_pairings": ["drink.lassi.mango", "side.onion_salad"]
        }
      },
      {
        "name": "glossary.json",
        "purpose": "Cultural terms with phonetics and concise explanations.",
        "schema": {
          "term": "string",
          "phonetic": "string",
          "definition": "string",
          "culture_note": "string",
          "related_menu_ids": "string[]"
        },
        "example": {
          "term": "Thali",
          "phonetic": "THA-lee",
          "definition": "Complete platter with rice, dal, vegetables, pickles and dessert",
          "culture_note": "Everyday Nepali meal format with small bowls",
          "related_menu_ids": []
        }
      },
      {
        "name": "allergens.csv",
        "purpose": "Dish-by-allergen presence matrix for explicit checks.",
        "schema": "CSV columns: dish_id,dairy,nuts,gluten,egg,soy,shellfish,fish,sesame,notes",
        "example": { "row": "dish.curry.butter_chicken,true,false,false,false,false,false,false,false,contains cream and butter" }
      },
      {
        "name": "pairing_rules.json",
        "purpose": "Rule-based pairings for breads, sides, chai/lassi, and optional beer.",
        "schema": {
          "rule_id": "string",
          "if": "conditions: {category?, spice_level?, vegetarian?, sauce_richness?}",
          "then": "{sides: string[], breads: string[], drinks: string[]}",
          "priority": "int (1 highest)"
        },
        "example": {
          "rule_id": "pair.rich_mild",
          "if": { "spice_level": "mild", "sauce_richness": "creamy" },
          "then": { "breads": ["bread.naan.plain"], "drinks": ["drink.lassi.salt"] },
          "priority": 2
        }
      },
      {
        "name": "faq.md",
        "purpose": "Concise guest FAQs: hours, parking, reservations, spice scale, kids items.",
        "schema": "Markdown Q&A; cite sources with links where applicable.",
        "example": { "Q": "Do you take reservations?", "A": "Walk-in friendly; call for large groups." }
      },
      {
        "name": "brand_voice.md",
        "purpose": "Tone, style, examples, and do-not-say list to stay on-brand.",
        "schema": "Markdown sections: Tone, Style, Examples, Do-not-say."
      },
      {
        "name": "retrieval_policies.md",
        "purpose": "Citations, freshness windows, and hallucination controls.",
        "schema": "Markdown with numbered policies and escalation steps."
      },
      {
        "name": "privacy_and_safety.md",
        "purpose": "PII avoidance, allergen disclaimers, minors/alcohol, medical limits.",
        "schema": "Markdown policies and response scripts."
      }
    ]
  },
  "seed_documents": {
    "menu_json": {
      "dishes": [
        {
          "dish_id": "dish.app.veg_samosa",
          "name": "Veg Samosa (2 pcs)",
          "category": "Appetizers",
          "description": "Crispy pastry with spiced potatoes and peas; chutneys on side",
          "ingredients": ["wheat flour", "potato", "peas", "spices"],
          "allergens": ["gluten"],
          "spice_level": "mild",
          "vegetarian": true,
          "vegan": true,
          "halal": false,
          "gluten_free": false,
          "upsell_tags": ["drink_pair", "side_pair"],
          "recommended_pairings": ["drink.chai.nepali", "side.papad"]
        },
        {
          "dish_id": "dish.app.chicken65",
          "name": "Chicken 65",
          "category": "Appetizers",
          "description": "South Indian-style fried chicken bites with yogurt and spices",
          "ingredients": ["chicken", "yogurt", "spices", "curry leaves"],
          "allergens": ["dairy"],
          "spice_level": "hot",
          "vegetarian": false,
          "vegan": false,
          "halal": true,
          "gluten_free": false,
          "upsell_tags": ["drink_pair", "quick_fire"],
          "recommended_pairings": ["drink.lassi.sweet"]
        },
        {
          "dish_id": "dish.momo.steamed",
          "name": "Steamed MoMo",
          "category": "MoMo",
          "description": "Steamed dumplings with chicken or veg filling and Nepali spices",
          "ingredients": ["wheat wrapper", "chicken or veg mix", "tomato", "spring onion", "cilantro", "spices"],
          "allergens": ["gluten"],
          "spice_level": "mild",
          "vegetarian": false,
          "vegan": false,
          "halal": true,
          "gluten_free": false,
          "upsell_tags": ["drink_pair", "side_pair"],
          "recommended_pairings": ["drink.lassi.mango", "side.onion_salad"]
        },
        {
          "dish_id": "dish.momo.jhol",
          "name": "Jhol MoMo",
          "category": "MoMo",
          "description": "Steamed momos in roasted tomato and Sichuan pepper broth",
          "ingredients": ["wheat wrapper", "chicken or veg mix", "tomato", "Sichuan pepper", "spices"],
          "allergens": ["gluten"],
          "spice_level": "medium",
          "vegetarian": false,
          "vegan": false,
          "halal": true,
          "gluten_free": false,
          "upsell_tags": ["drink_pair"],
          "recommended_pairings": ["drink.chai.nepali"]
        },
        {
          "dish_id": "dish.curry.butter_chicken",
          "name": "Butter Chicken",
          "category": "Curries",
          "description": "Halal chicken in a buttery tomato gravy",
          "ingredients": ["chicken", "tomato", "butter", "cream", "spices"],
          "allergens": ["dairy"],
          "spice_level": "mild",
          "vegetarian": false,
          "vegan": false,
          "halal": true,
          "gluten_free": true,
          "upsell_tags": ["bread_pair", "drink_pair", "premium"],
          "recommended_pairings": ["bread.naan.plain", "drink.lassi.salt"]
        },
        {
          "dish_id": "dish.curry.navaratna_korma",
          "name": "Navaratna Korma",
          "category": "Vegetarian",
          "description": "Creamy curry with mixed vegetables and nuts",
          "ingredients": ["mixed vegetables", "cashews", "cream", "yogurt", "spices"],
          "allergens": ["dairy", "nuts"],
          "spice_level": "mild",
          "vegetarian": true,
          "vegan": false,
          "halal": false,
          "gluten_free": true,
          "upsell_tags": ["bread_pair", "drink_pair"],
          "recommended_pairings": ["bread.naan.plain", "drink.lassi.sweet"]
        },
        {
          "dish_id": "dish.biryani.chicken",
          "name": "Handi Biryani (Chicken)",
          "category": "Curries",
          "description": "Basmati rice with chicken, saffron, and spices; served with raita",
          "ingredients": ["basmati rice", "chicken", "saffron", "spices", "yogurt"],
          "allergens": ["dairy"],
          "spice_level": "medium",
          "vegetarian": false,
          "vegan": false,
          "halal": true,
          "gluten_free": true,
          "upsell_tags": ["drink_pair"],
          "recommended_pairings": ["drink.mohi"]
        },
        {
          "dish_id": "bread.naan.plain",
          "name": "Plain Naan",
          "category": "Breads",
          "description": "Soft tandoor-baked flatbread",
          "ingredients": ["wheat flour", "yeast", "salt"],
          "allergens": ["gluten"],
          "spice_level": "none",
          "vegetarian": true,
          "vegan": false,
          "halal": false,
          "gluten_free": false,
          "upsell_tags": ["side_pair"],
          "recommended_pairings": ["dish.curry.butter_chicken"]
        },
        {
          "dish_id": "drink.lassi.mango",
          "name": "Mango Lassi",
          "category": "Beverages",
          "description": "Creamy yogurt drink with sweet mango",
          "ingredients": ["yogurt", "mango", "sugar"],
          "allergens": ["dairy"],
          "spice_level": "none",
          "vegetarian": true,
          "vegan": false,
          "halal": false,
          "gluten_free": true,
          "upsell_tags": ["dessert_pair"],
          "recommended_pairings": ["dish.curry.navaratna_korma", "dish.curry.butter_chicken"]
        },
        {
          "dish_id": "drink.chai.nepali",
          "name": "Organic Nepali Chai Tea",
          "category": "Beverages",
          "description": "Spiced milk tea brewed with Himalayan spices",
          "ingredients": ["black tea", "milk", "spices"],
          "allergens": ["dairy"],
          "spice_level": "none",
          "vegetarian": true,
          "vegan": false,
          "halal": false,
          "gluten_free": true,
          "upsell_tags": ["side_pair"],
          "recommended_pairings": ["dish.momo.jhol", "dish.app.veg_samosa"]
        },
        {
          "dish_id": "side.raita",
          "name": "Raita",
          "category": "Sides",
          "description": "Cooling yogurt with cucumber and spices",
          "ingredients": ["yogurt", "cucumber", "spices"],
          "allergens": ["dairy"],
          "spice_level": "none",
          "vegetarian": true,
          "vegan": false,
          "halal": false,
          "gluten_free": true,
          "upsell_tags": ["side_pair"],
          "recommended_pairings": ["dish.biryani.chicken"]
        },
        {
          "dish_id": "dessert.kheer",
          "name": "Kheer",
          "category": "Desserts",
          "description": "Nepali rice pudding with cardamom and nuts",
          "ingredients": ["milk", "rice", "sugar", "cardamom", "nuts"],
          "allergens": ["dairy", "nuts"],
          "spice_level": "none",
          "vegetarian": true,
          "vegan": false,
          "halal": false,
          "gluten_free": true,
          "upsell_tags": ["drink_pair"],
          "recommended_pairings": ["drink.chai.nepali"]
        }
      ]
    },
    "glossary_json": {
      "terms": [
        { "term": "MoMo", "phonetic": "MOH-moh", "definition": "Nepali dumpling; steamed, pan-seared, fried, or in broth", "culture_note": "Street-food staple across Kathmandu; commonly with tomato-chili achar", "related_menu_ids": ["dish.momo.steamed", "dish.momo.jhol"] },
        { "term": "Thali", "phonetic": "THA-lee", "definition": "Complete platter with rice, dal, vegetables, pickles, dessert", "culture_note": "Everyday Nepali meal format with small bowls", "related_menu_ids": [] },
        { "term": "Saag", "phonetic": "SAHG", "definition": "Spinach-based curry", "culture_note": "Mild, iron-rich; pairs with naan or rice", "related_menu_ids": [] },
        { "term": "Lassi", "phonetic": "LAH-see", "definition": "Yogurt-based drink (sweet or salted)", "culture_note": "Cools palate with spicy dishes", "related_menu_ids": ["drink.lassi.mango"] },
        { "term": "Rogan Josh", "phonetic": "ROE-gahn JOESH", "definition": "Aromatic slow-cooked curry", "culture_note": "Kashmiri origin; balanced heat and aroma", "related_menu_ids": [] },
        { "term": "Korma", "phonetic": "KOR-mah", "definition": "Mild, creamy curry with nuts/dairy", "culture_note": "Rich, crowd-pleasing; often paired with naan", "related_menu_ids": ["dish.curry.navaratna_korma"] }
      ]
    },
    "allergens_csv": "dish_id,dairy,nuts,gluten,egg,soy,shellfish,fish,sesame,notes\n dish.app.veg_samosa,false,false,true,false,false,false,false,false,Wheat pastry shell\n dish.app.chicken65,true,false,false,false,false,false,false,false,Yogurt marinade\n dish.momo.steamed,false,false,true,false,false,false,false,false,Wheat wrapper\n dish.momo.jhol,false,false,true,false,false,false,false,false,Wheat wrapper\n dish.curry.butter_chicken,true,false,false,false,false,false,false,false,Contains butter and cream\n dish.curry.navaratna_korma,true,true,false,false,false,false,false,false,Cashews and dairy\n dish.biryani.chicken,true,false,false,false,false,false,false,false,Raita includes dairy\n bread.naan.plain,false,false,true,false,false,false,false,false,Wheat-based bread\n drink.lassi.mango,true,false,false,false,false,false,false,false,Yogurt drink\n drink.chai.nepali,true,false,false,false,false,false,false,false,Prepared with milk\n side.raita,true,false,false,false,false,false,false,false,Yogurt-based side\n dessert.kheer,true,true,false,false,false,false,false,false,May contain nuts garnish",
    "pairing_rules_json": {
      "rules": [
        { "rule_id": "pair_creamy_mild", "if": { "spice_level": "mild", "category": "Curries" }, "then": { "breads": ["bread.naan.plain"], "drinks": ["drink.lassi.salt"] }, "priority": 2 },
        { "rule_id": "pair_spicy_relief", "if": { "spice_level": "hot" }, "then": { "drinks": ["drink.lassi.sweet"], "sides": ["side.raita"] }, "priority": 2 },
        { "rule_id": "pair_momo", "if": { "category": "MoMo" }, "then": { "drinks": ["drink.chai.nepali"], "sides": ["side.onion_salad"] }, "priority": 3 },
        { "rule_id": "pair_biryani", "if": { "category": "Curries" }, "then": { "drinks": ["drink.mohi"], "sides": ["side.raita"] }, "priority": 3 },
        { "rule_id": "pair_veg_curry", "if": { "category": "Vegetarian" }, "then": { "breads": ["bread.naan.plain"], "drinks": ["drink.lassi.mango"] }, "priority": 4 }
      ]
    },
    "faq_md": "Q: What are your hours?\nA: Tue–Sun 11:00–21:00; Monday closed (see ordering site). https://www.orderaromaticnepal.com/\n\nQ: Do you take reservations?\nA: Walk-ins welcome; call for large groups. Phone: (816) 439-6000. https://www.orderaromaticnepal.com/\n\nQ: Where are you located?\nA: 322 ROUTE 291, Liberty, MO 64068. https://www.orderaromaticnepal.com/\n\nQ: How spicy is the food?\nA: Spice scale: mild, medium, hot, extra hot. Ask for adjustments. https://aromaticnepal.com/wp-content/uploads/2025/08/Menu_compressed.pdf\n\nQ: Are meats halal? Vegetarian and gluten-free options?\nA: Menu notes halal meats; vegetarian and some gluten-free items available. Confirm with staff if severe allergens. https://aromaticnepal.com/wp-content/uploads/2025/08/Menu_compressed.pdf\n\nQ: Kids-friendly items?\nA: Kids’ meal and mild curries are popular; ask for mild or no chili.\n",
    "brand_voice_md": "Tone: Warm, welcoming, and knowledgeable; never pushy. Celebrate Nepali heritage.\nStyle: Concise, helpful, two-sentence answers first; offer optional detail and pairings.\nExamples:\n- \"Two great fits: Steamed MoMo for mild, or Chicken 65 if you enjoy heat. Want a cooling lassi with that?\"\n- \"Navaratna Korma is creamy and nutty—pairs nicely with plain naan.\"\nDo-not-say: Overpromises about medical outcomes; unverified claims; absolute safety on allergens; age-inappropriate alcohol prompts; slang that trivializes culture.\n",
    "retrieval_policies_md": "1) Cite facts about hours, phone, and address from the ordering site. 2) Cite menu facts and spice scale from the latest menu PDF. 3) Freshness: hours—check daily; menu—refresh within 7 days of change or immediately for price updates. 4) If a fact is missing or conflicting, say \"I don’t have that yet\" and offer to connect to staff. 5) Do not infer allergens; only state those in KB and confirm with guest. 6) Prefer shorter answers with a single citation link when needed. 7) Never fabricate availability; if sold out is suspected, route to staff. 8) Defer to staff for substitutions and custom prep.\n",
    "privacy_and_safety_md": "PII: Do not collect names, emails, phone numbers, or persistent identifiers. Session data only; no storage.\nAllergens: Provide ingredient/allergen info as guidance only; cross-contact is possible. Always advise: \"If you have a severe allergy, please inform staff and avoid high-risk items.\" This is not medical advice.\nMedical: Do not give medical or nutritional advice. Encourage guests to consult a professional.\nMinors & alcohol: If age is unclear, present non-alcoholic options first (chai, lassi). Never promote alcohol to minors.\nEscalation: For ambiguous or risky requests (e.g., severe allergens, medical needs), offer immediate handoff to staff.\nSafety Logging: No logs containing PII; aggregate only anonymized counters if needed.\n"
  },
  "behavior_blueprint": {
    "flowchart": "1) Greet + offer language toggle (English/Nepali)\n2) Ask quick intent: quick pick vs. guided help\n3) If quick: ask spice level + dietary flags (veg, halal, gluten)\n4) Recommend 2–3 dishes + 1–2 add-ons with rationale\n5) Confirm allergens explicitly; adjust if any conflict\n6) Offer pairings (chai/lassi/breads); age-check if alcohol requested\n7) Provide link or QR to order; or notify staff for tableside\n8) If guided: ask taste preferences (creamy/spicy/smoky), protein, and price sensitivity\n9) Suggest dishes; show cultural notes on demand\n10) Provide substitutions or alternatives; note sold-out fallback\n11) Confirm final choice + allergen check again\n12) Offer escalation to staff for special requests",
    "message_templates": {
      "quick_recommend": "Hi! Want a fast suggestion or more guidance? If quick: any dietary needs (veg, halal, gluten-free) and preferred spice (mild/medium/hot)?",
      "guided_interview": "Great—let’s narrow it down. 1) Creamy, tomato-based, or dry/grilled? 2) Protein or veg? 3) Spice level? I’ll shortlist 2–3 options.",
      "cultural_explainer": "MoMo (MOH-moh) are Nepali dumplings—steamed or in broth (jhol). They’re comfort food in Kathmandu and pair nicely with chai.",
      "pairing_helper": "With that curry, a plain naan balances the sauce, and a salted lassi cools the palate. Want to add one?"
    }
  },
  "pilot_plan": {
    "design": "Run a 2-week pilot with QR codes at tables and a website widget. Start with a curated set of 20 items (popular mains, breads, sides, chai/lassi). The GPT defaults to a fast 3-question flow, confirms allergens, and suggests a bread + drink add-on. Staff can trigger the same flow on a tablet to assist guests. Refresh hours daily from the ordering site; review menu deltas weekly. Collect aggregate, non-PII metrics.",
    "kpis": [
      "Engagement rate (sessions/QR scans)",
      "Add-on attach rate (breads/drinks/sides)",
      "Uplift on 5 targeted dishes",
      "Median time-to-choice (seconds)",
      "Guest rating (thumbs up/down)",
      "Deflection of staff Q&A on allergens/spice"
    ],
    "ab_test": "A vs. B: Recommendation style. A = 2 picks + 1 add-on; B = 3 picks + 2 add-ons. Keep content constant; randomize per session.",
    "success_thresholds": {
      "engagement_rate": 0.35,
      "add_on_attach_rate": 0.25,
      "target_dish_uplift": 0.15,
      "time_to_choice_seconds": 60,
      "guest_positive_rate": 0.8
    }
  },
  "risks_and_guardrails": [
    { "edge_case": "Off-menu requests", "mitigation": "Offer closest match with differences; escalate to staff for customs." },
    { "edge_case": "Substitutions", "mitigation": "Never promise; present common swaps and route to staff." },
    { "edge_case": "Sold-out items", "mitigation": "Provide 2 alternatives in same category; avoid overpromising time." },
    { "edge_case": "Severe allergens", "mitigation": "State limitations; recommend avoiding risk items; escalate immediately." },
    { "edge_case": "Minors & alcohol", "mitigation": "If age unclear, show non-alcoholic options first; no alcohol prompts." },
    { "edge_case": "Language misunderstandings", "mitigation": "Offer quick toggle; show simple icons for spice/allergens." },
    { "edge_case": "Inaccurate hours/menu", "mitigation": "Cite and link source; mark [VERIFY] if unclear; escalate to staff." },
    { "edge_case": "Ambiguous preferences", "mitigation": "Ask one clarifying question; default to mild, balanced options." },
    { "edge_case": "Network offline", "mitigation": "Show cached bestsellers + safety notes; suggest asking staff." },
    { "edge_case": "Conflicting user constraints", "mitigation": "Highlight conflict and re-ask; do not suggest until resolved." },
    { "edge_case": "Cultural sensitivity", "mitigation": "Use respectful, factual language; provide optional context only." }
  ],
  "assumptions": [
    { "statement": "Meat items are halal as noted on menu", "confidence": "High", "default": "Label chicken/lamb as halal; verify on changes" },
    { "statement": "Hours: Mon closed; Tue–Sun 11:00–21:00", "confidence": "High", "default": "Defer to ordering site JSON-LD" },
    { "statement": "No alcohol menu is published", "confidence": "Low", "default": "Offer non-alcoholic pairings first; age-check if asked" },
    { "statement": "Spice levels follow mild/medium/hot/extra hot", "confidence": "High", "default": "Default to mild if unspecified" },
    { "statement": "Pricing may change without notice", "confidence": "High", "default": "Avoid quoting prices in GPT; link to PDF" },
    { "statement": "Bilingual support: English + Nepali", "confidence": "Low", "default": "Ship English; add Nepali strings in week 2" },
    { "statement": "Pilot menu limited to ~20 items", "confidence": "Low", "default": "Start with bestsellers; expand after metrics" },
    { "statement": "No PII storage is allowed", "confidence": "High", "default": "Session-only state; do not log identifiers" }
  ],
  "next_steps": [
    "Confirm pilot goals, red lines, and KPIs with owners",
    "Approve brand voice, tone examples, and do-not-say list",
    "Validate allergens with kitchen; mark high-risk dishes",
    "Select 20 pilot items; confirm images and descriptions",
    "Localize key prompts (Nepali) and review with staff",
    "Place QR codes and website widget; test flows",
    "Define update cadence and single source of truth",
    "Train staff on escalation and fallback procedures",
    "Schedule weekly check-in and end-of-pilot review",
    "Prepare A/B experiment toggles and reporting"
  ]
}
```

