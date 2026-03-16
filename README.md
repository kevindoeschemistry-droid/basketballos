# kevinbraza.com

Personal website for Kevin Braza — Chemical Engineering PhD researcher, AI systems builder, and STEM educator.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** components
- Vercel-ready deployment

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Site Architecture

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, current focus, featured builds, research, teaching, chemistry gym |
| `/about` | Bio, interests, how Kevin thinks about work |
| `/now` | Living snapshot of current focus areas |
| `/research` | Chemical engineering research areas, approach, methods |
| `/builds` | All projects with status badges |
| `/builds/[slug]` | Individual project detail pages |
| `/teaching` | Private STEM coaching — subjects, philosophy, inquiry CTA |
| `/cv` | Web curriculum vitae |
| `/contact` | Contact form and inquiry reasons |
| `/chemistry-gym` | Training environment landing page |
| `/chemistry-gym/drills` | Drill generator with topic/difficulty/count selectors |
| `/chemistry-gym/daily-workout` | Daily 5-problem workout with reveal answers |
| `/chemistry-gym/coaching` | Coaching funnel within the gym |
| `/chemistry-gym/skill-tree` | Visual skill progression across topics |
| `/chemistry-gym/tools` | Interactive chemistry tool placeholders |

## Where to Edit Content

All content is in structured TypeScript files under `src/content/`:

| File | What it controls |
|------|-----------------|
| `src/content/builds.ts` | Project data (title, description, status, tags) |
| `src/content/now.ts` | Current focus items + /now page content |
| `src/content/research.ts` | Research areas, approach, methods |
| `src/content/teaching.ts` | Subjects, philosophy, best-fit criteria |
| `src/content/gym.ts` | Drill topics, skill tree, training modes, tools |
| `src/content/cv.ts` | Education, experience entries |
| `src/content/types.ts` | TypeScript type definitions |

## Key Components

Located in `src/components/`:

- `site-header.tsx` — sticky header with responsive nav
- `site-footer.tsx` — footer with identity, nav, social links
- `section.tsx` — reusable Section, SectionHeader, SectionTitle, SectionDescription
- `page-hero.tsx` — page hero with title, subtitle, description
- `project-card.tsx` — project card with status badge and tags

## Chemistry Gym Drill Generators

Located in `src/lib/gym-generators.ts`. Currently implements generators for:

- **Stoichiometry** — mole conversions, limiting reagent problems
- **Equilibrium** — K calculations, Q vs K comparisons, ICE tables
- **Acid-Base** — pH calculations, weak acid/base, Henderson-Hasselbalch buffers

Each generator supports Warm-Up, Training, and Championship difficulty levels. Designed to be replaced with more sophisticated generation logic later.

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/
│   ├── builds/
│   │   └── [slug]/
│   ├── chemistry-gym/
│   │   ├── coaching/
│   │   ├── daily-workout/
│   │   ├── drills/
│   │   ├── skill-tree/
│   │   └── tools/
│   ├── contact/
│   ├── cv/
│   ├── now/
│   ├── research/
│   ├── teaching/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/             # Reusable components
│   ├── ui/                 # shadcn/ui primitives
│   ├── page-hero.tsx
│   ├── project-card.tsx
│   ├── section.tsx
│   ├── site-footer.tsx
│   └── site-header.tsx
├── content/                # Structured content data
│   ├── builds.ts
│   ├── cv.ts
│   ├── gym.ts
│   ├── now.ts
│   ├── research.ts
│   ├── teaching.ts
│   └── types.ts
└── lib/
    ├── gym-generators.ts   # Chemistry drill generation logic
    └── utils.ts            # Tailwind merge utility
```
