const validation = {
  required: (text: string) => {
    return text.length > 0 ? undefined : "Input cannot be empty";
  },
  woogaPrefix: (text: string) => {
    if (text.startsWith("wooga.name") || "wooga.name".startsWith(text))
      return undefined;

    return 'Input must start with "wooga.name"';
  },
  ageValidation: (text: string) => {
    return Number(text) >= 18 ? undefined : "You must be at least 18 years";
  },
};

export default validation;
