import { render, screen } from '@testing-library/react';
import Reproductor from '../components/component/reproductor';

describe('Reproductor component', () => {
  test('renderiza correctamente el nombre del episodio', () => {
    const episodeDetail = {
      trackName: 'Título del episodio',
      description: '',
      previewUrl: '',
      episodeContentType: '',
      episodeFileExtension: '',
    };

    render(<Reproductor episodeDetail={episodeDetail} />);

    const trackNameElement = screen.getByText('Título del episodio');
    expect(trackNameElement).toBeInTheDocument();
  });

  test('renderiza correctamente la descripción del episodio', () => {
    const episodeDetail = {
      trackName: '',
      description: '<p>Esta es una descripción.</p>',
      previewUrl: '',
      episodeContentType: '',
      episodeFileExtension: '',
    };

    render(<Reproductor episodeDetail={episodeDetail} />);

    const descriptionElement = screen.getByText('Esta es una descripción.');
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renderiza correctamente la fuente de audio', () => {
    const episodeDetail = {
      trackName: '',
      description: '',
      previewUrl: 'https://ejemplo.com/episodio.mp3',
      episodeContentType: 'audio/mp3',
      episodeFileExtension: 'mp3',
    };

    render(<Reproductor episodeDetail={episodeDetail} />);

    const audioElement = screen.getByRole('audio');
    expect(audioElement).toHaveAttribute('src', 'https://ejemplo.com/episodio.mp3');
    expect(audioElement).toHaveAttribute('type', 'audio/mp3');
  });
});
