import { CheckCircle } from "lucide-react";
import React from "react";

const NavigationButton = ({
  handleSubmit,
  currentStep,
  prevStep,
  nextStep,
}) => {
  return (
    <div className="flex justify-between mt-8 pt-6 border-t">
      <button
        onClick={prevStep}
        className={`px-6 py-3 rounded-lg font-medium ${
          currentStep === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        disabled={currentStep === 1}
      >
        Previous
      </button>

      {currentStep < 4 ? (
        <button
          onClick={nextStep}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Next Step
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Submit Application
        </button>
      )}
    </div>
  );
};
export default NavigationButton;
