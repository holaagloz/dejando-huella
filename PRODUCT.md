# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS (no framework). Confirmed: the deliverable is an HTML proposal inside `propuesta/` plus, later, a private link to share. Animation libraries per the Ruva Web Pro workflow (GSAP 3.13.0 + Lenis 1.3.11 served from `vendor/`).

## Users

- **Primary (of the future site):** parents and guardians in Ciudad Quesada / San Carlos (Alajuela, Costa Rica) looking for a daycare / early-childhood center, mostly on a phone, often arriving from WhatsApp or Google. They decide on trust: safety, who cares for their child, schedule, ages, and what a day looks like.
- **Primary (of this proposal):** the owner/director of Centro Infantil Dejando Huella, seeing the redesign for the first time. They must recognize their own brand, see it elevated, and want to hire the studio.

## Product Purpose

A sales proposal by **Gloz Studio** (studiogloz.com) for Centro Infantil Dejando Huella: a short cover with a before/after, then a complete mockup landing page that turns their current thin one-pager into an enrollment tool. Success = the owner says "wow" and hires Gloz Studio; for the future site, success = more WhatsApp inquiries and visit requests.

## Positioning

A small, warm, local early-childhood center in Barrio San Martín, Ciudad Quesada, whose rooms are already hand-painted with murals (rocket and space, fruit and vegetables, trees with a giraffe). Its brand is a handprint ("huella") and the line "Donde cada pequeño paso cuenta".

## Operating Context

- Families contact the center through WhatsApp (+506 6478 1319) and a Gmail address; the address is given by landmarks ("50 m este y 75 sur de la Universidad de San José, Barrio San Martín").
- The current site (https://dejandohuellacr.com/) is a static one-pager on GitHub Pages; audit in `docs/01-auditoria-estado-actual.md`.

## Capabilities and Constraints

- One primary action across the page: write on WhatsApp to schedule a visit (prefilled messages per button).
- Unknown business facts (ages served, real hours, services, staff, prices, permits, years open) are shown as **sample values clearly labelled as test data** (e.g. "Lunes a viernes · 7:00 a. m. – 6:00 p. m." marked as example). Confirmed by the user.
- Spanish (Costa Rica), "usted"/"tú" register to be decided in copy; the current site uses "tú" ("Escríbenos").

## Brand Commitments

- **Client:** keep the Dejando Huella logo (multicolor lettering + handprint with heart) unchanged; keep and elevate its palette (navy, coral, sage, mustard, dusty blue, lavender) — "respect what they have, take it to the next level" (user's words).
- **Studio:** the proposal is signed by Gloz Studio: royal blue `#024aa9`, ink `#172547`, Montserrat + Yeseva One. Gloz appears on the proposal cover and as a discreet signature, never competing with the client's brand on the landing.
- Pinterest references (in `docs/referencias/`) are classroom interiors: murals, warm wood, patchwork play floors, chalk drawings, rainbows, children in activity. Mood reference only; no Pinterest images are used as assets.

## Evidence on Hand

- Client logo and three real photos of their rooms: `materiales/cliente/` (logo.png, aula_espacio.jpeg, comedor.jpeg, entrada.jpeg).
- Address, phone/WhatsApp, email and map location from the current site.
- No testimonials, reviews, staff names, permits, prices or figures exist. Never fabricate testimonials or credentials; use labelled placeholders. Stock photos/videos from free-license banks (Pexels, Pixabay, Unsplash) are allowed and labelled "foto ilustrativa".

## Product Principles

1. Trust before delight: every section answers a question a parent asks before calling.
2. The client's brand leads; the studio signs.
3. Honest demonstration: sample data and stock imagery are labelled, never passed off as real.
4. Mobile first: the page is judged on a phone first.

## Accessibility & Inclusion

WCAG 2.2 AA contrast on all text and buttons (the current site fails on its CTAs), visible focus, reduced-motion support, real headings, and inclusive Spanish without "@" forms.
