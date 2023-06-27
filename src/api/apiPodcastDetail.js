import { useEffect, useState } from 'react';

const UseFetchPodcastDetail = ({ podcastId }) => {
  const [podcast, setPodcast] = useState([]);
  const URL_API_PODCASTDETAIL = `https://api.allorigins.win/get?url=${encodeURIComponent(
    `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
  )}`;

  useEffect(() => {
    const fetchPodcastDetail = async () => {
      try {
        const response = await fetch(URL_API_PODCASTDETAIL);
        if (response.ok) {
          const data = await response.json();
          const parsedData = JSON.parse(data.contents).results;
          setPodcast(parsedData);
          console.log(parsedData)
        } else {
          throw new Error('Network response was not ok.');
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
