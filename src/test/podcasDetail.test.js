import { render, screen } from '@testing-library/react';
import PodcastDetails from '../components/component/podcastDetail';

describe('Componente PodcastDetails', () => {
  test('renderiza "No hay detalles de podcast disponibles" cuando no se proporciona podcastDetail', () => {
    render(<PodcastDetails />);
    const mensajeElemento = screen.getByText(/No hay detalles de podcast disponibles/i);
    expect(mensajeElemento).toBeInTheDocument();
  });

  test('renderiza los detalles del podcast correctamente cuando se proporciona podcastDetail', () => {
    const podcastDetail = {
      artworkUrl100: 'https://example.com/imagen.jpg',
      collectionName: 'Colección de Podcast',
      artistName: 'Artista del Podcast',
      collectionExplicitness: 'Explícito',
    };
    render(<PodcastDetails podcastDetail={podcastDetail} />);

    const imagenElemento = screen.getByAltText(/Colección de Podcast/i);
    expect(imagenElemento).toHaveAttribute('src', 'https://example.com/imagen.jpg');

    const tituloElemento = screen.getByText(/Colección de Podcast/i);
    expect(tituloElemento).toBeInTheDocument();

    const artistaElemento = screen.getByText(/por Artista del Podcast/i);
    expect(artistaElemento).toBeInTheDocument();

    const descripcionElemento = screen.getByText(/Explícito/i);
    expect(descripcionElemento).toBeInTheDocument();
  });
});
