import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Landmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo */}
      <header className="p-6">
        <img src={logo} alt="AU Small Finance Bank" className="h-12" />
      </header>

      {/* Hero Section */}
      <div className="bg-secondary px-6 py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-3">
          Welcome to AU Finance
        </h1>
        <p className="text-secondary-foreground/90 text-lg">
          Your journey to smart banking starts here
        </p>
        <p className="text-secondary-foreground/80 text-sm mt-2">
          Quick setup • Secure • Safe
        </p>
      </div>

      {/* Savings Account Card */}
      <div className="px-6 -mt-8 pb-12">
        <Card className="p-6 shadow-xl border-0 bg-card animate-slide-in">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Savings Account
              </h2>
              <p className="text-muted-foreground mb-6">
                Start saving for your future today
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Landmark className="w-6 h-6 text-primary" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              onClick={() => navigate("/onboarding")}
            >
              Open Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 border-2"
            >
              Know More
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Landing;
