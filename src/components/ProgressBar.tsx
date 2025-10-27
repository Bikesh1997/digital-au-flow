import { useOnboarding } from "@/contexts/OnboardingContext";

export const ProgressBar = () => {
  const { currentStep, totalSteps } = useOnboarding();
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="fixed top-0 left-0 w-full h-2 bg-muted z-50 shadow-sm">
      <div
        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
