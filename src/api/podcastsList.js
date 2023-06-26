import { useEffect, useState } from 'react';

const UseFetchToppodcasts = ({limit, genre}) => {
  const [toppodcasts, setToppodcasts] = useState([]);
  const URL_API_TOPPODCASTS = `https://itunes.apple.com/us/rss/toppodcasts/limit=${limit}/genre=${genre}/json`

  useEffect(() => {
    const fetchToppodcasts = async () => {
      try {
        const response = await fetch(URL_API_TOPPODCASTS);
        const data = await response.json();
        console.log(data.feed.entry);
        setToppodcasts(data.feed.entry);
      } catch (error) {
        console.log(error);
      }
    };

    fetchToppodcasts();
  }, []);
  return { toppodcasts };
};

export default UseFetchToppodcasts;
