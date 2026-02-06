#+ KB — Pairing Rules (Schema v2)

Rules
- rule_id: pair.curries.korma_mild
  when:
    category: Curries
    dish_id_contains: korma
  then:
    suggest_dish_ids: [bread.breads.plain_naan, drink.beverages.salt_lassi]
  priority: 2
  safety_note: Suggest only after allergen confirmation (dairy/nuts are common in korma profiles).

- rule_id: pair.curries.butter_chicken
  when:
    category: Curries
    dish_id_contains: butter_chicken
  then:
    suggest_dish_ids: [bread.breads.garlic_naan, drink.beverages.salt_lassi]
  priority: 2
  safety_note: Check dairy tolerance before suggesting creamy pairings.

- rule_id: pair.spice.relief
  when:
    spice_level: hot
  then:
    suggest_dish_ids: [drink.beverages.mohi, drink.beverages.salt_lassi, side.sides.raita]
  priority: 1
  safety_note: Offer cooling alternatives first; reconfirm dairy.

- rule_id: pair.momo.classic
  when:
    category: MoMo
  then:
    suggest_dish_ids: [drink.beverages.organic_nepali_chai_tea, side.sides.onion_salad]
  priority: 3
  safety_note: Momo wrappers may contain gluten; include gluten reminder if relevant.

- rule_id: pair.biryani.riata
  when:
    category: Curries
    dish_id_contains: handi_biryani
  then:
    suggest_dish_ids: [side.sides.raita, drink.beverages.mango_lassi]
  priority: 3
  safety_note: Biryani is commonly served with raita; reconfirm dairy tolerance.

- rule_id: pair.vegetarian.main
  when:
    category: Vegetarian
  then:
    suggest_dish_ids: [bread.breads.garlic_naan, drink.beverages.mango_lassi]
  priority: 4
  safety_note: Verify dairy status for paneer/cream-based vegetarian dishes.

- rule_id: pair.tandoori.grill
  when:
    category: Tandoori
  then:
    suggest_dish_ids: [bread.breads.roti, drink.beverages.mohi]
  priority: 4
  safety_note: Ask spice preference before recommending accompaniments.

- rule_id: pair.kids.comfort
  when:
    category: Kids
  then:
    suggest_dish_ids: [drink.beverages.mango_lassi, side.sides.extra_rice]
  priority: 5
  safety_note: Keep recommendations mild and simple unless requested otherwise.
