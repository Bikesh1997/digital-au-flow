import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export const ProgressBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current step based on route
  const getCurrentStep = () => {
    const path = location.pathname;
    if (['/onboarding/mobile', '/onboarding/aadhaar', '/onboarding/otp', '/onboarding/pan', '/onboarding/dob', '/onboarding/address'].includes(path)) {
      return 1;
    } else if (['/onboarding/basic-details', '/onboarding/product-selection', '/onboarding/nominee'].includes(path)) {
      return 2;
    } else if (['/onboarding/success', '/onboarding/kyc-prompt'].includes(path)) {
      return 3;
    }
    return 1;
  };

  const currentStep = getCurrentStep();
  
  // Calculate progress percentage for smooth animation
  const getProgressPercentage = () => {
    const path = location.pathname;
    const step1Routes = ['/onboarding/mobile', '/onboarding/aadhaar', '/onboarding/otp', '/onboarding/pan', '/onboarding/dob', '/onboarding/address'];
    const step2Routes = ['/onboarding/basic-details', '/onboarding/product-selection', '/onboarding/nominee'];
    const step3Routes = ['/onboarding/success', '/onboarding/kyc-prompt'];
    
    if (step1Routes.includes(path)) {
      const index = step1Routes.indexOf(path);
      return (index / step1Routes.length) * 33.33;
    } else if (step2Routes.includes(path)) {
      const index = step2Routes.indexOf(path);
      return 33.33 + (index / step2Routes.length) * 33.33;
    } else if (step3Routes.includes(path)) {
      const index = step3Routes.indexOf(path);
      return 66.66 + (index / step3Routes.length) * 33.34;
    }
    return 0;
  };

  const progressPercentage = getProgressPercentage();

  const steps = [
    { number: 1, label: 'Personal Info' },
    { number: 2, label: 'Account Details' },
    { number: 3, label: 'Complete KYC' }
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="px-4 py-3">
        {/* Back Button and Steps */}
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-muted-foreground/10 transition-colors flex-shrink-0"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          
          {/* Steps Indicator */}
          <div className="flex items-center gap-2 flex-1">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center gap-2 flex-1">
                  <span className={`text-xs font-medium transition-colors ${
                    step.number <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="relative h-2 flex-1 mx-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out rounded-full"
                      style={{ 
                        width: step.number < currentStep 
                          ? '100%' 
                          : step.number === currentStep 
                            ? `${(progressPercentage % 33.33) / 33.33 * 100}%`
                            : '0%'
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
