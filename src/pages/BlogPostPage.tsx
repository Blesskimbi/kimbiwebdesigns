import { useParams, Link } from "react-router-dom";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { useEffect } from "react";

const BlogPostPage = () => {
    const { id } = useParams();
    const { blogPosts, updateBlogPost } = useDashboard();

    const post = blogPosts.find(p => p.id === Number(id));

    useEffect(() => {
        if (post && post.status === "Published") {
            // Increment views (simulated)
            updateBlogPost(post.id, { views: (post.views || 0) + 1 });
        }
    }, [id]);

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

                {/* Simple Navbar */}
                <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-background/80 backdrop-blur-md border-b border-white/5">
                    <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                        <Link to="/blog" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                            <ArrowLeft size={20} />
                            <span className="font-display font-medium">Back to Blog</span>
                        </Link>
                        <div className="font-display font-bold text-lg tracking-wider text-foreground">
                            BlessKimbi<span className="text-primary">.</span>
                        </div>
                    </div>
                </nav>

                <main className="pt-32 pb-20 px-6 relative z-10">
                    <article className="max-w-4xl mx-auto">
                        {/* Header */}
                        <header className="mb-12 text-center">
                            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mb-6 font-medium uppercase tracking-widest">
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} />
                                    {post.date}
                                </span>
                            </div>

                            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex items-center justify-center gap-8 py-6 border-y border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        BK
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-white">{post.author}</div>
                                        <div className="text-xs text-muted-foreground">Author</div>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foregroundScale">
                                        <Clock size={18} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-white">5 min read</div>
                                        <div className="text-xs text-muted-foreground">Reading Time</div>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Featured Image */}
                        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-2xl border border-white/5">
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="bg-[#0A0C10]/50 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-xl">
                            <div className="prose prose-invert prose-primary max-w-none prose-headings:font-display prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 transition-colors">
                                {post.content ? (
                                    post.content.split('\n').map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))
                                ) : (
                                    <p>{post.excerpt}</p>
                                )}
                            </div>

                            <div className="mt-16 pt-8 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
                                        <Share2 size={18} />
                                        Share Article
                                    </button>
                                </div>
                                <Link to="/blog" className="text-sm font-bold text-primary hover:underline underline-offset-4">
                                    Read more articles
                                </Link>
                            </div>
                        </div>
                    </article>
                </main>

                <Footer />
                <FloatingChat />
                <ScrollToTop />
            </div>
        </LenisSmoothScroll>
    );
};

export default BlogPostPage;
