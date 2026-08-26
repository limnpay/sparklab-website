import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { LongForm } from "@/components/ui/LongForm";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Terms of use for the SparkLab website and program. Acceptable use, intellectual property, and disclaimers.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description={`Last updated: ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}`}
        imageSrc="/images/heroes/about.jpg"
      />

      <Section ariaLabelledby="terms-heading">
        <LongForm>
          <h2 id="terms-heading">Acceptance of terms</h2>
          <p>
            By accessing the {SITE.name} website at{" "}
            <a href={SITE.url}>{SITE.url}</a> you agree to these Terms of
            Service. If you do not agree, please do not use the site.
          </p>

          <h2>Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the site for any unlawful purpose.</li>
            <li>Attempt to gain unauthorized access to any portion of the site.</li>
            <li>Interfere with the normal operation of the site or its underlying services.</li>
            <li>Misrepresent your identity or affiliation when contacting us.</li>
          </ul>

          <h2>Intellectual property</h2>
          <p>
            All content on this site — text, images, video, curriculum,
            graphics, and the {SITE.name} brand — is owned by {SITE.name} or
            its licensors. You may not copy, reproduce, or redistribute
            program materials without written permission.
          </p>

          <h2>Program participation</h2>
          <p>
            Participation in the SparkLab program is governed by separate
            agreements between {SITE.name} and partner schools. Cash prizes,
            judging decisions, and competition rules are at the sole
            discretion of {SITE.name} and announced before each cohort.
          </p>

          <h2>Disclaimers</h2>
          <p>
            The site is provided &quot;as is&quot;. We make no warranties
            about availability, accuracy, or fitness for a particular
            purpose. We are not liable for any indirect, incidental, or
            consequential damages arising from your use of the site.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the
            site after changes are posted constitutes acceptance of the
            updated terms.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </p>
        </LongForm>
      </Section>
    </>
  );
}
