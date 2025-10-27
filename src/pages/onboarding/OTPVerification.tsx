import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { StepContainer } from "@/components/StepContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { CheckCircle2 } from "lucide-react";

export const OTPVerification = () => {
  const navigate = useNavigate();
  const { data, updateData, setCurrentStep } = useOnboarding();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    setCurrentStep(4);
  }, [setCurrentStep]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all filled
    if (index === 5 && value && newOtp.every((digit) => digit)) {
      handleVerify(newOtp.join(""));
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

    const newOtp = pastedData.split("");
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);

    if (newOtp.length === 6) {
      handleVerify(pastedData);
    }
  };

  const handleVerify = (otpValue?: string) => {
    const otpString = otpValue || otp.join("");
    if (otpString.length !== 6) return;

    setIsVerifying(true);
    updateData({ otp: otpString });

    // Simulate API verification
    setTimeout(() => {
      setIsVerifying(false);
      // Success animation
      const successElement = document.getElementById("otp-success");
      if (successElement) {
        successElement.classList.remove("hidden");
      }

      setTimeout(() => {
        navigate("/onboarding/pan");
      }, 800);
    }, 1500);
  };

  const handleResend = () => {
    setResendTimer(30);
  };

  return (
    <StepContainer
      title="Enter the OTP"
      subtitle={`Code sent to +91-${data.mobile.slice(-4).padStart(10, "X")}`}
    >
      <div className="space-y-6">
        <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-10 sm:w-14 h-10 sm:h-14 text-center text-lg sm:text-2xl font-bold rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                digit
                  ? "border-success bg-success/5 scale-105"
                  : "border-input hover:border-primary/50"
              }`}
              autoFocus={index === 0}
            />
          ))}
        </div>

        <div id="otp-success" className="hidden">
          <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-success/10 border border-success animate-fade-in">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <span className="text-success font-semibold">OTP Verified!</span>
          </div>
        </div>

        <div className="text-center space-y-3">
          {resendTimer > 0 ? (
            <p className="text-sm text-muted-foreground">
              Resend OTP in <span className="font-semibold text-foreground">{resendTimer}s</span>
            </p>
          ) : (
            <Button variant="link" onClick={handleResend} className="text-primary">
              Resend OTP
            </Button>
          )}
        </div>

        {/* <Button
          size="lg"
          onClick={() => handleVerify()}
          disabled={otp.some((digit) => !digit) || isVerifying}
          className="w-full"
        >
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </Button> */}
      </div>
    </StepContainer>
  );
};
