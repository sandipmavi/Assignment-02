const validateStep = (formData, step, setErrors) => {
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
export default validateStep;
