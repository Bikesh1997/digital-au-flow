import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ValidatedInput } from "@/components/ValidatedInput";

interface AadhaarVerificationProps {
  onNext: (data: any, message: string) => void;
}

const AadhaarVerification = ({ onNext }: AadhaarVerificationProps) => {
  const [aadhaar, setAadhaar] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const formatAadhaar = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 12);
    return numbers.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const validateAadhaar = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.length === 12;
  };

  const isValid = validateAadhaar(aadhaar);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);
    if (isValid) {
      onNext({ aadhaar: aadhaar.replace(/\D/g, "") }, "Aadhaar verified!");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-foreground">
          Enter your Aadhaar Number
        </h1>
        <p className="text-muted-foreground">
          Enter your 12-digit Aadhaar number
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <ValidatedInput
          type="text"
          placeholder="1234 5678 9012"
          value={aadhaar}
          onChange={(e) => {
            const formatted = formatAadhaar(e.target.value);
            setAadhaar(formatted);
            if (formatted.replace(/\D/g, "").length === 12) setShowValidation(true);
          }}
          isValid={isValid}
          showValidation={showValidation}
          error={!isValid && aadhaar.length >= 14 ? "Please enter a valid 12-digit Aadhaar number" : ""}
          className="text-lg text-center tracking-wider"
          maxLength={14}
        />

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          disabled={!isValid}
        >
          Validate Aadhaar
        </Button>
      </form>
    </div>
  );
};

export default AadhaarVerification;
