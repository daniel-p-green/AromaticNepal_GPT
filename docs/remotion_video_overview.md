# Remotion Video Overview: Restaurant Custom GPT Playbook

This document turns `LINKEDIN_POST.md` into a Remotion-friendly short video concept, with implementation notes aligned to Remotion best practices.

## Goal
- Create a 60-second LinkedIn feed video that communicates the idea: a restaurant Custom GPT can train staff, scale the owner story, and give diners a fact-based, fresh experience.
- Keep it respectful, non-hypey, and grounded in the "shipping software, not a clever prompt" angle.
- Include an "unofficial pilot" disclaimer in-frame.

## Audience
- Restaurant owners and operators
- Hospitality tech builders
- FOH/GM/Training leads

## Recommended Video Specs
- Primary: `1080x1350` (4:5) for LinkedIn feed, `30fps`, `duration ~60s`
- Optional variants:
  - `1080x1080` (1:1) for feed flexibility
  - `1920x1080` (16:9) for YouTube / decks
- Safe area: keep critical text inside ~`80px` padding on all sides.

## Theme (Visual Direction)
Aim for "warm hospitality + grounded systems":
- Background: deep teal + parchment + subtle grain (menu-paper vibe)
- Accent: "spice" color for emphasis (paprika/curry tone)
- Typography: serif headline + clean sans for body

Suggested palette (inspired by the example restaurant site look):
- Deep Teal: `#07252D`
- Parchment: `#E3DAC6`
- Accent Spice: `#D36B3D`
- Ink: `#0C3D4B`

Suggested fonts (Google Fonts):
- Headline: Cormorant Garamond (500/700)
- Body: Jost (400/600)

## Storyboard (60s @ 30fps = 1800 frames)

Each scene below maps directly to the structure of `LINKEDIN_POST.md` and keeps pacing tight for LinkedIn.

| Scene | Time | Frames | On-screen text (tight) | Voiceover (optional) | Motion + visual notes |
|---|---:|---:|---|---|---|
| 1: Hook | 0–3s | 0–90 | "Running a restaurant is hard enough." | Same as on-screen | Slow push-in on textured menu background. Headline reveal using a spring (no bounce). |
| 2: Repeated questions | 3–10s | 90–300 | "What is this?" / "How spicy?" / "Allergy-safe?" / "What should I order?" | Paraphrase | Stagger each question in using `Sequence` offsets. Use simple slide + fade, not per-character opacity. |
| 3: The idea | 10–16s | 300–480 | "A Custom GPT for a restaurant." | Same as on-screen | Hard cut + subtle light sweep. Add a small subline: "Not a chatbot. A menu brain." |
| 4: Not replacement | 16–20s | 480–600 | "Not replacing service. Adding dimension." | Same | Quick transition (fade). Keep it confident, calm. |
| 5: 3 outcomes | 20–32s | 600–960 | "Train staff faster" / "Scale the owner story" / "Fact-based menu answers" | Expand lightly | Three cards, one per beat. Minimal icons (book, speech bubble, checklist). |
| 6: The "real work" proof | 32–45s | 960–1350 | "This gets real when you ship software:" + bullets | Expand lightly | Show 5 bullets as a checklist. Consider animating file-name chips (template, menu normalization, allergens, freshness, QA). Include "unofficial pilot" lower-third. |
| 7: Payoff | 45–54s | 1350–1620 | "Answer menu questions. Share culture. Make it memorable." | Same | Combine lines into a strong end statement. Add warmth via slow parallax background. |
| 8: Close + question | 54–60s | 1620–1800 | "Have you seen this done well yet?" + hashtags | Same | End card with your name/handle. Keep disclaimer in footer. |

## What to Include On-Screen (Non-Negotiables)
- "Unofficial / fan-made pilot" disclaimer (small, persistent or on key scenes).
- Avoid guaranteed claims (prices, hours, allergen safety).
- No "always safe" language; use "confirm with staff" if you include allergy content.

## Remotion Implementation Notes (Best Practices)

### Compositions
- Define compositions in `src/Root.tsx` using `<Composition>` and organize them with `<Folder>`.
- Add a `<Still>` composition for a thumbnail (same visual theme).
- Use `defaultProps` for reusable text and theme colors.

### Sequencing
- Use `<Series>` for sequential scenes and `<Sequence>` for staggered elements inside a scene.
- Always set `premountFor` on sequences (prevents late-loading flicker).
- Remember: `useCurrentFrame()` becomes local inside a sequence.

### Transitions
- Use `@remotion/transitions` and `<TransitionSeries>` for clean fades and occasional slides.
- Remember transitions shorten total duration; overlays do not.

### Timing + Motion
- Prefer `spring()` with `config: {damping: 200}` for smooth, non-bouncy reveals.
- Use `interpolate()` with clamp for fades and subtle translations.

### Text Animations
- If you use a typewriter effect: slice the string. Do not animate per-character opacity.
- Use word highlighting sparingly (one key word per line) to avoid visual noise.

### Fonts
- Load fonts via `@remotion/google-fonts` and request only needed weights/subsets.
- Keep a strict typographic hierarchy (headline, subhead, body, caption/disclaimer).

### Assets (Images)
- Put images in a Remotion project's `public/` folder and reference with `staticFile()`.
- Always use Remotion's `<Img>` component (never `<img>` or CSS `background-image`).
- If you reuse the existing project imagery, convert/resize ahead of time to reduce render cost.

### Audio
- Use `<Audio>` from `@remotion/media`.
- Keep background audio subtle; ramp in/out with an interpolated `volume`.
- If voiceover is used, duck background audio under VO segments.

### Captions/Subtitles
- Store captions as JSON using the `Caption` type (`@remotion/captions`).
- Keep captions inside the safe area and high contrast against background.

### Parametrization (Template-First)
The playbook theme lends itself to a parametrized video template:
- Define a Zod schema for:
  - `restaurantName`, `handle`, `palette`, `hookLine`, `ctaLine`, `includeProofBullets`
- Note: Remotion guidance requires `zod@3.22.3` exactly.

### calculateMetadata
- Use `calculateMetadata` to:
  - Compute `durationInFrames` from scene durations + transitions.
  - Set `defaultOutName` (e.g. `restaurant-custom-gpt-linkedin.mp4`).

## Suggested Next Deliverables (If You Want This Implemented)
- A small Remotion project in a new folder (separate from this Markdown repo) with:
  - `src/scenes/` components matching the storyboard
  - `public/` assets (background texture + one menu image + subtle grain)
  - A `captions.json` derived from the voiceover script
  - One main composition (4:5) + one thumbnail still

