
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import  EmployeeForm from "./EmployeeForm";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock the useForm hook
jest.mock("react-hook-form", () => ({
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: jest.fn((fn) => fn),
    formState: { errors: {} },
    reset: jest.fn(),
  }),
}));

describe("EmployeeForm", () => {
  const mockOnSubmit = jest.fn();
  const mockOnClose = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders the form and buttons correctly", () => {
    render(
      <EmployeeForm
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        initialValues={{ first_name: "", last_name: "", email: "", number: "", gender: "M" }}
      />
    );

    // Check if all form fields are present
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();

    // Check if gender dropdown is present
    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();

    // Check if the "List View" button exists
    expect(screen.getByRole("button", { name: /List View/i })).toBeInTheDocument();

    // Check the "Add" button (since editEmployee is not provided)
    expect(screen.getByRole("button", { name: /Add/i })).toBeInTheDocument();
  });

  it("handles form submission correctly", async () => {
    render(
      <EmployeeForm
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        initialValues={{ first_name: "John", last_name: "Doe", email: "john@example.com", number: "123456789", gender: "M" }}
      />
    );

    // Fill out the form fields
    userEvent.type(screen.getByLabelText(/First Name/i), "John");
    userEvent.type(screen.getByLabelText(/Last Name/i), "Doe");
    userEvent.type(screen.getByLabelText(/Email/i), "john@example.com");
    userEvent.type(screen.getByLabelText(/Phone Number/i), "123456789");

    // Select gender
    userEvent.selectOptions(screen.getByLabelText(/Gender/i), "M");

    // Submit the form
    userEvent.click(screen.getByRole("button", { name: /Add/i }));

    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalledTimes(1));
  });

  it("calls onClose function when close button is clicked", () => {
    render(
      <EmployeeForm
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        initialValues={{ first_name: "", last_name: "", email: "", number: "", gender: "M" }}
      />
    );

    // Assuming there's a cancel button that calls onClose when clicked
    userEvent.click(screen.getByRole("button", { name: /Cancel/i }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("navigates to the employee list view when 'List View' button is clicked", () => {
    render(
      <EmployeeForm
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
        initialValues={{ first_name: "", last_name: "", email: "", number: "", gender: "M" }}
      />
    );

    // Simulate click on List View button
    userEvent.click(screen.getByRole("button", { name: /List View/i }));

    // Check that the router push method was called to navigate
    expect(mockPush).toHaveBeenCalledWith("/employee/list");
  });
});
