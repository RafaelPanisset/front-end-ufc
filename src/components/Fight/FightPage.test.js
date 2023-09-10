import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import FightPage from '../Fight/FightPage'; // Make sure the import path is correct.
import '@testing-library/jest-dom';

// Mock the axios module
jest.mock('axios');

describe('FightPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the fight list', async () => {
    // Mock a successful API response for fights
    const mockFightsResponse = {
      data: [
        { id: 1, lutador1Id: 1, lutador2Id: 2, eventoId: 1, cardId: 1 },
        { id: 2, lutador1Id: 3, lutador2Id: 4, eventoId: 2, cardId: 2 },
      ],
    };

    // Mock API responses for events, cards, and fighters dropdowns
    const mockDropdownsResponse = {
      data: [
        { id: 1, nome: 'Event 1' },
        { id: 2, nome: 'Event 2' },
        { id: 3, nome: 'Card 1' },
        { id: 4, nome: 'Card 2' },
        { id: 1, nome: 'Fighter 1' },
        { id: 2, nome: 'Fighter 2' },
        { id: 3, nome: 'Fighter 3' },
        { id: 4, nome: 'Fighter 4' },
      ],
    };

    axios.get
      .mockResolvedValueOnce(mockFightsResponse)
      .mockResolvedValueOnce(mockDropdownsResponse)
      .mockResolvedValueOnce(mockDropdownsResponse)
      .mockResolvedValueOnce(mockDropdownsResponse);

    // Render the component
    render(<FightPage />);

    // Assert that the fight list is rendered
    const fight1 = await screen.findByText('Fight ID: 1');
    const fight2 = await screen.findByText('Fight ID: 2');
    expect(fight1).toBeInTheDocument();
    expect(fight2).toBeInTheDocument();
  });

  // Add tests for creating, editing, and deleting fights similar to the previous examples.
});
