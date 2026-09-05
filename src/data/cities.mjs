/**
 * City landing pages.
 *
 * One entry per city Bless works in. Four things read this file: the React
 * page that renders it, scripts/schema.mjs for the Service and FAQPage markup,
 * scripts/gen-routes.mjs for the static <head>, and scripts/gen-sitemap.mjs.
 * Keeping them on one source means a new city is one object, not five edits.
 *
 * The copy is deliberately different per city rather than a template with the
 * name swapped. Near-identical location pages read as doorway pages, and
 * Google treats them accordingly. Each entry says something true about doing
 * business in that place.
 *
 * Buea is home. Everywhere else is worked remotely, and the copy says so
 * rather than implying an office that does not exist.
 *
 * Plain .mjs so the Node build scripts can import it directly.
 */

export const cities = [
  {
    slug: "buea",
    name: "Buea",
    region: "South West",
    /** Used in <title>; kept under ~60 characters so Google does not truncate. */
    title: "Web Designer in Buea, Cameroon | Bless Kimbi",
    description:
      "Web designer based in Buea, Cameroon. Custom, mobile-first websites built to rank on Google, for businesses across the South West. Free quote within 24 hours.",
    heading: "Web Designer in Buea",
    lead: "I live and work in Buea, so if you want to sit down and talk through your website in person, that is genuinely possible here.",
    /** Two or three paragraphs of body copy, specific to the city. */
    body: [
      "Buea sits at the centre of Cameroon's tech scene. The University of Buea keeps a steady stream of developers and designers in town, and the community around Silicon Mountain means local businesses are used to dealing with people who build software. That is good news if you are hiring: you can ask for references and actually check them.",
      "It also means the bar is higher than it looks. A Buea business with a slow, template-built site is competing against neighbours whose customers already expect a site to load quickly on a phone, on a normal mobile connection, without a lot of patience.",
      "Most of my clients here are small and medium businesses: shops, service providers, schools, and startups getting their first real web presence. The work is the same either way, custom design rather than a template, built mobile-first, with the SEO groundwork done during the build instead of bolted on afterwards.",
    ],
    /** Why this city specifically. Three short points, city-specific. */
    highlights: [
      {
        title: "We can meet in person",
        text: "Buea is home. For anything that benefits from a face-to-face conversation, a first briefing especially, that is straightforward here in a way it is not elsewhere.",
      },
      {
        title: "Built for local connections",
        text: "Sites are tested on real mobile connections, not just a fast laptop. If a page is slow on a mid-range Android phone, it is not finished.",
      },
      {
        title: "Local search done properly",
        text: "Ranking for searches like \"web designer Buea\" means a Google Business Profile, consistent contact details everywhere, and pages that actually mention where you operate.",
      },
    ],
    faqs: [
      {
        q: "Can we meet in person if I am in Buea?",
        a: "Yes. Buea is where I am based, so an in-person meeting is easy to arrange. Most projects still run mostly over WhatsApp and email because it is faster for both of us, but the option is there whenever it helps.",
      },
      {
        q: "How much does a website cost in Buea?",
        a: "The same as anywhere else I work: a simple business site starts from around 150,000 FCFA, a fuller professional site with SEO from around 400,000 FCFA, and e-commerce from around 1,200,000 FCFA. The figure depends on scope, not on your postcode. You get an itemised quote before anything starts.",
      },
      {
        q: "Do you work with startups and student founders?",
        a: "Often. Buea has a lot of early-stage projects that need something credible online without an enterprise budget. Tell me what you are building and what you can spend, and I will be straight with you about what is realistic.",
      },
      {
        q: "Will my site show up when someone in Buea searches for my business?",
        a: "That is the goal, and it takes more than the website itself. A claimed and filled-in Google Business Profile, identical contact details across every listing, and pages written around what people actually search for all matter. I set the on-site part up during the build and tell you what to do off-site.",
      },
    ],
  },

  {
    slug: "douala",
    name: "Douala",
    region: "Littoral",
    title: "Web Design in Douala, Cameroon | Bless Kimbi",
    description:
      "Web design and development for Douala businesses. Mobile Money, PayPal and Stripe checkout, mobile-first builds and SEO. Worked remotely from Buea. Free quote.",
    heading: "Web Design in Douala",
    lead: "Douala is where most of Cameroon's commerce happens, and it is where most of the e-commerce work I do ends up.",
    body: [
      "Douala is the country's economic centre. The port, the importers, the wholesalers and the retail businesses that depend on them all move a lot of money, and increasingly they move some of it online. That changes what a website has to do: it stops being a brochure and starts being infrastructure.",
      "In practice that means checkout that works for how people here actually pay. MTN Mobile Money and Orange Money first, cards and PayPal alongside them for customers abroad. A store that only takes cards is turning away most of its market.",
      "Douala also searches in French more than Buea does. If your customers type \"agence web Douala\" rather than \"web design Douala\", your pages need to exist in that language too. That is worth deciding early, because retrofitting a second language later is more work than building for it.",
    ],
    highlights: [
      {
        title: "Mobile Money at checkout",
        text: "MTN MoMo and Orange Money integrated properly, with cards and PayPal alongside them so customers outside Cameroon can still buy.",
      },
      {
        title: "Built for a commercial site",
        text: "Product pages, stock, orders and an admin panel you can actually run yourself, rather than a shop you have to call someone to update.",
      },
      {
        title: "Worked remotely, run properly",
        text: "I am based in Buea, not Douala. Projects run over WhatsApp, email and scheduled calls, with the same fixed scope and written quote either way.",
      },
    ],
    faqs: [
      {
        q: "You are in Buea. Does that matter if my business is in Douala?",
        a: "In practice, no. Almost all of the work happens over WhatsApp, email and scheduled calls regardless of city, and you get the same written scope, timeline and quote. I would rather say plainly that I work remotely than pretend to an office in Douala.",
      },
      {
        q: "Can you accept MTN Mobile Money and Orange Money on my store?",
        a: "Yes, and for a Cameroonian store I would treat it as the default rather than an extra. Card and PayPal checkout can sit alongside it for customers paying from abroad.",
      },
      {
        q: "Can the site be in French as well as English?",
        a: "Yes. It is worth deciding at the start, because building for two languages from the beginning is much less work than adding the second one later. For a Douala business selling locally, French is usually the version that earns its keep.",
      },
      {
        q: "How long does an online store take to build?",
        a: "A straightforward store is usually 3 to 6 weeks from brief to launch, depending on how many products you have and how ready your product photos and descriptions are. That last part is more often the bottleneck than the build itself.",
      },
    ],
  },

  {
    slug: "yaounde",
    name: "Yaoundé",
    region: "Centre",
    title: "Website Development in Yaoundé | Bless Kimbi",
    description:
      "Website development for Yaoundé businesses, institutions and NGOs. Custom builds, French and English, SEO included. Worked remotely from Buea. Free quote in 24 hours.",
    heading: "Website Development in Yaoundé",
    lead: "Yaoundé work tends to look different from Douala work: more institutions, more organisations, and more sites that have to look credible to someone assessing you.",
    body: [
      "As the political capital, Yaoundé has a concentration of ministries, agencies, NGOs, professional practices and the businesses that serve them. A lot of the websites that matter there are not selling anything directly. They exist so that a funder, a partner, a regulator or a prospective client can check that you are real and take you seriously.",
      "That shifts the priorities. Clear structure, current information, documents that are easy to find, and a site that does not look abandoned. An out-of-date page is worse than no page when someone is deciding whether to trust you with a contract.",
      "French leads in Yaoundé search. If the people you want to reach are searching in French, the pages that answer them have to be in French, not an English page with a translate button on it.",
    ],
    highlights: [
      {
        title: "Built to be checked",
        text: "Structured for the person doing due diligence on you: clear services, real credentials, current contact details, documents where people expect to find them.",
      },
      {
        title: "French and English",
        text: "Bilingual builds where the French version is written to rank rather than machine-translated at the last minute.",
      },
      {
        title: "Straightforward to keep current",
        text: "You get an admin area and a handover, so updating a page or posting news does not require booking me first.",
      },
    ],
    faqs: [
      {
        q: "Do you work with NGOs and institutions?",
        a: "Yes. The requirements are usually different from a retail site: less about checkout, more about structure, credibility and keeping information current for funders, partners and the public. I am happy to work to a procurement process if you have one.",
      },
      {
        q: "Can you build the site in French?",
        a: "Yes, and for most Yaoundé organisations French is the version that does the work. A bilingual site is very doable, but decide at the start rather than adding the second language later.",
      },
      {
        q: "Are you based in Yaoundé?",
        a: "No, I am based in Buea and work with Yaoundé clients remotely. Briefings, reviews and handover all run over calls and email. If a project genuinely needs someone physically present on a regular basis, I will tell you that rather than take the work.",
      },
      {
        q: "Can we update the site ourselves afterwards?",
        a: "Yes. Every build comes with an admin area and a walkthrough so your team can edit pages, publish updates and change contact details without coming back to me. You own the domain, the files and the accounts.",
      },
    ],
  },

  {
    slug: "limbe",
    name: "Limbe",
    region: "South West",
    title: "Web Designer in Limbe, Cameroon | Bless Kimbi",
    description:
      "Web designer for Limbe hotels, restaurants and tour operators. Booking enquiries, fast photo-heavy pages and local SEO. Based nearby in Buea. Free quote in 24 hours.",
    heading: "Web Designer in Limbe",
    lead: "Limbe runs on people deciding where to stay, eat and visit, and most of them decide on a phone before they arrive.",
    body: [
      "Hospitality and tourism shape a lot of the web work in Limbe. Guest houses, hotels, restaurants, beach spots and tour operators are all selling something a visitor wants to see before committing, which makes photography and page speed unusually important. Large, unoptimised images are the single most common reason these sites feel slow.",
      "The other half is capturing the enquiry. A visitor deciding tonight will not fill in a long form. A clear rate, a working WhatsApp button and an enquiry form that takes seconds converts far better than a contact page that asks for a life story.",
      "Limbe is about half an hour from Buea, so this is one of the few places outside my own city where meeting in person is genuinely practical.",
    ],
    highlights: [
      {
        title: "Photography that loads",
        text: "Image-heavy pages compressed and served properly, so your rooms and dishes still appear quickly on a phone with a weak signal.",
      },
      {
        title: "Enquiries, not forms",
        text: "WhatsApp-first enquiry flows and short forms, because a visitor choosing where to sleep tonight will not complete a long one.",
      },
      {
        title: "Close enough to visit",
        text: "Limbe is a short drive from Buea, so an in-person meeting or a look at the property is realistic when it would help.",
      },
    ],
    faqs: [
      {
        q: "Can you build a booking or reservation system?",
        a: "Yes, though for many smaller properties a well-built enquiry flow converts better than a full booking engine and costs a lot less to run. I will tell you honestly which one your situation calls for rather than selling you the bigger option by default.",
      },
      {
        q: "Can you handle the photography?",
        a: "Photography is not something I shoot myself, but it matters enough that I will tell you plainly if your current images are holding the site back, and I can work with a photographer you hire. Good photos on a fast page is the combination that sells rooms and tables.",
      },
      {
        q: "Will the site work for visitors browsing on weak signal?",
        a: "That is the standard I build to. Pages are tested on real mobile connections rather than a fast laptop, and images are compressed and sized so a gallery still appears quickly.",
      },
      {
        q: "Do you visit Limbe?",
        a: "Yes, when it is useful. Limbe is roughly half an hour from Buea, so seeing a property in person is practical in a way it is not for clients further away.",
      },
    ],
  },

  {
    slug: "bamenda",
    name: "Bamenda",
    region: "North West",
    title: "Web Designer in Bamenda, Cameroon | Bless Kimbi",
    description:
      "Web designer for Bamenda businesses. Fast, mobile-first sites in English, built to stay reachable and easy to update. Worked remotely from Buea. Free quote.",
    heading: "Web Designer in Bamenda",
    lead: "Bamenda is a commercial centre with an English-speaking market, and that combination is worth building for deliberately.",
    body: [
      "Trade and agriculture drive a lot of business in the North West, and a good number of those businesses deal with buyers and partners well outside the region. A website is often the first thing someone checks before making contact, which makes it worth more than its cost long before anyone buys anything through it.",
      "Because the market here is Anglophone, English pages are the ones that will do the work. That is an advantage worth pressing: most of the agencies competing for Cameroonian search traffic publish primarily in French, which leaves English searches less contested than they should be.",
      "Connectivity in the region has not always been dependable. That informs how I build: pages kept light so they load on a weak connection, hosting and email on services that stay reachable, and a site you can update yourself rather than one that stalls whenever you cannot reach your developer.",
    ],
    highlights: [
      {
        title: "Light pages by default",
        text: "Built to load on a slow or unstable connection, because a site that only works on good signal is not much use here.",
      },
      {
        title: "English-first, and that pays",
        text: "Most competing agencies publish mainly in French, so well-written English pages have a clearer run at the searches your customers actually make.",
      },
      {
        title: "Yours to run",
        text: "Full handover of domain, files and accounts, with an admin area so updates never depend on reaching me first.",
      },
    ],
    faqs: [
      {
        q: "Are you based in Bamenda?",
        a: "No. I am based in Buea and work with Bamenda clients remotely, over WhatsApp, email and calls. The scope, timeline and written quote are the same as for any other project.",
      },
      {
        q: "What happens if the internet goes down during the project?",
        a: "It is worth planning for rather than hoping about. Work continues offline on my side, and we agree at the start how we will stay in contact and what the timeline does if there is a long interruption. Your site itself is hosted outside the region, so it stays online for your customers regardless of local connectivity.",
      },
      {
        q: "How much does a website cost in Bamenda?",
        a: "The same as anywhere else: from around 150,000 FCFA for a simple business site, from around 400,000 FCFA for a fuller professional site with SEO. Price follows scope, not location, and you get an itemised quote before work starts.",
      },
      {
        q: "Can I update the website myself?",
        a: "Yes, and here in particular I would push for it. Every build comes with an admin area and a handover so you can change prices, publish news and update contact details without waiting on me.",
      },
    ],
  },
];

/** Look one up by slug. */
export const cityBySlug = (slug) => cities.find((c) => c.slug === slug);

/** The public URL path for a city page. */
export const cityPath = (slug) => `/web-designer-in-${slug}/`;
