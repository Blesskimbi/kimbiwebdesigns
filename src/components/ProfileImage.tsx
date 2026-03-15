import { useEffect, useRef } from "react";
import gsap from "gsap";

const ProfileImage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const shadowRef = useRef<HTMLDivElement>(null);
    const logosRef = useRef<(HTMLDivElement | null)[]>([]);

    const techStack = [
        { name: "WordPress", icon: "https://cdn.simpleicons.org/wordpress/21759B", pos: { top: "-10%", left: "0%" } },
        { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB", pos: { top: "15%", right: "-15%" } },
        { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E", pos: { bottom: "20%", left: "-20%" } },
        { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26", pos: { top: "30%", left: "-15%" } },
        { name: "CSS3", icon: "https://cdn.simpleicons.org/css3/1572B6", pos: { bottom: "10%", right: "0%" } },
        { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6", pos: { top: "60%", right: "-20%" } },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Gentle float animation
            gsap.to(containerRef.current, {
                y: -20,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // Tech logos floating swarm
            logosRef.current.forEach((logo, i) => {
                if (!logo) return;
                gsap.to(logo, {
                    y: i % 2 === 0 ? -15 : 15,
                    x: i % 3 === 0 ? 10 : -10,
                    duration: 2.5 + i * 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.2,
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
                    const factor = 0.03 + (i * 0.01);
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
        <div className="relative w-full max-w-[450px] aspect-square mx-auto flex items-center justify-center">
            <div ref={containerRef} className="relative w-full h-[90%]">
                {/* Background Aura Glow */}
                <div
                    ref={glowRef}
                    className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/20 rounded-full blur-[80px] opacity-40"
                />

                {/* Image Container */}
                <div
                    ref={imageRef}
                    className="relative z-10 w-full h-full"
                >
                    <div className="w-full h-full relative">
                        <img
                            src="/blesskimbi.png"
                            alt="Bless Kimbi"
                            className="w-full h-full object-contain object-bottom scale-110"
                            onError={(e) => {
                                // Fallback if image fails
                                e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
                            }}
                        />
                        {/* Subtle overlay removed for truer cutout feel */}
                    </div>
                </div>

                {/* Tech Logos Swarm */}
                {techStack.map((tech, i) => (
                    <div
                        key={tech.name}
                        ref={(el) => { logosRef.current[i] = el; }}
                        style={{ ...tech.pos }}
                        className="absolute z-20 w-12 h-12 md:w-14 md:h-14 bg-glass border border-white/10 rounded-2xl p-2.5 flex items-center justify-center backdrop-blur-md shadow-xl transition-transform hover:scale-110"
                    >
                        <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-full h-full object-contain filter drop-shadow-sm"
                        />
                    </div>
                ))}

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
