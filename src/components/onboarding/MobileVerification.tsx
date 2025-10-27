import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ValidatedInput } from "@/components/ValidatedInput";

interface MobileVerificationProps {
  onNext: (data: any, message: string) => void;
}

const MobileVerification = ({ onNext }: MobileVerificationProps) => {
  const [mobile, setMobile] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const validateMobile = (value: string) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(value);
  };

  const isValid = validateMobile(mobile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowValidation(true);
    if (isValid) {
      onNext({ mobile }, "Mobile number verified!");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-foreground">
          Verify your Aadhaar-linked mobile number
        </h1>
        <p className="text-muted-foreground">
          We'll send an OTP to this number
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="text-lg font-medium">+91</span>
          <ValidatedInput
            type="tel"
            placeholder="Enter 10-digit mobile number"
            value={mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 10);
              setMobile(value);
              if (value.length === 10) setShowValidation(true);
            }}
            isValid={isValid}
            showValidation={showValidation}
            error={!isValid && mobile.length === 10 ? "Please enter a valid mobile number" : ""}
            className="flex-1 text-lg"
            maxLength={10}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          disabled={!isValid}
        >
          Send OTP
        </Button>
      </form>
    </div>
  );
};

export default MobileVerification;
