# Page: Contact — `/contact`

- **File:** `client/src/pages/Contact.tsx`

## Sections

### 1. Hero
- Eyebrow: `/ GET IN TOUCH`
- H1: `Let's Start a Conversation`
- Sub: "Whether you're a student ready to apply, a school interested in partnering, or a professional wanting to volunteer, we'd love to hear from you."

### 2. Express Interest form (left column on desktop)
- H2: `Express Your Interest`
- Interest selector (2 × 2 grid of buttons):
  - Users · **I'm a Student**
  - School · **I represent a School**
  - Briefcase · **I want to Mentor/Judge**
  - Heart · **I want to Sponsor**
- Form fields:
  - **Your Name *** (text, required)
  - **Email Address *** (email, required)
  - **School / Organization** (label rewrites itself: "School Name" if school selected, "Company Name" if sponsor selected, else "School/Organization (Optional)")
  - **Message *** (textarea, 4 rows, required; placeholder rewrites itself per interest type)
- Submit: `Submit Interest` (shows spinner while pending). Posts to `/api/trpc/contact.submit`.
- Success toast: "Thank you for your interest! We'll be in touch soon."
- Failure toast: passes through the tRPC error or "Something went wrong. Please try again."

### 3. Contact Information (right column on desktop)
- H2: `Contact Information`
- **Email:** `outreach@sparklabusa.com` (mailto link)
- **Location:** "Currently serving schools in the greater metropolitan area" (no city, no street, no map)
- Inset "Quick Links" panel:
  - → Student Information (`/students`)
  - → School Partnership (`/schools`)
  - → Volunteer Opportunities (`/mentors`)
  - → Frequently Asked Questions (`/faq`)

### 4. Newsletter Signup
- H2: `Stay Updated`
- Body: "Subscribe to our newsletter for updates on upcoming programs, success stories, and opportunities to get involved."
- Email input + `Subscribe` button. Posts to `/api/trpc/newsletter.subscribe` with `source: "contact-page"`.
- Privacy line: "We respect your privacy. Unsubscribe at any time." — *but there is no unsubscribe mechanism in the database schema or in any UI.*

## Per-page issues
- The "Location" field says "greater metropolitan area" without naming a metro. (Footer says Birmingham, MI, About says the same — but Contact is the one place a visitor expects an address.)
- Phone number is absent across the entire site.
- Form lacks spam protection (no honeypot, no rate limit, no CAPTCHA, no `nonce`).
- No file upload (school decision-makers may want to attach an RFP).
- No "What happens next?" / expected response time.
- Submitting silently fails if `DATABASE_URL` is unset on the server — the user sees a toast but no log; this matters in dev environments without MySQL.
