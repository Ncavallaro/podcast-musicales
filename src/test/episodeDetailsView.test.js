import React from 'react';
import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import EpisodeDetails from '../components/views/episodeDetailsView';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

describe('EpisodeDetails', () => {
  beforeEach(() => {
    useParams.mockReset();
  });

  test('muestra los detalles del episodio correctamente', () => {
    useParams.mockReturnValue({ podcastId: '123', episodeId: '456' });
    const podcast = [
      {
        id: '123',
        title: 'Podcast 123',
        description: 'Descripción del podcast 123',
      },
      {
        trackId: '456',
        title: 'Episodio 456',
        duration: '10:00',
      },
    ];
    localStorage.setItem('podcast_123', JSON.stringify(podcast));

    render(<EpisodeDetails />);

    expect(screen.getByText('Podcast 123')).toBeInTheDocument();
    expect(screen.getByText('Episodio 456')).toBeInTheDocument();
    expect(screen.getByText('Duración: 10:00')).toBeInTheDocument();
  });

  test('muestra el mensaje de error si no se encuentra el episodio', () => {
    useParams.mockReturnValue({ podcastId: '123', episodeId: '789' });
    const podcast = [
      {
        id: '123',
        title: 'Podcast 123',
        description: 'Descripción del podcast 123',
      },
      {
        trackId: '456',
        title: 'Episodio 456',
        duration: '10:00',
      },
    ];
    localStorage.setItem('podcast_123', JSON.stringify(podcast));

    render(<EpisodeDetails />);

    expect(screen.getByText('Episodio no encontrado')).toBeInTheDocument();
  });

  test('muestra el mensaje de error si no se encuentra el podcast', () => {
    useParams.mockReturnValue({ podcastId: '123', episodeId: '456' });
    const podcast = [];
    localStorage.setItem('podcast_123', JSON.stringify(podcast));

    render(<EpisodeDetails />);

    expect(screen.getByText('Episodio no encontrado')).toBeInTheDocument();
  });

  test('muestra el mensaje de error si el podcast no es un array', () => {
    useParams.mockReturnValue({ podcastId: '123', episodeId: '456' });
    const podcast = {};
    localStorage.setItem('podcast_123', JSON.stringify(podcast));

    render(<EpisodeDetails />);

    expect(screen.getByText('Episodio no encontrado')).toBeInTheDocument();
  });
});
