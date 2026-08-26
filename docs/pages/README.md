# Page Inventory — SparkLab

The React app uses `wouter` (`client/src/App.tsx:30-49`). Every route below is wrapped in `Layout.tsx` (sticky header + footer). The whole app shares a single `<title>` and `<meta>` set defined in `client/index.html`; no per-page meta tags exist.

| Route | Component | Notes |
| --- | --- | --- |
| `/` | `Home.tsx` | Public landing |
| `/about` | `About.tsx` | About / mission / who we are |
| `/program` | `Program.tsx` | What we deliver, feedback loop, skills |
| `/students` | `ForStudents.tsx` | Audience: high school students |
| `/schools` | `ForSchools.tsx` | Audience: schools / districts |
| `/mentors` | `ForMentors.tsx` | Audience: volunteer judges & mentors |
| `/competition` | `Competition.tsx` | Pitch competition, prizes, judging, 2025 winners |
| `/faq` | `FAQ.tsx` | Tabbed FAQ across 4 audiences |
| `/contact` | `Contact.tsx` | Express interest form + newsletter signup |
| `/404` and any unknown path | `NotFound.tsx` | Light-theme 404 page; visually inconsistent with the rest of the site |

There is also a *non-routed* `ComponentShowcase.tsx` (`client/src/pages/ComponentShowcase.tsx`, 1 437 lines) — a demo of every shadcn/ui component. It is not registered in `App.tsx`, so it never renders in production.

The shared chrome:

- **Header** (`Layout.tsx`): Logo (links to `/`), nav (`Home | About | The Program | Get Involved ▾ (For Students / For Schools / For Mentors & Judges) | Competition | FAQ`), and an orange `Get Started` button that routes to `/contact`. Hamburger menu under `lg` breakpoint.
- **Footer** (`Footer.tsx`): Newsletter section, four-column grid (Brand + tagline + Powered by SIGU x KMI / Program links / Get Involved links / Contact info + LinkedIn), bottom bar with non-functional Privacy & Terms buttons, and a floating "back to top" arrow.

See the individual page docs in this folder for full text, image references, and inline meta.
