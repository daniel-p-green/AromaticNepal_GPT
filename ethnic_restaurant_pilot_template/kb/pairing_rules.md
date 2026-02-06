#+ KB Template — Pairing Rules (Schema v2)

- rule_id: pair.example
  when:
    category: Curries
    spice_level: hot
  then:
    suggest_dish_ids: [drink.beverages.sample_cooling_drink]
  priority: 2
  safety_note: Verify allergens before finalizing.
