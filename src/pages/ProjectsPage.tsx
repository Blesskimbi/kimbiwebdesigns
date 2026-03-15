import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/ContactSection"; // Use ContactSection as a pseudo-footer or we can just render the layout
import FloatingChat from "@/components/FloatingChat";
import ScrollToTop from "@/components/ScrollToTop";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import ParticleBackground from "@/components/ParticleBackground";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboard } from "@/components/dashboard/DashboardContext";

// Standardize categories based on User request
const categories = ["All", "Logo Design", "Uncategorized", "Web Design"];

const ProjectsPage = () => {
    const { projects } = useDashboard();
    const publishedProjects = projects.filter(p => p.status === "Published");
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects =
        activeCategory === "All"
            ? publishedProjects
            : publishedProjects.filter((project) => project.category === activeCategory);

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
                            My <span className="text-gradient-primary">Projects</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Explore my portfolio across different disciplines. Select a category below to filter the projects.
                        </p>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                                    ? "bg-white text-[#0EA5E9] shadow-[0_0_20px_rgba(255,255,255,0.1)]" // Using cyan/light-blue for active text to match image
                                    : "bg-[#11141C] text-white hover:bg-[#1A1E29]" // Dark navy backgrounds to match image
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, i) => (
                            <div
                                key={project.id}
                                className="group relative rounded-2xl bg-[#0A0C10] border border-white/5 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 animate-in fade-in zoom-in duration-500"
                                style={{ animationFillMode: "both", animationDelay: `${i * 100}ms` }}
                            >
                                {/* Image Placeholder / Actual Image */}
                                <div className={`h-56 relative overflow-hidden flex items-center justify-center ${!project.imageUrl ? `bg-gradient-to-br ${project.imageColor}` : ''}`}>
                                    {project.imageUrl ? (
                                        <img
                                            src={project.imageUrl}
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <span className="font-display font-bold text-white/30 text-2xl group-hover:scale-110 transition-transform duration-500">{project.category}</span>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] to-transparent opacity-80" />
                                </div>

                                {/* Content */}
                                <div className="p-6 relative z-10">
                                    <span className="text-xs font-medium text-primary tracking-widest uppercase mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="font-display font-bold text-xl mb-3 text-white group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {filteredProjects.length === 0 && (
                            <div className="col-span-full py-20 text-center text-muted-foreground">
                                No projects found in this category.
                            </div>
                        )}
                    </div>

                </main>

                <Footer />
                <FloatingChat />
                <ScrollToTop />
            </div>
        </LenisSmoothScroll>
    );
};

export default ProjectsPage;
