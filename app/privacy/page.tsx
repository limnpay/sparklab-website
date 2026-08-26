import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { LongForm } from "@/components/ui/LongForm";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How SparkLab handles personal information collected through the website and the program.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}`}
        imageSrc="/images/heroes/about.jpg"
      />

      <Section ariaLabelledby="privacy-heading">
        <LongForm>
          <h2 id="privacy-heading">Overview</h2>
          <p>
            This Privacy Policy describes how {SITE.name} (&quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares
            personal information when you visit{" "}
            <a href={SITE.url}>{SITE.url}</a> or interact with our program.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Contact information you provide:</strong> name, email,
              school or company, and any message content you submit through
              our contact or newsletter forms.
            </li>
            <li>
              <strong>Program participation data:</strong> when a school
              partners with us, we may collect rosters, team assignments, and
              project submissions necessary to run the cohort.
            </li>
            <li>
              <strong>Anonymous usage information:</strong> aggregated,
              non-identifying analytics about which pages are visited. We do
              not run third-party advertising trackers.
            </li>
          </ul>

          <h2>How we use information</h2>
          <ul>
            <li>To respond to inquiries from students, parents, schools, mentors, and sponsors.</li>
            <li>To deliver and operate the SparkLab program for partner schools.</li>
            <li>To send program updates and newsletters (which you can unsubscribe from at any time).</li>
            <li>To improve our website and curriculum based on aggregated usage signals.</li>
          </ul>

          <h2>Sharing of information</h2>
          <p>
            We do not sell personal information. We share information only
            with vendors who help us run the program (for example, our form
            and email providers) and only to the extent necessary. We may
            share information when required by law or to protect the safety
            of our community.
          </p>

          <h2>Children&apos;s privacy</h2>
          <p>
            SparkLab serves high school students, and we work with each
            partner school to comply with COPPA, FERPA, and any applicable
            student-data laws. School-collected data is governed by the
            partner school&apos;s policies in addition to ours.
          </p>

          <h2>Your choices</h2>
          <p>
            You can request access to, correction of, or deletion of personal
            information we hold about you by emailing{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </LongForm>
      </Section>
    </>
  );
}
