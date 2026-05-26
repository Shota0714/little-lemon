import { initializeTimes, updateTimes } from './BookingPage';

describe('BookingPage Reducer Functions', () => {
  
  test('initializeTimes returns a non-empty array of times', () => {
    // Set up a mock global function onto window just like the script does
    window.fetchAPI = jest.fn(() => ['17:00', '18:00']);
    
    const initialTimes = initializeTimes();
    expect(initialTimes).toEqual(['17:00', '18:00']);
    expect(window.fetchAPI).toHaveBeenCalled();
  });

  test('updateTimes returns new times when action type is UPDATE_TIMES', () => {
    window.fetchAPI = jest.fn(() => ['19:00', '20:00']);
    
    const state = ['17:00', '18:00'];
    const action = { type: 'UPDATE_TIMES', payload: '2026-10-31' };
    
    const newState = updateTimes(state, action);
    expect(newState).toEqual(['19:00', '20:00']);
  });
});