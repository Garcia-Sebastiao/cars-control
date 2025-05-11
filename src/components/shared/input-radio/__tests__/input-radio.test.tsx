import { render, screen, fireEvent } from '@testing-library/react';
import { InputRadio } from '../input-radio';

describe('InputRadio', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('should render with label', () => {
    render(
      <InputRadio
        label="Test Label"
        isChecked={false}
        onChange={mockOnChange}
      />
    );

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('should be checked when isChecked is true', () => {
    render(
      <InputRadio
        label="Test Label"
        isChecked={true}
        onChange={mockOnChange}
      />
    );

    const radio = screen.getByLabelText('Test Label');
    expect(radio).toBeChecked();
  });

  it('should not be checked when isChecked is false', () => {
    render(
      <InputRadio
        label="Test Label"
        isChecked={false}
        onChange={mockOnChange}
      />
    );

    const radio = screen.getByLabelText('Test Label');
    expect(radio).not.toBeChecked();
  });

  it('should call onChange when clicked', () => {
    render(
      <InputRadio
        label="Test Label"
        isChecked={false}
        onChange={mockOnChange}
      />
    );

    const radio = screen.getByLabelText('Test Label');
    fireEvent.click(radio);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <InputRadio
        label="Test Label"
        isChecked={false}
        onChange={mockOnChange}
        disabled={true}
      />
    );

    const radio = screen.getByLabelText('Test Label');
    expect(radio).toBeDisabled();
  });

  it('should not call onChange when disabled and clicked', () => {
    render(
      <InputRadio
        label="Test Label"
        isChecked={false}
        onChange={mockOnChange}
        disabled={true}
      />
    );

    const radio = screen.getByLabelText('Test Label');
    fireEvent.click(radio);

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    const customClass = 'custom-class';
    render(
      <InputRadio
        label="Test Label"
        isChecked={false}
        onChange={mockOnChange}
        className={customClass}
      />
    );

    const radio = screen.getByLabelText('Test Label');
    expect(radio.parentElement).toHaveClass(customClass);
  });
}); 