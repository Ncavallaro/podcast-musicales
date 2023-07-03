import React from 'react';
import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import PodcastDetailsView from '../components/views/podcastDetailsView';
import useFetchPodcastDetail from '../api/apiPodcastDetail';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../api/apiPodcastDetail', () => jest.fn());

describe('PodcastDetailsView', () => {
  beforeEach(() => {
    useParams.mockReset();
    useFetchPodcastDetail.mockReset();
  });

  test('muestra el mensaje "Cargando..." mientras se carga el podcast', () => {
    useParams.mockReturnValue({ podcastId: '123' });
    useFetchPodcastDetail.mockReturnValue({ podcast: [], isLoading: true });

    render(<PodcastDetailsView />);

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  test('muestra los detalles del podcast y la lista de episodios cuando se carga el podcast', () => {
    useParams.mockReturnValue({ podcastId: '123' });
    const podcast = [
      {
        id: '123',
        title: 'Podcast 123',
        description: 'Descripción del podcast 123',
      },
      {
        id: '1',
        title: 'Episodio 1',
      },
      {
        id: '2',
        title: 'Episodio 2',
      },
    ];
    useFetchPodcastDetail.mockReturnValue({ podcast, isLoading: false });

    render(<PodcastDetailsView />);

    expect(screen.getByText('Podcast 123')).toBeInTheDocument();
    expect(screen.getByText('Descripción del podcast 123')).toBeInTheDocument();
    expect(screen.getByText('Episodio 1')).toBeInTheDocument();
    expect(screen.getByText('Episodio 2')).toBeInTheDocument();
  });

  test('muestra el mensaje "Cargando..." si el podcast está vacío', () => {
    useParams.mockReturnValue({ podcastId: '123' });
    const podcast = [];
    useFetchPodcastDetail.mockReturnValue({ podcast, isLoading: false });

    render(<PodcastDetailsView />);

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  test('muestra el mensaje "Cargando..." si no se ha obtenido el podcast', () => {
    useParams.mockReturnValue({ podcastId: '123' });
    useFetchPodcastDetail.mockReturnValue({ podcast: undefined, isLoading: false });

    render(<PodcastDetailsView />);

    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
});
