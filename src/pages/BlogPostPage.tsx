import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { Calendar, ChevronRight, Clock, Home, Share2, ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";
import BlogSidebar from "@/components/BlogSidebar";
import BlogImageCarousel from "@/components/BlogImageCarousel";
import { getPostBySlug, BlogPost } from "@/lib/blog";

const BASE = "https://everythx.com";

/* FAQ Accordion ------------------------------------------------------------- */
interface FaqItem { q: string; a: string; }

const FaqAccordion = ({ faqs }: { faqs: FaqItem[] }) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="mt-10 md:mt-14">
      <h2 className="font-display font-bold text-xl md:text-2xl text-white mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-white font-semibold text-sm md:text-base hover:bg-white/5 transition-colors"
              aria-expanded={open === i}
            >
              <span>{faq.q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-primary transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-5 text-gray-300 text-sm md:text-base leading-relaxed border-t border-white/8 pt-4">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

/* Custom markdown components ------------------------------------------------ */
const mdComponents = {
  // Demote markdown # headings to h2 — the page title is already the only h1
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-white mt-8 mb-4 border-b border-white/10 pb-2">
      {children}
    </h2>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto my-4 md:my-6">
      <table className="w-full text-sm border-collapse border border-white/10 rounded-xl overflow-hidden">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-white/5">{children}</thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-2 md:px-4 py-2 md:py-3 text-left text-white font-semibold border-b border-white/10">
      {children}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-2 md:px-4 py-2 md:py-3 text-gray-200 whitespace-nowrap">{children}</td>
  ),
  /* Image carousel for image-only paragraphs, plain img elsewhere */
  p: ({ children }: { children?: React.ReactNode }) => {
    const arr = React.Children.toArray(children);
    const imgElements = arr.filter(
      (c): c is React.ReactElement =>
        React.isValidElement(c) && (c as React.ReactElement).type === "img"
    );
    const nonImg = arr.filter(
      (c) =>
        !(React.isValidElement(c) && (c as React.ReactElement).type === "img") &&
        !(typeof c === "string" && c.trim() === "")
    );
    if (imgElements.length > 0 && nonImg.length === 0) {
      const images = imgElements.map((img) => ({
        src: (img.props as { src: string }).src,
        alt: (img.props as { alt?: string }).alt || "",
      }));
      return <BlogImageCarousel images={images} />;
    }
    return <p>{children}</p>;
  },
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
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Helmet>
          <title>Post Not Found | Bless Kimbi</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-white mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const canonical = `${BASE}/blog/${post.slug}`;
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

  // BlogPosting JSON-LD schema (replaces generic Article)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: ogImage.startsWith("http") ? ogImage : `${BASE}${ogImage}`,
    url: canonical,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: {
      "@type": "Person",
      name: "Bless Kimbi",
      url: BASE,
      sameAs: [
        "https://instagram.com/blesskimbi",
        "https://www.linkedin.com/in/bless-kimbi-09413936a/",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Bless Kimbi",
      url: BASE,
      logo: { "@type": "ImageObject", url: `${BASE}/blesskimbi.png` },
    },
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en",
    keywords: (post.tags ?? []).join(", "),
    wordCount: post.content.trim().split(/\s+/).length,
    timeRequired: `PT${readingTime}M`,
  };

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
        <meta property="og:image" content={ogImage} />
        <meta property="article:published_time" content={post.date} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | Bless Kimbi`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {post.faqs && post.faqs.length > 0 && (
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": post.faqs.map((f: FaqItem) => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": { "@type": "Answer", "text": f.a },
            })),
          })}</script>
        )}
      </Helmet>

      <div className="relative min-h-screen bg-background">
        <ParticleBackground />
        <Navbar />

        <main className="pt-20 md:pt-32 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-[1400px] mx-auto">
            {/* Breadcrumbs */}
            <nav
              className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-6 md:mb-8 overflow-x-auto whitespace-nowrap pb-2"
              aria-label="Breadcrumb"
            >
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Home size={14} />
                <span>Home</span>
              </Link>
              <ChevronRight size={14} className="opacity-40" />
              <Link to="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <ChevronRight size={14} className="opacity-40" />
              <span className="text-white/80 truncate max-w-[240px] md:max-w-none">
                {post.title}
              </span>
            </nav>

            <div className="grid xl:grid-cols-[1fr_320px] gap-8 lg:gap-12">
              {/* Article */}
              <article className="min-w-0">
                <header className="mb-6 md:mb-10">
                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-gray-400 mb-4 md:mb-6 font-medium uppercase tracking-widest">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                  </div>

                  <h1 className="font-display font-bold text-2xl md:text-4xl lg:text-5xl text-white mb-6 md:mb-8 leading-tight">
                    {post.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 md:gap-8 py-4 md:py-5 border-y border-white/8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                        BK
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{post.author}</div>
                        <div className="text-xs text-gray-400">Author</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300">
                        <Clock size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">
                          {readingTime} min read
                        </div>
                        <div className="text-xs text-gray-400">Reading Time</div>
                      </div>
                    </div>
                  </div>
                </header>

                {/* Featured Image */}
                <div className="relative aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-10 shadow-2xl border border-white/8">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="bg-[#0A0C10]/60 backdrop-blur-xl border border-white/8 rounded-2xl md:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl">
                  <div
                    className="prose prose-invert max-w-none prose-sm md:prose-base
                      prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-headings:mb-3 md:prose-headings:mb-4 prose-headings:mt-6 md:prose-headings:mt-8
                      prose-h2:text-xl md:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2 md:prose-h2:pb-3
                      prose-h3:text-lg md:prose-h3:text-xl lg:prose-h3:text-2xl
                      prose-p:text-gray-200 prose-p:leading-[1.75] md:prose-p:leading-[1.85] prose-p:text-[0.95rem] md:prose-p:text-[1.05rem] prose-p:text-justify
                      prose-li:text-gray-200 prose-li:text-[0.95rem] md:prose-li:text-[1.05rem] prose-li:leading-[1.75] md:prose-li:leading-[1.85] prose-li:my-1
                      prose-ul:my-4 md:prose-ul:my-5 prose-ol:my-4 md:prose-ol:my-5
                      prose-strong:text-white prose-strong:font-semibold
                      prose-em:text-gray-100
                      prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:break-words
                      prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-2 md:prose-blockquote:py-3 prose-blockquote:px-4 md:prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:text-gray-200 prose-blockquote:text-sm md:prose-blockquote:text-base prose-blockquote:text-justify
                      prose-code:text-primary prose-code:bg-white/8 prose-code:rounded prose-code:px-1 md:prose-code:px-1.5 prose-code:py-0.5 prose-code:text-xs md:prose-code:text-sm prose-code:break-words
                      prose-img:rounded-xl md:prose-img:rounded-2xl prose-img:border prose-img:border-white/10
                    "
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={mdComponents as object}
                    >
                      {post.content}
                    </ReactMarkdown>
                  </div>

                  {/* FAQ Section */}
                  {post.faqs && post.faqs.length > 0 && (
                    <FaqAccordion faqs={post.faqs} />
                  )}

                  <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                    >
                      <Share2 size={18} />
                      {shared ? "Link Copied!" : "Share Article"}
                    </button>
                    <Link
                      to="/blog"
                      className="text-sm font-bold text-primary hover:underline underline-offset-4"
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

        <Footer />
        <FloatingChat />
        <ScrollToTop />
      </div>
    </LenisSmoothScroll>
  );
};

export default BlogPostPage;
