import { Helmet } from "react-helmet-async";
import { MessageCircle, CheckCircle, Users, BookOpen, Code2, Lightbulb, Star, Download, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import { communityFaqs as faqs } from "@/data/seo-faqs.mjs";

const WHATSAPP_LINK = "https://chat.whatsapp.com/KelcJYaEABL4HAwlo6VP1a";

// The free PDF lives in public/, so it is served straight off the domain and the
// `download` attribute can name the saved file. Anyone who messages me asking
// where to start gets this page's link, and the first thing on it is the guide.
const GUIDE_FILE = "/beginners-guide-to-web-development-bless-kimbi.pdf";
const GUIDE_TITLE = "The Beginner's Guide to Web Development";

// The twelve chapters, in the order they appear in the PDF. Listed here so a
// visitor can see what they are getting before they spend data on the download.
const guideChapters = [
  { n: "01", title: "Start here", desc: "Welcome, future developer, and how to actually use this guide." },
  { n: "02", title: "The basics", desc: "Frontend, backend, full stack and web design, explained plainly." },
  { n: "03", title: "Choose your route", desc: "The no-code path, the code path, and my honest advice on both." },
  { n: "04", title: "Step by step", desc: "A six-stage roadmap from HTML to your first framework, with timelines." },
  { n: "05", title: "Your toolkit", desc: "What to install, where to learn free, and the laptop you really need." },
  { n: "06", title: "Learn by doing", desc: "Six beginner projects worth more than any certificate." },
  { n: "07", title: "The new reality", desc: "Is AI going to replace developers? My rules for learning alongside it." },
  { n: "08", title: "Your mindset", desc: "Imposter syndrome is normal, and five ways to handle it." },
  { n: "09", title: "Turn skills into income", desc: "How to land your first paying client before you feel ready." },
  { n: "10", title: "Save yourself time", desc: "The six mistakes that cost beginners the most months." },
  { n: "11", title: "Who is Bless Kimbi", desc: "My story, from stuck on broken code to clients across three continents." },
  { n: "12", title: "Learn with me", desc: "How one-on-one mentorship works, if you want a guide for the road." },
];

const benefits = [
  {
    icon: Code2,
    title: "Code Reviews",
    desc: "Share your projects and get honest, constructive feedback to level up faster.",
  },
  {
    icon: BookOpen,
    title: "Weekly Tips & Resources",
    desc: "Curated learning resources, tutorials, and industry insights dropped every week.",
  },
  {
    icon: MessageCircle,
    title: "Direct Q&A",
    desc: "Ask questions and get real answers. No gatekeeping, no judgment.",
  },
  {
    icon: Lightbulb,
    title: "Project Ideas & Challenges",
    desc: "Never run out of things to build. Regular challenges to sharpen your skills.",
  },
  {
    icon: Users,
    title: "Peer Community",
    desc: "Connect with learners and professionals from around the world on the same journey.",
  },
  {
    icon: Star,
    title: "Career Guidance",
    desc: "Advice on freelancing, getting clients, building a portfolio, and breaking into tech.",
  },
];



const CommunityPage = () => (
  <LenisSmoothScroll>
    <Helmet>
      <title>Free Beginner's Guide to Web Development (PDF) | Bless Kimbi</title>
      <meta
        name="description"
        content="Download The Beginner's Guide to Web Development free, a 10-page PDF by Bless Kimbi covering the learning roadmap, free tools, AI, and how to get your first client. Plus a free WhatsApp community for developers."
      />
      <link rel="canonical" href="https://blesskimbi.com/community/" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Free Beginner's Guide to Web Development (PDF) | Bless Kimbi" />
      <meta
        property="og:description"
        content="Download The Beginner's Guide to Web Development free, a 10-page PDF by Bless Kimbi covering the learning roadmap, free tools, AI, and how to get your first client. Plus a free WhatsApp community for developers."
      />
      <meta property="og:url" content="https://blesskimbi.com/community" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://blesskimbi.com/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Beginner's Guide to Web Development (PDF) | Bless Kimbi" />
      <meta
        name="twitter:description"
        content="Download The Beginner's Guide to Web Development free, a 10-page PDF by Bless Kimbi covering the learning roadmap, free tools, AI, and how to get your first client. Plus a free WhatsApp community for developers."
      />
      <meta name="twitter:image" content="https://blesskimbi.com/og-image.png" />
    </Helmet>

    <Navbar />
    <div className="relative min-h-screen bg-background overflow-x-clip">
      <main className="pt-32 pb-20 relative z-10">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-semibold uppercase tracking-widest mb-6">
            Free PDF Guide
          </span>
          <h1 className="heading-serif text-3xl sm:text-5xl md:text-6xl mb-5">
            The Beginner's Guide to{" "}
            <span className="text-gradient-primary">Web Development</span>
          </h1>
          <p className="text-muted-foreground font-body text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Everything I wish someone had told me when I was starting out, in
            one free 10-page PDF. How the web actually works, what to learn and
            in what order, the free tools to use, how to work with AI, and how
            to land your first paying client.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href={GUIDE_FILE}
              download
              className="btn-green w-full sm:w-auto px-8 py-4 text-base"
            >
              <Download size={20} aria-hidden="true" />
              Download the Free Guide
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-navy w-full sm:w-auto px-8 py-4 text-base"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Join the WhatsApp community
            </a>
          </div>
          <p className="text-muted-foreground font-body text-sm mt-4">
            10 pages · PDF · Completely free · No email, no sign-up form
          </p>
        </section>

        {/* ── What's inside the guide ───────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <div className="text-center mb-12">
            <h2 className="heading-serif text-3xl md:text-4xl mb-4">
              What's inside the guide
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Twelve short chapters, written to be read once from start to
              finish and then kept close for the days you feel lost.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {guideChapters.map(({ n, title, desc }) => (
              <div
                key={n}
                className="internal-card hover:border-primary/30 transition-colors duration-300"
              >
                <span className="block font-display font-bold text-sm text-gold mb-3">{n}</span>
                <h3 className="internal-card-title">{title}</h3>
                <p className="internal-card-text">{desc}</p>
              </div>
            ))}
          </div>
          <div className="marsha-card p-5 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
            <FileText size={40} strokeWidth={1.5} className="text-navy shrink-0" aria-hidden="true" />
            <div className="flex-1">
              <h3 className="font-display font-bold text-lg text-navy mb-1">{GUIDE_TITLE}</h3>
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
                By Bless Kimbi · 10 pages · A small PDF, so it downloads fine on
                mobile data. Yours to keep, and to share with anyone who needs it.
              </p>
            </div>
            <a
              href={GUIDE_FILE}
              download
              className="btn-green w-full sm:w-auto shrink-0"
            >
              <Download size={18} aria-hidden="true" />
              Download free
            </a>
          </div>
        </section>

        {/* ── Who it's for ─────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <div className="internal-card p-5 sm:p-8 md:p-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-navy mb-4">
              Who is this for?
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
              The guide and the community are both for anyone who wants to get
              into software development (web, mobile, or both) but doesn't know
              where to start, or has started but feels stuck. They are also for
              experienced developers who want to collaborate, share knowledge,
              and connect with like-minded builders. If you want a space to
              actually build things with others, this is the right place.
            </p>
            <ul className="space-y-3">
              {[
                "Complete beginners with no coding experience",
                "Self-taught developers looking for structure and feedback",
                "Students studying computer science or IT",
                "Professionals who want to collaborate and share knowledge",
                "Anyone who wants to build a website, web app, or mobile app",
                "TikTok followers who want to go beyond watching and start building",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground font-body">
                  <CheckCircle size={18} className="text-[#25D366] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── What members get ─────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <div className="text-center mb-12">
            <h2 className="heading-serif text-3xl md:text-4xl mb-4">
              What you get as a member
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              {/* TODO: confirm with Bless whether any of these are aspirational vs. already running */}
              Everything below is free, ongoing, and available from the moment
              you join.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="internal-card hover:border-primary/30 transition-colors duration-300"
              >
                <Icon size={24} strokeWidth={1.5} className="text-navy mb-4" aria-hidden="true" />
                <h3 className="internal-card-title">{title}</h3>
                <p className="internal-card-text">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── About the mentor ─────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <div className="marsha-card p-5 sm:p-8 md:p-10">
            <h2 className="font-display text-2xl md:text-3xl text-navy mb-6">
              Your mentor: Bless Kimbi
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src="/blesskimbi.png"
                alt="Bless Kimbi, web designer, developer, and mentor based in Buea, Cameroon"
                className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-border"
              />
              <div>
                <p className="text-muted-foreground font-body leading-relaxed mb-4">
                  I'm <strong className="text-navy">Bless Kimbi</strong>, a
                  professional software developer based in{" "}
                  <strong className="text-navy">Buea, Cameroon</strong>. I've
                  delivered 50+ projects, including websites, web apps, and mobile apps,
                  for businesses across Cameroon, South Africa, and internationally.
                </p>
                <p className="text-muted-foreground font-body leading-relaxed mb-4">
                  I started this community because I know how hard it is to learn
                  to code without guidance.                   I want to create a space where anyone, regardless of background
                  or location, can get real support, honest feedback, and the
                  motivation to keep building.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="px-3 py-1 rounded-full bg-muted border border-border text-sm text-navy font-body">React &amp; TypeScript</span>
                  <span className="px-3 py-1 rounded-full bg-muted border border-border text-sm text-navy font-body">Mobile App Development</span>
                  <span className="px-3 py-1 rounded-full bg-muted border border-border text-sm text-navy font-body">SEO &amp; Web Performance</span>
                  <span className="px-3 py-1 rounded-full bg-muted border border-border text-sm text-navy font-body">Freelancing</span>
                  <span className="px-3 py-1 rounded-full bg-muted border border-border text-sm text-navy font-body">50+ Projects Delivered</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Main CTA ─────────────────────────────────────────────────────── */}
        <section className="max-w-2xl mx-auto px-6 text-center mb-24">
          <h2 className="heading-serif text-3xl md:text-4xl mb-4">
            Ready to start learning?
          </h2>
          <p className="text-muted-foreground font-body mb-8 leading-relaxed">
            Take the guide, read it from start to finish, then come and build
            with us. Both are free, and both take about ten seconds to start.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href={GUIDE_FILE}
              download
              className="btn-green w-full sm:w-auto px-8 py-4 text-base"
            >
              <Download size={20} aria-hidden="true" />
              Download the Free Guide
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-navy w-full sm:w-auto px-8 py-4 text-base"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Join the WhatsApp community
            </a>
          </div>
          <p className="text-muted-foreground font-body text-sm mt-4">
            Free · No sign-up form · Open now
          </p>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-6 mb-20">
          <h2 className="heading-serif text-2xl md:text-3xl text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group internal-card !p-0 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none text-navy font-semibold font-body hover:text-primary transition-colors">
                  {q}
                  <span className="shrink-0 text-muted-foreground group-open:rotate-45 transition-transform duration-200 text-xl leading-none">+</span>
                </summary>
                <p className="px-6 pb-5 text-muted-foreground font-body leading-relaxed text-sm border-t border-border pt-4">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>

      </main>
      <FloatingChat />
      <ScrollToTop />
    </div>
  </LenisSmoothScroll>
);

export default CommunityPage;
