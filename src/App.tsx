import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { toast } from "sonner";
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
import DropDetail from "./pages/DropDetail";
import StudioPreview from "./pages/StudioPreview";
const OAuthConsent = lazy(() => import("./pages/OAuthConsent"));
import NotFound from "./pages/NotFound";
import { StudioState } from "./components/StudioChrome";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      meta: {},
    },
    mutations: {
      meta: {},
    },
  },
});

const App = () => {
  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled rejection caught:", event.reason);
      toast.error("Something went wrong. Please try again.");
      event.preventDefault();
    };

    window.addEventListener("unhandledrejection", handleRejection);
    return () => window.removeEventListener("unhandledrejection", handleRejection);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<StudioState title="Opening your page…"><p role="status">Just a moment.</p></StudioState>}>
              <Routes>
                <Route path="/" element={<StudioPreview />} />
                <Route path="/index" element={<Navigate to="/" replace />} />
                <Route path="/drops/:slug" element={<DropDetail />} />
                <Route path="/studio" element={<Navigate to="/" replace />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
