import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
}

export const Loader = ({ className }: LoaderProps) => {
  return (
    <div className={cn("fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50", className)}>
      <div className="relative">
        <div className="w-16 h-16 border-4 border-accent border-t-primary rounded-full animate-spin" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-secondary rounded-full animate-spin" style={{ animationDelay: "0.15s" }} />
      </div>
    </div>
  );
};
