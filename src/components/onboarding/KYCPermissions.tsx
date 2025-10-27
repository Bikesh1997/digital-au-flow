import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Camera, Mic, Wifi, Check } from "lucide-react";

const KYCPermissions = () => {
  const [permissions, setPermissions] = useState({
    camera: false,
    microphone: false,
    internet: false
  });

  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState({
    camera: false,
    microphone: false,
    internet: false
  });

  const allChecked = permissions.camera && permissions.microphone && permissions.internet;
  const allVerified = verified.camera && verified.microphone && verified.internet;

  const handleVerify = () => {
    if (!allChecked) return;
    
    setVerifying(true);
    
    // Simulate permission verification
    setTimeout(() => setVerified({ ...verified, camera: true }), 500);
    setTimeout(() => setVerified(prev => ({ ...prev, microphone: true })), 1000);
    setTimeout(() => {
      setVerified(prev => ({ ...prev, internet: true }));
      setVerifying(false);
    }, 1500);
  };

  const handleContinue = () => {
    // Navigate to video KYC flow
    alert("Redirecting to Video KYC...");
  };

  return (
    <div className="max-w-md mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-foreground">
          Before we begin your KYC
        </h1>
        <p className="text-muted-foreground">
          To complete your KYC, we'll need access to:
        </p>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Camera</h3>
              <p className="text-sm text-muted-foreground">For identity verification</p>
            </div>
            <div className="flex items-center gap-2">
              {verified.camera && (
                <Check className="w-5 h-5 text-success animate-check-pop" />
              )}
              <Checkbox
                checked={permissions.camera}
                onCheckedChange={(checked) => 
                  setPermissions({ ...permissions, camera: checked as boolean })
                }
              />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Mic className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Microphone</h3>
              <p className="text-sm text-muted-foreground">For audio verification</p>
            </div>
            <div className="flex items-center gap-2">
              {verified.microphone && (
                <Check className="w-5 h-5 text-success animate-check-pop" />
              )}
              <Checkbox
                checked={permissions.microphone}
                onCheckedChange={(checked) => 
                  setPermissions({ ...permissions, microphone: checked as boolean })
                }
              />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Wifi className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Internet Speed Test</h3>
              <p className="text-sm text-muted-foreground">To ensure stable connection</p>
            </div>
            <div className="flex items-center gap-2">
              {verified.internet && (
                <Check className="w-5 h-5 text-success animate-check-pop" />
              )}
              <Checkbox
                checked={permissions.internet}
                onCheckedChange={(checked) => 
                  setPermissions({ ...permissions, internet: checked as boolean })
                }
              />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4 bg-accent/50">
        <p className="text-sm text-center">
          📄 Please keep your <span className="font-semibold">PAN card</span> ready
        </p>
      </Card>

      {!allVerified ? (
        <Button
          onClick={handleVerify}
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          disabled={!allChecked || verifying}
        >
          {verifying ? "Verifying Permissions..." : "Allow & Continue"}
        </Button>
      ) : (
        <Button
          onClick={handleContinue}
          size="lg"
          className="w-full bg-success hover:bg-success/90 text-success-foreground font-semibold"
        >
          Start KYC Process
        </Button>
      )}

      <Button
        variant="ghost"
        className="w-full"
      >
        Cancel
      </Button>
    </div>
  );
};

export default KYCPermissions;
