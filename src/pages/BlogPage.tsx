import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";
import { ArrowLeft, Calendar, User, ArrowRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllPosts, BlogPost } from "@/lib/blog";

const BlogPage = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get("category");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await getAllPosts();
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        if (categoryFilter) {
            setFilteredPosts(posts.filter(p => p.category === categoryFilter));
        } else {
            setFilteredPosts(posts);
        }
    }, [categoryFilter, posts]);

    const clearFilter = () => {
        setSearchParams({});
    };

    return (
        <LenisSmoothScroll>
            <Helmet>
                <title>Web Design &amp; SEO Blog | Bless Kimbi — Cameroon</title>
                <meta name="description" content="Tips, guides and insights on web design, SEO, and digital marketing for businesses in Cameroon and Africa. By Bless Kimbi." />
                <link rel="canonical" href="https://everythx.com/blog" />
                {categoryFilter ? (
                    <meta name="robots" content="noindex, follow" />
                ) : (
                    <meta name="robots" content="index, follow" />
                )}
                <meta property="og:title" content="Web Design &amp; SEO Blog | Bless Kimbi" />
                <meta property="og:description" content="Tips, guides and insights on web design, SEO, and digital marketing for businesses in Cameroon and Africa." />
                <meta property="og:url" content="https://everythx.com/blog" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://everythx.com/og-image.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Web Design &amp; SEO Blog | Bless Kimbi" />
                <meta name="twitter:description" content="Tips, guides and insights on web design, SEO, and digital marketing for businesses in Cameroon and Africa." />
                <meta name="twitter:image" content="https://everythx.com/og-image.png" />
            </Helmet>
            <div className="relative min-h-screen bg-background">
                <ParticleBackground />

                {/* Simple Navbar for sub-pages */}
                <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-background/80 backdrop-blur-md border-b border-white/5">
                    <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                            <ArrowLeft size={20} />
                            <span className="font-display font-medium">Back to Home</span>
                        </Link>
                        <div className="font-display font-bold text-lg tracking-wider text-foreground">
                            BlessKimbi<span className="text-primary">.</span>
                        </div>
                    </div>
                </nav>

                <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen relative z-10">

                    <div className="mb-16 text-center">
                        <h1 className="font-display font-bold text-5xl md:text-6xl mb-6">
                            My <span className="text-gradient-primary">Blog</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            {categoryFilter ? (
                                <span className="flex items-center justify-center gap-2">
                                    Showing posts in <span className="text-primary font-bold">{categoryFilter}</span>
                                    <button 
                                        onClick={clearFilter}
                                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                                        title="Clear filter"
                                    >
                                        <X size={16} />
                                    </button>
                                </span>
                            ) : (
                                "Thoughts, insights, and tutorials about software development, design, and technology."
                            )}
                        </p>
                    </div>

                    {/* Blog Grid */}
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="text-5xl mb-6">📭</div>
                            <h2 className="font-display font-bold text-2xl text-white mb-3">No posts found</h2>
                            <p className="text-muted-foreground mb-8">
                                {categoryFilter
                                    ? `There are no posts in the "${categoryFilter}" category yet.`
                                    : "No blog posts have been published yet. Check back soon!"}
                            </p>
                            {categoryFilter && (
                                <button
                                    onClick={clearFilter}
                                    className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all"
                                >
                                    View all posts
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-10">
                            {filteredPosts.map((post, i) => (
                                <article
                                    key={post.id}
                                    className="group relative flex flex-col bg-[#0A0C10] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 animate-in fade-in zoom-in duration-500"
                                    style={{ animationFillMode: "both", animationDelay: `${i * 100}ms` }}
                                >
                                    {/* Image Area */}
                                    <div className="relative h-64 overflow-hidden">
                                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10" />
                                        <img
                                            src={post.imageUrl}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute top-4 left-4 z-20">
                                            <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider rounded-full border border-white/10">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex flex-col flex-1 p-8 relative z-20 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10] to-[#0A0C10]/90">
                                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 font-medium">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-primary/70" />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <User size={14} className="text-primary/70" />
                                                {post.author}
                                            </span>
                                        </div>

                                        <h2 className="font-display font-bold text-2xl mb-4 text-white group-hover:text-primary transition-colors leading-tight">
                                            <Link to={`/blog/${post.slug}`} className="hover:underline decoration-primary/30 underline-offset-4">
                                                {post.title}
                                            </Link>
                                        </h2>

                                        <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                                            {post.excerpt}
                                        </p>

                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white transition-colors group/link mt-auto"
                                        >
                                            Read Article
                                            <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                </main>

                <Footer />
                <FloatingChat />
                <ScrollToTop />
            </div>
        </LenisSmoothScroll>
    );
};

export default BlogPage;
