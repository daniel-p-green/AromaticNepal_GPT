# Aromatic Nepal Custom GPT Strategy
## Enhancing Storytelling & Personalization for Low-Awareness Market

---

## Executive Summary

Aromatic Nepal operates in Liberty, MO—a largely white area with low awareness of Nepalese cuisine. This Custom GPT will serve as a **cultural bridge** and **personalized dining concierge** that:

1. **Educates** guests about Nepalese food culture and traditions
2. **Personalizes** recommendations based on taste preferences and dietary needs
3. **Upsells** strategically through prix fixe experiences and smart pairings
4. **Reduces** decision paralysis with clear, curated options

**Key Opportunity**: Transform menu confusion into curated experiences that increase average check while building cultural appreciation.

---

## Current State Analysis

### Menu Structure Issues

**Problem**: The current menu is overwhelming with 60+ individual items across 10+ categories, making it hard for newcomers to:
- Understand what to order
- Know how dishes relate to each other
- Build a complete meal experience
- Understand cultural context

**Evidence from Menu**:
- No prix fixe options (missed upsell opportunity)
- Individual items priced separately ($6.95-$22.95)
- Limited guidance on meal composition
- Cultural terms (MoMo, Thali, Sekuwa) lack explanation
- No suggested "journeys" or tasting experiences

### Market Context

- **Location**: Liberty, MO (suburban, predominantly white)
- **Challenge**: Low familiarity with Nepalese/Indian cuisine
- **Opportunity**: First-time visitors need education + guidance
- **Current Gap**: Menu assumes cultural knowledge

---

## Custom GPT Opportunities

### 1. **Cultural Storytelling Engine**

**Purpose**: Make every dish a story that builds connection

**Features**:
- **Origin Stories**: "MoMo (MOH-moh) are Nepal's beloved dumplings, found on every street corner in Kathmandu..."
- **Cultural Context**: "In Nepal, guests are treated as gods—this Thali represents a complete meal honoring that tradition"
- **Spice Education**: Explain the spice scale with relatable comparisons ("Medium is like a mild salsa")
- **Pronunciation Guide**: Help guests feel confident ordering

**Example Interaction**:
```
Guest: "What's a MoMo?"
GPT: "MoMo (MOH-moh) are Nepal's most beloved street food—think dumplings, 
but with Himalayan spices. They're so popular that Kathmandu has entire 
neighborhoods dedicated to momo vendors! Our Steamed MoMo is the classic 
version, while Jhol MoMo comes in a tangy tomato broth—perfect for 
first-timers who want something familiar yet adventurous."
```

### 2. **Personalized Meal Builder**

**Purpose**: Guide guests from "I don't know what to order" to a complete meal

**Flow**:
1. **Quick Assessment**: "What are you in the mood for—creamy, spicy, or something new?"
2. **Dietary Filters**: Allergens, vegetarian, spice tolerance
3. **Experience Level**: "First time trying Nepalese food?" → Extra guidance
4. **Recommendation**: 2-3 curated options with "why"
5. **Complete the Meal**: Auto-suggest appetizer, drink, bread, dessert

**Example Output**:
```
Based on your preferences (creamy, mild, vegetarian), here's your perfect 
Himalayan journey:

🍽️ **Starter**: Veg Samosa (2 pcs) - $6.95
   Crispy pastries with spiced potatoes—a gentle introduction

🍛 **Main**: Navaratna Korma - $16.95
   Nine vegetables in creamy cashew sauce—rich but balanced

🍞 **Bread**: Plain Naan - $2.95
   Perfect for scooping up that delicious sauce

🥤 **Drink**: Mango Lassi - $4.95
   Sweet yogurt drink that cools the palate

**Total**: $30.80 | **Or try our "Himalayan Explorer" prix fixe for $28.95**
```

### 3. **Prix Fixe Experience Packages**

**Purpose**: Increase average check while simplifying decisions

**Proposed Packages**:

#### **"Himalayan Explorer"** - $28.95
- 1 Appetizer (choice of 3)
- 1 Main Course
- 1 Bread
- 1 Drink
- 1 Dessert
*Value: $35+ if ordered separately*

#### **"First Timer's Journey"** - $24.95
- Veg Samosa (starter)
- Butter Chicken OR Navaratna Korma
- Plain Naan
- Mango Lassi
- Kheer (dessert)
*Perfect for newcomers*

#### **"Spice Lover's Feast"** - $32.95
- Chicken 65 (hot appetizer)
- Vindaloo (chicken/lamb/goat)
- Garlic Naan
- Salt Lassi (cooling)
- Rasmalai

#### **"Vegetarian Thali Experience"** - $26.95
- Veg Appetizer Platter
- Mix Vegetable Curry OR Palak Paneer
- Roti (vegan bread)
- Strawberry Lassi
- Lal Mohan

**GPT Role**: 
- Present these as "curated experiences" not "combos"
- Explain the cultural significance
- Highlight value vs. à la carte
- Customize based on preferences

### 4. **Smart Upselling Engine**

**Purpose**: Increase check size through intelligent pairings

**Strategy**:
- **Contextual Upsells**: "Butter Chicken pairs perfectly with Garlic Naan—want to add it?"
- **Drink Pairings**: "Spicy dish? A Salt Lassi will cool your palate"
- **Dessert Nudges**: "End with Kheer—Nepal's traditional rice pudding"
- **Bread Logic**: Automatically suggest bread with curries

**Implementation**:
```json
{
  "upsell_rules": [
    {
      "if": "curry_selected",
      "then": "suggest_bread",
      "message": "Curries are meant to be scooped with naan! Try our Garlic Naan ($3.95)"
    },
    {
      "if": "spice_level >= hot",
      "then": "suggest_cooling_drink",
      "message": "A Salt Lassi ($3.95) will balance the heat perfectly"
    },
    {
      "if": "main_course_selected && no_appetizer",
      "then": "suggest_starter",
      "message": "Start with Veg Samosa ($6.95) for the full experience"
    }
  ]
}
```

### 5. **Allergen & Dietary Intelligence**

**Purpose**: Build trust through transparency

**Features**:
- **Proactive Filtering**: "I see you're vegetarian—here are 15 options..."
- **Allergen Warnings**: "Contains dairy—would you like a vegan alternative?"
- **Cross-Contact Transparency**: "Kitchen uses shared equipment—let me flag this for staff"
- **Confidence Levels**: "100% safe" vs. "Staff will confirm"

---

## Knowledge Base Enhancements

### New Documents Needed

#### 1. **prix_fixe_packages.json**
```json
{
  "packages": [
    {
      "package_id": "himalayan_explorer",
      "name": "Himalayan Explorer",
      "price": 28.95,
      "value_if_separate": 35.50,
      "savings": 6.55,
      "description": "Complete journey through Nepal's flavors",
      "includes": {
        "appetizer": ["choice_of_3"],
        "main": ["all_curries"],
        "bread": ["choice_of_4"],
        "drink": ["choice_of_5"],
        "dessert": ["choice_of_3"]
      },
      "target_audience": ["first_timers", "adventurous"],
      "cultural_note": "Represents a traditional Nepali meal structure"
    }
  ]
}
```

#### 2. **cultural_stories.json**
```json
{
  "stories": [
    {
      "term": "MoMo",
      "story": "MoMo are Nepal's national comfort food. In Kathmandu, 
      you'll find momo vendors on every corner, each with their secret 
      spice blend. Families gather around steaming baskets on weekends, 
      and it's the first food Nepali expats crave when homesick.",
      "emotional_hook": "connection_to_home",
      "related_dishes": ["dish.momo.steamed", "dish.momo.jhol"]
    },
    {
      "term": "Thali",
      "story": "Thali means 'plate' in Nepali, but it represents so 
      much more—a complete, balanced meal honoring the Nepali belief 
      that 'guests are as god.' Each small bowl offers a different 
      flavor, texture, and nutrition, creating harmony on one plate.",
      "emotional_hook": "hospitality_tradition",
      "related_dishes": ["dish.thali.veg", "dish.thali.chicken"]
    }
  ]
}
```

#### 3. **meal_journeys.json**
```json
{
  "journeys": [
    {
      "journey_id": "first_timer_safe",
      "name": "First Timer's Safe Journey",
      "description": "Gentle introduction to Nepalese flavors",
      "path": [
        {"step": 1, "category": "appetizer", "suggestions": ["veg_samosa", "paneer_pakora"]},
        {"step": 2, "category": "main", "suggestions": ["butter_chicken", "navaratna_korma"]},
        {"step": 3, "category": "bread", "suggestions": ["plain_naan"]},
        {"step": 4, "category": "drink", "suggestions": ["mango_lassi"]},
        {"step": 5, "category": "dessert", "suggestions": ["kheer"]}
      ],
      "total_range": "$24-30",
      "spice_level": "mild"
    }
  ]
}
```

#### 4. **upsell_strategy.json**
```json
{
  "rules": [
    {
      "trigger": "curry_selected",
      "upsell_type": "bread",
      "priority": "high",
      "message_template": "Curries are meant to be scooped! Add {bread_name} for {price}?",
      "success_rate_target": 0.6
    },
    {
      "trigger": "main_course_only",
      "upsell_type": "appetizer",
      "priority": "medium",
      "message_template": "Start your journey with {appetizer_name} ({price})?",
      "success_rate_target": 0.4
    },
    {
      "trigger": "spicy_dish_selected",
      "upsell_type": "cooling_drink",
      "priority": "high",
      "message_template": "Balance the heat with {drink_name} ({price})?",
      "success_rate_target": 0.5
    }
  ],
  "prix_fixe_promotion": {
    "threshold": "main_course_selected",
    "message": "Want the full experience? Our 'Himalayan Explorer' prix fixe 
    adds appetizer, bread, drink, and dessert for just $28.95 (save $6+ vs. 
    ordering separately).",
    "show_when": "no_appetizer_or_dessert_selected"
  }
}
```

---

## GPT Behavior Enhancements

### Conversation Flow

```
1. **Greeting & Context Setting**
   "Welcome to Aromatic Nepal! I'm here to help you discover the flavors 
   of the Himalayas. Are you new to Nepalese cuisine, or have you tried 
   it before?"

2. **Preference Discovery** (3-4 questions max)
   - Taste preference (creamy/spicy/adventurous)
   - Dietary restrictions
   - Spice tolerance
   - Meal occasion (quick lunch vs. full experience)

3. **Recommendation with Story**
   "Based on your love of creamy flavors, I recommend Navaratna Korma. 
   'Navaratna' means 'nine gems'—this dish features nine vegetables 
   simmered in a cashew cream sauce. It's mild, rich, and perfect for 
   first-timers. Want to hear about the traditional way it's served?"

4. **Complete the Meal**
   "To make this a complete experience, I suggest:
   - Start with Veg Samosa ($6.95) for texture contrast
   - Add Plain Naan ($2.95) to scoop the sauce
   - Pair with Mango Lassi ($4.95) to balance richness
   - End with Kheer ($3.95), Nepal's rice pudding
   
   Or try our 'Himalayan Explorer' prix fixe for $28.95—includes all 
   of this plus saves you $6!"

5. **Cultural Touchpoints** (on-demand)
   "Want to know more about [dish]? In Nepal, this is..."
```

### Response Templates

**For First-Timers**:
```
"I see this is your first time with Nepalese food—exciting! Let me 
guide you through a gentle introduction. Based on your preference for 
[mild/spicy/creamy], here's what I recommend..."
```

**For Prix Fixe Promotion**:
```
"You've selected [main course]. Want the full Himalayan experience? 
Our '[Package Name]' prix fixe includes [list] for just $[price]—that's 
$[savings] less than ordering separately, and you get to try everything 
the traditional way!"
```

**For Cultural Education**:
```
"[Dish name] has a special place in Nepalese culture. [Story]. When 
you order it here, you're experiencing a taste of [location/tradition]. 
Would you like to know how it's traditionally served?"
```

---

## Menu Restructuring Recommendations

### Current Menu Issues
1. **Too many individual items** (60+)
2. **No meal packages**
3. **Unclear progression** (appetizer → main → dessert)
4. **Missing value propositions**

### Proposed Menu Structure

#### **Section 1: Himalayan Experiences** (NEW - Prix Fixe)
- Himalayan Explorer - $28.95
- First Timer's Journey - $24.95
- Spice Lover's Feast - $32.95
- Vegetarian Thali Experience - $26.95

#### **Section 2: Start Your Journey** (Appetizers)
- Keep current items but add "Perfect for first-timers" badges
- Group by vegetarian/non-vegetarian

#### **Section 3: Nepali Delights** (MoMo)
- Add "Nepal's Most Beloved" header
- Include pronunciation guide

#### **Section 4: Curries of the Himalayas**
- Add "Complete Your Meal" callouts for bread pairings

#### **Section 5: Complete Your Experience**
- Breads (with pairing suggestions)
- Drinks (with cooling/heating notes)
- Desserts (with cultural context)

---

## Success Metrics

### Primary KPIs
1. **Average Check Increase**: Target +15% (from $18 → $21)
2. **Prix Fixe Adoption**: 30% of guests choose packages
3. **Upsell Attach Rate**: 
   - Bread with curry: 60%
   - Drink with meal: 50%
   - Dessert: 25%
4. **Guest Satisfaction**: 4.5+ stars on "helpful" rating

### Secondary KPIs
1. **Decision Time**: Reduce from 8 min → 3 min
2. **Cultural Engagement**: 40% ask for cultural stories
3. **Return Rate**: Track if GPT users return more often
4. **Staff Efficiency**: Fewer "what should I order?" questions

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1-2)
- [ ] Build enhanced knowledge base with prix fixe packages
- [ ] Create cultural stories database
- [ ] Develop meal journey templates
- [ ] Test GPT with sample conversations

### Phase 2: Menu Integration (Week 3-4)
- [ ] Design prix fixe packages with kitchen
- [ ] Update physical menu (optional)
- [ ] Train staff on GPT capabilities
- [ ] Create QR codes for tables

### Phase 3: Launch & Optimize (Week 5-8)
- [ ] Soft launch with 20% of tables
- [ ] Collect feedback and iterate
- [ ] A/B test prix fixe messaging
- [ ] Refine upsell prompts based on data

### Phase 4: Scale (Week 9+)
- [ ] Full rollout
- [ ] Add advanced features (loyalty, preferences)
- [ ] Expand cultural content
- [ ] Integrate with POS for ordering

---

## Risk Mitigation

### Potential Issues

1. **Kitchen Overload**: Prix fixe might slow service
   - *Mitigation*: Start with 2 packages, expand gradually

2. **Guest Confusion**: Too many options still
   - *Mitigation*: GPT defaults to 2-3 recommendations max

3. **Staff Pushback**: "GPT replaces us"
   - *Mitigation*: Position as "assistant" that frees staff for hospitality

4. **Cultural Misrepresentation**: Stories must be accurate
   - *Mitigation*: Owner/chef review all cultural content

5. **Technical Issues**: WiFi/device problems
   - *Mitigation*: Fallback to printed "Quick Guide" cards

---

## Next Steps

1. **Review & Approve**: This strategy with restaurant owner
2. **Create Knowledge Base**: Build JSON files for prix fixe, stories, journeys
3. **Design Packages**: Work with kitchen on feasible prix fixe options
4. **Build GPT**: Configure Custom GPT with enhanced knowledge base
5. **Test**: Internal testing with staff and friends
6. **Launch**: Pilot with select tables, gather feedback
7. **Iterate**: Refine based on real-world usage

---

## Appendix: Sample GPT Instructions

```
You are Aromatic Nepal's dining concierge, helping guests discover 
Nepalese cuisine in Liberty, MO—an area with low awareness of this 
cuisine. Your goals:

1. **Educate**: Share cultural stories that build connection
2. **Simplify**: Reduce 60+ menu items to 2-3 perfect matches
3. **Upsell**: Promote prix fixe packages and smart pairings
4. **Personalize**: Adapt to dietary needs and spice tolerance

**Always**:
- Lead with cultural context when relevant
- Suggest complete meals (appetizer + main + bread + drink + dessert)
- Promote prix fixe when guest selects main course
- Use warm, confident, helpful tone
- Keep responses under 100 words unless guest asks for more

**Never**:
- Overwhelm with too many options
- Make medical claims about food
- Invent cultural facts
- Skip allergen warnings
```

---

*Document created: [Date]*  
*Next review: After Phase 2 completion*

