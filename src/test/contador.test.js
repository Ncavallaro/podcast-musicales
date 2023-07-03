import { render, screen } from '@testing-library/react';
import Contador from '../components/component/contador';

describe('Contador component', () => {
  test('renderiza correctamente el número de episodios cuando hay episodios disponibles', () => {
    const episodes = [
      { trackId: 1, trackName: 'Episodio 1' },
      { trackId: 2, trackName: 'Episodio 2' },
      { trackId: 3, trackName: 'Episodio 3' },
    ];

    render(<Contador episodes={episodes} />);

    const episodesCountElement = screen.getByText('3');
    expect(episodesCountElement).toBeInTheDocument();
  });

  test('renderiza el mensaje de "No hay detalles disponibles" cuando no hay episodios', () => {
    render(<Contador episodes={null} />);

    const noEpisodesElement = screen.getByText('No podcast details available.');
    expect(noEpisodesElement).toBeInTheDocument();
  });
});
