import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isValid?: boolean;
  showValidation?: boolean;
  helperText?: string;
  error?: string;
}

export const ValidatedInput = ({
  isValid,
  showValidation,
  helperText,
  error,
  className,
  ...props
}: ValidatedInputProps) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          {...props}
          className={cn(
            "pr-10 transition-all duration-200",
            showValidation && isValid && "border-success focus-visible:ring-success",
            showValidation && !isValid && error && "border-destructive focus-visible:ring-destructive animate-shake",
            className
          )}
        />
        {showValidation && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isValid ? (
              <Check className="w-5 h-5 text-success animate-check-pop" />
            ) : error ? (
              <X className="w-5 h-5 text-destructive" />
            ) : null}
          </div>
        )}
      </div>
      {helperText && !error && (
        <p className="text-sm text-muted-foreground">{helperText}</p>
      )}
      {error && showValidation && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};
