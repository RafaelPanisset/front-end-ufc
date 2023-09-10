import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import CardPage from '../Card/CardPage'; // Certifique-se de que o caminho do import está correto.
import '@testing-library/jest-dom';

jest.mock('axios');

describe('CardPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the card list', async () => {
    // Mock a successful API response
    const mockResponse = {
      data: [
        { id: 1, nome: 'Card 1' },
        { id: 2, nome: 'Card 2' },
      ],
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    // Render the component
    render(<CardPage />);

    // Assert that the card list is rendered
    const card1 = await screen.findByText('Card 1');
    const card2 = await screen.findByText('Card 2');
    expect(card1).toBeInTheDocument();
    expect(card2).toBeInTheDocument();
  });

});
