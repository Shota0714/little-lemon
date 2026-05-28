import { initializeTimes, updateTimes } from './BookingPage';

describe('BookingPage Reducer Utility Functions', () => {
  
  beforeEach(() => {
    window.fetchAPI = jest.fn(() => ['17:00', '18:00', '19:00']);
  });

  afterEach(() => {
    delete window.fetchAPI;
  });

  test('initializeTimes successfully calls fetchAPI and returns a non-empty array', () => {
    const initialTimes = initializeTimes();
    
    expect(window.fetchAPI).toHaveBeenCalled();
    expect(initialTimes).toEqual(['17:00', '18:00', '19:00']);
    expect(initialTimes.length).toBeGreaterThan(0);
  });

  test('updateTimes contacts fetchAPI with the selected payload date', () => {
    const currentState = ['17:00', '18:00'];
    const action = { type: 'UPDATE_TIMES', payload: '2026-11-25' };
    
    const updatedState = updateTimes(currentState, action);
    
    expect(window.fetchAPI).toHaveBeenCalledWith(new Date('2026-11-25'));
    expect(updatedState).toEqual(['17:00', '18:00', '19:00']);
  });
});