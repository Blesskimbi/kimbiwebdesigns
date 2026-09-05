/**
 * FAQ content for the service pages.
 *
 * These live here rather than inside the page components because two things
 * need them: the page renders them as visible FAQ sections, and
 * scripts/gen-routes.mjs turns them into FAQPage JSON-LD at build time.
 * Keeping one copy means the structured data can never drift from what a
 * visitor actually reads on the page.
 *
 * Plain .mjs so the Node build script can import it directly.
 */

export const communityFaqs = [
  {
    q: "Is this completely free?",
    a: "Yes. 100% free, no hidden fees, no paid tiers. The WhatsApp group is open to anyone who wants to learn or collaborate on software development.",
  },
  {
    q: "Do I need prior coding experience to join?",
      a: "No prior experience needed. The community welcomes complete beginners, developers who are still learning, and experienced professionals who want to collaborate and share knowledge.",
  },
  {
    q: "How much time do I need to commit each week?",
    // TODO: confirm with Bless — update with real expectations once community cadence is decided
    a: "There's no minimum commitment. Join, learn at your own pace, ask questions when you have them, and contribute when you can. Even checking in once a week is valuable.",
  },
  {
    q: "What technologies and topics does the community cover?",
    a: "Web development (HTML, CSS, JavaScript, React) and mobile app development are both covered. Topics like freelancing, SEO, getting clients, and building a portfolio come up regularly too.",
  },
  {
    q: "How do I join?",
    a: "Click the 'Join the Community' button on this page. It links directly to the WhatsApp group. No sign-up form, no waiting list.",
  },
];

export const ecommerceFaqs = [
  {
    q: "How much does an e-commerce website cost in Cameroon?",
    a: "E-commerce website costs in Cameroon vary based on the number of products, required features, and payment integrations needed. A basic store starts from a few hundred dollars, while a fully custom solution with Mobile Money integration and SEO can be more. Contact us for a free quote tailored to your business.",
  },
  {
    q: "Can you integrate Mobile Money payments (MTN & Orange)?",
    a: "Yes. We integrate MTN Mobile Money and Orange Money alongside international options like PayPal and Stripe, so you can accept payments from customers across Cameroon and beyond.",
  },
  {
    q: "How long does it take to build an e-commerce website?",
    a: "A standard e-commerce store typically takes 3 to 6 weeks from brief to launch, depending on complexity. We work efficiently and keep you updated at every stage.",
  },
  {
    q: "Do I need technical knowledge to manage my store after launch?",
    a: "No. We build your store with a user-friendly admin panel and provide training so you can add products, manage orders, and update content yourself. No coding required.",
  },
  {
    q: "Will my e-commerce store rank on Google?",
    a: "Yes, if SEO is included in your project. We structure every store with SEO best practices: optimised product pages, fast load times, and proper schema markup. For deeper SEO work, see our dedicated SEO services in Cameroon.",
  },
  {
    q: "Can you redesign my existing online store?",
    a: "Absolutely. We regularly take over existing stores that aren't converting and rebuild them into professional, high-performing e-commerce sites. We can migrate your products and existing data.",
  },
];

export const mobileAppFaqs = [
  {
    q: "React Native vs native development: which is better?",
    a: "For most businesses, React Native is the smarter choice. It delivers native-feeling performance while sharing a single codebase across iOS and Android, meaning you get to market faster and spend significantly less on development. Pure native development (Swift for iOS, Kotlin for Android) only makes sense for apps with very specific hardware requirements or extreme performance demands.",
  },
  {
    q: "How long does it take to build an app?",
    a: "A basic app with 4 to 5 screens typically takes 4 to 6 weeks. A standard app with custom design and integrations takes 8 to 12 weeks. Complex or enterprise apps are scoped individually. We provide a detailed timeline at the start of every project.",
  },
  {
    q: "Do you handle App Store submission?",
    a: "Yes. App Store publishing is included in Standard and Custom packages. We prepare all required assets, including screenshots, app description, keywords and privacy policy links, and manage the review process with both Apple and Google on your behalf.",
  },
  {
    q: "Can you add features after launch?",
    a: "Absolutely. Post-launch updates are a normal part of app development. We offer ongoing support and maintenance packages that cover bug fixes, OS compatibility updates, and new feature development as your user base and requirements grow.",
  },
  {
    q: "Do I own the source code?",
    a: "Yes, 100%. Once the project is complete and payment is finalised, you own all source code, design files, and related assets. There are no licensing fees, lock-in clauses, or ongoing royalties. Your app is yours.",
  },
];

export const seoCompanyFaqs = [
  {
    q: "What is SEO and why does my business in Cameroon need it?",
    a: "SEO (Search Engine Optimisation) is the process of making your website appear higher in Google search results. If someone in Douala or Yaoundé searches for your product or service, you want to be the first result they see. Without SEO, even a beautiful website can be invisible to potential clients.",
  },
  {
    q: "How long does SEO take to show results?",
    a: "Most businesses start seeing meaningful improvements in 3 to 6 months. SEO is a long-term investment. The results compound over time and continue delivering traffic without ongoing ad spend.",
  },
  {
    q: "Do you work with businesses outside Cameroon?",
    a: "Yes. While we specialise in SEO for businesses in Cameroon and across Africa, we work with clients internationally. Our strategies are tailored to your target market, wherever that is.",
  },
  {
    q: "What's the difference between SEO and paid ads?",
    a: "Paid ads (Google Ads) stop the moment you stop paying. SEO builds organic rankings that continue to bring traffic for months and years after the work is done. Most growing businesses benefit from both.",
  },
  {
    q: "Can you help if my website was built by someone else?",
    a: "Absolutely. We can audit and optimise any existing website regardless of who built it. If we find deeper technical issues, we can also rebuild or redesign the site as part of a broader project.",
  },
  {
    q: "How much does SEO cost in Cameroon?",
    a: "Pricing depends on your goals, competition level, and the scope of work. We offer flexible packages for small businesses and larger retainers for established brands. Contact us for a free quote.",
  },
];

export const socialMediaFaqs = [
  {
    q: "What platforms do you manage?",
    a: "We manage Instagram, Facebook, LinkedIn, TikTok, X (Twitter), and Pinterest. The platforms we focus on depend on where your target audience spends their time. We'll recommend the best combination for your business during our initial consultation.",
  },
  {
    q: "How long before I see results?",
    a: "Organic social media growth takes time. Most clients start seeing consistent engagement improvements within 4 to 8 weeks, and meaningful follower growth within 3 months of a consistent strategy. Paid campaigns can produce faster visibility and traffic.",
  },
  {
    q: "Do you create the graphics too?",
    a: "Yes. Post design is included in all packages. We create branded graphics, carousels, story templates, and any other visual assets your accounts need. Everything is aligned to your brand colours, fonts, and tone.",
  },
  {
    q: "Can I approve posts before they go live?",
    a: "Absolutely. We share the content calendar and all posts with you in advance for review and approval. Nothing goes live without your sign-off if that's your preference. We can also work with a delegated approval workflow if you'd prefer less back-and-forth.",
  },
  {
    q: "Do you run paid ads?",
    a: "Paid social campaigns are included in the Pro plan and can be added to any other plan. We handle ad creative, targeting, budgeting, and reporting. Ad spend is billed separately and managed transparently.",
  },
];

export const uiUxFaqs = [
  {
    q: "What tools do you use?",
    a: "Figma is our primary design tool for everything: wireframes, visual UI, prototypes, and design systems. We also use FigJam for user flows and collaborative workshops. All deliverables are shared as Figma files so you and your team have full access.",
  },
  {
    q: "Do you do development too or just design?",
    a: "Both. We offer standalone UI/UX design, but we also build what we design. If you need a full website or app built after the design is finalised, we can handle the development too, which means zero friction between design and implementation.",
  },
  {
    q: "What's included in a design handoff?",
    a: "A complete Figma file with organised layers, named components, documented spacing and typography, interaction notes, and exported assets. We also write a brief handoff guide summarising key decisions and any edge cases developers should be aware of.",
  },
  {
    q: "How many revisions are included?",
    a: "The number of revision rounds depends on the package, typically 2 to 3 rounds for most projects. A revision round means a full review cycle where you share feedback and we incorporate all changes. We find that 2 to 3 well-structured rounds is enough to get any project to a great place.",
  },
  {
    q: "Can you redesign an existing product?",
    a: "Yes. Redesigns are a big part of what we do. We start with a review of your current product to identify usability problems, conversion gaps, and visual inconsistencies, then redesign with clear improvements backed by user-centred principles rather than just aesthetic preferences.",
  },
];
