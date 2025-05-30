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
const Assignment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      dateOfBirth: "",
    },
    education: {
      university: "",
      degree: "",
      graduationYear: "",
      cgpa: "",
    },
    experience: {
      hasInternship: "",
      previousRole: "",
      skills: [],
      portfolio: "",
    },
    motivation: {
      whyFreJun: "",
      careerGoals: "",
      availability: "",
    },
  });

  const [errors, setErrors] = useState({});

  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.personalInfo.fullName)
          newErrors.fullName = "Full name is required";
        if (!formData.personalInfo.email) newErrors.email = "Email is required";
        if (!formData.personalInfo.phone)
          newErrors.phone = "Phone number is required";
        if (!formData.personalInfo.location)
          newErrors.location = "Location is required";
        break;
      case 2:
        if (!formData.education.university)
          newErrors.university = "University is required";
        if (!formData.education.degree) newErrors.degree = "Degree is required";
        if (!formData.education.graduationYear)
          newErrors.graduationYear = "Graduation year is required";
        break;
      case 3:
        if (!formData.experience.hasInternship)
          newErrors.hasInternship = "Please select an option";
        if (formData.experience.skills.length === 0)
          newErrors.skills = "Please select at least one skill";
        break;
      case 4:
        if (!formData.motivation.whyFreJun)
          newErrors.whyFreJun = "This field is required";
        if (!formData.motivation.availability)
          newErrors.availability = "Please select availability";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(4)) {
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
          {currentStep === 1 && (
            <PersonalInfo
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <Education
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          )}
          {currentStep === 3 && (
            <Skills
              formData={formData}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          )}
          {currentStep === 4 && (
            <Motivation
              handleInputChange={handleInputChange}
              errors={errors}
              formData={formData}
            />
          )}
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
};
export default Assignment;
