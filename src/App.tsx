import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UpsideDownProvider } from "@/contexts/UpsideDownContext";
import { UpsideDownOverlay } from "@/components/UpsideDownOverlay";
import { KonamiCodeListener } from "@/components/KonamiCodeListener";
import { toast } from "sonner";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import StiveLanding from "./pages/stive/Landing";
import StiveUpload from "./pages/stive/Upload";
import StiveAnalyze from "./pages/stive/Analyze";
import StiveGenerate from "./pages/stive/Generate";
import StiveUniverse from "./pages/stive/Universe";

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
      toast.error("Something went wrong. The app recovered automatically.");
      event.preventDefault();
    };

    window.addEventListener("unhandledrejection", handleRejection);
    return () => window.removeEventListener("unhandledrejection", handleRejection);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <UpsideDownProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <KonamiCodeListener />
            <UpsideDownOverlay />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/stive" element={<StiveLanding />} />
                <Route path="/stive/upload" element={<StiveUpload />} />
                <Route path="/stive/analyze" element={<StiveAnalyze />} />
                <Route path="/stive/generate" element={<StiveGenerate />} />
                <Route path="/stive/universe" element={<StiveUniverse />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </UpsideDownProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
