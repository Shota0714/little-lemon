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
  }); // <-- Closed this block cleanly

  test('applies native HTML5 validation attributes to fields', () => {
    render(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        onSubmit={mockOnSubmit} 
        onDateChange={mockOnDateChange} 
      />
    );

    const dateInput = screen.getByLabelText(/Choose date/i);
    const guestsInput = screen.getByLabelText(/Number of guests/i);

    // HTML5 structural validation assertions
    expect(dateInput).toBeRequired();
    expect(guestsInput).toBeRequired();
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
  });

  test('disables submit button when validation state fails conditions', () => {
    render(
      <BookingForm 
        availableTimes={mockAvailableTimes} 
        onSubmit={mockOnSubmit} 
        onDateChange={mockOnDateChange} 
      />
    );

    const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
    const dateInput = screen.getByLabelText(/Choose date/i);
    const guestsInput = screen.getByLabelText(/Number of guests/i);

    // Initial state should be disabled because the date input is empty
    expect(submitButton).toBeDisabled();

    // Pick an invalid past date and an out-of-bounds guest count
    fireEvent.change(dateInput, { target: { value: '2020-01-01' } });
    fireEvent.change(guestsInput, { target: { value: '0' } });

    expect(submitButton).toBeDisabled();

    // Provide fully valid values -> button should activate cleanly
    fireEvent.change(dateInput, { target: { value: '2026-12-25' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });

    expect(submitButton).not.toBeDisabled();
  });
});