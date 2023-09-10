import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import EventPage from '../Event/EventPage'; // Make sure the import path is correct.
import '@testing-library/jest-dom';

// Mock the axios module
jest.mock('axios');

describe('EventPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the event list', async () => {
    // Mock a successful API response
    const mockResponse = {
      data: [
        { id: 1, nome: 'Event 1', data: '2023-09-10', local: 'Location 1' },
        { id: 2, nome: 'Event 2', data: '2023-09-11', local: 'Location 2' },
      ],
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    // Render the component
    render(<EventPage />);

    // Assert that the event list is rendered
    const event1 = await screen.findByText('Event 1');
    const event2 = await screen.findByText('Event 2');
    expect(event1).toBeInTheDocument();
    expect(event2).toBeInTheDocument();
  });
});
