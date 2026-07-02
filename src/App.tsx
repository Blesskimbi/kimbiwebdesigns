import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
// NotFound is kept eager — tiny, needed on every unmatched URL with no delay
import NotFound from "./pages/NotFound.tsx";
import Analytics from "./components/Analytics.tsx";

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
const DashboardLayout   = lazy(() => import("./components/dashboard/DashboardLayout.tsx"));
const CommunityPage     = lazy(() => import("./pages/CommunityPage.tsx"));

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
            <Route path="/community"      element={<CommunityPage />} />
            <Route path="/dashboard/*"    element={<DashboardLayout />} />
            <Route path="*"               element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
