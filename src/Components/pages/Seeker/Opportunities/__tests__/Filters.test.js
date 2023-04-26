import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FiltersCard from '../FiltersCard';

const mockSkillsRef = { current: [] };
const mockSalaryRef = { current: null };
const mockResetOpportunities = jest.fn();

describe('FiltersCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <FiltersCard
        skillsRef={mockSkillsRef}
        salaryRef={mockSalaryRef}
        resetOpportunities={mockResetOpportunities}
      />
    );

    expect(screen.getByLabelText('Minimum salary per hour:')).toBeInTheDocument();
    expect(screen.getByLabelText('Skills:')).toBeInTheDocument();
  });

  it('updates skillsRef when skills are selected', () => {
    render(
      <FiltersCard
        skillsRef={mockSkillsRef}
        salaryRef={mockSalaryRef}
        resetOpportunities={mockResetOpportunities}
      />
    );

    fireEvent.change(screen.getByLabelText('Skills:'), {
      target: { value: ['React', 'Node.js'] },
    });

    expect(mockSkillsRef.current).toEqual(['React', 'Node.js']);
    expect(mockSalaryRef.current).toBeNull();
    expect(mockResetOpportunities).toHaveBeenCalledTimes(1);
    expect(mockResetOpportunities).toHaveBeenCalledWith(true);
  });

  it('updates salaryRef when minimum salary is selected', () => {
    render(
      <FiltersCard
        skillsRef={mockSkillsRef}
        salaryRef={mockSalaryRef}
        resetOpportunities={mockResetOpportunities}
      />
    );

    fireEvent.change(screen.getByLabelText('Minimum salary per hour:'), {
      target: { value: 20 },
    });

    expect(mockSkillsRef.current).toEqual([]);
    expect(mockSalaryRef.current).toEqual(20);
    expect(mockResetOpportunities).toHaveBeenCalledTimes(1);
    expect(mockResetOpportunities).toHaveBeenCalledWith(true);
  });
});
