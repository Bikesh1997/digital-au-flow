import { useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { Loader } from "@/components/Loader";
import { StepGamification } from "@/components/StepGamification";
import MobileVerification from "@/components/onboarding/MobileVerification";
import OTPVerification from "@/components/onboarding/OTPVerification";
import AadhaarVerification from "@/components/onboarding/AadhaarVerification";
import PANVerification from "@/components/onboarding/PANVerification";
import DateOfBirth from "@/components/onboarding/DateOfBirth";
import AddressReview from "@/components/onboarding/AddressReview";
import BasicDetails from "@/components/onboarding/BasicDetails";
import ProductSelection from "@/components/onboarding/ProductSelection";
import NomineeAndTC from "@/components/onboarding/NomineeAndTC";
import AccountCreated from "@/components/onboarding/AccountCreated";
import KYCPermissions from "@/components/onboarding/KYCPermissions";

const TOTAL_STEPS = 11;

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showGamification, setShowGamification] = useState(false);
  const [gamificationMessage, setGamificationMessage] = useState("");

  const [formData, setFormData] = useState({
    mobile: "",
    otp: "",
    aadhaar: "",
    pan: "",
    dob: "",
    address: {
      name: "",
      street: "",
      city: "",
      state: "",
      pin: "",
    },
    email: "",
    occupation: "",
    company: "",
    income: "",
    mothersName: "",
    accountType: "digital",
    nominee: {
      name: "",
      relationship: "",
      dob: "",
    },
    acceptTerms: false,
  });

  const handleNext = (data: any, message: string) => {
    setFormData({ ...formData, ...data });
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setGamificationMessage(message);
      setShowGamification(true);

      setTimeout(() => {
        setShowGamification(false);
        setCurrentStep(currentStep + 1);
      }, 2000);
    }, 1500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <MobileVerification onNext={handleNext} />;
      case 2:
        return <OTPVerification mobile={formData.mobile} onNext={handleNext} />;
      case 3:
        return <AadhaarVerification onNext={handleNext} />;
      case 4:
        return <PANVerification onNext={handleNext} />;
      case 5:
        return <DateOfBirth onNext={handleNext} />;
      case 6:
        return <AddressReview onNext={handleNext} />;
      case 7:
        return <BasicDetails onNext={handleNext} />;
      case 8:
        return <ProductSelection onNext={handleNext} />;
      case 9:
        return <NomineeAndTC onNext={handleNext} />;
      case 10:
        return <AccountCreated onNext={() => setCurrentStep(11)} />;
      case 11:
        return <KYCPermissions />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Progress Bar */}
      <div className="sticky top-0 z-40 bg-background p-4 border-b">
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      </div>

      {/* Step Content */}
      <div className="container max-w-2xl mx-auto p-6 animate-fade-in">
        {renderStep()}
      </div>

      {/* Loading Overlay */}
      {loading && <Loader />}

      {/* Gamification Feedback */}
      <StepGamification show={showGamification} message={gamificationMessage} />
    </div>
  );
};

export default Onboarding;
