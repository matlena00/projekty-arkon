import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MobileContactBar from "@/components/MobileContactBar";
import DesktopCallButton from "@/components/DesktopCallButton";
import Index from "./pages/Index.tsx";

// Code-splitting per trasa — podstrony ładują się na żądanie,
// dzięki czemu bundle strony głównej jest znacznie mniejszy.
const AboutPage = lazy(() => import("./pages/AboutPage.tsx"));
const ServicesPage = lazy(() => import("./pages/ServicesPage.tsx"));
const BlogPage = lazy(() => import("./pages/BlogPage.tsx"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage.tsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.tsx"));
const GalleryPage = lazy(() => import("./pages/GalleryPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Admin = lazy(() => import("./pages/Admin.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/o-nas" element={<AboutPage />} />
          <Route path="/uslugi" element={<ServicesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
        <MobileContactBar />
        <DesktopCallButton />
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
