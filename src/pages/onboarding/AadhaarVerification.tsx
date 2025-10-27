import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepContainer } from "@/components/StepContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { toast } from "sonner";

export const AadhaarVerification = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [aadhaar, setAadhaar] = useState(data.aadhaar || "");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  useEffect(() => {
    const cleaned = aadhaar.replace(/\s/g, "");
    const valid = /^\d{12}$/.test(cleaned);
    setIsValid(valid);
  }, [aadhaar]);

  const formatAadhaar = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 12);
    const parts = cleaned.match(/.{1,4}/g);
    return parts ? parts.join(" ") : cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaar(e.target.value);
    setAadhaar(formatted);
  };

  const handleSubmit = () => {
    if (!isValid) {
      toast.error("Please enter a valid 12-digit Aadhaar number");
      return;
    }

    setIsLoading(true);
    updateData({ aadhaar: aadhaar.replace(/\s/g, "") });

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Aadhaar verified successfully!");
      navigate("/onboarding/pan");
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) {
      handleSubmit();
    }
  };

  return (
    <StepContainer
      title="Enter your Aadhaar Number"
      subtitle="Enter your 12-digit Aadhaar number"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
           inputMode="numeric"
            type="text"
            placeholder="1234 5678 9012"
            value={aadhaar}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            maxLength={14}
            className={`text-lg h-14 rounded-2xl border-2 transition-all duration-300 text-center tracking-widest ${
              aadhaar.length === 0
                ? "border-input"
                : isValid
                ? "border-success bg-success/5 animate-success-pulse"
                : "border-destructive bg-destructive/5 animate-shake"
            }`}
            autoFocus
          />
        </div>

        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!isValid || isLoading}
          className="w-full"
        >
          {isLoading ? "Validating..." : "Validate Aadhaar"}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Your Aadhaar information is secure and encrypted
        </p>
      </div>
    </StepContainer>
  );
};
