import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, ExternalLink, MessageCircle, Tag, Cpu, ChevronRight, Home } from "lucide-react";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import { staticProjects } from "@/data/projects";

const WHATSAPP = "https://wa.me/237675126845?text=Hi%20Bless%2C%20I%20saw%20your%20project%20and%20would%20like%20to%20discuss%20a%20similar%20one.";

const ProjectDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const project = staticProjects.find((p) => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (project) document.title = `${project.title} | Bless Kimbi`;
        return () => { document.title = "Bless Kimbi | Web Developer & Designer"; };
    }, [project]);

    if (!project) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-display font-bold text-white mb-4">Project Not Found</h1>
                    <Link to="/projects" className="text-primary hover:underline">← Back to Projects</Link>
                </div>
            </div>
        );
    }

    const related = staticProjects.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 3);

    return (
        <LenisSmoothScroll>
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
                        <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors"><Home size={13} />Home</Link>
                        <ChevronRight size={13} className="opacity-40" />
                        <Link to="/projects" className="hover:text-primary transition-colors">Projects</Link>
                        <ChevronRight size={13} className="opacity-40" />
                        <span className="text-white/80 truncate">{project.title}</span>
                    </nav>

                    {/* Hero Image */}
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-2xl border border-white/8">
                        <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-8 right-8">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">{project.category}</span>
                            <h1 className="font-display font-bold text-3xl md:text-5xl text-white leading-tight">{project.title}</h1>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-[1fr_300px] gap-10">
                        {/* Main Content */}
                        <div>
                            <p className="text-gray-200 text-lg leading-[1.85] mb-10">
                                {project.description}
                            </p>

                            {/* Tags */}
                            <div className="mb-10">
                                <h3 className="flex items-center gap-2 font-display font-bold text-white text-sm uppercase tracking-widest mb-4">
                                    <Tag size={16} className="text-primary" /> Project Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-200">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Technologies */}
                            <div className="mb-10">
                                <h3 className="flex items-center gap-2 font-display font-bold text-white text-sm uppercase tracking-widest mb-4">
                                    <Cpu size={16} className="text-primary" /> Technologies Used
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span key={tech} className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 pt-4 border-t border-white/8">
                                {project.liveUrl && project.liveUrl !== "#" && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-[0_0_20px_rgba(79,142,240,0.3)] hover:shadow-[0_0_30px_rgba(79,142,240,0.5)]"
                                    >
                                        <ExternalLink size={18} /> View Live Site
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
                                    to="/#contact"
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
                                    <div>
                                        <dt className="text-xs text-gray-400 uppercase tracking-wider mb-1">Category</dt>
                                        <dd className="text-white font-medium">{project.category}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-xs text-gray-400 uppercase tracking-wider mb-1">Stack</dt>
                                        <dd className="text-white font-medium">{project.technologies.slice(0, 3).join(", ")}</dd>
                                    </div>
                                </dl>
                            </div>

                            {/* CTA Card */}
                            <div className="bg-gradient-to-br from-primary/20 to-blue-900/20 border border-primary/20 rounded-2xl p-6 text-center">
                                <h3 className="font-display font-bold text-white text-lg mb-3">Want something similar?</h3>
                                <p className="text-gray-300 text-sm mb-6 leading-relaxed">Let's build your next project together.</p>
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
                                            <img src={rel.imageUrl} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-4 bg-white/3">
                                            <p className="text-xs text-primary font-medium mb-1">{rel.category}</p>
                                            <h4 className="font-display font-bold text-white text-sm group-hover:text-primary transition-colors">{rel.title}</h4>
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
