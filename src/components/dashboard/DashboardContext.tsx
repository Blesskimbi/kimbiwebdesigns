import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// --- Types ---
export interface Project {
    id: number;
    title: string;
    category: string;
    status: string;
    date: string;
    description: string;
    imageColor: string;
    imageUrl?: string; // Optional custom image
}

export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string; // The full article content
    category: string;
    author: string;
    date: string;
    imageUrl: string;
    views: number;
    status: string;
}

export interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    preview: string;
    fullMessage: string;
    date: string;
    read: boolean;
}

interface DashboardContextType {
    projects: Project[];
    addProject: (project: Omit<Project, "id" | "date">) => void;
    updateProject: (id: number, project: Partial<Project>) => void;
    deleteProject: (id: number) => void;

    blogPosts: BlogPost[];
    addBlogPost: (post: Omit<BlogPost, "id" | "date" | "views" | "author">) => void;
    updateBlogPost: (id: number, post: Partial<BlogPost>) => void;
    deleteBlogPost: (id: number) => void;

    messages: Message[];
    markMessageAsRead: (id: number) => void;
    markMessageAsUnread: (id: number) => void;
    deleteMessage: (id: number) => void;
}

// --- Initial Mock Data ---
const initialProjects: Project[] = [
    { id: 1, title: "Nebula OS", category: "Web Design", status: "Published", date: "Mar 10, 2026", description: "A futuristic operating system interface built for the browser.", imageColor: "from-primary/20 to-secondary/10", imageUrl: "/cyprogram-riscam.co.png" },
    { id: 2, title: "EcoBrand Identity", category: "Logo Design", status: "Draft", date: "Mar 8, 2026", description: "Modern minimalist logo set for a sustainable tech company.", imageColor: "from-green-500/20 to-emerald-500/10" },
    { id: 3, title: "Synthwave Studio", category: "Web Design", status: "Published", date: "Mar 1, 2026", description: "An AI-powered music visualization platform.", imageColor: "from-secondary/20 to-primary/10", imageUrl: "/mclevioflfe.png" },
    { id: 4, title: "Abstract Concept 01", category: "Uncategorized", status: "Archived", date: "Feb 24, 2026", description: "Experimental 3D rendering and motion graphics playground.", imageColor: "from-purple-500/20 to-pink-500/10" },
    { id: 5, title: "TechFlow Branding", category: "Logo Design", status: "Published", date: "Feb 15, 2026", description: "Complete brand identity and logo suite for a SaaS startup.", imageColor: "from-blue-500/20 to-cyan-500/10", imageUrl: "/medproexpeditions.com.png" },
];

const initialBlogPosts: BlogPost[] = [
    { id: 1, title: "The Future of Web Development", excerpt: "Exploring upcoming trends in frontend architectures...", content: "Web development is evolving faster than ever. In 2026, we are seeing a shift towards more immersive, AI-driven experiences...\n\n### Key Trends\n1. AI-Driven UI\n2. Edge Computing\n3. WebAssembly everywhere", category: "Technology", author: "Bless Kimbi", date: "Mar 15, 2026", imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070", views: 1240, status: "Published" },
    { id: 2, title: "Mastering React Server Components", excerpt: "A deep dive into how Server Components change the mental model...", content: "React Server Components (RSC) represent a fundamental shift in how we think about building web applications with React. By allowing components to run exclusively on the server...", category: "Development", author: "Bless Kimbi", date: "Feb 28, 2026", imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2070", views: 890, status: "Published" },
    { id: 3, title: "Designing for the Dark Web", excerpt: "Creating visually stunning dark themes isn't just about changing backgrounds...", content: "Dark mode is more than just a color swap. It's about maintaining hierarchy, readability, and emotional resonance in high-contrast environments...", category: "Design", author: "Bless Kimbi", date: "Feb 12, 2026", imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070", views: 0, status: "Draft" },
    { id: 4, title: "Why You Should Build a Custom Portfolio", excerpt: "Templates are great, but a custom-coded portfolio speaks volumes...", content: "In a world full of generic templates, a custom-built site stands out. It shows technical prowess, attention to detail, and a commitment to quality...", category: "Career", author: "Bless Kimbi", date: "Jan 20, 2026", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072", views: 3200, status: "Published" },
];

const initialMessages: Message[] = [
    { id: 1, name: "Emily Chen", email: "emily@example.com", subject: "Inquiry about Web Design Project", preview: "Hi Bless, I saw your portfolio and absolutely loved the Nebula OS design. We are looking for...", fullMessage: "Hi Bless,\n\nI saw your portfolio and absolutely loved the Nebula OS design. We are looking for a completely fresh redesign of our brand and think your aesthetic perfectly matches what we envision.\n\nLooking forward to hearing from you soon.\n\nBest,\nEmily", date: "10:30 AM", read: false },
    { id: 2, name: "Michael Carter", email: "michael@startup.io", subject: "Freelance Opportunity", preview: "Are you currently taking on new clients? We have a 3-month contract available for a lead frontend dev.", fullMessage: "Are you currently taking on new clients? We have a 3-month contract available for a lead frontend dev.", date: "Yesterday", read: true },
    { id: 3, name: "Sarah Jenkins", email: "sarahj@designco.com", subject: "Collab on logo design?", preview: "Hey! Let me know if you'd be interested in collaborating on a branding project next month. Big fan of your recent work.", fullMessage: "Hey! Let me know if you'd be interested in collaborating on a branding project next month. Big fan of your recent work.", date: "Mar 12", read: true },
];

// --- Context Definition ---
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    // State initialization from localStorage or defaults
    const [projects, setProjects] = useState<Project[]>(() => {
        const saved = localStorage.getItem("blesskimbi_v2_projects");
        return saved ? JSON.parse(saved) : initialProjects;
    });

    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
        const saved = localStorage.getItem("blesskimbi_v2_blogPosts");
        return saved ? JSON.parse(saved) : initialBlogPosts;
    });

    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem("blesskimbi_v2_messages");
        return saved ? JSON.parse(saved) : initialMessages;
    });

    // Save to localStorage whenever state changes
    useEffect(() => { localStorage.setItem("blesskimbi_v2_projects", JSON.stringify(projects)); }, [projects]);
    useEffect(() => { localStorage.setItem("blesskimbi_v2_blogPosts", JSON.stringify(blogPosts)); }, [blogPosts]);
    useEffect(() => { localStorage.setItem("blesskimbi_v2_messages", JSON.stringify(messages)); }, [messages]);
    // Sync initial images to state if missing or outdated (to handle existing localStorage data)
    // Migration/Fix for image paths
    useEffect(() => {
        setProjects(prev => prev.map(p => {
            if (p.imageUrl && p.imageUrl.startsWith('/public/')) {
                return { ...p, imageUrl: p.imageUrl.replace('/public/', '/') };
            }
            return p;
        }));
    }, []);

    // Helpers
    const generateId = () => Date.now();
    const getCurrentDate = () => {
        const d = new Date();
        return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}, ${d.getFullYear()}`;
    };

    // --- Projects CRUD ---
    const addProject = (project: Omit<Project, "id" | "date">) => {
        setProjects(prev => [{ ...project, id: generateId(), date: getCurrentDate() }, ...prev]);
    };
    const updateProject = (id: number, updatedItem: Partial<Project>) => {
        setProjects(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));
    };
    const deleteProject = (id: number) => {
        setProjects(prev => prev.filter(item => item.id !== id));
    };

    // --- BlogPosts CRUD ---
    const addBlogPost = (post: Omit<BlogPost, "id" | "date" | "views" | "author">) => {
        setBlogPosts(prev => [{ ...post, id: generateId(), date: getCurrentDate(), views: 0, author: "Bless Kimbi" }, ...prev]);
    };
    const updateBlogPost = (id: number, updatedItem: Partial<BlogPost>) => {
        setBlogPosts(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));
    };
    const deleteBlogPost = (id: number) => {
        setBlogPosts(prev => prev.filter(item => item.id !== id));
    };

    // --- Messages CRUD ---
    const markMessageAsRead = (id: number) => {
        setMessages(prev => prev.map(item => item.id === id ? { ...item, read: true } : item));
    };
    const markMessageAsUnread = (id: number) => {
        setMessages(prev => prev.map(item => item.id === id ? { ...item, read: false } : item));
    };
    const deleteMessage = (id: number) => {
        setMessages(prev => prev.filter(item => item.id !== id));
    };

    return (
        <DashboardContext.Provider
            value={{
                projects, addProject, updateProject, deleteProject,
                blogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
                messages, markMessageAsRead, markMessageAsUnread, deleteMessage,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }
    return context;
};
