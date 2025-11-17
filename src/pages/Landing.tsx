import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Landmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-6 py-4">
        <div className="flex items-center gap-2">
          {/* <Landmark className="w-8 h-8 text-primary" /> */}
          {/* <span className="font-bold text-xl">AU Small Finance Bank</span> */}
          <img 
                      src={`${process.env.NODE_ENV === 'production' ? '/ujjivan-finance-saving/' : ''}logo.png`}
      className="h-12" />
          
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-secondary text-secondary-foreground px-6 py-12 mb-8">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-3xl font-bold mb-3">Welcome to Ujjivan Small Finance Bank</h1>
          <p className="text-secondary-foreground/90">
            Quick setup, Secure and Safe.
          </p>
        </div>
      </div>

      {/* Account Card */}
      <div className="px-6 max-w-lg mx-auto animate-fade-in">
        <Card className="p-6 shadow-lg border-2 hover:border-primary/20 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Savings Account</h2>
              <p className="text-muted-foreground">
                Start saving for your future today
              </p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Landmark className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="flex gap-2 sm:gap-3 mt-6">
            <Button
              onClick={() => navigate("/onboarding/mobile")}
              className="flex-1 h-10 sm:h-12 text-sm sm:text-base font-semibold px-3 sm:px-4"
            >
              Open Account
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-10 sm:h-12 text-sm sm:text-base font-semibold px-3 sm:px-4"
              onClick={() => {
                // Know more action
              }}
            >
              Know More
            </Button>
          </div>
        </Card>

        {/* Features */}
        {/* <div className="mt-8 space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-success rounded-full" />
            <span>Zero balance savings account</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-success rounded-full" />
            <span>Free debit card & cheque book</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-success rounded-full" />
            <span>Digital account opening in minutes</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Landing;