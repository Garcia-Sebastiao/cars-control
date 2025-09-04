import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../button";

describe("Button", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("should render with children", () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    render(<Button onClick={mockOnClick}>Test Button</Button>);

    const button = screen.getByText("Test Button");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Test Button</Button>);

    const button = screen.getByText("Test Button");
    expect(button).toBeDisabled();
  });

  it("should not call onClick when disabled and clicked", () => {
    render(
      <Button onClick={mockOnClick} disabled>
        Test Button
      </Button>
    );

    const button = screen.getByText("Test Button");
    fireEvent.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("should apply custom className", () => {
    const customClass = "custom-class";
    render(<Button className={customClass}>Test Button</Button>);

    const button = screen.getByText("Test Button");
    expect(button).toHaveClass(customClass);
  });
});
