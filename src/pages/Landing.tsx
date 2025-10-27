import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Shield, Zap, Building2 } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header Section */}
      <div className="bg-[#6D266D] text-white py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-3 animate-fade-in">
          <div className="flex justify-start mb-4">
            <img src="/src/assets/logo.png" alt="AU Finance" className="h-12" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Welcome to AU Finance
          </h1>
          <p className="text-white/90 text-lg">
            Your journey to smart banking starts here. Quick setup, secure and safe.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-xl animate-slide-in">
          <div className="flex items-start gap-6">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Savings Account
                </h2>
                <p className="text-muted-foreground">
                  Start saving for your future today
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  size="lg"
                  onClick={() => navigate("/onboarding/mobile")}
                  className="flex-1"
                >
                  Open Account
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1"
                >
                  Know More
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">5-Minute Setup</p>
              <p className="text-sm text-muted-foreground">Quick & hassle-free</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">100% Secure</p>
              <p className="text-sm text-muted-foreground">Bank-grade security</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Zero Balance</p>
              <p className="text-sm text-muted-foreground">No minimum required</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
