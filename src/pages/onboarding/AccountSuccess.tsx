import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { CheckCircle2, PartyPopper, CreditCard, Shield } from "lucide-react";

export const AccountSuccess = () => {
  const navigate = useNavigate();
  const { data, setCurrentStep } = useOnboarding();

  useEffect(() => {
    setCurrentStep(7);
  }, [setCurrentStep]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Success Icon */}
        {/* <div className="flex justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-success to-success/70 flex items-center justify-center shadow-xl animate-success-pulse">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <PartyPopper className="h-8 w-8 text-primary animate-bounce" />
            </div>
          </div>
        </div> */}

        {/* Success Message */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-foreground">Congratulations!</h1>
          <p className="text-lg text-muted-foreground">Your Savings Account has been created.</p>
        </div>

        {/* Account Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-secondary/10 border border-border shadow-xl space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-xl font-bold text-white">AU</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">AU Small Finance Bank</p>
              <p className="font-semibold text-foreground">Digital Savings Account</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Customer ID</span>
              <span className="font-mono font-semibold text-foreground">{data.customerId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Account Number</span>
              <span className="font-mono font-semibold text-foreground">{data.accountNumber}</span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="p-4 rounded-2xl bg-muted/50 border border-border">
          <p className="text-sm text-center text-muted-foreground leading-relaxed">
            You can now complete your KYC to start using your account fully and unlock all features.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-card border border-border text-center space-y-2">
            <CreditCard className="h-6 w-6 text-primary mx-auto" />
            <p className="text-xs font-medium text-muted-foreground">Free Debit Card</p>
          </div>
          <div className="p-4 rounded-2xl bg-card border border-border text-center space-y-2">
            <Shield className="h-6 w-6 text-success mx-auto" />
            <p className="text-xs font-medium text-muted-foreground">100% Secure</p>
          </div>
        </div>

        {/* CTA */}
        <Button size="lg" onClick={() => navigate("/onboarding/kyc-prompt")} className="w-full">
          Complete your KYC
        </Button>
      </div>
    </div>
  );
};
