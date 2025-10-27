import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface OTPVerificationProps {
  mobile: string;
  onNext: (data: any, message: string) => void;
}

const OTPVerification = ({ mobile, onNext }: OTPVerificationProps) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("").concat(Array(6 - pastedData.length).fill(""));
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      setError("Please enter complete OTP");
      return;
    }

    // Simulate OTP validation (in real app, verify with backend)
    if (otpValue === "123456") {
      onNext({ otp: otpValue }, "OTP verified successfully!");
    } else {
      setError("Invalid OTP. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-foreground">
          Enter the OTP
        </h1>
        <p className="text-muted-foreground">
          OTP sent to +91-{mobile.slice(0, 6)}****{mobile.slice(-2)}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={cn(
                "w-12 h-14 text-center text-2xl font-semibold transition-all",
                error && "border-destructive animate-shake",
                digit && !error && "border-success"
              )}
            />
          ))}
        </div>

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        <div className="text-center">
          {resendTimer > 0 ? (
            <p className="text-sm text-muted-foreground">
              Resend OTP in {resendTimer}s
            </p>
          ) : (
            <Button
              type="button"
              variant="link"
              onClick={() => setResendTimer(30)}
              className="text-primary"
            >
              Resend OTP
            </Button>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          Verify
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Tip: Use OTP 123456 for demo purposes
        </p>
      </form>
    </div>
  );
};

export default OTPVerification;
