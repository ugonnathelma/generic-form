const validation = {
  required: (text: string) => {
    return text.length > 0 ? undefined : "Input cannot be empty";
  },
  testPrefix: (text: string) => {
    if (text.startsWith("test.name") || "test.name".startsWith(text))
      return undefined;

    return 'Input must start with "test.name"';
  },
  ageValidation: (text: string) => {
    return Number(text) >= 18 ? undefined : "You must be at least 18 years";
  },
};

export default validation;
