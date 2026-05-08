---
name: StreamView Dark Premium
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#bcc8d1'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#87929b'
  outline-variant: '#3d4850'
  surface-tint: '#7ad0ff'
  primary: '#8fd6ff'
  on-primary: '#003549'
  primary-container: '#00bfff'
  on-primary-container: '#004a65'
  inverse-primary: '#00668a'
  secondary: '#c9c6c5'
  on-secondary: '#313030'
  secondary-container: '#474646'
  on-secondary-container: '#b7b4b4'
  tertiary: '#cfcdcc'
  on-tertiary: '#313030'
  tertiary-container: '#b3b1b1'
  on-tertiary-container: '#454444'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3e8ff'
  primary-fixed-dim: '#7ad0ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c69'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c9c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 20px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system is engineered to evoke a sense of "digital luxury" specifically tailored for the burgeoning West African tech landscape. It targets a mobile-first audience that values high-performance aesthetics and cultural relevance.

The visual style is a fusion of **Minimalism** and **Glassmorphism**. By utilizing a "Void" black foundation, we allow content and brand accents to "shine" as if self-illuminated. The interface feels immersive, like a high-end cinematic experience, using translucent layers to maintain a sense of depth and context as users navigate through vast content libraries.

## Colors
The palette is dominated by **Pitch Black (#050505)** to maximize OLED display efficiency and contrast. The primary brand color, **Electric Blue (#00BFFF)**, acts as the "light source" of the UI, used for focus states, primary actions, and progress indicators. 

Secondary surfaces use a slightly lighter charcoal for subtle separation, while the Glassmorphism panels utilize a white-tinted transparency to create a frosted effect. This system prioritizes high-contrast ratios for readability under bright West African sunlight while maintaining its "premium dark" aesthetic.

## Typography
This design system utilizes **Plus Jakarta Sans** for headlines to provide a modern, slightly geometric "pop" that feels fresh and energetic. **Inter** is used for all functional and body text to ensure maximum legibility at smaller scales and high-density information displays.

Hierarchy is established through weight rather than just size. Hero sections feature bold, tight-tracked displays, while functional metadata (like duration or currency) uses high-contrast labels to remain legible against vibrant movie posters.

## Layout & Spacing
The layout follows a **fluid-to-fixed** model optimized for mobile-first consumption. It utilizes a 4px base grid system. Standard mobile views employ a 20px side margin to ensure content doesn't feel cramped.

Horizontal scrolling "shelves" are the primary organizational pattern for content discovery. Spacing between cards is kept tight (12-16px) to maximize screen real estate, while vertical sections are separated by larger (32px) gaps to define clear content thematic shifts (e.g., "Trending in Lagos" vs "New Releases").

## Elevation & Depth
Depth is created through **Backdrop Blurs** rather than traditional drop shadows. 
- **Level 0 (Background):** Deepest black (#050505).
- **Level 1 (Cards):** Subtle charcoal surface (#121212) or semi-transparent fill with 1px stroke.
- **Level 2 (Modals/Overlays):** Glassmorphism panels with a 20px blur and 15% white opacity.
- **Level 3 (Navigation):** Floating bottom bars with a 32px blur, creating a sense that the UI is hovering over the content stream.

Lighting is always "top-down," with 1px translucent borders on the top and left edges of glass panels to simulate a subtle rim-light.

## Shapes
The shape language is defined by **Ultra-Rounded Corners**. A signature 24px radius is applied to all primary content cards and containers to create a soft, high-end feel that contrasts against the "sharp" digital screen edges.

Interactive triggers like buttons use a pill-shape (100px radius) to distinguish them clearly from content containers. Secondary elements like input fields use a slightly tighter 16px radius to maintain structural integrity.

## Components
- **Primary Buttons:** High-gloss Electric Blue fills with black text for maximum punch. Incorporate a subtle outer glow (0 0 15px rgba(0, 191, 255, 0.4)) on hover or focus.
- **Glass Cards:** Used for metadata overlays. Must feature a `backdrop-filter: blur(20px)` and a `1px` stroke using `glass_stroke`.
- **Navigation Bar:** A floating dock anchored to the bottom. It should be semi-transparent with a heavy blur, allowing content to pass behind it without losing legibility.
- **Localization Badges:** Minimalist flag icons paired with the currency (CFA). These should be rendered in "Pill" chips with a dark gray background and white text.
- **Hero Banners:** Immersive, full-width components with a bottom-to-top black gradient overlay to ensure text legibility and a seamless transition into the background.
- **Video Thumbnails:** 24px rounded corners with a subtle 1px inner border to prevent the image from bleeding into the black background.