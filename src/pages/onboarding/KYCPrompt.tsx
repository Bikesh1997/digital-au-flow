import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Camera, Wifi, Mic, CreditCard } from "lucide-react";

export const KYCPrompt = () => {
  const navigate = useNavigate();
  const { setCurrentStep } = useOnboarding();
  const [cameraChecked, setCameraChecked] = useState(false);
  const [micChecked, setMicChecked] = useState(false);
  const [internetChecked, setInternetChecked] = useState(false);

  useEffect(() => {
    setCurrentStep(8);
  }, [setCurrentStep]);

  const allChecked = cameraChecked && micChecked && internetChecked;

  const handleAllow = () => {
    if (allChecked) {
      // In a real app, this would request permissions and start KYC flow
      alert("KYC process would start here with camera and document verification");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="w-full max-w-md space-y-8 animate-slide-in">
        <div className="text-center space-y-3">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <CreditCard className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Before we begin your KYC</h1>
          <p className="text-muted-foreground leading-relaxed">
            To complete your KYC verification, we'll need access to certain features on your device.
          </p>
        </div>

        {/* Permissions List */}
        <div className="space-y-4">
          <div 
            className="p-4 rounded-2xl bg-card border border-border flex items-start gap-4 cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => setCameraChecked(!cameraChecked)}
          >
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Camera className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Camera Access 📷</p>
              <p className="text-sm text-muted-foreground">To capture your documents and selfie</p>
            </div>
            <Checkbox
              checked={cameraChecked}
              onCheckedChange={(checked) => setCameraChecked(checked as boolean)}
              className="mt-1"
            />
          </div>

          <div 
            className="p-4 rounded-2xl bg-card border border-border flex items-start gap-4 cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => setMicChecked(!micChecked)}
          >
            <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
              <Mic className="h-6 w-6 text-success" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Microphone Access 🎙️</p>
              <p className="text-sm text-muted-foreground">For video verification process</p>
            </div>
            <Checkbox
              checked={micChecked}
              onCheckedChange={(checked) => setMicChecked(checked as boolean)}
              className="mt-1"
            />
          </div>

          <div 
            className="p-4 rounded-2xl bg-card border border-border flex items-start gap-4 cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => setInternetChecked(!internetChecked)}
          >
            <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <Wifi className="h-6 w-6 text-secondary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">Internet Speed Test</p>
              <p className="text-sm text-muted-foreground">To verify your details securely</p>
            </div>
            <Checkbox
              checked={internetChecked}
              onCheckedChange={(checked) => setInternetChecked(checked as boolean)}
              className="mt-1"
            />
          </div>
        </div>

        {/* Important Note */}
        <div className="p-4 rounded-2xl bg-muted/50 border border-border">
          <p className="text-sm text-center text-muted-foreground">
            ℹ️ Please keep your <span className="font-semibold text-foreground">PAN card</span> ready
            for the verification process
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button 
            size="lg" 
            onClick={handleAllow} 
            className="w-full" 
            disabled={!allChecked}
          >
            Allow & Continue
          </Button>
          <Button size="lg" variant="ghost" onClick={() => navigate("/")} className="w-full">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
