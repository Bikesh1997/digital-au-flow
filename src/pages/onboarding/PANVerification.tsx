import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepContainer } from "@/components/StepContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { toast } from "sonner";

export const PANVerification = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [pan, setPan] = useState(data.pan || "");
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrentStep(2);
  }, [setCurrentStep]);

  useEffect(() => {
    const valid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan);
    setIsValid(valid);
  }, [pan]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, 10);
    setPan(value);
  };

  const handleSubmit = () => {
    if (!isValid) {
      toast.error("Please enter a valid PAN number");
      return;
    }

    setIsLoading(true);
    updateData({ pan });

    setTimeout(() => {
      setIsLoading(false);
      toast.success("PAN verified successfully!");
      navigate("/onboarding/dob");
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) {
      handleSubmit();
    }
  };

  return (
    <StepContainer
      title="Enter your PAN"
      subtitle="Enter PAN in format AAAAA1111A"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="AAAAA1111A"
            value={pan}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            maxLength={10}
            className={`text-lg h-14 rounded-2xl border-2 transition-all duration-300 text-center tracking-widest font-mono ${
              pan.length === 0
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
          {isLoading ? "Validating..." : "Validate PAN"}
        </Button>

        <p className="text-sm text-muted-foreground text-center">
          Your PAN information is secure and encrypted
        </p>
      </div>
    </StepContainer>
  );
};
