import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import LegalLayout from "@/components/LegalLayout";

const UPDATED = "2026-09-09";

/**
 * Required before AdSense will approve the site, and required anyway the moment
 * an ad cookie is set on a visitor in the EEA or the UK.
 *
 * Everything below describes what this site actually does — comments and likes
 * through Supabase, GA4 and Ahrefs for analytics, AdSense on the blog only. It
 * is deliberately not the generic template that names data a portfolio site
 * never collects: a policy promising a contact-form database that does not
 * exist is as wrong as one hiding a database that does.
 */
const PrivacyPolicyPage = () => (
  <>
    <Helmet>
      <title>Privacy Policy | Bless Kimbi</title>
      <meta name="description" content="How blesskimbi.com handles your data: the comments and likes stored, the analytics and advertising cookies used, who processes it, and how to opt out or request deletion." />
      <link rel="canonical" href="https://blesskimbi.com/privacy-policy/" />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Privacy Policy | Bless Kimbi" />
      <meta property="og:description" content="How blesskimbi.com handles your data: what is collected, the cookies used, who processes it, and how to opt out or request deletion." />
      <meta property="og:url" content="https://blesskimbi.com/privacy-policy/" />
      <meta property="og:image" content="https://blesskimbi.com/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Privacy Policy | Bless Kimbi" />
      <meta name="twitter:description" content="How blesskimbi.com handles your data, the cookies used, and how to opt out." />
      <meta name="twitter:image" content="https://blesskimbi.com/og-image.png" />
    </Helmet>

    <LegalLayout
      heading="Privacy Policy"
      intro="This page explains what blesskimbi.com collects about you, why, who else can see it, and what you can ask me to do about it. It covers the whole site, including the blog."
      updated={UPDATED}
    >
      <h2>Who is responsible for your data</h2>
      <p>
        This site is owned and run by <strong>Bless Kimbi</strong>, a freelance web designer and
        developer based in Buea, South West Region, Cameroon. I am the data controller for
        everything described here, which is a formal way of saying there is one person deciding
        what happens to your information, and it is me.
      </p>
      <p>
        You can reach me at <a href="mailto:blesskimbi10@gmail.com">blesskimbi10@gmail.com</a>{" "}
        about anything on this page, including a request to delete something.
      </p>

      <h2>What I collect</h2>

      <h3>Things you type in yourself</h3>
      <p>
        The only place on this site where you can submit anything is the comment box under a blog
        post. If you use it, I store:
      </p>
      <ul>
        <li>
          <strong>The name you enter.</strong> It is published next to your comment, so use
          whatever you are happy for strangers to read.
        </li>
        <li>
          <strong>Your email address, if you choose to give one.</strong> It is optional, it is
          never published, and it is never added to a mailing list — I do not run one. I keep it
          only so I can reply directly if your comment needs an answer.
        </li>
        <li>
          <strong>The comment itself,</strong> and the time it was posted.
        </li>
      </ul>
      <p>
        There is no contact form, no newsletter signup and no account to create. If you want to
        hire me you email me, call me, or message me on WhatsApp, and that conversation lives in
        whichever app you started it in, under that app&apos;s own privacy policy.
      </p>

      <h3>Things collected automatically</h3>
      <ul>
        <li>
          <strong>An anonymous like token.</strong> When you like a post, your browser generates a
          random identifier and stores it locally on your own device. It contains nothing about
          you — it exists only so a second click can undo the first, and so one person cannot like
          the same post fifty times. It is not linked to any other data.
        </li>
        <li>
          <strong>Standard analytics,</strong> covered in the next section: roughly which pages
          get read, from which countries, on which kinds of device, and which site you arrived
          from.
        </li>
      </ul>

      <h2>Cookies and similar technologies</h2>
      <p>
        A cookie is a small file a site asks your browser to keep. Some of what this site uses is
        not technically a cookie but does a similar job, so it is all described together here.
      </p>

      <h3>Analytics</h3>
      <ul>
        <li>
          <strong>Google Analytics 4</strong> tells me which articles people actually read and
          which ones they abandon. GA4 does not log or store IP addresses.
        </li>
        <li>
          <strong>Ahrefs Web Analytics</strong> does a similar job and is cookieless — it sets
          nothing on your device at all.
        </li>
      </ul>

      <h3>Advertising</h3>
      <p>
        <strong>Google AdSense serves ads on the blog only.</strong> The homepage, the service
        pages, the portfolio and the contact page carry no ads and load no advertising code
        whatsoever. That is enforced technically rather than promised: the ad script is loaded by
        the article pages themselves rather than sitewide, so it cannot run anywhere else.
      </p>
      <p>On the pages that do carry ads:</p>
      <ul>
        <li>
          Google, as a third-party vendor, uses cookies to serve ads on this site. Google&apos;s
          use of advertising cookies enables it and its partners to serve ads to you based on your
          visit here and to other sites on the internet.
        </li>
        <li>
          Third-party vendors and ad networks may also serve ads here and may themselves use
          cookies. I do not control those cookies and cannot read them.
        </li>
        <li>
          You can opt out of personalised advertising at{" "}
          <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer nofollow">
            Google My Ad Center
          </a>{" "}
          or, for many networks at once, at{" "}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer nofollow">
            aboutads.info/choices
          </a>{" "}
          and{" "}
          <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer nofollow">
            youronlinechoices.com
          </a>
          . Opting out stops ads being tailored to you; it does not remove ads.
        </li>
        <li>
          More detail on how Google uses data from sites that use its services is at{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer nofollow">
            policies.google.com/technologies/partner-sites
          </a>
          .
        </li>
      </ul>
      <p>
        If you are in the European Economic Area, the United Kingdom or Switzerland,
        Google&apos;s consent message asks for your choice before personalised advertising
        cookies are used on the pages that carry ads, and you can change or withdraw that choice
        at any time from the same message. Refusing does not lock you out of anything — you may
        simply see less relevant ads.
      </p>

      <h3>Turning cookies off entirely</h3>
      <p>
        Every major browser lets you block or delete cookies in its settings. Nothing here breaks
        if you do; the comment box and the like button will still work, because neither one
        depends on a cookie.
      </p>

      <h2>Who else handles your data</h2>
      <p>
        I do not sell your data, and I do not share it with anyone for their own marketing. It is
        handled by the companies whose infrastructure runs this site:
      </p>
      <ul>
        <li>
          <strong>Supabase</strong> — the database storing blog comments and like counts.
        </li>
        <li>
          <strong>Vercel</strong> — the hosting provider serving the pages, which keeps standard
          server logs.
        </li>
        <li>
          <strong>Google</strong> — Analytics and AdSense, as described above.
        </li>
        <li>
          <strong>Ahrefs</strong> — cookieless traffic analytics.
        </li>
      </ul>
      <p>
        These companies operate internationally, so your data may be processed on servers outside
        Cameroon and outside your own country. I will also disclose information if a law
        genuinely requires it.
      </p>

      <h2>How long it is kept</h2>
      <ul>
        <li>
          <strong>Comments</strong> stay up as long as the post does, unless you ask me to remove
          yours.
        </li>
        <li>
          <strong>Optional emails attached to comments</strong> are deleted when the comment is.
        </li>
        <li>
          <strong>Analytics data</strong> is retained under Google&apos;s and Ahrefs&apos; own
          schedules.
        </li>
        <li>
          <strong>The like token</strong> sits on your device until you clear your browser storage.
        </li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Wherever you live, you can ask me to show you what I hold about you, correct it, or delete
        it. If you are in the EEA or the UK, the GDPR gives you those rights formally, along with
        the right to object to processing, to request a portable copy, and to complain to your
        national data protection authority. If you are in California, the CCPA gives you
        comparable rights, including the right not to be discriminated against for exercising them
        — and note that I have no data to sell even if I wanted to.
      </p>
      <p>
        In practice all of this is one email to{" "}
        <a href="mailto:blesskimbi10@gmail.com">blesskimbi10@gmail.com</a>. I will respond within
        30 days. Deleting a comment takes me about a minute and I will not ask you why.
      </p>

      <h2>Children</h2>
      <p>
        This site is aimed at business owners and developers, not children. I do not knowingly
        collect anything from anyone under 16. If you believe a child has left a comment
        containing personal information, email me and I will remove it.
      </p>

      <h2>Links to other sites</h2>
      <p>
        Articles here link out to other websites, and ads link to advertisers. Once you follow one
        of those links you are on someone else&apos;s site, governed by their privacy policy, not
        this one. I have no control over what they collect.
      </p>

      <h2>Security</h2>
      <p>
        The site is served entirely over HTTPS, and the database sits behind access rules that let
        the public add a comment but not read anyone&apos;s email address or modify anything. No
        system is perfectly secure, but there is also very little here worth stealing — I hold no
        passwords, no payment details and no addresses for site visitors.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If what the site does changes, this page changes with it, and the &ldquo;last
        updated&rdquo; date at the top moves. Material changes will be obvious rather than buried.
      </p>

      <h2>Contact</h2>
      <p>
        Questions, corrections or deletion requests:{" "}
        <a href="mailto:blesskimbi10@gmail.com">blesskimbi10@gmail.com</a>, or through the{" "}
        <Link to="/contact/">contact page</Link>.
      </p>
    </LegalLayout>
  </>
);

export default PrivacyPolicyPage;
