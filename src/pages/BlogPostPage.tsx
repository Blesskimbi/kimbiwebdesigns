import React from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";
import BlogSidebar from "@/components/BlogSidebar";
import BlogImageCarousel from "@/components/BlogImageCarousel";
import { ArrowLeft, Calendar, Clock, Share2, ChevronRight, Home } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, BlogPost } from "@/lib/blog";

const markdownComponents = {
    p: ({ children }: { children?: React.ReactNode }) => {
        const childArray = React.Children.toArray(children);
        const imageKids = childArray.filter(
            (c): c is React.ReactElement =>
                React.isValidElement(c) && (c as React.ReactElement).type === 'img'
        );
        const nonImageNonWS = childArray.filter(c => {
            if (typeof c === 'string') return c.trim() !== '';
            return !(React.isValidElement(c) && (c as React.ReactElement).type === 'img');
        });

        if (imageKids.length > 0 && nonImageNonWS.length === 0) {
            const images = imageKids.map(img => ({
                src: (img.props as { src?: string; alt?: string }).src || '',
                alt: (img.props as { src?: string; alt?: string }).alt || '',
            }));
            return <BlogImageCarousel images={images} />;
        }
        return <p>{children}</p>;
    },
    table: ({ children }: { children?: React.ReactNode }) => (
        <div className="overflow-x-auto my-8 rounded-xl border border-white/10 shadow-lg">
            <table className="min-w-full border-collapse">{children}</table>
        </div>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
        <th className="px-5 py-3 text-left text-sm font-bold text-white bg-white/8 border-b border-white/15 whitespace-nowrap">
            {children}
        </th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
        <td className="px-5 py-3 text-sm text-gray-100 border-b border-white/8 whitespace-nowrap">
            {children}
        </td>
    ),
    tr: ({ children }: { children?: React.ReactNode }) => (
        <tr className="even:bg-white/3 hover:bg-white/5 transition-colors">{children}</tr>
    ),
};

const BlogPostPage = () => {
    const { slug } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [shared, setShared] = useState(false);

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

    useEffect(() => {
        const fetchPost = async () => {
            if (slug) {
                const fetchedPost = await getPostBySlug(slug);
                setPost(fetchedPost || null);
                if (fetchedPost) {
                    document.title = fetchedPost.seoTitle || fetchedPost.title + " | Bless Kimbi";
                    const metaDesc = document.querySelector('meta[name="description"]');
                    if (metaDesc) metaDesc.setAttribute("content", fetchedPost.metaDescription || fetchedPost.excerpt || "");
                }
            }
            setLoading(false);
        };
        fetchPost();
        window.scrollTo(0, 0);
        return () => { document.title = "Bless Kimbi | Web Developer & Designer"; };
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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

    return (
        <LenisSmoothScroll>
            <div className="relative min-h-screen bg-background">
                <ParticleBackground />

                <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-background/80 backdrop-blur-md border-b border-white/5">
                    <div className="max-w-[1500px] mx-auto px-6 flex items-center justify-between">
                        <Link to="/blog" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                            <ArrowLeft size={20} />
                            <span className="font-display font-medium">Back to Blog</span>
                        </Link>
                        <div className="font-display font-bold text-lg tracking-wider text-foreground">
                            BlessKimbi<span className="text-primary">.</span>
                        </div>
                    </div>
                </nav>

                <main className="pt-32 pb-20 px-4 md:px-6 relative z-10 max-w-[1500px] mx-auto">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
                        <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
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

                    <div className="grid xl:grid-cols-[1fr_300px] gap-10 xl:gap-14">
                        {/* Article Content */}
                        <article>
                            {/* Header */}
                            <header className="mb-10">
                                <div className="flex items-center gap-4 text-xs text-gray-400 mb-6 font-medium uppercase tracking-widest">
                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={14} />
                                        {post.date}
                                    </span>
                                </div>

                                <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-8 leading-tight">
                                    {post.title}
                                </h1>

                                <div className="flex items-center gap-8 py-5 border-y border-white/8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                                            BK
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm font-bold text-white">{post.author}</div>
                                            <div className="text-xs text-gray-400">Author</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300">
                                            <Clock size={18} />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-sm font-bold text-white">{post.readingTime} min read</div>
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
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                            </div>

                            {/* Content Card */}
                            <div className="bg-[#0A0C10]/60 backdrop-blur-xl border border-white/8 rounded-3xl p-6 md:p-10 shadow-xl">
                                <div className="prose prose-invert max-w-none
                                    prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-headings:mb-4 prose-headings:mt-8
                                    prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
                                    prose-h3:text-xl prose-h3:md:text-2xl prose-h3:text-white/95
                                    prose-p:text-gray-200 prose-p:leading-[1.85] prose-p:text-[1.05rem]
                                    prose-li:text-gray-200 prose-li:text-[1.05rem] prose-li:leading-[1.85] prose-li:my-1
                                    prose-ul:my-5 prose-ol:my-5
                                    prose-strong:text-white prose-strong:font-semibold
                                    prose-em:text-gray-100 prose-em:italic
                                    prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-2
                                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:text-gray-200 prose-blockquote:not-italic
                                    prose-code:text-primary prose-code:bg-white/8 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono
                                    prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                                ">
                                    <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
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
