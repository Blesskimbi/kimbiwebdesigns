import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";

/**
 * A call to action placed inside the article body.
 *
 * Neil Patel keeps every CTA in the sidebar and none in the prose. That works
 * when the sidebar is always visible; on a phone it never is, and phones are
 * most of this audience. So one CTA goes in the flow of the article where a
 * reader on a small screen will actually meet it.
 *
 * One, not several. A post interrupted three times reads like an advert, and
 * the whole argument of this blog is that it is not one.
 */

const WHATSAPP =
  "https://wa.me/237675126845?text=" +
  encodeURIComponent("Hi Bless, I read one of your posts and would like to talk about a website.");

interface Props {
  /** Ties the pitch to the subject of the post it sits in. */
  variant?: "work" | "quote";
}

const InlineCta = ({ variant = "work" }: Props) => {
  const copy =
    variant === "work"
      ? {
          title: "See what this looks like when it is built properly",
          body: "Every site in my portfolio is a real project for a real client, live and loading fast on a phone. Have a look at the work before you decide whether to talk to me.",
          primary: { label: "View recent work", to: "/projects/" },
        }
      : {
          title: "Want this done for you?",
          body: "I build fast, mobile-first websites for businesses across Cameroon, with the SEO groundwork done during the build rather than sold back to you later.",
          primary: { label: "Get a free quote", to: "/contact/" },
        };

  return (
    <aside className="my-10 md:my-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 not-prose">
      <h3 className="font-display font-bold text-lg md:text-xl text-navy mb-3">{copy.title}</h3>
      <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed mb-6">
        {copy.body}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to={copy.primary.to}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-display font-bold text-sm hover:bg-primary/90 transition-colors"
        >
          {copy.primary.label}
          <ArrowRight size={16} />
        </Link>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border text-navy font-display font-bold text-sm hover:border-primary hover:text-primary transition-colors"
        >
          <MessageCircle size={16} />
          Message on WhatsApp
        </a>
      </div>
    </aside>
  );
};

export default InlineCta;
