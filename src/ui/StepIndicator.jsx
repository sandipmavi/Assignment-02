import React from "react";
import { CheckCircle } from "lucide-react";
const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center mb-8">
    {[1, 2, 3, 4].map((step) => (
      <React.Fragment key={step}>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
            step <= currentStep ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          {step < currentStep ? <CheckCircle className="w-6 h-6" /> : step}
        </div>
        {step < 4 && (
          <div
            className={`w-16 h-1 ${
              step < currentStep ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);
export default StepIndicator;
