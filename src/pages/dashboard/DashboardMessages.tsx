import { Search, Mail, MailOpen, Trash2, Reply, MoreHorizontal, Inbox } from "lucide-react";
import { useState, useEffect } from "react";
import { useDashboard } from "../../components/dashboard/DashboardContext";

const DashboardMessages = () => {
    const { messages, markMessageAsRead, markMessageAsUnread, deleteMessage } = useDashboard();

    // Default selected message to the first one available
    const [selectedMsg, setSelectedMsg] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredMessages = messages.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeMessage = messages.find(m => m.id === selectedMsg);

    // Auto-mark as read when selecting a message
    useEffect(() => {
        if (activeMessage && !activeMessage.read) {
            markMessageAsRead(activeMessage.id);
        }
    }, [selectedMsg, activeMessage, markMessageAsRead]);

    // Handle delete action
    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            deleteMessage(id);
            if (selectedMsg === id) {
                setSelectedMsg(null);
            }
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 flex flex-col h-[calc(100vh-8rem)]">
            <div className="flex flex-col gap-2 shrink-0">
                <h1 className="font-display text-3xl font-bold tracking-tight text-white">Messages</h1>
                <p className="text-muted-foreground text-sm">View and respond to incoming inquiries from your site.</p>
            </div>

            <div className="flex-1 rounded-2xl border border-white/5 bg-[#0A0C10] flex overflow-hidden shadow-xl min-h-[500px]">
                {/* Left Sidebar - Message List */}
                <div className="w-full md:w-80 lg:w-96 border-r border-white/5 flex flex-col bg-[#0A0C10] shrink-0">
                    <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search messages..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-background border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-white/5 scrollbar-none">
                        {filteredMessages.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
                                <Inbox size={32} className="text-white/10" />
                                No messages found.
                            </div>
                        ) : (
                            filteredMessages.map(msg => (
                                <button
                                    key={msg.id}
                                    onClick={() => setSelectedMsg(msg.id)}
                                    className={`w-full text-left p-4 hover:bg-white/[0.02] transition-colors flex flex-col gap-1 relative ${selectedMsg === msg.id ? 'bg-primary/5 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-primary' : ''}`}
                                >
                                    <div className="flex justify-between items-start gap-2 mb-1">
                                        <span className={`font-semibold text-sm truncate ${!msg.read ? 'text-white' : 'text-muted-foreground'}`}>{msg.name}</span>
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">{msg.date}</span>
                                    </div>
                                    <div className={`text-sm font-medium truncate ${!msg.read ? 'text-white' : 'text-white/80'}`}>
                                        {msg.subject}
                                    </div>
                                    <div className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                        {msg.preview}
                                    </div>
                                    {!msg.read && <div className="w-2 h-2 rounded-full bg-primary absolute right-4 top-10 shadow-[0_0_8px_rgba(14,165,233,0.8)]" />}
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Area - Message View */}
                {activeMessage ? (
                    <div className="flex-1 flex flex-col hidden md:flex min-w-0 bg-[#0A0C10]">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
                            <div>
                                <h2 className="text-xl font-display font-semibold text-white mb-1">{activeMessage.subject}</h2>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="font-medium text-white/80">{activeMessage.name}</span>
                                    <span>&lt;{activeMessage.email}&gt;</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground shadow-sm">
                                <button
                                    onClick={() => markMessageAsUnread(activeMessage.id)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors hover:text-white"
                                    title="Mark as Unread"
                                >
                                    <Mail size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(activeMessage.id)}
                                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors hover:text-red-500"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <button className="p-2 hover:bg-white/10 rounded-lg transition-colors hover:text-white" title="More">
                                    <MoreHorizontal size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto scrollbar-none">
                            <div className="text-sm text-muted-foreground mb-6 bg-white/[0.02] inline-block px-3 py-1 rounded-md">{activeMessage.date}</div>
                            <div className="text-white/90 leading-relaxed text-[15px] space-y-4 whitespace-pre-wrap">
                                {activeMessage.fullMessage || activeMessage.preview}
                            </div>
                        </div>

                        <div className="p-4 border-t border-white/5 shrink-0 bg-white/[0.01]">
                            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-all shadow-lg shadow-primary/20">
                                <Reply size={18} />
                                Reply to {activeMessage.name}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4">
                        <MailOpen size={48} className="text-white/10" />
                        <p>Select a message to read it</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default DashboardMessages;
