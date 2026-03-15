import { NavLink } from "react-router-dom";
import { LayoutDashboard, FolderKanban, FileText, MessageSquare, Settings } from "lucide-react";

const navItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", path: "/dashboard/projects", icon: FolderKanban },
    { name: "Blog Posts", path: "/dashboard/blog", icon: FileText },
    { name: "Messages", path: "/dashboard/messages", icon: MessageSquare },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

const Sidebar = () => {
    return (
        <aside className="w-64 bg-[#0A0C10] border-r border-white/5 hidden md:flex flex-col h-screen sticky top-0 animate-in slide-in-from-left-8 duration-500">
            <div className="p-6 border-b border-white/5">
                <div className="font-display font-bold text-xl tracking-wider text-foreground">
                    BlessKimbi<span className="text-primary">.</span>
                    <span className="block text-xs text-muted-foreground mt-1 tracking-normal font-sans">Admin Dashboard</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/dashboard"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${isActive
                                    ? "bg-primary/10 text-primary shadow-[inset_3px_0_0_0_#0EA5E9]"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                }`
                            }
                        >
                            <Icon size={18} />
                            {item.name}
                        </NavLink>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="px-4 py-3 text-xs text-muted-foreground">
                    &copy; 2026 Admin Panel
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
