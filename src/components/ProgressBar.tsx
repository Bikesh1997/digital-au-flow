import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ChevronLeft } from "lucide-react";

export const ProgressBar = () => {
  const navigate = useNavigate();
  const { currentStep, totalSteps } = useOnboarding();
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="fixed top-0 left-0 w-full z-50 ">
      <div className="flex items-center px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-muted-foreground/10 transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex-1 h-2 bg-background rounded-full ml-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
