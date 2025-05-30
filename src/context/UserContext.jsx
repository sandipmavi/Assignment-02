import { createContext, useContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
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
  return (
    <UserContext.Provider
      value={{ formData, handleInputChange, errors, setErrors }}
    >
      {children}
    </UserContext.Provider>
  );
};
function useUser() {
  return useContext(UserContext);
}

// ✅ Fix Fast Refresh warning by using default export
export default UserProvider;
export { useUser };
