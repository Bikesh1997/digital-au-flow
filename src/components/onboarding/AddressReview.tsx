import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

interface AddressReviewProps {
  onNext: (data: any, message: string) => void;
}

const AddressReview = ({ onNext }: AddressReviewProps) => {
  const [sameAsAadhaar, setSameAsAadhaar] = useState(true);
  const [address, setAddress] = useState({
    name: "John Doe",
    street: "123 Main Street, Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pin: "400001"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ address }, "Address confirmed!");
  };

  return (
    <div className="max-w-md mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-foreground">
          Confirm your address
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="sameAddress"
            checked={sameAsAadhaar}
            onCheckedChange={(checked) => setSameAsAadhaar(checked as boolean)}
          />
          <Label htmlFor="sameAddress" className="text-sm cursor-pointer">
            Same as my Aadhaar Address
          </Label>
        </div>

        <Card className="p-4 space-y-3 bg-accent/50">
          {sameAsAadhaar ? (
            <>
              <div>
                <p className="font-semibold">{address.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{address.street}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {address.city}, {address.state} - {address.pin}
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="pin">PIN Code</Label>
                <Input
                  id="pin"
                  value={address.pin}
                  onChange={(e) => setAddress({ ...address, pin: e.target.value })}
                  maxLength={6}
                />
              </div>
            </div>
          )}
        </Card>

        <Card className="p-4 bg-success/10 border-success">
          <div className="flex gap-3">
            <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <p className="text-sm text-success-foreground">
              Address verified. Your Debit Card and Cheque Book will be sent to your registered address.
            </p>
          </div>
        </Card>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          Proceed
        </Button>
      </form>
    </div>
  );
};

export default AddressReview;
