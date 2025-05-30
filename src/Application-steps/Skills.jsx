import React from "react";
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
const Skills = ({ formData, handleInputChange, errors }) => {
  const handleSkillToggle = (skill) => {
    const currentSkills = formData.experience.skills;
    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter((s) => s !== skill)
      : [...currentSkills, skill];

    handleInputChange("experience", "skills", updatedSkills);
  };
  return (
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
                handleInputChange("experience", "hasInternship", e.target.value)
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
                handleInputChange("experience", "hasInternship", e.target.value)
              }
              className="mr-2"
            />
            No
          </label>
        </div>
        {errors.hasInternship && (
          <p className="text-red-500 text-sm mt-1">{errors.hasInternship}</p>
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
              handleInputChange("experience", "previousRole", e.target.value)
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
  );
};

export default Skills;
