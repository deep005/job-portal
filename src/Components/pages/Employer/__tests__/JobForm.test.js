import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import JobForm from '../JobForm';

describe('JobForm', () => {
  const onNewJobMock = jest.fn();
  const onJobCreationMock = jest.fn();

  beforeEach(()=>{
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // Deprecated
          removeListener: jest.fn(), // Deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });
  });

  test('should render all form fields', () => {
    render(<JobForm onNewJob={onNewJobMock} onJobCreation={onJobCreationMock} />);
    
    expect(screen.getByLabelText('Company Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Designation')).toBeInTheDocument();
    expect(screen.getByLabelText('Requirements')).toBeInTheDocument();
    expect(screen.getByLabelText('Tags')).toBeInTheDocument();
    expect(screen.getByLabelText('Minimum YOE')).toBeInTheDocument();
    expect(screen.getByLabelText('Job Description Document')).toBeInTheDocument();
    expect(screen.getByLabelText('Point of Contact')).toBeInTheDocument();
    expect(screen.getByText('Click to Upload')).toBeInTheDocument();
    expect(screen.getByLabelText('Tags')).toBeInTheDocument();
  });

  test('should disable submit by default', () => {
    render(<JobForm onNewJob={onNewJobMock} onJobCreation={onJobCreationMock} />);
    const submitBtn = screen.getByRole('button', {name: 'Submit'});
    expect(submitBtn).toBeDisabled();
  });

  it("should not call the clickHandler onClick of disabled submit", () => {
    const onNewJob = jest.fn();
    const onJobCreation = jest.fn();
    render(<JobForm onNewJob={onNewJob} onJobCreation={onJobCreation} />);
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    expect(onNewJob).not.toHaveBeenCalled();
    expect(onJobCreation).not.toHaveBeenCalled();
  });

  it('should not show error message on file upload of less than 16 KB', () => {
    render(<JobForm onNewJob={onNewJobMock} onJobCreation={onJobCreationMock} />);
    const file = new File(['file content'], 'small_file.txt', { type: 'text/plain' });
    const input = screen.getByText('Click to Upload');
    
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(screen.queryByTestId("/file-error/i")).toBeNull();
  });

  it("validation error message should be displayed when entering invalid company name", async () => {
    const onNewJobMock = jest.fn();
    const onOpenJobCreationModal = jest.fn();
    render(<JobForm onNewJob={onNewJobMock} onOpenJobCreationModal={onOpenJobCreationModal} />);
    fireEvent.change(screen.getByLabelText("Company Name"), { target: { value: "Test Company" } });
    fireEvent.change(screen.getByLabelText("Company Name"), { target: { value: "" } });
    expect(await screen.findByText('Please enter the Company Name!')).toBeInTheDocument();
  });
});
