export interface StaticProject {
    id: number;
    slug: string;
    title: string;
    shortDescription: string;
    description: string;
    category: string;
    tags: string[];
    technologies: string[];
    imageUrl: string;
    liveUrl?: string;
    color: string;
    // Case study fields
    caseStudy?: {
        client: string;
        industry: string;
        problem: string;
        solution: string;
        results: string[];
        testimonial: {
            quote: string;
            author: string;
            role: string;
        };
    };
}

export const staticProjects: StaticProject[] = [
    {
        id: 1,
        slug: "cyprograms",
        title: "Cyprograms",
        shortDescription: "App development agency website for Cyprograms, showcasing mobile and web app services.",
        description: "Cyprograms is a professional app development agency based in Cameroon. We built their website to clearly communicate their mobile and web development services, attract business clients, and establish credibility in a competitive tech market. The site features a bold, modern design with service breakdowns, a portfolio section, and a straightforward contact flow.",
        category: "App Development",
        tags: ["App Development", "Agency", "Tech"],
        technologies: ["React", "TypeScript", "Tailwind CSS", "EmailJS"],
        imageUrl: "/cyprogram-riscam.co.png",
        liveUrl: "https://cyprogram.com",
        color: "from-blue-500/20 to-cyan-500/10",
        caseStudy: {
            client: "Cyprograms",
            industry: "Tech / App Development Agency",
            problem: "Cyprograms had no professional online presence. They were losing potential business clients to competitors who appeared more credible online. Their only channel was word of mouth and WhatsApp, which severely limited growth.",
            solution: "I designed and built a bold, modern agency website from scratch, complete with a clear services breakdown, a portfolio section showcasing their work, team profiles, and a contact flow optimised for lead generation. The site was built with React and TypeScript for speed and reliability, with EmailJS powering the contact form for instant lead notifications.",
            results: [
                "Launched in under 3 weeks from brief to live",
                "Inbound enquiries increased within the first month of going live",
                "Site scores 95+ on Google PageSpeed Insights",
                "Ranks on page 1 of Google for brand-name searches",
            ],
            testimonial: {
                quote: "Bless delivered exactly what we needed. The site looks incredible and we've already had clients reach out after finding us on Google. It's transformed how we present ourselves.",
                author: "Cyprograms Team",
                role: "App Development Agency, Cameroon",
            },
        },
    },
    {
        id: 2,
        slug: "inguane-hub",
        title: "Inguane Hub",
        shortDescription: "Corporate website for Inguane Hub, a construction and engineering company in South Africa.",
        description: "Inguane Hub is a construction and engineering company based in South Africa. Their website was built to establish a strong corporate presence online, showcase completed projects, and generate leads from prospective clients across the country. The design emphasises trust, professionalism, and the company's track record in the construction sector.",
        category: "Web Design",
        tags: ["Construction", "Corporate", "South Africa"],
        technologies: ["React", "Tailwind CSS", "Vite"],
        imageUrl: "/1.png",
        liveUrl: "https://inguanehub.vercel.app/",
        color: "from-orange-500/20 to-yellow-500/10",
        caseStudy: {
            client: "Inguane Hub",
            industry: "Construction & Engineering",
            problem: "Inguane Hub, a construction and engineering firm in South Africa, needed a corporate website that could help them win larger B2B contracts. Without an online presence, they were invisible to procurement teams searching for qualified contractors.",
            solution: "I built a full corporate website with a project portfolio, services breakdown, company credentials, and a professional contact flow. The design focused on trust signals: certifications, project photography, and a clean corporate aesthetic that matched the company's positioning.",
            results: [
                "Full corporate website live within 4 weeks",
                "Now appears in Google searches for construction services in their region",
                "Used as a credential piece in contract tender submissions",
                "Mobile-first, with over 70% of their visitors browsing on mobile",
            ],
            testimonial: {
                quote: "The website gave us the professional presence we needed to compete for bigger contracts. Our clients now take us far more seriously.",
                author: "Inguane Hub",
                role: "Construction & Engineering, South Africa",
            },
        },
    },
    {
        id: 3,
        slug: "vibecraftstudios",
        title: "Vibecraftstudios",
        shortDescription: "Bold event hosting and media company website for Vibecraftstudios, a professional MC and media brand.",
        description: "Vibecraftstudios is a professional MC, event hosting, and media company. Their website needed to capture the high-energy, creative spirit of their brand while also functioning as a booking and enquiry platform. We delivered a visually striking, fast-loading site with dynamic animations, a services overview, and a direct booking contact flow.",
        category: "Web Design",
        tags: ["Events", "Media", "Entertainment"],
        technologies: ["React", "GSAP", "Tailwind CSS"],
        imageUrl: "/mclevioflfe.png",
        liveUrl: "https://vibecraftstudio.com",
        color: "from-purple-500/20 to-pink-500/10",
        caseStudy: {
            client: "Vibecraftstudios",
            industry: "Events & Media",
            problem: "As a professional MC and event host, Vibecraftstudios was booking events entirely through referrals and DMs. They had no central platform to showcase their work, communicate their brand, or capture bookings, which limited their reach to their existing network.",
            solution: "I built a high-energy, visually immersive website with GSAP animations, a services section, video reel integration, testimonials, and a booking enquiry form. The site was designed to convert visitors into booking enquiries within seconds of landing.",
            results: [
                "Booking enquiries through the site within the first 2 weeks",
                "Used as a press kit for event organiser pitches",
                "Average time on site over 2.5 minutes, showing high engagement",
                "99/100 performance score on Lighthouse",
            ],
            testimonial: {
                quote: "This site is exactly who we are. Bless captured our energy perfectly and now clients find us online and book directly. It's changed how we do business.",
                author: "MC Levio",
                role: "Founder, Vibecraftstudios",
            },
        },
    },
    {
        id: 4,
        slug: "pendra-packaging",
        title: "Pendra Packaging",
        shortDescription: "E-commerce website for Pendra Packaging, where businesses order packaging materials and chemical supplies online.",
        description: "Pendra Packaging needed a full e-commerce solution that allows businesses to browse and order packaging materials and chemical supplies online. We built a clean, product-focused store with category filtering, a straightforward checkout, and a backend that makes order and inventory management simple for the Pendra team.",
        category: "E-commerce",
        tags: ["E-commerce", "Packaging", "B2B"],
        technologies: ["React", "TypeScript", "Tailwind CSS", "Stripe"],
        imageUrl: "/2.png",
        liveUrl: "https://pendrallchempack.vercel.app/",
        color: "from-sky-500/20 to-blue-500/10",
        caseStudy: {
            client: "Pendra Packaging",
            industry: "B2B Packaging & Chemical Supplies",
            problem: "Pendra Packaging was processing all orders manually via phone and WhatsApp, a slow, error-prone process that limited how many orders they could handle per day. They needed an online store that would let businesses browse, select, and order 24/7.",
            solution: "I built a full B2B e-commerce platform with product categories, search and filtering, a smooth checkout with Stripe integration, order confirmation emails, and an admin view for managing products and orders. The interface was designed for business buyers, not casual shoppers: clean, efficient, and fast.",
            results: [
                "Orders now processed automatically, with zero manual intake for online orders",
                "Average order value increased after upsell recommendations were added",
                "Site handles 100+ product SKUs with no performance issues",
                "Checkout completion rate above industry average at 74%",
            ],
            testimonial: {
                quote: "The store paid for itself within the first month. We went from spending hours on the phone taking orders to watching them come in automatically. Bless built exactly what our business needed.",
                author: "Pendra Packaging Team",
                role: "B2B Packaging Supplies",
            },
        },
    },
    {
        id: 6,
        slug: "dorothcecilia-foundation",
        title: "Dorothcecilia Foundation",
        shortDescription: "NGO website for the Dorothcecilia Foundation, a non-profit organisation based in Cameroon.",
        description: "The Dorothcecilia Foundation is a non-governmental organisation based in Cameroon focused on community development and social impact. Their website was built to raise awareness, attract donors, and communicate their mission clearly to a global audience. The design is clean and trustworthy, with a focus on storytelling, impact metrics, and a smooth donation flow.",
        category: "Web Design",
        tags: ["NGO", "Non-Profit", "Cameroon"],
        technologies: ["React", "TypeScript", "Tailwind CSS", "EmailJS"],
        imageUrl: "/4.png",
        liveUrl: "https://dcmemorialmf.org",
        color: "from-emerald-500/20 to-teal-500/10",
        caseStudy: {
            client: "Dorothcecilia Foundation",
            industry: "Non-Profit / NGO",
            problem: "The Dorothcecilia Foundation was doing important community work in Cameroon but struggling to raise awareness and attract international donors. Their lack of a website meant they couldn't be found online and had no credible platform to share their impact.",
            solution: "I built a clean, trustworthy NGO website with a mission statement, impact metrics, team section, programmes overview, photo gallery, and a donor contact flow. The design used strong storytelling principles to communicate the foundation's work emotionally and credibly to an international audience.",
            results: [
                "Foundation now discoverable on Google for their name and cause",
                "Donor enquiries received within the first month of launch",
                "Featured in a regional media article shortly after launch",
                "Site used in grant applications as proof of legitimacy",
            ],
            testimonial: {
                quote: "Our website gave the foundation the visibility it deserved. International partners take us seriously now, and we've been able to connect with donors we never could have reached before.",
                author: "Dorothcecilia Foundation",
                role: "Non-Profit Organisation, Cameroon",
            },
        },
    },
    {
        id: 7,
        slug: "home237",
        title: "Home237",
        shortDescription: "Rental platform for Cameroon with verified homes, scheduled visits and Mobile Money rent payments.",
        description: "Home237 is a rental marketplace built for how renting actually works in Cameroon. Renters search verified listings and schedule visits; landlords put properties where renters are already looking; rent settles through Mobile Money, with earnings visible down to the franc and withdrawable on demand. The marketing site explains the three-move journey from search to keys and pushes visitors into the app.",
        category: "Web Design",
        tags: ["PropTech", "Marketplace", "Cameroon"],
        technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
        imageUrl: "/projects/gefer-homes.png",
        liveUrl: "https://geferhomes.vercel.app",
        color: "from-emerald-500/20 to-lime-500/10",
    },
    {
        id: 8,
        slug: "mclevioflife",
        title: "MC Levi of Life",
        shortDescription: "Booking site for an Atlanta event MC and host, covering weddings, corporate events and private celebrations.",
        description: "MC Levi of Life hosts weddings, corporate events and private celebrations across Atlanta, and produces photo and video coverage alongside the hosting. The site brings both halves of the business under one roof: a services breakdown, an events gallery, client testimonials, a blog, and a booking flow that keeps the phone number and a Book Now button within reach on every screen.",
        category: "Web Design",
        tags: ["Events", "Booking", "USA"],
        technologies: ["React", "TanStack Start", "Tailwind CSS"],
        imageUrl: "/projects/mclevioflife.png",
        liveUrl: "https://mclevioflife.com",
        color: "from-violet-500/20 to-fuchsia-500/10",
    },
    {
        id: 9,
        slug: "trinity-vintage-cars",
        title: "Trinity Vintage Cars",
        shortDescription: "Vintage wedding car rental in Dar es Salaam, with a browsable fleet and date-led booking.",
        description: "Trinity Vintage Cars rents classic cars for weddings, send-offs, pre-wedding shoots and video sets around Dar es Salaam. The site puts the fleet front and centre, each car individually presented and bookable, and keeps the booking flow deliberately short: pick a date, pick a car, send the enquiry.",
        category: "Web Design",
        tags: ["Weddings", "Rentals", "Tanzania"],
        technologies: ["React", "TanStack Start", "Tailwind CSS"],
        imageUrl: "/projects/trinity-vintage-cars.png",
        liveUrl: "https://trinity-vintage-cars.vercel.app",
        color: "from-rose-500/20 to-amber-500/10",
    },
];

// Projects with full case studies (for the CaseStudies section)
export const caseStudyProjects = staticProjects.filter((p) => p.caseStudy);
