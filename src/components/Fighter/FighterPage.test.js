import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import FighterPage from '../Fighter/FighterPage'; // Make sure the import path is correct.
import '@testing-library/jest-dom';

// Mock the axios module
jest.mock('axios');

describe('FighterPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the fighter list', async () => {
    // Mock a successful API response for fighters
    const mockResponse = {
      data: [
        {
          id: 1,
          nome: 'Fighter 1',
          categoriaPeso: 'Lightweight',
          paisOrigem: 'USA',
          idade: 28,
          altura: '5\'10"',
          alcance: '72 inches',
        },
        {
          id: 2,
          nome: 'Fighter 2',
          categoriaPeso: 'Welterweight',
          paisOrigem: 'Brazil',
          idade: 32,
          altura: '5\'11"',
          alcance: '74 inches',
        },
      ],
    };

    axios.get.mockResolvedValueOnce(mockResponse);

    // Render the component
    render(<FighterPage />);

    // Assert that the fighter list is rendered
    const fighter1 = await screen.findByText('Name: Fighter 1');
    const fighter2 = await screen.findByText('Name: Fighter 2');
    expect(fighter1).toBeInTheDocument();
    expect(fighter2).toBeInTheDocument();
  });

  // Add tests for creating, editing, and deleting fighters similar to the previous examples.
});
