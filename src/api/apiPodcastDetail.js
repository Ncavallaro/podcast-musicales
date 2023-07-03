import { useEffect, useState } from 'react';

const UseFetchPodcastDetail = ({ podcastId }) => {
  const [podcast, setPodcast] = useState([]);

  useEffect(() => {
    const fetchPodcastDetail = async () => {
      try {
        // Verificar si el detalle del podcast está en el localStorage
        const storedPodcast = localStorage.getItem(`podcast_${podcastId}`);

        if (storedPodcast) {
          // Si existe en el localStorage, usarlo en lugar de hacer la solicitud
          const parsedPodcast = JSON.parse(storedPodcast);
          setPodcast(parsedPodcast);
        } else {
          // Realizar la solicitud al servicio externo
          const response = await fetch(
            `https://api.allorigins.win/get?url=${encodeURIComponent(
              `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
            )}`
          );

          if (response.ok) {
            const data = await response.json();
            const parsedData = JSON.parse(data.contents).results;
            setPodcast(parsedData);

            // Guardar el detalle del podcast en el localStorage
            localStorage.setItem(`podcast_${podcastId}`, JSON.stringify(parsedData));
          } else {
            throw new Error('Network response was not ok.');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPodcastDetail();
  }, [podcastId]);

  return { podcast };
};

export default UseFetchPodcastDetail;
