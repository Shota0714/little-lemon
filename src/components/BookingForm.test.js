import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm Validation Test Suite', () => {
  const mockAvailableTimes = ['17:00', '18:00', '19:00'];
  const mockOnSubmit = jest.fn();
  const mockOnDateChange = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnDateChange.mockClear();
    window.fetchAPI = jest.fn(() => mockAvailableTimes);
  });

  test('should apply HTML5 required attribute to the date field', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} onSubmit={mockOnSubmit} onDateChange={mockOnDateChange} />);
    const dateInput = screen.getByLabelText(/Choose date/i);
    expect(dateInput).toBeRequired();
  });

  test('should apply HTML5 required attribute to the time field', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} onSubmit={mockOnSubmit} onDateChange={mockOnDateChange} />);
    const timeSelect = screen.getByLabelText(/Choose time/i);
    expect(timeSelect).toBeRequired();
  });

  test('should apply HTML5 validation constraints to the guests numerical range field', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} onSubmit={mockOnSubmit} onDateChange={mockOnDateChange} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    
    expect(guestsInput).toBeRequired();
    expect(guestsInput).toHaveAttribute('type', 'number');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
  });

  test('should display visual error text when an invalid past date is evaluated', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} onSubmit={mockOnSubmit} onDateChange={mockOnDateChange} />);
    const dateInput = screen.getByLabelText(/Choose date/i);

    fireEvent.change(dateInput, { target: { value: '2020-01-01' } });

    const dateError = screen.getByText(/Reservations cannot be made for past dates/i);
    expect(dateError).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
    expect(submitButton).toBeDisabled();
  });

  test('should display visual error text when guests count is lower than minimum parameter', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} onSubmit={mockOnSubmit} onDateChange={mockOnDateChange} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);

    fireEvent.change(guestsInput, { target: { value: '0' } });

    const guestError = screen.getByText(/At least 1 guest is required/i);
    expect(guestError).toBeInTheDocument();
    
    const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
    expect(submitButton).toBeDisabled();
  });

  test('should display visual error text when guests count exceeds maximum boundary cap', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} onSubmit={mockOnSubmit} onDateChange={mockOnDateChange} />);
    const guestsInput = screen.getByLabelText(/Number of guests/i);

    fireEvent.change(guestsInput, { target: { value: '11' } });

    const guestError = screen.getByText(/For parties larger than 10, please contact us directly/i);
    expect(guestError).toBeInTheDocument();
    
    const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });
    expect(submitButton).toBeDisabled();
  });

  test('should enable form submission when all field data passes validation requirements', () => {
    render(<BookingForm availableTimes={mockAvailableTimes} onSubmit={mockOnSubmit} onDateChange={mockOnDateChange} />);
    
    const dateInput = screen.getByLabelText(/Choose date/i);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    const submitButton = screen.getByRole('button', { name: /Make Your Reservation/i });

    fireEvent.change(dateInput, { target: { value: '2026-12-25' } });
    fireEvent.change(guestsInput, { target: { value: '4' } });

    expect(screen.queryByText(/Reservations cannot be made for past dates/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/At least 1 guest is required/i)).not.toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });
});