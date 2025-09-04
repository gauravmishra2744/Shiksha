import React from "react";
import { Loader2, BookOpen } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 text-main animate-spin" />
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
