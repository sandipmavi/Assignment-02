import React, { useState } from "react";
import StepIndicator from "./ui/StepIndicator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import NavigationButton from "./ui/NavigationButton";
import Timer from "./ui/Timer";
import Skills from "./Application-steps/Skills";
import Motivation from "./Application-steps/Motivation";
import Education from "./Application-steps/Education";
import PersonalInfo from "./Application-steps/PersonalInfo";
import FormSubmitted from "./ui/FormSubmitted";
import validateStep from "./utils/ValidateData";
import { useUser } from "./context/UserContext";
export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const { formData, setErrors } = useUser();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const nextStep = () => {
    if (validateStep(formData, currentStep, setErrors)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(4, formData, setErrors)) {
      setIsSubmitted(true);
      setCurrentStep(5);
    }
  };

  if (isSubmitted) {
    return <FormSubmitted />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            FreJun Frontend Intern Application
          </h1>
          <p className="text-gray-600">
            Complete all steps to submit your application
          </p>
        </div>

        <Timer />

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <StepIndicator currentStep={currentStep} />
          {currentStep === 1 && <PersonalInfo />}
          {currentStep === 2 && <Education />}
          {currentStep === 3 && <Skills />}
          {currentStep === 4 && <Motivation />}
          <NavigationButton
            handleSubmit={handleSubmit}
            prevStep={prevStep}
            nextStep={nextStep}
            currentStep={currentStep}
          />
        </div>
      </div>
    </div>
  );
}
