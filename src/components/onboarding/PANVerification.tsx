import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ValidatedInput } from "@/components/ValidatedInput";

interface PANVerificationProps {
  onNext: (data: any, message: string) => void;
}

const PANVerification = ({ onNext }: PANVerificationProps) => {
  const [pan, setPan] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const validatePAN = (value: string) => {
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    return regex.test(value);
  };

  const isValid = validatePAN(pan);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);
    if (isValid) {
      onNext({ pan }, "PAN verified!");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-foreground">
          Enter your PAN
        </h1>
        <p className="text-muted-foreground">
          Enter PAN in format AAAAA1111A
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <ValidatedInput
          type="text"
          placeholder="ABCDE1234F"
          value={pan}
          onChange={(e) => {
            const value = e.target.value.toUpperCase().slice(0, 10);
            setPan(value);
            if (value.length === 10) setShowValidation(true);
          }}
          isValid={isValid}
          showValidation={showValidation}
          error={!isValid && pan.length === 10 ? "Please enter a valid PAN (Format: AAAAA1111A)" : ""}
          className="text-lg text-center tracking-widest uppercase"
          maxLength={10}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          disabled={!isValid}
        >
          Validate PAN
        </Button>
      </form>
    </div>
  );
};

export default PANVerification;
