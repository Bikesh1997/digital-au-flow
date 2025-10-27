import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface NomineeAndTCProps {
  onNext: (data: any, message: string) => void;
}

const NomineeAndTC = ({ onNext }: NomineeAndTCProps) => {
  const [addNominee, setAddNominee] = useState(false);
  const [skipNominee, setSkipNominee] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [nominee, setNominee] = useState({
    name: "",
    relationship: "",
    dob: ""
  });

  const isValid = (skipNominee || (addNominee && nominee.name && nominee.relationship && nominee.dob)) && acceptTerms;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onNext({ nominee: addNominee ? nominee : null, acceptTerms }, "Opening your account...");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-foreground">
          Nominee Details
        </h1>
        <p className="text-muted-foreground">
          Add a nominee to secure your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="addNominee"
              checked={addNominee}
              onCheckedChange={(checked) => {
                setAddNominee(checked as boolean);
                if (checked) setSkipNominee(false);
              }}
            />
            <Label htmlFor="addNominee" className="cursor-pointer">
              Add Nominee
            </Label>
          </div>

          {addNominee && (
            <div className="space-y-4 pl-6 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="nomineeName">Nominee Name</Label>
                <Input
                  id="nomineeName"
                  placeholder="Enter nominee's full name"
                  value={nominee.name}
                  onChange={(e) => setNominee({ ...nominee, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship</Label>
                <Select value={nominee.relationship} onValueChange={(value) => setNominee({ ...nominee, relationship: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomineeDob">Date of Birth</Label>
                <Input
                  id="nomineeDob"
                  type="date"
                  value={nominee.dob}
                  onChange={(e) => setNominee({ ...nominee, dob: e.target.value })}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="skipNominee"
              checked={skipNominee}
              onCheckedChange={(checked) => {
                setSkipNominee(checked as boolean);
                if (checked) setAddNominee(false);
              }}
            />
            <Label htmlFor="skipNominee" className="cursor-pointer">
              I don't wish to add nominee details
            </Label>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
              I accept all the terms and conditions related to AU Small Finance Bank and confirm that I am a citizen of India.
            </Label>
          </div>
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          disabled={!isValid}
        >
          Open My Account
        </Button>
      </form>
    </div>
  );
};

export default NomineeAndTC;
