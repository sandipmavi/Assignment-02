import { CheckCircle } from "lucide-react";
import React from "react";

const FormSubmitted = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Application Submitted!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your interest in the Frontend Engineer Intern role at
          FreJun. We'll review your application and get back to you soon.
        </p>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>What's next?</strong>
            <br />
            Our team will review your application within 3-5 business days. Keep
            an eye on your email for updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormSubmitted;
