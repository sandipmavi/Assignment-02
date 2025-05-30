import React, { useState, useEffect } from "react";
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
  const [timeRemaining, setTimeRemaining] = useState(48 * 60 * 60); 
  const [isSubmitted, setIsSubmitted] = useState(false);

 
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const skillOptions = [
    "React",
    "JavaScript",
    "TypeScript",
    "HTML/CSS",
    "Node.js",
    "Vue.js",
    "Angular",
    "Python",
    "Java",
    "Git",
    "MongoDB",
    "SQL",
  ];

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

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSkillToggle = (skill) => {
    const currentSkills = formData.experience.skills;
    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter((s) => s !== skill)
      : [...currentSkills, skill];

    handleInputChange("experience", "skills", updatedSkills);
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

  const StepIndicator = () => (
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

  const TimeRemaining = () => (
    <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mb-6">
      <div className="flex items-center">
        <Clock className="w-5 h-5 text-orange-600 mr-2" />
        <span className="font-semibold text-orange-800">
          Time Remaining: {formatTime(timeRemaining)}
        </span>
      </div>
    </div>
  );

  if (isSubmitted) {
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
              Our team will review your application within 3-5 business days.
              Keep an eye on your email for updates!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            FreJun Frontend Intern Application
          </h1>
          <p className="text-gray-600">
            Complete all steps to submit your application
          </p>
        </div>

        <TimeRemaining />

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <StepIndicator />

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <User className="w-6 h-6 mr-2 text-blue-600" />
                Personal Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.fullName}
                    onChange={(e) =>
                      handleInputChange(
                        "personalInfo",
                        "fullName",
                        e.target.value
                      )
                    }
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.fullName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) =>
                      handleInputChange("personalInfo", "email", e.target.value)
                    }
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) =>
                      handleInputChange("personalInfo", "phone", e.target.value)
                    }
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.personalInfo.location}
                    onChange={(e) =>
                      handleInputChange(
                        "personalInfo",
                        "location",
                        e.target.value
                      )
                    }
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.location ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="City, State, Country"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange(
                        "personalInfo",
                        "dateOfBirth",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Education */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-blue-600" />
                Education Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University/College *
                  </label>
                  <input
                    type="text"
                    value={formData.education.university}
                    onChange={(e) =>
                      handleInputChange(
                        "education",
                        "university",
                        e.target.value
                      )
                    }
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.university ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your university name"
                  />
                  {errors.university && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.university}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree *
                  </label>
                  <select
                    value={formData.education.degree}
                    onChange={(e) =>
                      handleInputChange("education", "degree", e.target.value)
                    }
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.degree ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Select your degree</option>
                    <option value="Bachelor's in Computer Science">
                      Bachelor's in Computer Science
                    </option>
                    <option value="Bachelor's in IT">Bachelor's in IT</option>
                    <option value="Bachelor's in Engineering">
                      Bachelor's in Engineering
                    </option>
                    <option value="Master's in Computer Science">
                      Master's in Computer Science
                    </option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.degree && (
                    <p className="text-red-500 text-sm mt-1">{errors.degree}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Graduation Year *
                  </label>
                  <select
                    value={formData.education.graduationYear}
                    onChange={(e) =>
                      handleInputChange(
                        "education",
                        "graduationYear",
                        e.target.value
                      )
                    }
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.graduationYear
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select year</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                  {errors.graduationYear && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.graduationYear}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CGPA/GPA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.education.cgpa}
                    onChange={(e) =>
                      handleInputChange("education", "cgpa", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 3.5"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Experience & Skills */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Experience & Skills
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you have any previous internship experience? *
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasInternship"
                      value="yes"
                      checked={formData.experience.hasInternship === "yes"}
                      onChange={(e) =>
                        handleInputChange(
                          "experience",
                          "hasInternship",
                          e.target.value
                        )
                      }
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasInternship"
                      value="no"
                      checked={formData.experience.hasInternship === "no"}
                      onChange={(e) =>
                        handleInputChange(
                          "experience",
                          "hasInternship",
                          e.target.value
                        )
                      }
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
                {errors.hasInternship && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.hasInternship}
                  </p>
                )}
              </div>

              {formData.experience.hasInternship === "yes" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Previous Role/Company
                  </label>
                  <input
                    type="text"
                    value={formData.experience.previousRole}
                    onChange={(e) =>
                      handleInputChange(
                        "experience",
                        "previousRole",
                        e.target.value
                      )
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Frontend Developer Intern at ABC Corp"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Technical Skills * (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {skillOptions.map((skill) => (
                    <label
                      key={skill}
                      className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.experience.skills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        className="mr-2"
                      />
                      {skill}
                    </label>
                  ))}
                </div>
                {errors.skills && (
                  <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio/GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.experience.portfolio}
                  onChange={(e) =>
                    handleInputChange("experience", "portfolio", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/yourusername or https://yourportfolio.com"
                />
              </div>
            </div>
          )}

          {/* Step 4: Motivation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Motivation & Goals
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why do you want to intern at FreJun? * (Max 500 words)
                </label>
                <textarea
                  value={formData.motivation.whyFreJun}
                  onChange={(e) =>
                    handleInputChange("motivation", "whyFreJun", e.target.value)
                  }
                  rows={5}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.whyFreJun ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Tell us why you're interested in this role and what excites you about FreJun..."
                />
                <div className="text-sm text-gray-500 mt-1">
                  {formData.motivation.whyFreJun.length}/500 words
                </div>
                {errors.whyFreJun && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.whyFreJun}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Career Goals (Optional)
                </label>
                <textarea
                  value={formData.motivation.careerGoals}
                  onChange={(e) =>
                    handleInputChange(
                      "motivation",
                      "careerGoals",
                      e.target.value
                    )
                  }
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Share your short-term and long-term career aspirations..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Availability for Internship *
                </label>
                <select
                  value={formData.motivation.availability}
                  onChange={(e) =>
                    handleInputChange(
                      "motivation",
                      "availability",
                      e.target.value
                    )
                  }
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.availability ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select availability</option>
                  <option value="Immediately">Immediately</option>
                  <option value="Within 2 weeks">Within 2 weeks</option>
                  <option value="Within 1 month">Within 1 month</option>
                  <option value="After semester ends">
                    After semester ends
                  </option>
                </select>
                {errors.availability && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.availability}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
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
        </div>
      </div>
    </div>
  );
};
export default Assignment;
