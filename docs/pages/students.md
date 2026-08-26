# Page: For Students — `/students`

- **File:** `client/src/pages/ForStudents.tsx`

## Sections

### 1. Hero
- Background image: `ALJubIxaAqIgICoH.jpg` (alt: "Students collaborating"), opacity 0.20
- Eyebrow: `/ FOR STUDENTS`
- H1: `Discover What You're Capable Of`
- Sub: "SparkLab isn't just another class—it's your chance to build something real, work with a team, and compete for actual prize money."
- CTA: `Apply Now →` → `/contact` (despite the label, this is the same generic contact form — there is no student-specific application path)

### 2. What You'll Do
- H2: `What You'll Do`
- Body: "Over 8 weeks, you and your team will create a complete business from scratch. This isn't about memorizing textbook definitions—it's about rolling up your sleeves and building something you're proud of."
- Bullet list:
  - Brainstorm and develop a real business idea
  - Research your market and understand your customers
  - Create a brand with logo, colors, and messaging
  - Build marketing materials and social media strategy
  - Develop financial projections and pricing
  - Pitch your business to real industry professionals
- Photo: `yXcGvIoCzcHeQlbQ.jpg` (alt: "Student at laptop")

### 3. Why Join SparkLab? — 6 benefits
- Trophy · **Win Real Prizes** — "Compete for cash prizes awarded to the top teams at the final competition."
- Rocket · **Build Real Skills** — "Learn marketing, finance, public speaking, and teamwork—skills that matter for any career."
- Users · **Work as a Team** — "Collaborate with classmates and discover how different strengths come together."
- Lightbulb · **Find Your Spark** — "Discover talents you didn't know you had. Maybe you're a natural presenter or designer."
- Star · **Stand Out** — "Add a unique experience to your college applications and resume."
- CheckCircle · **Have Fun** — "This isn't boring lectures—it's hands-on, creative, and actually enjoyable."

### 4. No Experience? No Problem.
- "You don't need to know anything about business to join SparkLab. We'll teach you everything step by step. All you need is:"
  - **Curiosity** — A willingness to learn and try new things
  - **Teamwork** — The ability to work well with others
  - **Commitment** — Dedication to show up and do the work

### 5. Time Commitment
- 3-tile grid: `8 Weeks` (Total program length) · `2-3 Hours/Week` (During class time) · `1 Competition Day` (Final presentations)

### 6. CTA
- H2: `Ready to Find Your Spark?`
- Body: "Talk to your teacher or school administrator about bringing SparkLab to your school, or reach out to us directly."
- CTAs: `Express Interest →` → `/contact`; `Read FAQ` → `/faq`

## Per-page issues
- "Apply Now" + "Express Interest" both land on the generic contact form. Students get no application-specific intake, no school-picker, no parental-consent flow.
- No student testimonial, no quote, no spotlight on a past participant.
- "Compete for cash prizes" promised without specifying amounts. Combined with the Home page's hardcoded `$7,500` claim, this creates inconsistent expectations.
