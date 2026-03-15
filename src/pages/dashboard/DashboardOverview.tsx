import { ArrowUpRight, ArrowDownRight, Users, Eye, FolderKanban, MessageSquare } from "lucide-react";
import { useDashboard } from "../../components/dashboard/DashboardContext";

const DashboardOverview = () => {
    const { projects, messages } = useDashboard();

    const stats = [
        { label: "Total Views", value: "12,450", change: "+12.5%", isPositive: true, icon: Eye },
        { label: "Unique Visitors", value: "3,200", change: "+5.2%", isPositive: true, icon: Users },
        { label: "Projects", value: projects.length.toString(), change: "+2", isPositive: true, icon: FolderKanban },
        { label: "Messages", value: messages.length.toString(), change: messages.filter(m => !m.read).length > 0 ? `${messages.filter(m => !m.read).length} new` : "0 new", isPositive: true, icon: MessageSquare },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h1 className="font-display text-3xl font-bold tracking-tight text-white">Dashboard Overview</h1>
                <p className="text-muted-foreground text-sm">Welcome back, Admin. Here's a summary of your portfolio performance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="rounded-2xl border border-white/5 bg-[#0A0C10] p-6 flex flex-col justify-between relative overflow-hidden group hover:border-white/10 transition-colors">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500">
                            <stat.icon size={80} />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <stat.icon size={20} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                {stat.change}
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white mb-1 font-display">{stat.value}</div>
                            <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Mockup */}
                <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-[#0A0C10] p-6 flex flex-col min-h-[400px]">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white font-display">Traffic Overview</h2>
                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-muted-foreground outline-none focus:border-primary/50">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div className="flex-1 rounded-xl bg-gradient-to-t from-primary/5 to-transparent border border-primary/20 flex flex-col items-center justify-center p-4 shadow-[inset_0_0_20px_rgba(14,165,233,0.05)]">
                        <div className="text-primary/40 font-bold font-display text-xl animate-pulse">
                            Activity Chart
                        </div>
                        <div className="text-muted-foreground text-xs mt-2">Mock data visualization</div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="rounded-2xl border border-white/5 bg-[#0A0C10] p-6 flex flex-col min-h-[400px]">
                    <h2 className="text-lg font-semibold text-white font-display mb-6">Recent Activity</h2>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-none">
                        {[
                            { title: "New Message Received", time: "2 hours ago", type: "message", color: "text-blue-500", bg: "bg-blue-500/10" },
                            { title: "Project 'Nebula OS' updated", time: "5 hours ago", type: "project", color: "text-primary", bg: "bg-primary/10" },
                            { title: "Blog post published", time: "1 day ago", type: "blog", color: "text-green-500", bg: "bg-green-500/10" },
                            { title: "Profile details updated", time: "2 days ago", type: "system", color: "text-orange-500", bg: "bg-orange-500/10" },
                            { title: "New Comment on Auth Setup", time: "3 days ago", type: "comment", color: "text-purple-500", bg: "bg-purple-500/10" },
                        ].map((activity, i) => (
                            <div key={i} className="flex gap-4 relative before:absolute before:left-4 before:top-8 before:bottom-[-24px] before:w-px before:bg-white/5 last:before:hidden">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${activity.bg} ${activity.color}`}>
                                    <div className="w-2 h-2 rounded-full bg-current" />
                                </div>
                                <div className="space-y-1 pb-2">
                                    <p className="text-sm font-medium text-white leading-none">{activity.title}</p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardOverview;
