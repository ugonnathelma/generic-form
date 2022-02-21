import { FocusEvent, FormEvent, useState } from "react";
import { IFormProps } from "./Form.types";
import validation from "./validation";
import "./Form.scss";

export const Form = ({
  title,
  fields,
  onSubmit,
  clearFieldsOnSubmit = false,
}: IFormProps) => {
  const emptyFields = fields.reduce(
    (prev, curr) => ({ ...prev, [curr.name]: "" }),
    {}
  );
  const [values, setValues] = useState<{ [key: string]: string }>(emptyFields);

  const [errors, setError] = useState<{
    [key: string]: string | undefined;
  }>(
    fields.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.name]: curr.required && validation["required"](""),
      }),
      {}
    )
  );

  const [touched, setTouched] = useState<{
    [key: string]: boolean;
  }>(
    fields.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.name]: false,
      }),
      {}
    )
  );

  const [formSubmittedSuccessfully, setFormSubmittedSuccessfully] = useState<
    boolean | undefined
  >(false);

  const handleChange = (
    fieldName: string,
    value: string,
    validate?: string,
    isRequired?: boolean
  ) => {
    if (formSubmittedSuccessfully !== undefined) {
      setFormSubmittedSuccessfully(undefined);
    }

    setValues({ ...values, [fieldName]: value });

    if (isRequired) {
      setError({
        ...errors,
        [fieldName]: validation["required"](value),
      });
    }

    if (validate && value.length > 0) {
      setError({
        ...errors,
        //@ts-ignore
        [fieldName]: validation[validate](value),
      });
    }
  };

  const handleBlur = ({
    target: { name: fieldName },
  }: FocusEvent<HTMLInputElement>) => {
    if (!touched[fieldName]) setTouched({ ...touched, [fieldName]: true });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      onSubmit(values);
      setFormSubmittedSuccessfully(true);
      if (clearFieldsOnSubmit) setValues(emptyFields);
    } catch (error) {
      setFormSubmittedSuccessfully(false);
    }
  };

  const isFormValid = Object.values(errors).every((error) => !error);

  return (
    <form data-testid="generic-form" id="generic-form" onSubmit={handleSubmit}>
      {title && (
        <>
          <h1>{title}</h1>

          <br />
        </>
      )}

      <div id="body">
        {fields.map(({ validate, required, ...field }) => (
          <div key={field.name} className="field">
            <label htmlFor={field.name}>
              {field.label}
              {required && <span> (required)</span>}
            </label>
            <br />
            <input
              {...field}
              data-testid="inputfield"
              value={values[field.name]}
              onChange={(e) =>
                handleChange(field.name, e.target.value, validate, required)
              }
              onBlur={handleBlur}
            />
            {errors[field.name] && touched[field.name] && (
              <div data-testid="error" className="error">
                {errors[field.name]}
              </div>
            )}
          </div>
        ))}
        <br />
        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>{" "}
        {formSubmittedSuccessfully && (
          <div data-testid="submitted" id="submitted">
            submitted
          </div>
        )}
      </div>
    </form>
  );
};
