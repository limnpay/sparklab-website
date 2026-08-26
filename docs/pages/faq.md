# Page: FAQ — `/faq`

- **File:** `client/src/pages/FAQ.tsx`
- **Implementation:** tab-switcher across 4 audience groups, each with its own accordion. Only one tab is rendered at a time, so search engines can crawl only the default tab on first load.

## Tabs and questions

### For Students
1. **Do I need any business experience to join SparkLab?** — "No! SparkLab is designed for beginners. We teach you everything step by step through video modules and hands-on activities. All you need is curiosity and willingness to learn."
2. **How much time will SparkLab take each week?** — "The program runs during class time, typically 2-3 hours per week for 8 weeks. Some teams choose to meet outside of class to work on their projects, but this is optional."
3. **Can I choose my own team?** — "Team formation varies by school. Some schools let students form their own teams, while others assign teams to ensure diverse skill sets. Your teacher will let you know how it works at your school."
4. **What if my business idea doesn't work?** — "That's part of the learning process! Many successful entrepreneurs failed multiple times before succeeding. SparkLab teaches you how to pivot and adapt when things don't go as planned."
5. **Will this help with college applications?** — "Yes! SparkLab gives you a unique experience to discuss in applications. You'll have concrete examples of teamwork, leadership, problem-solving, and public speaking to share."
6. **Do I get to keep the prize money if we win?** — "Yes! Prize money is distributed directly to winning team members."

### For Teachers & Schools
1. **Do teachers need business expertise to facilitate SparkLab?** — "No. Our video modules do the teaching—teachers facilitate discussions and guide activities. We provide complete facilitation guides with everything you need. Teachers from any subject can run SparkLab."
2. **How does SparkLab fit into the school schedule?** — "SparkLab is flexible. It can run during a specific class period (business, marketing, art, etc.), as an elective, or as an after-school program. We work with you to find the best fit."
3. **What materials and technology are required?** — "Students need access to computers for video modules and project work. We provide all curriculum materials, templates, and resources digitally."
4. **How many students can participate?** — "We recommend teams of 5 students. A typical SparkLab cohort has 4-8 teams (20-40 students), but we can accommodate larger programs."
5. **Is there a cost for schools to participate?** — "Contact us to discuss partnership options. We work with schools to make SparkLab accessible and may have sponsorship opportunities available."
6. **Can SparkLab count for academic credit?** — "This depends on your school's policies. Many schools integrate SparkLab into existing courses or offer it as an elective with credit."

### For Parents
1. **Is SparkLab safe for my child?** — "Yes. SparkLab takes place at school during school hours, supervised by teachers. Any mentors or judges undergo background checks and are vetted by our team."
2. **Will this interfere with my child's other classes?** — "SparkLab is designed to complement, not compete with, regular coursework. It typically runs during a designated class period and doesn't require extensive homework."
3. **How can I support my child during the program?** — "Encourage them, ask about their business idea, and celebrate their progress. You might also help them practice their pitch presentation before competition day."
4. **What happens to the business ideas after the program?** — "Students own their ideas. Some teams continue developing their businesses after SparkLab, while others use the experience as a learning foundation for future ventures."

### For Mentors & Judges
1. **How much time does volunteering require?** — "Judges commit to 1-2 days during the competition event. Mentors typically spend 2-4 hours per month meeting with students or providing guidance."
2. **What qualifications do I need to be a mentor or judge?** — "We look for professionals with experience in business, marketing, finance, or related fields. You don't need to be a CEO—anyone with relevant experience and a passion for helping students can contribute."
3. **Can I volunteer if I'm not local to the school?** — "Yes! Virtual mentoring and judging options are available. Contact us to discuss how you can participate remotely."
4. **Is there training provided?** — "Yes. We provide orientation materials for judges explaining the scoring criteria and what to look for. Mentors receive guidance on effective mentoring practices."

### Still Have Questions? (closing CTA)
- H2: `Still Have Questions?`
- Body: "We're here to help. Reach out and we'll get back to you as soon as possible."
- CTA: `Contact Us →` → `/contact`

## Per-page issues
- Tab-driven content is invisible to search engines on first paint. None of these Q&A pairs are wrapped in [FAQ structured data](https://schema.org/FAQPage), so they will not surface as rich results.
- The accordion uses an `onClick`+`useState` pattern, not a `<details>` element, so questions are not discoverable via in-page browser search until expanded.
- Several answers reference policies that have no other source on the site (background checks, sponsorship opportunities, virtual mentoring) and are not linked through to a longer explanation.
