import { useEffect, useState } from "react";
import { KanbanBoard } from "@/components/KanbanBoard";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

export default function Dashboard() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading effect with cute message
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "✨ Ready to organize! ✨",
        description: "Your cute task board is ready to use!",
      });
    }, 800);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <>
      <Helmet>
        <title>Visual Board</title>
        <meta name="description" content="Organize your tasks in a cute and fun way with this Kanban board" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-primary font-medium">Loading your cute tasks...</p>
          </div>
        ) : (
          <KanbanBoard />
        )}
      </div>
    </>
  );
}
