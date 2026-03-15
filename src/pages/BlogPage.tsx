import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";
import { ArrowLeft, Calendar, User, ArrowRight } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardContext";

const BlogPage = () => {
    const { blogPosts } = useDashboard();
    const publishedPosts = blogPosts.filter(p => p.status === "Published");
    return (
        <LenisSmoothScroll>
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
                            Thoughts, insights, and tutorials about software development, design, and technology.
                        </p>
                    </div>

                    {/* Blog Grid */}
                    <div className="grid md:grid-cols-2 gap-10">
                        {publishedPosts.map((post, i) => (
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

                                    <h3 className="font-display font-bold text-2xl mb-4 text-white group-hover:text-primary transition-colors leading-tight">
                                        <Link to={`/blog/${post.id}`} className="hover:underline decoration-primary/30 underline-offset-4">
                                            {post.title}
                                        </Link>
                                    </h3>

                                    <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                                        {post.excerpt}
                                    </p>

                                    <Link
                                        to={`/blog/${post.id}`}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white transition-colors group/link mt-auto"
                                    >
                                        Read Article
                                        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                </main>

                <Footer />
                <FloatingChat />
                <ScrollToTop />
            </div>
        </LenisSmoothScroll>
    );
};

export default BlogPage;
