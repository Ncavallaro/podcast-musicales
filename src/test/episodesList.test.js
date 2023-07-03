import { render, screen } from '@testing-library/react';
import EpisodesList from '../components/component/episodesList';

describe('Componente EpisodesList', () => {
  test('renderiza "No hay detalles de podcast disponibles" cuando no se proporcionan episodios', () => {
    render(<EpisodesList />);
    const mensajeElemento = screen.getByText(/No hay detalles de podcast disponibles/i);
    expect(mensajeElemento).toBeInTheDocument();
  });

  test('renderiza los episodios correctamente cuando se proporcionan episodios', () => {
    const episodios = [
      {
        trackId: 1,
        trackName: 'Episodio 1',
        releaseDate: '2023-06-28T16:00:00Z',
        trackTimeMillis: 11544000,
      },
      {
        trackId: 2,
        trackName: 'Episodio 2',
        releaseDate: '2023-06-29T14:30:00Z',
        trackTimeMillis: 8456000,
      },
    ];
    render(<EpisodesList episodes={episodios} />);

    const enlaceEpisodio1 = screen.getByRole('link', { name: /Episodio 1/i });
    expect(enlaceEpisodio1).toBeInTheDocument();
    expect(enlaceEpisodio1).toHaveAttribute('href', '/episode/1');

    const fechaEpisodio1 = screen.getByText(/28\/06\/2023/i);
    expect(fechaEpisodio1).toBeInTheDocument();

    const duracionEpisodio1 = screen.getByText(/19:14/i);
    expect(duracionEpisodio1).toBeInTheDocument();

    const enlaceEpisodio2 = screen.getByRole('link', { name: /Episodio 2/i });
    expect(enlaceEpisodio2).toBeInTheDocument();
    expect(enlaceEpisodio2).toHaveAttribute('href', '/episode/2');

    const fechaEpisodio2 = screen.getByText(/29\/06\/2023/i);
    expect(fechaEpisodio2).toBeInTheDocument();

    const duracionEpisodio2 = screen.getByText(/14:05/i);
    expect(duracionEpisodio2).toBeInTheDocument();
  });
});
