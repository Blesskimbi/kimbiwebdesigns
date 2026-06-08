import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection";
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";
import { ExternalLink } from "lucide-react";
import { staticProjects } from "@/data/projects";

// Derive unique categories from actual project data
const allCategories = ["All", ...Array.from(new Set(staticProjects.map(p => p.category)))];

const ProjectsPage = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filtered = activeCategory === "All"
        ? staticProjects
        : staticProjects.filter(p => p.category === activeCategory);

    return (
        <LenisSmoothScroll>
            <Helmet>
                <title>Web Design Portfolio | Blesskimbi</title>
                <meta name="description" content="Browse Blesskimbi's portfolio of web design and development projects for clients worldwide." />
                <link rel="canonical" href="https://everythx.com/projects" />
                <meta property="og:title" content="Web Design Portfolio | Blesskimbi" />
                <meta property="og:description" content="Browse Blesskimbi's portfolio of web design and development projects for clients worldwide." />
                <meta property="og:url" content="https://everythx.com/projects" />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="relative min-h-screen bg-background overflow-x-hidden">
                <ParticleBackground />
                <Navbar />

                <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-screen relative z-10">

                    {/* Heading */}
                    <div className="mb-14 text-center">
                        <h1 className="font-display font-bold text-5xl md:text-6xl mb-5">
                            My <span className="text-gradient-primary">Projects</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            {filtered.length} project{filtered.length !== 1 ? "s" : ""} — select a category to filter.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
                        {allCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                    activeCategory === cat
                                        ? "bg-primary text-white shadow-[0_0_20px_rgba(79,142,240,0.35)]"
                                        : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((project, i) => (
                            <Link
                                key={project.id}
                                to={`/projects/${project.slug}`}
                                className="group relative rounded-2xl bg-[#0A0C10] border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/25 flex flex-col animate-in fade-in zoom-in duration-500"
                                style={{ animationFillMode: "both", animationDelay: `${i * 80}ms` }}
                            >
                                {/* Image with pan animation */}
                                <div className="h-56 relative overflow-hidden shrink-0">
                                    <img
                                        src={project.imageUrl}
                                        alt={`${project.title} — web design project by Bless Kimbi`}
                                        className="w-full h-full object-cover object-top pan-on-hover"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent opacity-80" />
                                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold uppercase tracking-wider border border-white/10">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 p-6">
                                    <h2 className="font-display font-bold text-xl mb-2 text-white group-hover:text-primary transition-colors leading-snug">
                                        {project.title}
                                    </h2>
                                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-4 flex-1">
                                        {project.shortDescription}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {project.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="px-2 py-0.5 rounded text-[11px] bg-white/5 text-gray-300 border border-white/[0.08]">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-white transition-colors">
                                        View Project <ExternalLink size={14} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="py-24 text-center text-gray-400">
                            No projects in this category yet.
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

export default ProjectsPage;
