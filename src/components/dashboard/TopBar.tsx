import { Bell, Menu, Search, UserCircle } from "lucide-react";

interface TopBarProps {
    onMenuClick: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
    return (
        <header className="h-16 bg-[#0A0C10]/60 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <Menu size={20} />
                </button>

                <div className="hidden sm:flex items-center bg-white/5 rounded-full px-4 py-2 border border-white/5 focus-within:border-primary/50 transition-colors w-64 md:w-80">
                    <Search size={16} className="text-muted-foreground mr-2 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search dashboard..."
                        className="bg-transparent border-none outline-none text-sm text-foreground w-full placeholder:text-muted-foreground focus:ring-0"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-white/5">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-primary rounded-full border border-background animate-pulse"></span>
                </button>

                <div className="h-8 w-px bg-white/10 mx-2"></div>

                <button className="flex items-center gap-2 hover:bg-white/5 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-white/5">
                    <UserCircle size={32} className="text-muted-foreground" />
                    <div className="hidden sm:block text-left">
                        <div className="text-sm font-medium leading-none mb-1 text-white">Bless Kimbi</div>
                        <div className="text-xs text-primary leading-none">Super Admin</div>
                    </div>
                </button>
            </div>
        </header>
    );
};

export default TopBar;
