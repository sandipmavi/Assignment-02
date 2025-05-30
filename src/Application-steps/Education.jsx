import React from "react";
import { Calendar } from "lucide-react";
import { useUser } from "../context/UserContext";

const Education = () => {
  const { handleInputChange, formData, errors } = useUser();
  return (
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
              handleInputChange("education", "university", e.target.value)
            }
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.university ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your university name"
          />
          {errors.university && (
            <p className="text-red-500 text-sm mt-1">{errors.university}</p>
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
              handleInputChange("education", "graduationYear", e.target.value)
            }
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.graduationYear ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select year</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
          {errors.graduationYear && (
            <p className="text-red-500 text-sm mt-1">{errors.graduationYear}</p>
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
  );
};

export default Education;
