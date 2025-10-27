import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepGamificationProps {
  show: boolean;
  message: string;
  onComplete?: () => void;
}

export const StepGamification = ({ show, message, onComplete }: StepGamificationProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="animate-scale-in bg-success text-success-foreground rounded-2xl px-8 py-4 shadow-2xl flex items-center gap-3 pointer-events-auto">
        <div className="w-8 h-8 bg-success-foreground/20 rounded-full flex items-center justify-center animate-check-pop">
          <Check className="w-5 h-5" />
        </div>
        <span className="font-semibold text-lg">{message}</span>
      </div>
      
      {/* Confetti particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 animate-confetti"
            style={{
              left: `${45 + Math.random() * 10}%`,
              top: "50%",
              backgroundColor: i % 3 === 0 ? "#EA671C" : i % 3 === 1 ? "#6C256C" : "#0E945C",
              animationDelay: `${i * 0.1}s`,
              borderRadius: i % 2 === 0 ? "50%" : "0",
            }}
          />
        ))}
      </div>
    </div>
  );
};
