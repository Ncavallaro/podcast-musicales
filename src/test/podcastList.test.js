import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PodcastList from '../components/component/podcastList';

describe('Componente PodcastList', () => {
  it('se renderiza sin errores', () => {
    render(
      <Router>
        <PodcastList toppodcasts={[]} />
      </Router>
    );
  });

  it('muestra la lista de podcasts correctamente', () => {
    const toppodcasts = [
      /* datos de toppodcasts de ejemplo */
    ];
    const { getByText } = render(
      <Router>
        <PodcastList toppodcasts={toppodcasts} />
      </Router>
    );

    toppodcasts.forEach((podcast) => {
      const link = getByText(podcast['im:name'].label);
      expect(link).toBeInTheDocument();
      expect(link.getAttribute('href')).toBe(`/podcast/${podcast.id.attributes['im:id']}`);
    });
  });
});
