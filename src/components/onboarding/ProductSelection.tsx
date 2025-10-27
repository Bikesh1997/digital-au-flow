import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductSelectionProps {
  onNext: (data: any, message: string) => void;
}

const ProductSelection = ({ onNext }: ProductSelectionProps) => {
  const [selected, setSelected] = useState("digital");

  const handleSubmit = () => {
    onNext({ accountType: selected }, "Account type selected!");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-foreground">
          Choose your Savings Account type
        </h1>
        <p className="text-muted-foreground">
          Select the account that best suits your needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card
          className={cn(
            "p-6 cursor-pointer transition-all duration-200 relative",
            selected === "digital" && "border-2 border-primary shadow-lg shadow-primary/20"
          )}
          onClick={() => setSelected("digital")}
        >
          {selected === "digital" && (
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-check-pop">
              <Check className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold">AU Digital Savings</h3>
              <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                Your Choice
              </span>
            </div>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>AU Value benefits</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>Free cash deposits up to ₹1 Lakh</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>Average balance ₹0</span>
              </li>
            </ul>
          </div>
        </Card>

        <Card
          className={cn(
            "p-6 cursor-pointer transition-all duration-200 relative",
            selected === "premium" && "border-2 border-primary shadow-lg shadow-primary/20"
          )}
          onClick={() => setSelected("premium")}
        >
          {selected === "premium" && (
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-check-pop">
              <Check className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold">AU Digital Savings</h3>
              <span className="inline-block mt-2 px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full">
                Popular
              </span>
            </div>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>Benefits worth ₹300</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>Dedicated Relationship Manager</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>₹2 Lakh free cash deposits</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>Average balance ₹10K</span>
              </li>
            </ul>
          </div>
        </Card>
      </div>

      <Button
        onClick={handleSubmit}
        size="lg"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
      >
        Continue
      </Button>
    </div>
  );
};

export default ProductSelection;
