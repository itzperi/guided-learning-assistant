
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AssistantProvider } from "@/context/AssistantContext";
import Indexr from "./Indexes";
import Physics from "./Physics";
import Chapter from "./Chapter";
import Chemistry from "./Chemistry";
import Math from "./Math";
import ComputerScience from "./ComputerScience";
import Biology from "./Biology";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AssistantProvider>
                <Indexr />
              </AssistantProvider>
            }
          />
          <Route
            path="/physics"
            element={
              <AssistantProvider>
                <Physics />
              </AssistantProvider>
            }
          />
          <Route
            path="/chemistry"
            element={
              <AssistantProvider>
                <Chemistry />
              </AssistantProvider>
            }
          />
          <Route
            path="/math"
            element={
              <AssistantProvider>
                <Math />
              </AssistantProvider>
            }
          />
          <Route
            path="/computer-science"
            element={
              <AssistantProvider>
                <ComputerScience />
              </AssistantProvider>
            }
          />
          <Route
            path="/biology"
            element={
              <AssistantProvider>
                <Biology />
              </AssistantProvider>
            }
          />
          {/* Updated chapter routes for all subjects */}
          <Route
            path="/:subject/:chapterId"
            element={
              <AssistantProvider>
                <Chapter />
              </AssistantProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
