import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Form } from "./Form";
import fields from "../mocks/formInput.json";

describe("<Form>", () => {
  const props = { onSubmit: jest.fn(), fields };
  it("renders form", () => {
    render(<Form {...props} />);
    expect(screen.getByTestId("generic-form")).toBeInTheDocument();
  });

  it("renders form title", () => {
    render(<Form {...props} title="This is a title" />);
    expect(screen.getByText("This is a title")).toBeInTheDocument();
  });

  it("renders form button", () => {
    render(<Form {...props} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders form fields", () => {
    render(<Form {...props} />);
    expect(screen.getAllByTestId("inputfield")).toHaveLength(3);
  });

  it("shows error for form field", () => {
    render(<Form {...props} />);
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    fireEvent.blur(screen.getAllByTestId("inputfield")[0]);
    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.getByTestId("error").innerHTML).toEqual(
      "Input cannot be empty"
    );
    fireEvent.change(screen.getAllByTestId("inputfield")[0], {
      target: { value: "hello" },
    });

    expect(
      (screen.getAllByTestId("inputfield")[0] as HTMLInputElement).value
    ).toBe("hello");
    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.getByTestId("error").innerHTML).toEqual(
      'Input must start with "test.name"'
    );
  });

  it("submits form", () => {
    render(<Form {...props} />);
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    fireEvent.focus(screen.getAllByTestId("inputfield")[0]);

    fireEvent.change(screen.getAllByTestId("inputfield")[0], {
      target: { value: "test.nameugo" },
    });
    fireEvent.change(screen.getAllByTestId("inputfield")[2], {
      target: { value: "40" },
    });

    expect(screen.getByRole("button")).not.toBeDisabled();
    fireEvent.click(screen.getByRole("button"));
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
    expect(props.onSubmit).toHaveBeenCalledWith({
      age: "40",
      firstName: "test.nameugo",
      lastName: "",
    });
    expect(screen.getByTestId("submitted")).toBeInTheDocument();
  });
});
