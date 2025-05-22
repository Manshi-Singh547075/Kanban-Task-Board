import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import { ThemeProvider } from "./context/ThemeProvider";
import { TaskProvider } from "./context/TaskContext";

// Simple router component
function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Main App component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TaskProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </TaskProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
