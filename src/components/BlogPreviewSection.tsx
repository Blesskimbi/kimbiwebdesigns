import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ArrowRight } from "lucide-react";
import { getRecentPosts, BlogPost , formatPostDate} from "@/lib/blog";
import OptimisedImage from "@/components/OptimisedImage";

gsap.registerPlugin(ScrollTrigger);

const BlogPreviewSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentPosts(5)
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

  const [featured, ...rest] = posts;

  return (
    <section ref={sectionRef} className="section-white border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="text-center mb-14">
          <span className="section-label">From the Blog</span>
          <h2 className="heading-serif text-3xl md:text-5xl mb-4 heading-underline">
            Latest News <span className="text-gold">and Insights</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg font-body max-w-2xl mx-auto">
            Practical, no-fluff articles on web design, SEO, and growing an online presence
            for businesses in Cameroon and across Africa.
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="marsha-card overflow-hidden animate-pulse">
              <div className="h-64 bg-muted" />
              <div className="p-6 space-y-3">
                <div className="h-3 w-24 bg-muted rounded" />
                <div className="h-5 w-full bg-muted rounded" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="marsha-card overflow-hidden animate-pulse">
                  <div className="h-28 bg-muted" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 w-full bg-muted rounded" />
                    <div className="h-3 w-2/3 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Featured post — big card on the left */}
            {featured && (
              <article className="marsha-card overflow-hidden flex flex-col group h-full">
                <div className="h-56 md:h-72 overflow-hidden relative">
                  <OptimisedImage
                    src={featured.imageUrl}
                    alt={featured.title}
                    className="w-full h-full object-cover pan-on-hover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-navy/85 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider rounded-full">
                    {featured.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground font-body mb-3">
                    <Calendar size={13} className="text-primary" />
                    {formatPostDate(featured.date)}
                  </span>
                  <h3 className="font-display font-bold text-xl text-navy mb-3 leading-snug group-hover:text-primary transition-colors">
                    <Link to={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h3>
                  <p className="text-muted-foreground text-sm font-body line-clamp-3 mb-5 flex-1">
                    {featured.excerpt}
                  </p>
                  <Link
                    to={`/blog/${featured.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-gold transition-colors mt-auto"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            )}

            {/* Remaining posts — compact 2-col list on the right */}
            <div className="grid grid-cols-2 gap-4">
              {rest.map((post) => (
                <article key={post.id} className="marsha-card overflow-hidden flex flex-col group">
                  <div className="h-28 md:h-32 overflow-hidden relative">
                    <OptimisedImage
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover pan-on-hover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-display font-bold text-sm text-navy mb-1.5 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-body mt-auto">
                      <Calendar size={11} className="text-primary" />
                      {formatPostDate(post.date)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
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
