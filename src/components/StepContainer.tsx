import { ReactNode } from "react";

interface StepContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const StepContainer = ({ children, title, subtitle }: StepContainerProps) => {
  return (
    <div className="min-h-screen flex justify-center p-6 pt-12 animate-slide-in">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-3 text-center">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">{title}</h1>
          {subtitle && <p className="text-muted-foreground text-base leading-relaxed">{subtitle}</p>}
        </div>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};
