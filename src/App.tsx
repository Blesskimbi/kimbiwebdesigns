import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { cities, cityPath } from "@/data/cities.mjs";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
// NotFound is kept eager — tiny, needed on every unmatched URL with no delay
import NotFound from "./pages/NotFound.tsx";
import Analytics from "./components/Analytics.tsx";
import SiteFooterGate from "./components/SiteFooter.tsx";

// All page-level components are lazy so Vite creates separate async chunks.
// Each chunk only pulls in the vendor libs that page actually imports:
//   Index/Services/Blog/Contact → gsap (via Navbar + LenisSmoothScroll)
//   ProjectsPage/ProjectDetailPage → + vendor-supabase
//   BlogPostPage                   → + vendor-md (react-markdown etc.)
//   DashboardLayout                → entirely separate; never touches public bundles
const Index             = lazy(() => import("./pages/Index.tsx"));
const ServicesPage      = lazy(() => import("./pages/ServicesPage.tsx"));
const ProjectsPage      = lazy(() => import("./pages/ProjectsPage.tsx"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage.tsx"));
const BlogPage          = lazy(() => import("./pages/BlogPage.tsx"));
const BlogPostPage      = lazy(() => import("./pages/BlogPostPage.tsx"));
const ContactPage       = lazy(() => import("./pages/ContactPage.tsx"));
const AboutPage         = lazy(() => import("./pages/AboutPage.tsx"));
const DashboardLayout          = lazy(() => import("./components/dashboard/DashboardLayout.tsx"));
const CommunityPage            = lazy(() => import("./pages/CommunityPage.tsx"));
const SeoCompanyPage             = lazy(() => import("./pages/SeoCompanyPage.tsx"));
const EcommerceWebsiteDesignPage = lazy(() => import("./pages/EcommerceWebsiteDesignPage.tsx"));
const SocialMediaPage            = lazy(() => import("./pages/SocialMediaPage.tsx"));
const MobileAppPage              = lazy(() => import("./pages/MobileAppPage.tsx"));
const UiUxDesignPage             = lazy(() => import("./pages/UiUxDesignPage.tsx"));
const CityPage                   = lazy(() => import("./pages/CityPage.tsx"));

// Minimal fallback: matches site background so prerendered HTML is preserved
// without any flash. Playwright's networkidle waits until lazy chunks load.
const PageShell = () => <div className="min-h-screen bg-background" aria-hidden="true" />;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Analytics />
        <Suspense fallback={<PageShell />}>
          <Routes>
            <Route path="/"               element={<Index />} />
            <Route path="/services"       element={<ServicesPage />} />
            <Route path="/projects"       element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/blog"           element={<BlogPage />} />
            <Route path="/blog/:slug"     element={<BlogPostPage />} />
            <Route path="/contact"        element={<ContactPage />} />
            <Route path="/about"          element={<AboutPage />} />
            <Route path="/community"      element={<CommunityPage />} />
            <Route path="/seo-company-in-cameroon" element={<SeoCompanyPage />} />
            <Route path="/ecommerce-website-design-in-cameroon" element={<EcommerceWebsiteDesignPage />} />
            <Route path="/social-media-management" element={<SocialMediaPage />} />
            <Route path="/mobile-app-development" element={<MobileAppPage />} />
            <Route path="/ui-ux-design" element={<UiUxDesignPage />} />
            {/* Location pages. Listed one by one because a React Router
                dynamic segment has to be a whole segment, and these URLs put
                the city in the same segment as the keyword. */}
            {cities.map(({ slug }) => (
              <Route
                key={slug}
                path={cityPath(slug).slice(0, -1)}
                element={<CityPage slug={slug} />}
              />
            ))}
            <Route path="/dashboard/*"    element={<DashboardLayout />} />
            <Route path="*"               element={<NotFound />} />
          </Routes>
          <SiteFooterGate />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
