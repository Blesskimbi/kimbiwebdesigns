import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import LegalLayout from "@/components/LegalLayout";

const UPDATED = "2026-09-09";

/**
 * Carries the advertising disclosure AdSense reviewers look for, and the
 * "this is not professional advice" line that a how-to blog giving pricing,
 * hosting and SEO guidance genuinely needs.
 */
const DisclaimerPage = () => (
  <>
    <Helmet>
      <title>Disclaimer | Bless Kimbi</title>
      <meta name="description" content="What the advice on blesskimbi.com is and is not: general information rather than professional consulting, plus the advertising disclosure and the limits on results and accuracy." />
      <link rel="canonical" href="https://blesskimbi.com/disclaimer/" />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Disclaimer | Bless Kimbi" />
      <meta property="og:description" content="What the advice on blesskimbi.com is and is not, plus the advertising disclosure and limits on accuracy and results." />
      <meta property="og:url" content="https://blesskimbi.com/disclaimer/" />
      <meta property="og:image" content="https://blesskimbi.com/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Disclaimer | Bless Kimbi" />
      <meta name="twitter:description" content="What the advice on blesskimbi.com is and is not." />
      <meta name="twitter:image" content="https://blesskimbi.com/og-image.png" />
    </Helmet>

    <LegalLayout
      heading="Disclaimer"
      intro="What the writing on this site is, what it is not, and how the advertising on the blog works."
      updated={UPDATED}
    >
      <h2>This is general information, not consulting</h2>
      <p>
        The articles here are written to be useful to a wide audience: business owners deciding
        whether they need a website, developers learning the craft, people comparing hosting or
        trying to understand what a fair price looks like in Cameroon.
      </p>
      <p>
        That breadth is exactly why it cannot be advice for your specific situation. I have not
        seen your business, your budget, your existing site or your market. Nothing here is a
        substitute for professional legal, financial, tax or business advice, and reading it does
        not make me your consultant. Before you commit real money to a decision, get advice from
        someone who knows your circumstances — which, if it is a website, is a conversation I am
        happy to have properly through the <Link to="/contact/">contact page</Link>.
      </p>

      <h2>Advertising disclosure</h2>
      <p>
        <strong>The blog carries advertising served by Google AdSense.</strong> The rest of the
        site does not.
      </p>
      <ul>
        <li>
          I do not choose the individual ads. They are selected automatically by Google, and two
          people reading the same article will often see different ones.
        </li>
        <li>
          An ad appearing next to my writing is not an endorsement. I have no relationship with
          those advertisers and frequently have not heard of them.
        </li>
        <li>
          I earn money when ads are shown or clicked. That is what pays for the hosting and for
          the time the articles take to write.
        </li>
        <li>
          Ad revenue does not influence what I write. Where I recommend a tool or a host, it is
          because I use it or have used it on client projects, and I say so in the article.
        </li>
        <li>
          If I ever publish sponsored content or an affiliate link, it will be labelled as such in
          the article itself, at the top, not hidden in this page.
        </li>
      </ul>
      <p>
        The <Link to="/privacy-policy/">privacy policy</Link> explains what advertising cookies do
        and how to opt out of personalised ads.
      </p>

      <h2>Accuracy and shelf life</h2>
      <p>
        Web development moves quickly. An article that was correct when published can be wrong two
        years later — a tool changes its pricing, Google changes how it ranks pages, a framework
        releases a version that breaks the example. Every post shows its publication date, and it
        is worth checking.
      </p>
      <p>
        I write from real project experience and I check what I publish, but I do not guarantee
        that everything here is accurate, complete or current. If you spot something wrong, tell
        me and I will fix it — that is a favour to every future reader, and I would rather know.
      </p>

      <h2>Prices and figures</h2>
      <p>
        Any cost, timeline or price range mentioned in an article is an illustration based on
        typical projects, not a quote. Real prices depend on scope, and exchange rates and market
        rates both move. The only binding number is one in a written proposal with your name on
        it.
      </p>

      <h2>Results</h2>
      <p>
        Case studies and portfolio pieces describe what happened for those clients, on their
        sites, in their markets, at that time. They are not a prediction of what will happen for
        you. SEO in particular depends on competition, budget, patience and factors nobody
        controls — no honest person in this industry will promise you a ranking, and you should
        treat anyone who does with suspicion.
      </p>

      <h2>External links</h2>
      <p>
        Articles link to other websites, tools and resources because they are useful. I do not
        control those sites, I am not responsible for their content or their accuracy, and a link
        is not an endorsement of everything that company does. Once you leave this site, their
        terms and their privacy policy apply, not mine.
      </p>

      <h2>Comments</h2>
      <p>
        Comments belong to the people who wrote them. Their views are not mine, and a comment
        sitting on the site unremoved does not mean I agree with it or have verified it.
      </p>

      <h2>Use at your own risk</h2>
      <p>
        Everything here is provided as it is. Acting on something you read on this site is your
        decision, and the consequences are yours. To the fullest extent the law allows, I accept
        no liability for loss arising from the use of this site or its content. See the{" "}
        <Link to="/terms-of-service/">terms of service</Link> for the full position.
      </p>

      <h2>Contact</h2>
      <p>
        Corrections, questions, or a complaint about an ad you saw here:{" "}
        <a href="mailto:blesskimbi10@gmail.com">blesskimbi10@gmail.com</a>.
      </p>
    </LegalLayout>
  </>
);

export default DisclaimerPage;
