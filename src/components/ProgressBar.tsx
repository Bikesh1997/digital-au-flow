import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressBar = ({ currentStep, totalSteps, className }: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("w-full h-2 bg-accent rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
