import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm Component', () => {
  const mockAvailableTimes = ['17:00', '18:00', '19:00'];
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    // Clear mock calls before each test run
    mockOnSubmit.mockClear();
  });

  test('renders all form input fields and labels correctly', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} onSubmit={mockOnSubmit} />);

    // Check for static text/labels
    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Make Your Reservation/i })).toBeInTheDocument();
  });

  test('populates the time dropdown with the availableTimes prop', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} onSubmit={mockOnSubmit} />);

    const timeSelect = screen.getByLabelText(/Choose time/i);
    const timeOptions = within(timeSelect).getAllByRole('option');

    expect(timeOptions).toHaveLength(3);
    expect(timeOptions[0].value).toBe('17:00');
    expect(timeOptions[1].value).toBe('18:00');
    expect(timeOptions[2].value).toBe('19:00');
  });

  test('allows users to change form values', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} onSubmit={mockOnSubmit} />);

    const dateInput = screen.getByLabelText(/Choose date/i);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    const occasionSelect = screen.getByLabelText(/Occasion/i);

    // Simulate user changes
    fireEvent.change(dateInput, { target: { value: '2026-10-31' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });
    fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });

    expect(dateInput.value).toBe('2026-10-31');
    expect(guestsInput.value).toBe('4');
    expect(occasionSelect.value).toBe('Birthday');
  });

  test('submits the form with correct data when values are filled', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} onSubmit={mockOnSubmit} />);

    // Step 1: Fill out the form fields
    fireEvent.change(screen.getByLabelText(/Choose date/i), { target: { value: '2026-10-31' } });
    fireEvent.change(screen.getByLabelText(/Choose time/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/Number of guests/i), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText(/Occasion/i), { target: { value: 'Birthday' } });

    // Step 2: Submit the form
    const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
    fireEvent.click(submitButton);

    // Step 3: Assertions
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      date: '2026-10-31',
      time: '18:00',
      guests: '4',
      occasion: 'Birthday'
    });
  });
});