import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";
import BlogSidebar from "@/components/BlogSidebar";
import { Calendar, Clock, Share2, ChevronRight, Home } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { getPostBySlug, BlogPost } from "@/lib/blog";

/* Custom markdown components ------------------------------------------------ */
const mdComponents = {
    /* Responsive table wrapper */
    table: ({ children }: { children?: React.ReactNode }) => (
        <div className="overflow-x-auto my-8 rounded-xl border border-white/10 shadow-lg">
            <table className="min-w-full border-collapse text-sm">{children}</table>
        </div>
    ),
    thead: ({ children }: { children?: React.ReactNode }) => (
        <thead className="bg-white/5">{children}</thead>
    ),
    tbody: ({ children }: { children?: React.ReactNode }) => (
        <tbody className="divide-y divide-white/5">{children}</tbody>
    ),
    tr: ({ children }: { children?: React.ReactNode }) => (
        <tr className="even:bg-white/[0.02] hover:bg-white/5 transition-colors">{children}</tr>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
        <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider border-b border-white/10 whitespace-nowrap">
            {children}
        </th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
        <td className="px-4 py-3 text-gray-200 whitespace-nowrap">{children}</td>
    ),
    /* Image carousel for image-only paragraphs, plain img elsewhere */
    p: ({ children }: { children?: React.ReactNode }) => {
        const arr = React.Children.toArray(children);
        const imgs = arr.filter(
            (c): c is React.ReactElement =>
                React.isValidElement(c) && (c as React.ReactElement).type === "img"
        );
        const nonImg = arr.filter(
            (c) => !(React.isValidElement(c) && (c as React.ReactElement).type === "img") &&
                   !(typeof c === "string" && c.trim() === "")
        );
        if (imgs.length > 0 && nonImg.length === 0) {
            return (
                <div className="my-6 flex flex-col gap-4">
                    {imgs.map((img, i) => (
                        <img
                            key={i}
                            src={(img.props as { src: string }).src}
                            alt={(img.props as { alt?: string }).alt || ""}
                            className="w-full rounded-2xl border border-white/10"
                            loading="lazy"
                        />
                    ))}
                </div>
            );
        }
        return <p>{children}</p>;
    },
};

const BASE = "https://everythx.com";

const BlogPostPage = () => {
    const { slug } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [shared, setShared] = useState(false);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try { await navigator.share({ title: post?.title, text: post?.excerpt, url }); } catch {}
        } else {
            await navigator.clipboard.writeText(url);
            setShared(true);
            setTimeout(() => setShared(false), 2000);
        }
    };

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
                <div className="text-center">
                    <h1 className="text-2xl font-display font-bold text-white mb-4">Post Not Found</h1>
                    <Link to="/blog" className="text-primary hover:underline">Back to Blog</Link>
                </div>
            </div>
        );
    }

    const canonical = `${BASE}/blog/${post.slug}`;
    const ogImage = post.imageUrl || `${BASE}/og-image.png`;
    const description = (post.excerpt || post.content.replace(/[#*_`]/g, "").slice(0, 155)).slice(0, 155);
    const readingTime = Math.max(1, Math.round(post.content.trim().split(/\s+/).length / 200));

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": description,
        "image": ogImage,
        "author": { "@type": "Person", "name": post.author, "url": BASE },
        "publisher": { "@type": "Organization", "name": "Blesskimbi", "url": BASE },
        "datePublished": post.date,
        "mainEntityOfPage": canonical,
    };

    return (
        <LenisSmoothScroll>
            <Helmet>
                <title>{`${post.title} | Blesskimbi Blog`}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonical} />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`${post.title} | Blesskimbi Blog`} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonical} />
                <meta property="og:image" content={ogImage} />
                <meta property="article:published_time" content={post.date} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${post.title} | Blesskimbi Blog`} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={ogImage} />
                <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
            </Helmet>

            <div className="relative min-h-screen bg-background">
                <ParticleBackground />
                <Navbar />

                <main className="pt-32 pb-20 px-4 md:px-6 relative z-10 max-w-[1500px] mx-auto">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-2" aria-label="Breadcrumb">
                        <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                            <Home size={14} /><span>Home</span>
                        </Link>
                        <ChevronRight size={14} className="opacity-40" />
                        <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
                        <ChevronRight size={14} className="opacity-40" />
                        <span className="text-white/80 truncate max-w-[240px] md:max-w-none">{post.title}</span>
                    </nav>

                    <div className="grid xl:grid-cols-[1fr_300px] gap-10 xl:gap-14">
                        {/* Article */}
                        <article>
                            <header className="mb-10">
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-6 font-medium uppercase tracking-widest">
                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={14} />{post.date}
                                    </span>
                                </div>

                                <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-8 leading-tight">
                                    {post.title}
                                </h1>

                                <div className="flex items-center gap-8 py-5 border-y border-white/8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">BK</div>
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
                                            <div className="text-sm font-bold text-white">{readingTime} min read</div>
                                            <div className="text-xs text-gray-400">Reading Time</div>
                                        </div>
                                    </div>
                                </div>
                            </header>

                            {/* Featured Image */}
                            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-2xl border border-white/8">
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="bg-[#0A0C10]/60 backdrop-blur-xl border border-white/8 rounded-3xl p-6 md:p-10 shadow-xl">
                                <div className="prose prose-invert max-w-none
                                    prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-headings:mb-4 prose-headings:mt-8
                                    prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
                                    prose-h3:text-xl prose-h3:md:text-2xl
                                    prose-p:text-gray-200 prose-p:leading-[1.85] prose-p:text-[1.05rem]
                                    prose-li:text-gray-200 prose-li:text-[1.05rem] prose-li:leading-[1.85] prose-li:my-1
                                    prose-ul:my-5 prose-ol:my-5
                                    prose-strong:text-white prose-strong:font-semibold
                                    prose-em:text-gray-100
                                    prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:text-gray-200
                                    prose-code:text-primary prose-code:bg-white/8 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm
                                    prose-img:rounded-2xl prose-img:border prose-img:border-white/10
                                ">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={mdComponents as object}
                                    >
                                        {post.content}
                                    </ReactMarkdown>
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/8 flex items-center justify-between">
                                    <button
                                        onClick={handleShare}
                                        className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                    >
                                        <Share2 size={18} />
                                        {shared ? "Link Copied!" : "Share Article"}
                                    </button>
                                    <Link to="/blog" className="text-sm font-bold text-primary hover:underline underline-offset-4">
                                        Read more articles →
                                    </Link>
                                </div>
                            </div>
                        </article>

                        {/* Sidebar */}
                        <BlogSidebar />
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
