import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    ArrowLeft, ExternalLink, MessageCircle, Tag,
    Github, ChevronRight, Home, Calendar, User
} from "lucide-react";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";
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

            // Related: fetch a few projects and filter by shared tags client-side
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

    /* ── Loading state ─────────────────────────────────────────────────── */
    if (loading) {
        return (
            <div className="min-h-screen bg-background relative">
                <ParticleBackground />
                <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-background/80 backdrop-blur-md border-b border-white/5">
                    <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                        <Link to="/projects" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
                            <ArrowLeft size={20} />
                            <span className="font-display font-medium">All Projects</span>
                        </Link>
                        <Link to="/" className="font-display font-bold text-lg tracking-wider text-white">
                            BlessKimbi<span className="text-primary">.</span>
                        </Link>
                    </div>
                </nav>
                <div className="pt-28 pb-24 px-4 md:px-6 max-w-5xl mx-auto relative z-10 space-y-6">
                    <div className="aspect-[16/9] bg-white/5 rounded-2xl animate-pulse" />
                    <div className="h-8 bg-white/5 rounded w-1/2 animate-pulse" />
                    <div className="h-4 bg-white/5 rounded animate-pulse" />
                    <div className="h-4 bg-white/5 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-white/5 rounded w-2/3 animate-pulse" />
                </div>
            </div>
        );
    }

    /* ── 404 state ─────────────────────────────────────────────────────── */
    if (notFound || !project) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-display font-bold text-white mb-4">Project Not Found</h1>
                    <p className="text-gray-400 mb-6">This project doesn't exist or has been removed.</p>
                    <Link to="/projects" className="text-primary hover:underline">← Back to Projects</Link>
                </div>
            </div>
        );
    }

    const allImages = [project.cover_image, ...(project.images ?? [])].filter(Boolean) as string[];
    const canonical = `https://everythx.com/projects/${project.slug}`;

    return (
        <LenisSmoothScroll>
            <Helmet>
                <title>{`${project.title} | Blesskimbi Portfolio`}</title>
                <meta name="description" content={project.description ?? project.title} />
                <link rel="canonical" href={canonical} />
                <meta property="og:title" content={`${project.title} | Blesskimbi Portfolio`} />
                <meta property="og:description" content={project.description ?? project.title} />
                <meta property="og:url" content={canonical} />
                {project.cover_image && (
                    <meta property="og:image" content={
                        project.cover_image.startsWith("http")
                            ? project.cover_image
                            : `https://everythx.com${project.cover_image}`
                    } />
                )}
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="relative min-h-screen bg-background">
                <ParticleBackground />

                {/* Navbar */}
                <nav className="fixed top-0 left-0 right-0 z-50 py-4 bg-background/80 backdrop-blur-md border-b border-white/5">
                    <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                        <Link to="/projects" className="flex items-center gap-2 text-white hover:text-primary transition-colors">
                            <ArrowLeft size={20} />
                            <span className="font-display font-medium">All Projects</span>
                        </Link>
                        <Link to="/" className="font-display font-bold text-lg tracking-wider text-white">
                            BlessKimbi<span className="text-primary">.</span>
                        </Link>
                    </div>
                </nav>

                <main className="pt-28 pb-24 px-4 md:px-6 relative z-10 max-w-5xl mx-auto">

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
                        <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                            <Home size={13} />Home
                        </Link>
                        <ChevronRight size={13} className="opacity-40" />
                        <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
                        <ChevronRight size={13} className="opacity-40" />
                        <span className="text-white/80 truncate">{project.title}</span>
                    </nav>

                    {/* Hero Image */}
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-2xl border border-white/8">
                        {activeImage ? (
                            <img
                                src={activeImage}
                                alt={project.title}
                                className="w-full h-full object-cover transition-opacity duration-300"
                            />
                        ) : (
                            <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-500">No image</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-8 right-8">
                            {(project.tags ?? []).length > 0 && (
                                <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">
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
                            {allImages.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveImage(img)}
                                    className={`shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                        activeImage === img
                                            ? "border-primary"
                                            : "border-white/10 opacity-60 hover:opacity-100"
                                    }`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="grid lg:grid-cols-[1fr_300px] gap-10">

                        {/* Main Content */}
                        <div>
                            {/* Short description */}
                            {project.description && (
                                <p className="text-gray-200 text-lg leading-[1.85] mb-8">
                                    {project.description}
                                </p>
                            )}

                            {/* Full description */}
                            {project.full_description && (
                                <div className="mb-10">
                                    <h3 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-4">
                                        About This Project
                                    </h3>
                                    <p className="text-gray-300 leading-[1.9] whitespace-pre-wrap">
                                        {project.full_description}
                                    </p>
                                </div>
                            )}

                            {/* Tags */}
                            {(project.tags ?? []).length > 0 && (
                                <div className="mb-10">
                                    <h3 className="flex items-center gap-2 font-display font-bold text-white text-sm uppercase tracking-widest mb-4">
                                        <Tag size={16} className="text-primary" /> Project Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {(project.tags ?? []).map((tag) => (
                                            <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-200">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/8">
                                {project.live_url && (
                                    <a
                                        href={project.live_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-[0_0_20px_rgba(79,142,240,0.3)] hover:shadow-[0_0_30px_rgba(79,142,240,0.5)]"
                                    >
                                        <ExternalLink size={18} /> View Live Site
                                    </a>
                                )}
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-all"
                                    >
                                        <Github size={18} /> GitHub
                                    </a>
                                )}
                                <a
                                    href={WHATSAPP}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#1fba58] text-white font-bold transition-all"
                                >
                                    <MessageCircle size={18} /> Discuss a Similar Project
                                </a>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-all"
                                >
                                    Contact Me
                                </Link>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-6">
                            {/* Project Info */}
                            <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
                                <h3 className="font-display font-bold text-white mb-5 text-sm uppercase tracking-widest">Project Info</h3>
                                <dl className="space-y-4">
                                    {project.client_name && (
                                        <div>
                                            <dt className="text-xs text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                                <User size={12} /> Client
                                            </dt>
                                            <dd className="text-white font-medium">{project.client_name}</dd>
                                        </div>
                                    )}
                                    {project.completed_date && (
                                        <div>
                                            <dt className="text-xs text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                                <Calendar size={12} /> Completed
                                            </dt>
                                            <dd className="text-white font-medium">
                                                {new Date(project.completed_date).toLocaleDateString("en-GB", {
                                                    month: "long", year: "numeric"
                                                })}
                                            </dd>
                                        </div>
                                    )}
                                    {(project.tags ?? []).length > 0 && (
                                        <div>
                                            <dt className="text-xs text-gray-400 uppercase tracking-wider mb-1">Tags</dt>
                                            <dd className="text-white font-medium">
                                                {(project.tags ?? []).slice(0, 3).join(", ")}
                                            </dd>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            {/* CTA Card */}
                            <div className="bg-gradient-to-br from-primary/20 to-blue-900/20 border border-primary/20 rounded-2xl p-6 text-center">
                                <h3 className="font-display font-bold text-white text-lg mb-3">Want something similar?</h3>
                                <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                                    Let's build your next project together.
                                </p>
                                <a
                                    href={WHATSAPP}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all text-sm"
                                >
                                    <MessageCircle size={16} /> Let's Talk
                                </a>
                            </div>
                        </aside>
                    </div>

                    {/* Contact CTA */}
                    <div className="mt-16 pt-12 border-t border-white/8 text-center">
                        <h2 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
                            Ready to start your project?
                        </h2>
                        <p className="text-gray-400 text-base mb-8 max-w-xl mx-auto">
                            Have a project in mind? I'd love to hear about it. Let's turn your idea into reality.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-[0_0_20px_rgba(79,142,240,0.3)] hover:shadow-[0_0_30px_rgba(79,142,240,0.5)]"
                            >
                                Get In Touch
                            </Link>
                            <a
                                href={WHATSAPP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1fba58] text-white font-bold transition-all"
                            >
                                <MessageCircle size={18} /> WhatsApp Me
                            </a>
                        </div>
                    </div>

                    {/* Related Projects */}
                    {related.length > 0 && (
                        <div className="mt-20 pt-12 border-t border-white/8">
                            <h2 className="font-display font-bold text-2xl text-white mb-8">More Projects</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {related.map((rel) => (
                                    <Link
                                        key={rel.id}
                                        to={`/projects/${rel.slug}`}
                                        className="group relative rounded-xl overflow-hidden border border-white/8 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <div className="h-40 overflow-hidden">
                                            {rel.cover_image ? (
                                                <img
                                                    src={rel.cover_image}
                                                    alt={rel.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white/5" />
                                            )}
                                        </div>
                                        <div className="p-4 bg-white/3">
                                            {(rel.tags ?? []).length > 0 && (
                                                <p className="text-xs text-primary font-medium mb-1">{(rel.tags ?? [])[0]}</p>
                                            )}
                                            <h4 className="font-display font-bold text-white text-sm group-hover:text-primary transition-colors">
                                                {rel.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
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

export default ProjectDetailPage;
