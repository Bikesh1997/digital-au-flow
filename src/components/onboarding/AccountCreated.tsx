import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface AccountCreatedProps {
  onNext: () => void;
}

const AccountCreated = ({ onNext }: AccountCreatedProps) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const customerId = Math.random().toString(36).substring(2, 11).toUpperCase();
  const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);

  return (
    <div className="max-w-md mx-auto space-y-8 animate-fade-in relative">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 animate-confetti"
              style={{
                left: `${40 + Math.random() * 20}%`,
                top: "20%",
                backgroundColor: i % 3 === 0 ? "#EA671C" : i % 3 === 1 ? "#6C256C" : "#0E945C",
                animationDelay: `${i * 0.1}s`,
                borderRadius: i % 2 === 0 ? "50%" : "0",
              }}
            />
          ))}
        </div>
      )}

      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-4 animate-scale-in">
          <Sparkles className="w-10 h-10 text-success" />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground">
          🎉 Congratulations!
        </h1>
        <p className="text-xl text-muted-foreground">
          Your Savings Account has been created
        </p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-2">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Customer ID</p>
            <p className="text-2xl font-bold text-foreground">{customerId}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground mb-1">Account Number</p>
            <p className="text-2xl font-bold text-foreground">{accountNumber}</p>
          </div>

          <p className="text-sm text-muted-foreground pt-4 border-t">
            You can now complete your KYC to start using your account fully
          </p>
        </div>
      </Card>

      <Button
        onClick={onNext}
        size="lg"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
      >
        Complete your KYC
      </Button>
    </div>
  );
};

export default AccountCreated;
