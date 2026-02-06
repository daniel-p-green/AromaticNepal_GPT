#+ Aromatic Nepal — Story Cards (for GPT retrieval)

Usage: GPT surfaces optional cultural context. Keep answers short; link to menu PDF when referencing facts. No prices here.

```json
{
  "stories": [
    {"id": "story.momo", "title": "MoMo", "phonetic": "MOH-moh", "blurb": "Nepali dumplings—steamed or in broth (jhol); classic Kathmandu comfort.", "pairing_hint": "Chai or salted lassi", "related_menu_ids": ["dish.momo.steamed", "dish.momo.jhol"]},
    {"id": "story.thali", "title": "Thali", "phonetic": "THA-lee", "blurb": "A balanced platter of rice, lentils, veg, pickles, and dessert.", "pairing_hint": "Plain naan on the side", "related_menu_ids": []},
    {"id": "story.chai", "title": "Nepali Chai", "phonetic": "CHAI", "blurb": "Spiced milk tea that softens heat and pairs with snacks.", "pairing_hint": "Great with samosa or momos", "related_menu_ids": ["drink.chai.nepali"]},
    {"id": "story.lassi", "title": "Lassi", "phonetic": "LAH-see", "blurb": "Yogurt-based drink—sweet or salted—that cools the palate.", "pairing_hint": "Pairs with hot dishes like Chicken 65", "related_menu_ids": ["drink.lassi.mango"]},
    {"id": "story.halal", "title": "Halal", "phonetic": "hah-LAHL", "blurb": "Menu notes chicken and lamb as halal-prepared.", "pairing_hint": "Ask staff if you need confirmation", "related_menu_ids": ["dish.curry.butter_chicken"]},
    {"id": "story.spice", "title": "Spice Scale", "phonetic": "—", "blurb": "Choose mild, medium, hot, or extra hot. Many dishes are adjustable.", "pairing_hint": "For heat, add salted lassi or raita", "related_menu_ids": ["side.raita"]},
    {"id": "story.biryani", "title": "Biryani", "phonetic": "beer-YAH-nee", "blurb": "Fragrant basmati rice layered with spices and protein; served with raita.", "pairing_hint": "Try with mohi or chai", "related_menu_ids": ["dish.biryani.chicken"]},
    {"id": "story.naan", "title": "Naan", "phonetic": "NAHN", "blurb": "Soft, tandoor-baked flatbread that balances rich sauces.", "pairing_hint": "Plain naan for creamy curries", "related_menu_ids": ["bread.naan.plain"]}
  ]
}
```

Notes:
- Cite menu PDF for factual claims (spice levels, halal notes).
- Keep blurbs < 160 characters; prefer a single sentence.
