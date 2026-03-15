import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";
import { DashboardProvider } from "./DashboardContext";

const DashboardLayout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <LenisSmoothScroll>
            {/* Dark background base to ensure consistency with main site */}
            <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans text-foreground selection:bg-primary/30">
                <Sidebar />

                {/* Mobile Sidebar Overlay */}
                {mobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm animate-in fade-in"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}

                <div className="flex-1 flex flex-col min-w-0">
                    <TopBar onMenuClick={() => setMobileMenuOpen(true)} />

                    <main className="flex-1 overflow-x-hidden p-6 lg:p-10 relative bg-[#050505]">
                        <Outlet />
                    </main>
                </div>
            </div>
        </LenisSmoothScroll>
    );
};

export default DashboardLayout;
