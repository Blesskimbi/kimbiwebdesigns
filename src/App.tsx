import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import ProjectsPage from "./pages/ProjectsPage.tsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import BlogPostPage from "./pages/BlogPostPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/"                element={<Index />} />
            <Route path="/services"        element={<ServicesPage />} />
            <Route path="/projects"        element={<ProjectsPage />} />
            <Route path="/projects/:slug"  element={<ProjectDetailPage />} />
            <Route path="/blog"            element={<BlogPage />} />
            <Route path="/blog/:slug"      element={<BlogPostPage />} />
            <Route path="/contact"         element={<ContactPage />} />
            <Route path="/dashboard/*" element={<DashboardLayout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
