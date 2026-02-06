#+ KB Template — Menu (Schema v2)

Schema
- dish_id: string (`dish|bread|drink|side|dessert.<category>.<name>`)
- name: string
- category: Appetizers | MoMo | Curries | Vegetarian | Tandoori | ChefSpecials | Breads | SoupsSalads | Desserts | Beverages | Sides | Kids
- description: string
- ingredients: string[]
- allergens: dairy | nuts | gluten | egg | soy | shellfish | fish | sesame | unknown
- spice_level: none | mild | medium | hot | extra_hot | unknown
- dietary.vegetarian: boolean
- dietary.vegan: boolean
- dietary.halal: boolean
- dietary.gluten_free: boolean
- source.canonical_url: string
- source.last_verified: date

Items
- Replace this file with full restaurant menu coverage.
