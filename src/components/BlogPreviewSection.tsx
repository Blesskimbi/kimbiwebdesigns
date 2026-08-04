import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ArrowRight } from "lucide-react";
import { getRecentPosts, BlogPost } from "@/lib/blog";

gsap.registerPlugin(ScrollTrigger);

const BlogPreviewSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentPosts(3)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!loading && posts.length === 0) return null;

  return (
    <section ref={sectionRef} className="section-white border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-14">
          <span className="section-label">From the Blog</span>
          <h2 className="heading-serif text-3xl md:text-5xl mb-4 heading-underline">
            Latest <span className="text-gold">Insights &amp; Guides</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-body max-w-2xl mx-auto">
            Practical, no-fluff articles on web design, SEO, and growing an online presence
            for businesses in Cameroon and across Africa.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="marsha-card overflow-hidden animate-pulse">
                <div className="h-44 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-3 w-20 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article key={post.id} className="marsha-card overflow-hidden flex flex-col group">
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover pan-on-hover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-navy/85 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body mb-3">
                    <Calendar size={13} className="text-primary" />
                    {post.date}
                  </span>
                  <h3 className="font-display font-bold text-lg text-navy mb-2 leading-snug group-hover:text-primary transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm font-body line-clamp-2 mb-5 flex-1">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold transition-colors mt-auto"
                  >
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link to="/blog" className="btn-outline-primary inline-flex items-center gap-2">
            View All Blog Posts <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
