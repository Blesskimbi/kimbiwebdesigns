import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import { ExternalLink } from "lucide-react";
import { supabase, SupabaseProject } from "@/lib/supabase";

const ProjectsPage = () => {
    const [projects, setProjects] = useState<SupabaseProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTag, setActiveTag] = useState("All");

    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true);
            const { data, error: fetchError } = await supabase
                .from("projects")
                .select("*")
                .eq("hidden", false)
                .order("featured", { ascending: false })
                .order("created_at", { ascending: false });
            if (fetchError) setError(fetchError.message);
            else setProjects(data ?? []);
            setLoading(false);
        };
        loadProjects();
    }, []);

    const allTags = ["All", ...Array.from(new Set(projects.flatMap(p => p.tags ?? [])))];

    const filtered = activeTag === "All"
        ? projects
        : projects.filter(p => (p.tags ?? []).includes(activeTag));

    return (
        <LenisSmoothScroll>
            <Helmet>
                <title>Web Design Portfolio | Bless Kimbi — Cameroon & Africa</title>
                <meta name="description" content="Browse Bless Kimbi's portfolio of web design and development projects. Real websites built for clients in Cameroon, South Africa, Nigeria and across Africa." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://blesskimbi.com/projects/" />
                <meta property="og:title" content="Web Design Portfolio | Bless Kimbi" />
                <meta property="og:description" content="Browse Bless Kimbi's portfolio of web design and development projects. Real websites built for clients in Cameroon, South Africa, Nigeria and across Africa." />
                <meta property="og:url" content="https://blesskimbi.com/projects/" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://blesskimbi.com/og-image.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Web Design Portfolio | Bless Kimbi" />
                <meta name="twitter:description" content="Browse Bless Kimbi's portfolio of web design and development projects for clients in Cameroon, South Africa, Nigeria and beyond." />
                <meta name="twitter:image" content="https://blesskimbi.com/og-image.png" />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Web Design Portfolio — Bless Kimbi",
                    "description": "Portfolio of web design and development projects by Bless Kimbi for businesses across Cameroon and Africa.",
                    "url": "https://blesskimbi.com/projects",
                    "author": {
                        "@type": "Person",
                        "name": "Bless Kimbi",
                        "url": "https://blesskimbi.com"
                    }
                })}</script>
            </Helmet>

            <Navbar />
            <div className="relative min-h-screen bg-background overflow-x-clip">

                <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen relative z-10">

                    {/* Heading */}
                    <div className="mb-14 text-center">
                        <span className="section-label">Portfolio</span>
                        <h1 className="heading-serif text-4xl md:text-5xl mb-5 heading-underline">
                            Web Design <span className="text-gradient-primary">Portfolio</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
                            Browse my work across web design, development, and digital experiences.
                        </p>
                    </div>

                    {/* Tag Filter */}
                    {!loading && !error && allTags.length > 1 && (
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setActiveTag(tag)}
                                    className={activeTag === tag ? "filter-pill-active" : "filter-pill-inactive"}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Loading Skeleton */}
                    {loading && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="rounded-md marsha-card overflow-hidden animate-pulse">
                                    <div className="h-56 bg-muted" />
                                    <div className="p-6 space-y-3">
                                        <div className="h-5 bg-muted rounded w-3/4" />
                                        <div className="h-4 bg-muted rounded w-full" />
                                        <div className="h-4 bg-muted rounded w-2/3" />
                                        <div className="flex gap-1.5 pt-1">
                                            <div className="h-5 w-14 bg-muted rounded" />
                                            <div className="h-5 w-14 bg-muted rounded" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="py-24 text-center">
                            <p className="text-destructive mb-2 font-body">{error}</p>
                            <p className="text-muted-foreground text-sm font-body">Could not load projects. Please try again later.</p>
                        </div>
                    )}

                    {/* Projects Grid */}
                    {!loading && !error && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((project, i) => (
                                <Link
                                    key={project.id}
                                    to={`/projects/${project.slug}`}
                                    className="group marsha-card overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col animate-in fade-in zoom-in duration-500"
                                    style={{ animationFillMode: "both", animationDelay: `${i * 80}ms` }}
                                >
                                    {/* Image with pan animation */}
                                    <div className="h-56 relative overflow-hidden shrink-0">
                                        {project.cover_image ? (
                                            <img
                                                src={project.cover_image}
                                            alt={`${project.title} web design project by Bless Kimbi`}
                                                className="w-full h-full object-cover object-top pan-on-hover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-body">No image</div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60" />
                                        {project.featured && (
                                            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gold/90 text-white text-[11px] font-semibold">
                                                ★ Featured
                                            </span>
                                        )}
                                        {(project.tags ?? []).length > 0 && (
                                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-navy/80 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-wider">
                                                {(project.tags ?? [])[0]}
                                            </span>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-1 p-6">
                                        <h2 className="font-display font-bold text-xl mb-2 text-navy group-hover:text-primary transition-colors leading-snug">
                                            {project.title}
                                        </h2>
                                        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-4 flex-1 font-body">
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {(project.tags ?? []).slice(0, 3).map(tag => (
                                                <span key={tag} className="px-2 py-0.5 rounded text-[11px] bg-muted text-muted-foreground font-body border border-border">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-gold transition-colors font-body">
                                            View Project <ExternalLink size={14} />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {!loading && !error && filtered.length === 0 && (
                        <div className="py-24 text-center text-muted-foreground font-body">
                            No projects in this category yet.
                        </div>
                    )}

                </main>
                <FloatingChat />
                <ScrollToTop />
            </div>
        </LenisSmoothScroll>
    );
};

export default ProjectsPage;
