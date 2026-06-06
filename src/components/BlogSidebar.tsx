import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRecentPosts, getCategories, BlogPost } from "@/lib/blog";
import { ArrowRight, Tag, BookOpen } from "lucide-react";

const BlogSidebar = () => {
    const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const posts = await getRecentPosts(5);
            const cats = await getCategories();
            setRecentPosts(posts);
            setCategories(cats);
        };
        fetchData();
    }, []);

    return (
        <aside className="space-y-10">
            {/* Recent Posts */}
            <div className="bg-[#0A0C10]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl">
                <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2 text-white">
                    <BookOpen size={20} className="text-primary" />
                    Recent Posts
                </h3>
                <div className="space-y-6">
                    {recentPosts.map((post) => (
                        <div key={post.id} className="group">
                            <Link to={`/blog/${post.slug}`} className="block">
                                <h4 className="text-sm font-semibold text-white group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
                                    {post.title}
                                </h4>
                                <span className="text-xs text-muted-foreground">{post.date}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categories */}
            <div className="bg-[#0A0C10]/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl">
                <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2 text-white">
                    <Tag size={20} className="text-primary" />
                    Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <Link
                            key={category}
                            to={`/blog?category=${category}`}
                            className="px-3 py-1.5 bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/20 rounded-full text-xs font-medium text-muted-foreground hover:text-primary transition-all"
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-xl border border-primary/20 rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-150" />
                <div className="relative z-10 text-center">
                    <h3 className="font-display font-bold text-2xl mb-4 text-white">
                        Need a Professional Website?
                    </h3>
                    <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                        Let's collaborate to build a digital presence that stands out and grows your business.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center w-full px-6 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] group/btn"
                    >
                        Let's Talk
                        <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </aside>
    );
};

export default BlogSidebar;
