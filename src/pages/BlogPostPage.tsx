import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { Calendar, ChevronRight, Clock, Home, Share2, ChevronDown } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import BlogSidebar from "@/components/BlogSidebar";
import MarkdownContent from "@/components/MarkdownContent";
import { getPostBySlug, BlogPost , formatPostDate} from "@/lib/blog";

const BASE = "https://blesskimbi.com";

/* FAQ Accordion ------------------------------------------------------------- */
interface FaqItem { q: string; a: string; }

const FaqAccordion = ({ faqs }: { faqs: FaqItem[] }) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="mt-10 md:mt-14">
      <h2 className="font-display font-bold text-xl md:text-2xl text-navy mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="internal-card !p-0 overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-navy font-semibold text-sm md:text-base hover:bg-muted/50 transition-colors font-body"
              aria-expanded={open === i}
            >
              <span>{faq.q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-primary transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-muted-foreground text-sm md:text-base leading-relaxed border-t border-border pt-4 font-body">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

/* Component ----------------------------------------------------------------- */
const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        const fetched = await getPostBySlug(slug);
        setPost(fetched || null);
      }
      setLoading(false);
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post?.title, text: post?.excerpt, url });
      } catch {
        // The user dismissed the share sheet — nothing to recover from.
      }
    } else {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <Helmet>
          <title>Post Not Found | Bless Kimbi</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="text-center pt-24 px-6">
          <h1 className="text-2xl font-display font-bold text-navy mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary font-semibold hover:text-gold transition-colors font-body">
            Back to Blog
          </Link>
        </div>
        </div>
      </>
    );
  }

  const canonical = `${BASE}/blog/${post.slug}/`;
  const ogImage = post.imageUrl || `${BASE}/og-image.png`;
  const cleanContent = post.content
    .replace(/[#*_`[\]()>!]/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const rawDesc = post.excerpt && post.excerpt.length >= 120
    ? post.excerpt
    : post.excerpt
      ? `${post.excerpt} ${cleanContent}`.replace(/\s+/g, " ").trim()
      : cleanContent;
  // trim to last full word at ≤155 chars
  const description = rawDesc.length <= 155
    ? rawDesc
    : rawDesc.slice(0, 155).replace(/\s\S*$/, "");
  const readingTime = Math.max(
    1,
    Math.round(post.content.trim().split(/\s+/).length / 200)
  );

  const absoluteOgImage = ogImage.startsWith("http") ? ogImage : `${BASE}${ogImage}`;
  const suffix = " | Bless Kimbi";
  const maxTitleRaw = 58 - suffix.length - 1; // -1 for ellipsis if needed
  const titleTag = post.title.length <= 58 - suffix.length
    ? `${post.title}${suffix}`
    : `${post.title.slice(0, maxTitleRaw).replace(/\s\S*$/, "")}…${suffix}`;

  return (
    <LenisSmoothScroll>
      <Helmet>
        <title>{titleTag}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${post.title} | Bless Kimbi`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={absoluteOgImage} />
        {/* Machine-readable ISO 8601, not the formatted display date. */}
        <meta property="article:published_time" content={post.date} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | Bless Kimbi`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

        <Navbar />
        <div className="relative min-h-screen bg-background overflow-x-clip">

        <main className="pt-28 md:pt-32 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-[1400px] mx-auto">
            <nav
              className="flex items-center gap-2 text-xs font-medium mb-6 md:mb-8 overflow-x-auto whitespace-nowrap pb-2 font-body"
              aria-label="Breadcrumb"
            >
              <Link to="/" className="breadcrumb-link flex items-center gap-1">
                <Home size={14} />
                <span>Home</span>
              </Link>
              <ChevronRight size={14} className="text-muted-foreground/50" />
              <Link to="/blog" className="breadcrumb-link">Blog</Link>
              <ChevronRight size={14} className="text-muted-foreground/50" />
              <span className="breadcrumb-current max-w-[240px] md:max-w-none">
                {post.title}
              </span>
            </nav>

            <div className="grid xl:grid-cols-[1fr_320px] gap-8 lg:gap-12">
              <article className="min-w-0">
                <header className="mb-6 md:mb-10">
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-muted-foreground mb-4 md:mb-6 font-medium uppercase tracking-widest font-body">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {formatPostDate(post.date)}
                    </span>
                  </div>

                  <h1 className="heading-serif text-2xl md:text-4xl lg:text-5xl mb-6 md:mb-8 leading-tight">
                    {post.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 md:gap-8 py-4 md:py-5 border-y border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm font-body">
                        BK
                      </div>
                      <div>
                        <div className="text-sm font-bold text-navy font-body">{post.author}</div>
                        <div className="text-xs text-muted-foreground font-body">Author</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        <Clock size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-navy font-body">
                          {readingTime} min read
                        </div>
                        <div className="text-xs text-muted-foreground font-body">Reading Time</div>
                      </div>
                    </div>
                  </div>
                </header>

                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 md:mb-10 shadow-pro border border-border">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>

                <div className="internal-card !p-5 sm:!p-8 lg:!p-10">
                  <MarkdownContent>{post.content}</MarkdownContent>

                  {/* FAQ Section */}
                  {post.faqs && post.faqs.length > 0 && (
                    <FaqAccordion faqs={post.faqs} />
                  )}

                  <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-navy transition-colors font-body"
                    >
                      <Share2 size={18} />
                      {shared ? "Link Copied!" : "Share Article"}
                    </button>
                    <Link
                      to="/blog"
                      className="text-sm font-bold text-primary hover:text-gold transition-colors font-body"
                    >
                      Read more articles →
                    </Link>
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="hidden xl:block">
                <BlogSidebar />
              </aside>
            </div>

            {/* Mobile Sidebar - Show below article */}
            <div className="xl:hidden mt-12 max-w-2xl mx-auto">
              <BlogSidebar />
            </div>
          </div>
        </main>
        <FloatingChat />
        <ScrollToTop />
      </div>
    </LenisSmoothScroll>
  );
};

export default BlogPostPage;
