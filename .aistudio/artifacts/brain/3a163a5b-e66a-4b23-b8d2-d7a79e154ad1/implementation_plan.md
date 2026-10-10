# Scroll-Linked 3D Animation Architecture

A high-performance, scroll-synchronized 3D visual system that reacts dynamically to user scrolling across portfolio sections, creating depth and premium spatial interaction without impacting page load speed or layout stability.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> As requested, **no existing code has been modified**. This plan outlines the technical options, performance guardrails, and aesthetic choices for adding scroll-reactive 3D animation to your portfolio website.

- **Confirmed Constraint**: Zero changes made to production code until you review and approve the direction.
- **Visual Style Recommendation**: A floating interactive 3D particle sphere / neural lattice mesh that smoothly morphs, rotates along 3 axes, and adjusts camera depth as the visitor scrolls through each section (Hero → Capabilities → Projects → Reviews → Reachout).
- **Engine Recommendation**: High-performance HTML5 Canvas 3D projection or lightweight Three.js renderer running in a fixed background layer (`pointer-events-none`) with dampening/lerp interpolation so scrolling remains butter-smooth (60–120 FPS).

---

### 1. Overview & Core Concept

- **What It Does**: Integrates a persistent, viewport-fixed 3D canvas behind the website content. As the visitor scrolls down the page, scroll position (`scrollY` / scroll percentage) drives 3D camera angles, object rotation speeds, particle dispersal, and section-specific spatial transformations.
- **Target Audience & Experience**: Potential clients, recruiters, and technical collaborators who visit your portfolio and immediately experience a cutting-edge, tech-forward developer aesthetic.
- **Key Value**: Transforms a standard 2D scrolling layout into an immersive 3D spatial journey while keeping text legibility and interactive UI elements 100% accessible and high contrast.

---

### 2. User Experience & Visual Design

#### Section-by-Section 3D Scroll Choreography

| Section | Scroll Offset | 3D Behavior & Visual State |
| :--- | :--- | :--- |
| **Hero** | 0% – 15% | Centered floating 3D neural core / geometric lattice, idle pulsing and gentle mouse parallax tilt. |
| **Capabilities** | 15% – 40% | Core expands into orbital nodes and particle rings, highlighting tech capabilities. |
| **Projects** | 40% – 70% | Core transitions to the right side, framing project cards on the left while rotating along the Y-axis. |
| **Reviews** | 70% – 85% | Density softens into ambient floating constellations, keeping testimonial cards in clear focus. |
| **Reachout (#5227FF)** | 85% – 100% | Converges toward the purple Reachout Box, emitting subtle cyan/violet energy particle trails. |

#### Visual Identity & Styling
- **Canvas Positioning**: `fixed inset-0 pointer-events-none z-0` positioned strictly beneath navigation and interactive cards.
- **Color Harmonization**: Adaptive shader/particle colors matching your theme:
  - **Dark Mode**: Electric cyan (`#06b6d4`), emerald (`#10b981`), violet (`#8b5cf6`), and neon amber against `#09090b`.
  - **Light Mode**: Subdued translucent slate/indigo tones (`rgba(82, 39, 255, 0.15)`) to preserve full contrast and text legibility.
- **Accessibility & Performance**: Automatic fallback to static subtle gradient if `prefers-reduced-motion` is detected or on low-power devices.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Engine Selection (Custom Canvas 3D vs. Three.js)**
  - *Chosen Recommendation*: Hardware-accelerated 3D Canvas Projection or lightweight Three.js bundle.
  - *Why*: Zero lag, instant startup, no heavy 600KB+ asset downloads, and zero jank on mobile devices.
  - *Alternatives Considered*: Heavy GLTF/GLB 3D models (rejected due to 10MB+ download sizes and long loading spinners).

- **Decision 2: Scroll Tracking Strategy**
  - *Chosen Approach*: Passive scroll listener with `requestAnimationFrame` and linear interpolation (`lerp(current, target, 0.08)`).
  - *Why*: Decouples the 3D render loop from the browser's scroll thread, preventing stutter and jitter during rapid scrolling or touch flicks.
  - *Alternatives Considered*: Direct synchronous `onScroll` updates (causes frame drops on mobile).

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────┐
│                   Browser Viewport                     │
├────────────────────────────────────────────────────────┤
│  Layer 1: Fixed 3D Background (z-0, pointer-events:none)│
│  ┌──────────────────────────────────────────────────┐  │
│  │           HTML5 / WebGL 3D Canvas                │  │
│  │  • 3D Geometry / Neural Nodes / Particle Mesh     │  │
│  │  • Smooth Lerp Damping Engine                     │  │
│  │  • Scroll Matrix Transformer (X/Y/Z Rotations)    │  │
│  └────────────────────────▲─────────────────────────┘  │
│                           │ Normalized Scroll Progress │
│  Layer 2: DOM Scroll View │ (0.00 -> 1.00)             │
│  ┌────────────────────────┴─────────────────────────┐  │
│  │  Navbar (Fixed)                                  │  │
│  │  Hero Section                                    │  │
│  │  Capabilities Deck (Semi-circle)                 │  │
│  │  Projects Section (Skill-icons badges)           │  │
│  │  Work Reviews Section                            │  │
│  │  #5227FF Reachout Box (Say Hello & Socials)      │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

#### State & Animation Flow
1. **Scroll Observer**: Reads `window.scrollY / maxScroll` passively.
2. **Smooth Target Lerp**: Updates `targetRotationY`, `targetZoom`, and `targetParticleSpread`.
3. **Render Tick**: In each `requestAnimationFrame`, smoothly interpolates current values toward target values and renders the 3D projection.
4. **Window Resize Listener**: Automatically handles device pixel ratio (DPR) and viewport adjustments.

---

### Verification & Testing Plan
- Verify 60 FPS scroll performance across desktop and mobile browsers.
- Ensure all interactive elements (buttons, links, copy triggers) maintain complete clickability (`pointer-events-auto`).
- Validate dark and light theme switching without canvas artifacts or flicker.
- Test `prefers-reduced-motion` compliance.
