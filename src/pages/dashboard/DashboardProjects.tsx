import { Plus, Search, Edit2, Trash2, X, Upload, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useDashboard, Project } from "../../components/dashboard/DashboardContext";

const DashboardProjects = () => {
    const { projects, addProject, updateProject, deleteProject } = useDashboard();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Project>>({
        title: "",
        category: "Web Design",
        status: "Draft",
        description: "",
        imageColor: "from-primary/20 to-secondary/10",
        imageUrl: ""
    });

    const filteredProjects = projects.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All Status" || p.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleOpenModal = (project?: Project) => {
        if (project) {
            setEditingId(project.id);
            setFormData(project);
        } else {
            setEditingId(null);
            setFormData({
                title: "",
                category: "Web Design",
                status: "Draft",
                description: "",
                imageColor: "from-primary/20 to-secondary/10",
                imageUrl: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, imageUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updateProject(editingId, formData);
        } else {
            addProject(formData as Omit<Project, "id" | "date">);
        }
        handleCloseModal();
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            deleteProject(id);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold tracking-tight text-white">Projects</h1>
                    <p className="text-muted-foreground text-sm">Manage your portfolio projects and case studies.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] flex items-center gap-2"
                >
                    <Plus size={18} /> Add New Project
                </button>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#0A0C10] shadow-xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02] flex-wrap gap-4">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-background border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors w-64"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-background border border-white/10 rounded-lg px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    >
                        <option>All Status</option>
                        <option>Published</option>
                        <option>Draft</option>
                        <option>Archived</option>
                    </select>
                </div>

                <div className="overflow-x-auto min-h-[300px]">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="text-xs uppercase bg-white/[0.02] text-muted-foreground border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Project Name</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Date Added</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredProjects.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">No projects found.</td>
                                </tr>
                            ) : (
                                filteredProjects.map((project) => (
                                    <tr key={project.id} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-6 py-4 font-medium text-white">{project.title}</td>
                                        <td className="px-6 py-4 text-muted-foreground">{project.category}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${project.status === 'Published' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                project.status === 'Draft' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                    'bg-white/10 text-white/70 border-white/20'
                                                }`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">{project.date}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleOpenModal(project)} className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-white/5" title="Edit">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(project.id)} className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors rounded-md hover:bg-red-500/10" title="Delete">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-[#0A0C10] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95">
                        <div className="flex items-center justify-between p-6 border-b border-white/5">
                            <h2 className="text-xl font-display font-semibold text-white">{editingId ? 'Edit Project' : 'New Project'}</h2>
                            <button onClick={handleCloseModal} className="text-muted-foreground hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-1.5">Project Title</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50"
                                    placeholder="e.g. Nebula OS"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-1.5">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50"
                                    >
                                        <option>Web Design</option>
                                        <option>Logo Design</option>
                                        <option>Uncategorized</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-1.5">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50"
                                    >
                                        <option>Draft</option>
                                        <option>Published</option>
                                        <option>Archived</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-1.5">Description</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 resize-none"
                                    placeholder="Short summary of the project..."
                                />
                            </div>

                            {/* Image Upload Area */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-white/80">Featured Image</label>
                                <div className="flex gap-4 items-start">
                                    <div className="w-24 h-24 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                                        {formData.imageUrl ? (
                                            <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon size={24} className="text-white/20" />
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={formData.imageUrl}
                                                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                                placeholder="Enter image URL..."
                                                className="flex-1 bg-black border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-primary/50"
                                            />
                                            <label className="cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs text-white transition-colors flex items-center gap-2">
                                                <Upload size={14} />
                                                Upload
                                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                            </label>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground">URL or direct upload. Local images will be saved as Base64.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={handleCloseModal} className="px-5 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="px-5 py-2.5 rounded-lg text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                    {editingId ? 'Save Changes' : 'Create Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default DashboardProjects;
