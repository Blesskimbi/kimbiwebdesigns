import { Helmet } from "react-helmet-async";
import { MessageCircle, CheckCircle, Users, BookOpen, Code2, Lightbulb, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";

const WHATSAPP_LINK = "https://chat.whatsapp.com/KelcJYaEABL4HAwlo6VP1a";

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
    desc: "Ask questions and get real answers — no gatekeeping, no judgment.",
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

const faqs = [
  {
    q: "Is this completely free?",
    a: "Yes — 100% free, no hidden fees, no paid tiers. The WhatsApp group is open to anyone who wants to learn or collaborate on software development.",
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
    a: "Click the 'Join the WhatsApp Community' button on this page. It links directly to the WhatsApp group — no sign-up form, no waiting list.",
  },
];

const CommunityPage = () => (
  <LenisSmoothScroll>
    <Helmet>
      <title>Free Software Development Mentorship Community | Bless Kimbi</title>
      <meta
        name="description"
        content="Join Bless Kimbi's free software development community on WhatsApp. Code reviews, weekly tips, Q&A, and peer support for web and mobile developers worldwide."
      />
      <link rel="canonical" href="https://everythx.com/community" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="Free Software Development Mentorship Community | Bless Kimbi" />
      <meta
        property="og:description"
        content="Join Bless Kimbi's free software development community on WhatsApp. Code reviews, weekly tips, Q&A, and peer support for web and mobile developers worldwide."
      />
      <meta property="og:url" content="https://everythx.com/community" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://everythx.com/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Free Software Development Mentorship Community | Bless Kimbi" />
      <meta
        name="twitter:description"
        content="Join Bless Kimbi's free software development community on WhatsApp. Code reviews, weekly tips, Q&A, and peer support for web and mobile developers worldwide."
      />
      <meta name="twitter:image" content="https://everythx.com/og-image.png" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(({ q, a }) => ({
          "@type": "Question",
          "name": q,
          "acceptedAnswer": { "@type": "Answer", "text": a },
        })),
      })}</script>
    </Helmet>

    <div className="relative min-h-screen bg-background overflow-x-hidden">
      <ParticleBackground />
      <Navbar />

      <main className="pt-32 pb-20 relative z-10">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-xs font-semibold uppercase tracking-widest mb-6">
            Free Community
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl text-white leading-[1.1] tracking-tight mb-5">
            Free Software Development{" "}
            <span className="text-gradient-primary">Mentorship</span>{" "}
            Community
          </h1>
          <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            A free WhatsApp community for beginners, aspiring developers, and
            professionals who want to learn web and mobile development,
            collaborate on projects, and grow together — no matter where you
            are in the world.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-[#25D366] hover:bg-[#1fba58] text-white font-display font-bold text-sm sm:text-base tracking-wide transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(37,211,102,0.35)] hover:shadow-[0_0_40px_rgba(37,211,102,0.5)]"
          >
            <MessageCircle size={18} className="sm:hidden" />
            <MessageCircle size={22} className="hidden sm:block" />
            Join the WhatsApp Community
          </a>
          <p className="text-gray-500 text-sm mt-4">Free to join · No sign-up form · Open now</p>
        </section>

        {/* ── Who it's for ─────────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <div className="bg-white/3 border border-white/8 rounded-2xl p-5 sm:p-8 md:p-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
              Who is this community for?
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              This community is for anyone who wants to get into software
              development — web, mobile, or both — but doesn't know where to
              start, or has started but feels stuck. It's also for experienced
              developers who want to collaborate, share knowledge, and connect
              with like-minded builders. If you want a space to actually build
              things with others, this is the right place.
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
                <li key={item} className="flex items-start gap-3 text-gray-300">
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
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
              What you get as a member
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              {/* TODO: confirm with Bless whether any of these are aspirational vs. already running */}
              Everything below is free, ongoing, and available from the moment
              you join.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-primary/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── About the mentor ─────────────────────────────────────────────── */}
        <section className="max-w-4xl mx-auto px-6 mb-20">
          <div className="bg-gradient-to-br from-primary/10 to-blue-900/10 border border-primary/15 rounded-2xl p-5 sm:p-8 md:p-10">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-6">
              Your mentor — Bless Kimbi
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src="/blesskimbi.png"
                alt="Bless Kimbi — web designer, developer, and mentor based in Yaoundé, Cameroon"
                className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-white/10"
              />
              <div>
                <p className="text-gray-300 leading-relaxed mb-4">
                  I'm <strong className="text-white">Bless Kimbi</strong>, a
                  professional software developer based in{" "}
                  <strong className="text-white">Yaoundé, Cameroon</strong>. I've
                  delivered 50+ projects — websites, web apps, and mobile apps —
                  for businesses across Cameroon, South Africa, and internationally.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  I started this community because I know how hard it is to learn
                  to code without guidance.                   I want to create a space where anyone, regardless of background
                  or location, can get real support, honest feedback, and the
                  motivation to keep building.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">React &amp; TypeScript</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">Mobile App Development</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">SEO &amp; Web Performance</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">Freelancing</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">50+ Projects Delivered</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Main CTA ─────────────────────────────────────────────────────── */}
        <section className="max-w-2xl mx-auto px-6 text-center mb-24">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
            Ready to start learning?
          </h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Join a growing community of developers and builders. It's free,
            it's on WhatsApp, and it takes 10 seconds to join.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 sm:px-10 sm:py-4 rounded-full bg-[#25D366] hover:bg-[#1fba58] text-white font-display font-bold text-sm sm:text-base tracking-wide transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(37,211,102,0.35)] hover:shadow-[0_0_40px_rgba(37,211,102,0.5)]"
          >
            <MessageCircle size={18} className="sm:hidden" />
            <MessageCircle size={22} className="hidden sm:block" />
            Join the WhatsApp Community
          </a>
          <p className="text-gray-500 text-sm mt-4">Free to join · No sign-up form · Open now</p>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-6 mb-20">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-white text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-white/3 border border-white/8 rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none text-white font-semibold hover:text-primary transition-colors">
                  {q}
                  <span className="shrink-0 text-gray-400 group-open:rotate-45 transition-transform duration-200 text-xl leading-none">+</span>
                </summary>
                <p className="px-6 pb-5 text-gray-400 leading-relaxed text-sm border-t border-white/5 pt-4">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>

      </main>

      <Footer />
      <FloatingChat />
      <ScrollToTop />
    </div>
  </LenisSmoothScroll>
);

export default CommunityPage;
