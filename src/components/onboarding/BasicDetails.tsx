import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicDetailsProps {
  onNext: (data: any, message: string) => void;
}

const BasicDetails = ({ onNext }: BasicDetailsProps) => {
  const [details, setDetails] = useState({
    email: "",
    occupation: "",
    company: "",
    income: "",
    mothersName: ""
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValid = validateEmail(details.email) && 
                  details.occupation && 
                  details.company && 
                  details.income && 
                  details.mothersName;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext(details, "Basic details saved!");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-foreground">
          Tell us more about you
        </h1>
        <p className="text-muted-foreground">
          We need a few more details to set up your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            className={validateEmail(details.email) || !details.email ? "" : "border-destructive"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Select value={details.occupation} onValueChange={(value) => setDetails({ ...details, occupation: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your occupation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="salaried">Salaried</SelectItem>
              <SelectItem value="self-employed">Self Employed</SelectItem>
              <SelectItem value="business">Business Owner</SelectItem>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            placeholder="Enter company name"
            value={details.company}
            onChange={(e) => setDetails({ ...details, company: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="income">Annual Income</Label>
          <Select value={details.income} onValueChange={(value) => setDetails({ ...details, income: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select income range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-3">Below ₹3 Lakhs</SelectItem>
              <SelectItem value="3-5">₹3 - ₹5 Lakhs</SelectItem>
              <SelectItem value="5-10">₹5 - ₹10 Lakhs</SelectItem>
              <SelectItem value="10-25">₹10 - ₹25 Lakhs</SelectItem>
              <SelectItem value="25+">Above ₹25 Lakhs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mothersName">Mother's Full Name</Label>
          <Input
            id="mothersName"
            placeholder="Enter mother's name"
            value={details.mothersName}
            onChange={(e) => setDetails({ ...details, mothersName: e.target.value })}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          disabled={!isValid}
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default BasicDetails;
