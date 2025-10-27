import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ValidatedInput } from "@/components/ValidatedInput";

interface DateOfBirthProps {
  onNext: (data: any, message: string) => void;
}

const DateOfBirth = ({ onNext }: DateOfBirthProps) => {
  const [dob, setDob] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const validateAge = (dateStr: string) => {
    if (!dateStr) return false;
    const today = new Date();
    const birthDate = new Date(dateStr);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 18;
  };

  const isValid = validateAge(dob);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);
    if (isValid) {
      onNext({ dob }, "Age verified!");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-foreground">
          What's your date of birth?
        </h1>
        <p className="text-muted-foreground">
          You must be at least 18 years old to open a savings account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <ValidatedInput
          type="date"
          value={dob}
          onChange={(e) => {
            setDob(e.target.value);
            if (e.target.value) setShowValidation(true);
          }}
          isValid={isValid}
          showValidation={showValidation}
          error={!isValid && dob ? "You must be at least 18 years old" : ""}
          className="text-lg"
          max={new Date().toISOString().split('T')[0]}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          disabled={!isValid}
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default DateOfBirth;
