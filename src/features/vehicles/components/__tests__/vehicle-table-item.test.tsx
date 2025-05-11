import { render, screen } from "@testing-library/react";
import { VehicleTableItem } from "../vehicle-table-item";

describe("VehicleTableItem", () => {
  it("should render children", () => {
    render(<VehicleTableItem>Test Content</VehicleTableItem>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    const customClass = "custom-class";
    render(
      <VehicleTableItem className={customClass}>Test Content</VehicleTableItem>
    );

    const cell = screen.getByText("Test Content");
    expect(cell).toHaveClass(customClass);
  });

  it("should render with default styles", () => {
    render(<VehicleTableItem>Test Content</VehicleTableItem>);

    const cell = screen.getByText("Test Content");
    expect(cell).toHaveClass("text-white");
    expect(cell).toHaveClass("text-xs");
    expect(cell).toHaveClass("lg:text-sm");
    expect(cell).toHaveClass("text-center");
    expect(cell).toHaveClass("px-10");
    expect(cell).toHaveClass("lg:px-[5.625rem]");
    expect(cell).toHaveClass("py-4");
  });

  it("should render with complex content", () => {
    const complexContent = (
      <div>
        <span>Test</span>
        <strong>Content</strong>
      </div>
    );

    render(<VehicleTableItem>{complexContent}</VehicleTableItem>);

    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});
