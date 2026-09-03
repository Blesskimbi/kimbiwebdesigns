import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    ExternalLink, MessageCircle, Tag,
    Github, ChevronRight, Home, Calendar, User
} from "lucide-react";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import { supabase, SupabaseProject } from "@/lib/supabase";

const WHATSAPP = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20saw%20your%20project%20and%20would%20like%20to%20discuss%20a%20similar%20one.";

const ProjectDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [project, setProject] = useState<SupabaseProject | null>(null);
    const [related, setRelated] = useState<SupabaseProject[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [activeImage, setActiveImage] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!slug) return;

        const loadProject = async () => {
            setLoading(true);
            setNotFound(false);
            setProject(null);
            setRelated([]);

            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .eq("slug", slug)
                .eq("hidden", false)
                .single();

            if (error || !data) {
                setNotFound(true);
                setLoading(false);
                return;
            }

            setProject(data);
            setActiveImage(data.cover_image);

            const { data: others } = await supabase
                .from("projects")
                .select("*")
                .eq("hidden", false)
                .neq("id", data.id)
                .limit(8);

            if (others && (data.tags ?? []).length > 0) {
                const shared = others
                    .filter(p => (p.tags ?? []).some((t: string) => (data.tags ?? []).includes(t)))
                    .slice(0, 3);
                setRelated(shared.length > 0 ? shared : others.slice(0, 3));
            } else if (others) {
                setRelated(others.slice(0, 3));
            }

            setLoading(false);
        };

        loadProject();
    }, [slug]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-background pt-28 pb-24 px-4 md:px-6 max-w-5xl mx-auto">
                    <div className="aspect-[16/9] bg-muted rounded-2xl animate-pulse mb-8" />
                    <div className="h-8 bg-muted rounded w-1/2 animate-pulse mb-4" />
                    <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                    <div className="h-4 bg-muted rounded w-3/4 animate-pulse mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                </div>
            </>
        );
    }

    if (notFound || !project) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
                <Helmet>
                    <title>Project Not Found | Bless Kimbi</title>
                    <meta name="robots" content="noindex, nofollow" />
                </Helmet>
                <Navbar />
                <div className="text-center pt-24">
                    <h1 className="text-3xl font-display font-bold text-navy mb-4">Project Not Found</h1>
                    <p className="text-muted-foreground mb-6 font-body">This project doesn't exist or has been removed.</p>
                    <Link to="/projects" className="text-primary font-semibold hover:text-gold transition-colors font-body">← Back to Projects</Link>
                </div>
            </div>
        );
    }

    const allImages = [project.cover_image, ...(project.images ?? [])].filter(Boolean) as string[];
    const canonical = `https://blesskimbi.com/projects/${project.slug}/`;

    const suffix = " | Bless Kimbi";
    const maxTitleRaw = 58 - suffix.length - 1;
    const titleTag = project.title.length <= 58 - suffix.length
        ? `${project.title}${suffix}`
        : `${project.title.slice(0, maxTitleRaw).replace(/\s\S*$/, "")}…${suffix}`;

    const cleanFull = (project.full_description ?? "")
        .replace(/[#*_`[\]()>!]/g, "")
        .replace(/https?:\/\/\S+/g, "")
        .replace(/\s+/g, " ")
        .trim();
    const rawDesc = project.description && project.description.length >= 120
        ? project.description
        : project.description
            ? `${project.description} ${cleanFull}`.replace(/\s+/g, " ").trim()
            : cleanFull || project.title;
    const metaDescription = rawDesc.length <= 155
        ? rawDesc
        : rawDesc.slice(0, 155).replace(/\s\S*$/, "");

    return (
        <LenisSmoothScroll>
            <Helmet>
                <title>{titleTag}</title>
                <meta name="description" content={metaDescription} />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href={canonical} />
                <meta property="og:title" content={`${project.title} | Bless Kimbi`} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:url" content={canonical} />
                {project.cover_image && (
                    <meta property="og:image" content={
                        project.cover_image.startsWith("http")
                            ? project.cover_image
                            : `https://blesskimbi.com${project.cover_image}`
                    } />
                )}
                <meta property="og:type" content="website" />
            </Helmet>

            <Navbar />
            <div className="relative min-h-screen bg-background overflow-x-clip">
                <main className="pt-28 pb-24 px-4 md:px-6 relative z-10 max-w-5xl mx-auto">

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-xs mb-8 font-body">
                        <Link to="/" className="breadcrumb-link flex items-center gap-1">
                            <Home size={13} />Home
                        </Link>
                        <ChevronRight size={13} className="text-muted-foreground/50" />
                        <Link to="/projects" className="breadcrumb-link">Projects</Link>
                        <ChevronRight size={13} className="text-muted-foreground/50" />
                        <span className="breadcrumb-current">{project.title}</span>
                    </nav>

                    {/* Hero Image */}
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-pro border border-border">
                        {activeImage ? (
                            <img
                                src={activeImage}
                                alt={project.title}
                                className="w-full h-full object-cover transition-opacity duration-300"
                            />
                        ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground font-body">No image</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/20 to-transparent" />
                        <div className="absolute bottom-6 left-8 right-8">
                            {(project.tags ?? []).length > 0 && (
                                <span className="text-xs font-bold text-gold uppercase tracking-widest mb-2 block font-body">
                                    {(project.tags ?? [])[0]}
                                </span>
                            )}
                            <h1 className="font-display font-bold text-3xl md:text-5xl text-white leading-tight">
                                {project.title}
                            </h1>
                        </div>
                    </div>

                    {/* Image Gallery Thumbnails */}
                    {allImages.length > 1 && (
                        <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
                            {allImages.map((img, i) => {
                                const label = i === 0
                                    ? `${project.title} — cover image`
                                    : `${project.title} — screenshot ${i + 1}`;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(img)}
                                        aria-label={`View ${label}`}
                                        className={`shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                            activeImage === img
                                                ? "border-primary"
                                                : "border-border opacity-70 hover:opacity-100"
                                        }`}
                                    >
                                        <img src={img} alt={label} className="w-full h-full object-cover" />
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    <div className="grid lg:grid-cols-[1fr_300px] gap-10">

                        {/* Main Content */}
                        <div>
                            {project.description && (
                                <p className="text-navy text-lg leading-[1.85] mb-8 font-body">
                                    {project.description}
                                </p>
                            )}

                            {project.full_description && (
                                <div className="mb-10">
                                    <h2 className="font-display font-bold text-navy text-sm uppercase tracking-widest mb-4">
                                        About This Project
                                    </h2>
                                    <p className="text-muted-foreground leading-[1.9] whitespace-pre-wrap font-body">
                                        {project.full_description}
                                    </p>
                                </div>
                            )}

                            {(project.tags ?? []).length > 0 && (
                                <div className="mb-10">
                                    <h2 className="flex items-center gap-2 font-display font-bold text-navy text-sm uppercase tracking-widest mb-4">
                                        <Tag size={16} className="text-primary" /> Project Tags
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {(project.tags ?? []).map((tag) => (
                                            <span key={tag} className="px-3 py-1.5 rounded-full bg-muted border border-border text-sm text-navy font-body">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                                {project.live_url && (
                                    <a
                                        href={project.live_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-green inline-flex items-center gap-2 !py-3 !px-6"
                                    >
                                        <ExternalLink size={18} /> View Live Site
                                    </a>
                                )}
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-outline-navy inline-flex items-center gap-2 !py-3 !px-6"
                                    >
                                        <Github size={18} /> GitHub
                                    </a>
                                )}
                                <a
                                    href={WHATSAPP}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#1fba58] text-white font-bold transition-all font-body"
                                >
                                    <MessageCircle size={18} /> Discuss a Similar Project
                                </a>
                                <Link to="/contact" className="btn-outline-primary inline-flex items-center gap-2 !py-3 !px-6">
                                    Contact Me
                                </Link>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-6">
                            <div className="internal-card">
                                <h3 className="font-display font-bold text-navy mb-5 text-sm uppercase tracking-widest">Project Info</h3>
                                <dl className="space-y-4 font-body">
                                    {project.client_name && (
                                        <div>
                                            <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                                <User size={12} /> Client
                                            </dt>
                                            <dd className="text-navy font-semibold">{project.client_name}</dd>
                                        </div>
                                    )}
                                    {project.completed_date && (
                                        <div>
                                            <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                                <Calendar size={12} /> Completed
                                            </dt>
                                            <dd className="text-navy font-semibold">
                                                {new Date(project.completed_date).toLocaleDateString("en-GB", {
                                                    month: "long", year: "numeric"
                                                })}
                                            </dd>
                                        </div>
                                    )}
                                    {(project.tags ?? []).length > 0 && (
                                        <div>
                                            <dt className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Tags</dt>
                                            <dd className="text-navy font-semibold">
                                                {(project.tags ?? []).slice(0, 3).join(", ")}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            <div className="internal-card bg-primary/5 border-primary/15 text-center">
                                <h3 className="font-display font-bold text-navy text-lg mb-3">Want something similar?</h3>
                                <p className="text-muted-foreground text-sm mb-6 leading-relaxed font-body">
                                    Let's build your next project together.
                                </p>
                                <a
                                    href={WHATSAPP}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-green inline-flex items-center justify-center gap-2 w-full !py-3"
                                >
                                    <MessageCircle size={16} /> Let's Talk
                                </a>
                            </div>
                        </aside>
                    </div>

                    {/* Contact CTA */}
                    <div className="mt-16 pt-12 border-t border-border text-center">
                        <h2 className="heading-serif text-2xl md:text-3xl mb-4">
                            Ready to start your project?
                        </h2>
                        <p className="text-muted-foreground text-base mb-8 max-w-xl mx-auto font-body">
                            Have a project in mind? I'd love to hear about it. Let's turn your idea into reality.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link to="/contact" className="btn-green inline-flex items-center gap-2 !py-3 !px-8">
                                Get In Touch
                            </Link>
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#25D366] hover:bg-[#1fba58] text-white font-bold transition-all font-body"
                            >
                                <MessageCircle size={18} /> WhatsApp Me
                            </a>
                        </div>
                    </div>

                    {/* Related Projects */}
                    {related.length > 0 && (
                        <div className="mt-20 pt-12 border-t border-border">
                            <h2 className="heading-serif text-2xl mb-8">More Projects</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {related.map((rel) => (
                                    <Link
                                        key={rel.id}
                                        to={`/projects/${rel.slug}`}
                                        className="group marsha-card overflow-hidden transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="h-40 overflow-hidden">
                                            {rel.cover_image ? (
                                                <img
                                                    src={rel.cover_image}
                                                    alt={rel.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-muted" />
                                            )}
                                        </div>
                                        <div className="p-4">
                                            {(rel.tags ?? []).length > 0 && (
                                                <p className="text-xs text-primary font-medium mb-1 font-body">{(rel.tags ?? [])[0]}</p>
                                            )}
                                            <h4 className="font-display font-bold text-navy text-sm group-hover:text-gold transition-colors">
                                                {rel.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </main>
                <FloatingChat />
                <ScrollToTop />
            </div>
        </LenisSmoothScroll>
    );
};

export default ProjectDetailPage;
