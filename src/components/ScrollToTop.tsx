import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 p-3 bg-white/5 border border-white/10 text-white rounded-full shadow-lg backdrop-blur-md hover:bg-primary hover:border-primary hover:text-primary-foreground hover:scale-110 hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} />
                </button>
            )}
        </>
    );
};

export default ScrollToTop;
