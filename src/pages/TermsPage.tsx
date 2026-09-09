import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import LegalLayout from "@/components/LegalLayout";

const UPDATED = "2026-09-09";

/**
 * Not strictly required by AdSense, but reviewers look for it, and it is the
 * page that actually protects me: it sets out that reading an article is not a
 * consulting relationship, that comments can be removed, and that a quote given
 * over WhatsApp is not a contract.
 */
const TermsPage = () => (
  <>
    <Helmet>
      <title>Terms of Service | Bless Kimbi</title>
      <meta name="description" content="The terms for using blesskimbi.com: acceptable use, who owns the content and code samples, the rules for blog comments, and the limits of what this site promises." />
      <link rel="canonical" href="https://blesskimbi.com/terms-of-service/" />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Terms of Service | Bless Kimbi" />
      <meta property="og:description" content="The terms for using blesskimbi.com: acceptable use, content ownership, comment rules, and the limits of what this site promises." />
      <meta property="og:url" content="https://blesskimbi.com/terms-of-service/" />
      <meta property="og:image" content="https://blesskimbi.com/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Terms of Service | Bless Kimbi" />
      <meta name="twitter:description" content="The terms for using blesskimbi.com, in plain language." />
      <meta name="twitter:image" content="https://blesskimbi.com/og-image.png" />
    </Helmet>

    <LegalLayout
      heading="Terms of Service"
      intro="The rules for using this website. They are short, and written to be understood rather than to be impressive."
      updated={UPDATED}
    >
      <h2>Agreeing to these terms</h2>
      <p>
        By browsing blesskimbi.com you accept what is on this page. If you disagree with any of
        it, the remedy is simple and costs you nothing: stop using the site. These terms apply to
        everyone who visits, whether you read one article or all of them.
      </p>

      <h2>Who you are dealing with</h2>
      <p>
        This site belongs to <strong>Bless Kimbi</strong>, a freelance web designer and developer
        based in Buea, South West Region, Cameroon. Throughout this page, &ldquo;I&rdquo; and
        &ldquo;me&rdquo; mean that person, and &ldquo;you&rdquo; means whoever is reading.
      </p>

      <h2>What you may do with the content</h2>
      <p>
        Everything here — the articles, the photographs, the case studies, the designs, the logo
        and the site itself — is my work and remains my property under copyright.
      </p>
      <p>You are welcome, with no need to ask, to:</p>
      <ul>
        <li>Read, print and share links to anything on the site.</li>
        <li>
          Quote a reasonable extract from an article, provided you credit me and link back to the
          original page.
        </li>
        <li>
          Use any code snippet published in a tutorial here in your own projects, commercial ones
          included. Snippets are shared to be used; that is the point of publishing them.
        </li>
      </ul>
      <p>You may not, without written permission:</p>
      <ul>
        <li>Republish an article in full anywhere else, including a translation of it.</li>
        <li>Sell, licence or redistribute the content as your own, or as part of a paid product.</li>
        <li>Scrape the site systematically, or use it to train a model, at a volume that costs me hosting.</li>
        <li>Present my portfolio work as yours, or imply I built something I did not.</li>
      </ul>

      <h2>Comments and anything else you post</h2>
      <p>
        The comment box under each article exists for genuine discussion. When you post, you keep
        ownership of what you wrote, but you give me permission to display it on the site
        indefinitely.
      </p>
      <p>I will delete a comment, without warning or explanation, if it is:</p>
      <ul>
        <li>Spam, or link-dropping for someone else&apos;s site.</li>
        <li>Abusive, hateful, or an attack on another commenter.</li>
        <li>Someone else&apos;s copyrighted work posted without permission.</li>
        <li>Someone else&apos;s private information.</li>
        <li>An attempt to break the site rather than to talk to it.</li>
      </ul>
      <p>
        You are responsible for what you post, and you confirm you have the right to post it.
        Comments are opinions of the people who wrote them and are not endorsed by me.
      </p>

      <h2>Reading this site does not hire me</h2>
      <p>
        Nothing here — no article, no price on the pricing section, no reply to a comment — forms
        a contract or a binding quote. Prices shown are indicative starting points, and change
        depending on what a project actually turns out to need.
      </p>
      <p>
        Client work is governed by a separate written agreement covering scope, timeline, payment
        and ownership, signed before anything begins. If we have not signed one, we do not have a
        project, however encouraging the conversation was.
      </p>

      <h2>Availability</h2>
      <p>
        I try to keep the site up and correct, but I do not promise it will be available without
        interruption, or free of errors. I may change, move or delete any page at any time,
        including articles you have bookmarked. Where a URL changes I will normally redirect it,
        but I cannot guarantee that for every page forever.
      </p>

      <h2>Advertising and links to other sites</h2>
      <p>
        The blog carries advertising served by Google AdSense, and articles link to third-party
        websites and tools. I do not control the ads that appear and I do not review the sites
        linked to. Following an ad or a link is your decision, and whatever happens on the other
        side is between you and that company. See the{" "}
        <Link to="/disclaimer/">disclaimer</Link> for more on this, and the{" "}
        <Link to="/privacy-policy/">privacy policy</Link> for what advertising cookies do.
      </p>

      <h2>Limits on my liability</h2>
      <p>
        The content here is provided as it is, without warranties of any kind. To the fullest
        extent the law allows, I am not liable for any loss — money, data, business or otherwise —
        arising from your use of this site or from acting on something you read here.
      </p>
      <p>
        Nothing in these terms limits liability for anything that cannot lawfully be limited,
        including fraud.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the Republic of Cameroon, and any dispute belongs
        to the Cameroonian courts. If any single clause here turns out to be unenforceable, the
        rest still stands.
      </p>

      <h2>Changes</h2>
      <p>
        I may revise these terms. The current version is always the one on this page, and the
        &ldquo;last updated&rdquo; date shows when it changed. Continuing to use the site after a
        change means you accept the new version.
      </p>

      <h2>Contact</h2>
      <p>
        Anything unclear, or a permission request:{" "}
        <a href="mailto:blesskimbi10@gmail.com">blesskimbi10@gmail.com</a>, or the{" "}
        <Link to="/contact/">contact page</Link>.
      </p>
    </LegalLayout>
  </>
);

export default TermsPage;
