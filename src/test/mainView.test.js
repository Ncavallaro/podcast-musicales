import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainView from '../components/views/mainView';

describe('Componente MainView', () => {
  const toppodcasts = [
    {
      "im:name": { label: "Podcast 1" },
      "im:artist": { label: "Artista 1" },
    },
    {
      "im:name": { label: "Podcast 2" },
      "im:artist": { label: "Artista 2" },
    },
    {
      "im:name": { label: "Podcast 3" },
      "im:artist": { label: "Artista 3" },
    },
  ];

  test('renderiza el componente correctamente', () => {
    render(<MainView toppodcasts={toppodcasts} />);
    const containerElement = screen.getByTestId('mainview-container');
    expect(containerElement).toBeInTheDocument();
  });

  test('muestra correctamente los podcasts iniciales', () => {
    render(<MainView toppodcasts={toppodcasts} />);
    const podcastElements = screen.getAllByTestId('podcast-item');
    expect(podcastElements.length).toBe(3);
  });

  test('actualiza la lista de podcasts al cambiar el filtro de búsqueda', () => {
    render(<MainView toppodcasts={toppodcasts} />);
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'Podcast 2' } });

    const podcastElements = screen.getAllByTestId('podcast-item');
    expect(podcastElements.length).toBe(1);
    expect(podcastElements[0]).toHaveTextContent('Podcast 2');
  });
});
