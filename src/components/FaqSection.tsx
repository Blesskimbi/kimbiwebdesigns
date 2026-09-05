import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What services does Bless Kimbi offer?",
    a: "I offer a full range of digital services: web design & development, SEO optimization, social media management, mobile app development, UI/UX design, and e-commerce solutions. Everything a growing business needs to build a strong online presence.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Most landing pages are delivered in 5 to 7 days, while full multi-page websites typically take 2 to 3 weeks depending on scope, content readiness, and revisions. I'll give you a clear timeline before we start.",
  },
  {
    q: "How much does a website cost?",
    a: "Pricing depends on complexity. See the Pricing section above for starting rates on landing pages, full websites, and e-commerce stores. Every quote is tailored to your business goals and budget.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. Whether you need a full redesign or just a refresh of your visual identity and user experience, I can rebuild your site to be faster, more modern, and better optimised for conversions and search engines.",
  },
  {
    q: "Will my website rank on Google?",
    a: "Every website I build includes on-page SEO fundamentals: fast load times, mobile optimisation, proper metadata, and clean structure. For businesses that want to actively rank for competitive keywords, I also offer dedicated SEO packages.",
  },
  {
    q: "Do you offer support after the site is live?",
    a: "Yes. I offer ongoing maintenance and support packages so your site stays secure, updated, and running smoothly long after launch. I'm also always reachable on WhatsApp for quick questions.",
  },
];

const FaqSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-muted border-t border-border">
      <div className="max-w-3xl mx-auto">
        <div ref={headingRef} className="text-center mb-6">
          <span className="section-label">FAQ</span>
          <h2 className="heading-serif text-3xl md:text-5xl mb-4 heading-underline">
            Frequently Asked <span className="text-gold">Questions</span>
          </h2>
          <p className="text-muted-foreground text-base font-body max-w-xl mx-auto">
            I&apos;ve compiled this list based on the questions I&apos;m often asked by clients and the
            questions commonly asked online. If yours isn&apos;t here,{" "}
            <Link to="/contact" className="text-primary font-semibold hover:underline underline-offset-4">
              just ask
            </Link>.
          </p>
        </div>

        <div className="space-y-3 mt-10">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group marsha-card !p-0 overflow-hidden">
              <summary className="flex items-center gap-3 px-6 py-5 cursor-pointer list-none hover:text-primary transition-colors">
                <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center group-open:rotate-90 transition-transform duration-200">
                  <ChevronRight size={13} />
                </span>
                <span className="text-navy font-semibold font-body">{q}</span>
              </summary>
              <p className="pl-[60px] pr-6 pb-5 text-muted-foreground font-body leading-relaxed text-sm border-t border-border pt-4 ml-0">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
