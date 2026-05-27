import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm Component', () => {
  const mockAvailableTimes = ['17:00', '18:00', '19:00'];
  const mockOnSubmit = jest.fn();
  const mockOnDateChange = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnDateChange.mockClear();
    
    // Safely mock window.fetchAPI to return a non-empty array for internal updates
    window.fetchAPI = jest.fn(() => mockAvailableTimes);
  });

  test('renders all form input fields and labels correctly', () => {
    render(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        onSubmit={mockOnSubmit} 
        onDateChange={mockOnDateChange} 
      />
    );

    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Make Your Reservation/i })).toBeInTheDocument();
  });

  test('triggers onDateChange when a new date is picked', () => {
    render(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        onSubmit={mockOnSubmit} 
        onDateChange={mockOnDateChange} 
      />
    );

    const dateInput = screen.getByLabelText(/Choose date/i);
    fireEvent.change(dateInput, { target: { value: '2026-10-31' } });

    expect(mockOnDateChange).toHaveBeenCalledTimes(1);
    expect(mockOnDateChange).toHaveBeenCalledWith('2026-10-31');
  });
});