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
        <aside className="space-y-6 md:space-y-8">
            <div className="internal-card">
                <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-navy">
                    <BookOpen size={18} className="text-primary" />
                    Recent Posts
                </h3>
                <div className="space-y-4">
                    {recentPosts.map((post) => (
                        <div key={post.id} className="group">
                            <Link to={`/blog/${post.slug}`} className="block">
                                <h4 className="text-sm font-semibold text-navy group-hover:text-primary transition-colors line-clamp-2 mb-1 leading-snug font-body">
                                    {post.title}
                                </h4>
                                <span className="text-xs text-muted-foreground font-body">{post.date}</span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="internal-card">
                <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-navy">
                    <Tag size={18} className="text-primary" />
                    Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <Link
                            key={category}
                            to={`/blog?category=${category}`}
                            className="px-3 py-1.5 bg-muted hover:bg-primary/10 border border-border hover:border-primary/30 rounded-full text-xs font-medium text-muted-foreground hover:text-primary transition-all font-body"
                        >
                            {category}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="internal-card bg-primary/5 border-primary/15 text-center relative overflow-hidden">
                <h3 className="font-display font-bold text-xl mb-3 text-navy">
                    Need a Professional Website?
                </h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed font-body">
                    Let's collaborate to build a digital presence that stands out and grows your business.
                </p>
                <Link to="/contact" className="btn-green inline-flex items-center justify-center w-full gap-2 !py-3">
                    Let's Talk
                    <ArrowRight size={16} />
                </Link>
            </div>
        </aside>
    );
};

export default BlogSidebar;
