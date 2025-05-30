import React from "react";

const Motivation = ({ errors, handleInputChange, formData }) => {
  return (
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
          <p className="text-red-500 text-sm mt-1">{errors.whyFreJun}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Career Goals (Optional)
        </label>
        <textarea
          value={formData.motivation.careerGoals}
          onChange={(e) =>
            handleInputChange("motivation", "careerGoals", e.target.value)
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
            handleInputChange("motivation", "availability", e.target.value)
          }
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.availability ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select availability</option>
          <option value="Immediately">Immediately</option>
          <option value="Within 2 weeks">Within 2 weeks</option>
          <option value="Within 1 month">Within 1 month</option>
          <option value="After semester ends">After semester ends</option>
        </select>
        {errors.availability && (
          <p className="text-red-500 text-sm mt-1">{errors.availability}</p>
        )}
      </div>
    </div>
  );
};

export default Motivation;
