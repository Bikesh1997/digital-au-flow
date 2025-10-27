import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepContainer } from "@/components/StepContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";

export const DateOfBirth = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [dob, setDob] = useState(data.dob);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);

  useEffect(() => {
    if (!dob) {
      setIsValid(false);
      setErrorMessage("");
      return;
    }

    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      const adjustedAge = age - 1;
      if (adjustedAge < 18) {
        setIsValid(false);
        setErrorMessage("You must be at least 18 years old");
        return;
      }
    } else if (age < 18) {
      setIsValid(false);
      setErrorMessage("You must be at least 18 years old");
      return;
    }

    setIsValid(true);
    setErrorMessage("");
  }, [dob]);

  const handleSubmit = () => {
    if (!isValid) return;

    updateData({ dob });
    setTimeout(() => {
      navigate("/onboarding/otp");
    }, 300);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) {
      handleSubmit();
    }
  };

  return (
    <StepContainer
      title="What's your date of birth?"
      subtitle="You must be at least 18 years old to open a savings account"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            inputMode="numeric"
            placeholder="DD/MM/YYYY"
            value={dob}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, '');
              if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2);
              if (value.length >= 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);
              if (value.length <= 10) {
                const parts = value.split('/');
                if (parts.length === 3 && parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
                  const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                  setDob(isoDate);
                } else {
                  setDob(value);
                }
              }
            }}
            onKeyPress={handleKeyPress}
            maxLength={10}
            className={`text-lg h-14 rounded-2xl border-2 transition-all duration-300 text-center ${
              dob.length === 0
                ? "border-input"
                : isValid
                ? "border-success bg-success/5 animate-success-pulse"
                : "border-destructive bg-destructive/5 animate-shake"
            }`}
            autoFocus
          />
          {errorMessage && (
            <p className="text-sm text-destructive font-medium animate-fade-in">{errorMessage}</p>
          )}
        </div>

        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full"
        >
          Continue
        </Button>
      </div>
    </StepContainer>
  );
};
