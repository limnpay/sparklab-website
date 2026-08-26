# Page: Home — `/`

- **File:** `client/src/pages/Home.tsx`
- **Layout:** wrapped in `Layout` (header + footer)
- **Title (global, no per-page override):** `SparkLab | Youth Entrepreneurship for Students`
- **Meta description (global):** `SparkLab is an immersive 8-week entrepreneurship program where high school students build real businesses, compete for prizes, and discover their potential. Based in Birmingham, Michigan.`
- **Meta keywords (global):** `SparkLab, youth entrepreneurship, high school business program, student entrepreneurship, teen startup competition, Birmingham Michigan, 8-week program, business pitch competition, STEM education, student innovation`

## Sections (top to bottom)

### 1. Hero
- Background image: `https://files.manuscdn.com/.../mSjabLfskvmsDpSY.jpg` (alt: "Students collaborating in classroom")
- Eyebrow: `/ POWERED BY SIGU X KMI`
- H1: `Fuel the Spark. Find Your Light.` (with "Spark." in orange, "Light." in green)
- Sub: `An immersive 8-week entrepreneurship program where high school students build real businesses, compete for prizes, and discover their potential.`
- CTA #1 (primary, orange, glow): `Apply as a Student →` → `/students`
- CTA #2 (secondary, dark): `Bring SparkLab to My School` → `/schools`
- "Scroll to explore" arrow that smooth-scrolls to `#overview`

### 2. Overview ("What is SparkLab?")
- H2: `What is SparkLab?`
- Sub: `SparkLab is not your typical classroom experience. It's a hands-on entrepreneurship program where students work in teams to create real business concepts, develop marketing strategies, and pitch to industry professionals.`
- 3 differentiator cards (icon + title + description):
  - Lightbulb · **Real-World Skills** — "Learn business fundamentals, marketing, finance, and public speaking from successful professionals—not just textbooks."
  - Users · **Team Collaboration** — "Work with classmates across different subjects, just like real companies where designers, marketers, and analysts collaborate."
  - Trophy · **Compete & Win** — "Present your business to judges and compete for real prize money awarded to the winning teams."
- Stat tiles: `150+ Students Impacted`, `3 Schools Serviced`, `8 Week Program`, `100% Hands-On Learning`

### 3. "See SparkLab in Action" gallery
- H2: `See SparkLab in Action`
- Sub: `Real moments from our program—students learning, collaborating, and competing.`
- 2 × 4 photo grid (square aspect):
  | URL hash | Alt |
  | --- | --- |
  | `GUardqukcXWIPWJK.jpg` | Students pitching on stage at competition |
  | `YxquwaUrNCZAfWZe.jpg` | Students collaborating with mentor |
  | `caQirMgKnUxUsZIh.jpg` | Judges evaluating presentations |
  | `NGAaSoSQKvtdyCBC.jpg` | Students presenting in lecture hall |

### 4. "Who is SparkLab For?"
- H2: `Who is SparkLab For?`
- Sub: `SparkLab brings together students, educators, mentors, and sponsors to create transformative learning experiences.`
- 4 audience cards with photo header, icon, title, description, and a CTA link:
  - **Students** — "Discover your strengths, build real skills, and compete for prizes while having fun." → `Learn More` → `/students`
  - **Schools** — "Bring an innovative program that complements your curriculum and engages students." → `Partner With Us` → `/schools`
  - **Mentors & Judges** — "Share your expertise and inspire the next generation of entrepreneurs." → `Get Involved` → `/mentors`
  - **Sponsors** — "Support youth entrepreneurship and connect with emerging talent." → `Become a Sponsor` → `/contact`

### 5. Program Preview ("8 Weeks to Build Your Business")
- H2: `8 Weeks to Build Your Business`
- Body: "From brainstorming your first idea to presenting on stage, SparkLab guides you through every step of building a real business concept. Each week builds on the last, with video lessons from industry experts and hands-on activities."
- Numbered list of week bands:
  1. Week 1-2: Ideation & Market Research
  2. Week 3-4: Business Model & Strategy
  3. Week 5-6: Branding & Marketing
  4. Week 7-8: Financial Planning & Pitch Prep
- Inline CTA: `See Full Program Details →` → `/program`
- Photo: `fiRvvKJKYULSmKQj.jpg` (alt: "Students presenting their business") with a floating `$15K+ In Total Prizes` badge — **this badge contradicts the Competition page**, which removed dollar amounts.

### 6. Competition Highlight ("Pitch. Compete. Win.")
- H2: `Pitch. Compete. Win.`
- Body: "The SparkLab program culminates in an exciting pitch competition where teams present their businesses to a panel of real industry judges. Top teams win cash prizes, with first place taking home $7,500."
- Prize tiles: `$7,500 1st Place`, `$5,000 2nd Place`, `$2,500 3rd Place`
- Photo: `yOnhpumqEGLatfns.jpg` (alt: "Students on stage at competition")
- Inline CTA: `Learn About the Competition →` → `/competition`

### 7. Final CTA ("Ready to Ignite Your Spark?")
- H2: `Ready to Ignite Your Spark?`
- Body: "Whether you're a student ready to build something amazing, a school looking to inspire your students, or a professional wanting to give back—there's a place for you at SparkLab."
- CTA #1: `Apply as a Student →` → `/students`
- CTA #2: `Contact Us` → `/contact`

## Per-page issues to flag in audit
- Hardcoded prize amounts (`$15K+`, `$7,500`, `$5,000`, `$2,500`) contradict the `todo.md` decision to remove prize amounts, and contradict the Competition page itself.
- Stat `3 Schools Serviced` is buried in marketing prose with no source/footnote.
- The "Powered by SIGU X KMI" eyebrow appears without any user-facing explanation of who SIGU and KMI are.
