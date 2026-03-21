import { useEffect, useRef } from "react";
import gsap from "gsap";

const ProfileImage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const shadowRef = useRef<HTMLDivElement>(null);
    const logosRef = useRef<(HTMLDivElement | null)[]>([]);

    const techStack = [
        { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
        { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
        { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
        { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
        { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
        { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
        { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
        { name: "GitHub", icon: "https://cdn.simpleicons.org/github/FFFFFF" },
        { name: "Canva", icon: "https://img.icons8.com/ios-filled/50/FFFFFF/canva.png" },
        { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
        { name: "Photoshop", icon: "https://cdn.simpleicons.org/adobephotoshop/31A8FF" },
        { name: "Illustrator", icon: "https://cdn.simpleicons.org/adobeillustrator/FF9A00" },
        { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },

        { name: "Vite", icon: "https://cdn.simpleicons.org/vite/646CFF" },
        { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
        { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
        { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Gentle float animation for the image
            gsap.to(containerRef.current, {
                y: -15,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // Tech logos floating swarm + Orbit animation
            logosRef.current.forEach((logo, i) => {
                if (!logo) return;
                
                // Initial floating
                gsap.to(logo, {
                    y: i % 2 === 0 ? -12 : 12,
                    x: i % 3 === 0 ? 10 : -10,
                    duration: 2.5 + i * 0.3,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.15,
                });
            });

            // Synchronized Shadow Animation
            gsap.to(shadowRef.current, {
                scale: 0.8,
                opacity: 0.2,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // Pulse glow
            gsap.to(glowRef.current, {
                opacity: 0.6,
                scale: 1.1,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });

            // Mouse parallax
            const onMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const x = (clientX - window.innerWidth / 2) * 0.02;
                const y = (clientY - window.innerHeight / 2) * 0.02;

                gsap.to(imageRef.current, {
                    x: x,
                    y: y,
                    duration: 1,
                    ease: "power2.out",
                });

                // Parallax for logos
                logosRef.current.forEach((logo, i) => {
                    if (!logo) return;
                    const factor = 0.025 + (i * 0.005);
                    gsap.to(logo, {
                        x: x * factor * 50,
                        y: y * factor * 50,
                        duration: 1.5,
                        ease: "power2.out",
                    });
                });
            };

            window.addEventListener("mousemove", onMove);
            return () => window.removeEventListener("mousemove", onMove);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative w-full max-w-[480px] aspect-square mx-auto flex items-center justify-center">
            <div ref={containerRef} className="relative w-full h-[95%]">
                {/* Background Aura Glow */}
                <div
                    ref={glowRef}
                    className="absolute inset-x-0 bottom-0 top-1/4 bg-gradient-to-tr from-primary/40 to-secondary/30 rounded-full blur-[100px] opacity-40"
                />

                {/* Image Container */}
                <div
                    ref={imageRef}
                    className="relative z-10 w-full h-full flex items-center justify-center"
                >
                    <div className="w-[75%] h-[75%] relative rounded-full overflow-hidden border-4 border-white/10 p-2 bg-glass backdrop-blur-sm shadow-2xl">
                        <img
                            src="/blesskimbi.png"
                            alt="Bless Kimbi"
                            className="w-full h-full object-cover rounded-full"
                            onError={(e) => {
                                e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
                            }}
                        />
                    </div>
                </div>

                {/* Tech Logos Circle */}
                {techStack.map((tech, i) => {
                    const total = techStack.length;
                    const angle = (i / total) * Math.PI * 2 - Math.PI / 2; // Start from top
                    const radius = 62; // percentage
                    const x = 50 + radius * Math.cos(angle);
                    const y = 50 + radius * Math.sin(angle);

                    return (
                        <div
                            key={tech.name}
                            ref={(el) => { logosRef.current[i] = el; }}
                            style={{ 
                                left: `${x}%`, 
                                top: `${y}%`,
                                transform: 'translate(-50%, -50%)' 
                            }}
                            className="absolute z-20 w-9 h-9 md:w-11 md:h-11 bg-white/10 border border-white/20 rounded-xl p-2 flex items-center justify-center backdrop-blur-md shadow-lg transition-all hover:scale-125 hover:bg-white/20 hover:border-white/40 group"
                        >
                            <img
                                src={tech.icon}
                                alt={tech.name}
                                className="w-full h-full object-contain filter drop-shadow-sm brightness-110"
                                title={tech.name}
                            />
                            {/* Tooltip */}
                            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {tech.name}
                            </span>
                        </div>
                    );
                })}

                {/* Decorative glass elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-glass border border-white/10 rounded-2xl -rotate-12 blur-[1px] opacity-50" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-glass border border-white/10 rounded-full rotate-12 blur-[1px] opacity-30" />
            </div>

            {/* Floating Shadow/Glow Underneath */}
            <div
                ref={shadowRef}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-primary/20 rounded-[100%] blur-2xl"
            />
        </div>
    );
};

export default ProfileImage;
