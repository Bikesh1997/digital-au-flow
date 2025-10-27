import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingProvider } from "./contexts/OnboardingContext";
import { ProgressBar } from "./components/ProgressBar";
import Landing from "./pages/Landing";
import { MobileVerification } from "./pages/onboarding/MobileVerification";
import { AadhaarVerification } from "./pages/onboarding/AadhaarVerification";
import { PANVerification } from "./pages/onboarding/PANVerification";
import { DateOfBirth } from "./pages/onboarding/DateOfBirth";
import { OTPVerification } from "./pages/onboarding/OTPVerification";
import { AddressConfirmation } from "./pages/onboarding/AddressConfirmation";
import { BasicDetails } from "./pages/onboarding/BasicDetails";
import { ProductSelection } from "./pages/onboarding/ProductSelection";
import { NomineeAndTerms } from "./pages/onboarding/NomineeAndTerms";
import { AccountSuccess } from "./pages/onboarding/AccountSuccess";
import { KYCPrompt } from "./pages/onboarding/KYCPrompt";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <OnboardingProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/onboarding/*"
              element={
                <>
                  <ProgressBar />

                  <div style={{ marginTop: "35px" }}>

                  <Routes>
                    <Route path="mobile" element={<MobileVerification />} />
                    <Route path="aadhaar" element={<AadhaarVerification />} />
                    <Route path="pan" element={<PANVerification />} />
                    <Route path="dob" element={<DateOfBirth />} />
                    <Route path="otp" element={<OTPVerification />} />
                    <Route path="address" element={<AddressConfirmation />} />
                    <Route path="basic-details" element={<BasicDetails />} />
                    <Route path="product-selection" element={<ProductSelection />} />
                    <Route path="nominee" element={<NomineeAndTerms />} />
                    <Route path="success" element={<AccountSuccess />} />
                    <Route path="kyc-prompt" element={<KYCPrompt />} />
                  </Routes>
                  </div>

                </>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </OnboardingProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
