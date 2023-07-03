import { useEffect, useState } from 'react';

const UseFetchToppodcasts = ({limit, genre}) => {
  const [toppodcasts, setToppodcasts] = useState([]);

  const URL_API_TOPPODCASTS = `https://itunes.apple.com/us/rss/toppodcasts/limit=${limit}/genre=${genre}/json`
  const STORAGE_KEY = 'toppodcasts';
  const ONE_DAY = 24 * 60 * 60 * 1000;

  useEffect(() => {
    const fetchToppodcasts = async () => {
      try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
          // Comprobar si ha pasado más de un día desde la última solicitud
          const storedTimestamp = localStorage.getItem(`${STORAGE_KEY}_timestamp`);
          if (storedTimestamp && Date.now() - Number(storedTimestamp) < ONE_DAY) {
            // Utilizar los datos almacenados en el cliente
            setToppodcasts(JSON.parse(storedData));
            return;
          }
        }
        const response = await fetch(URL_API_TOPPODCASTS);
        const data = await response.json();
        setToppodcasts(data.feed.entry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.feed.entry));
        localStorage.setItem(`${STORAGE_KEY}_timestamp`, Date.now());
      } catch (error) {
        console.log(error);
      }
    };

    fetchToppodcasts();
  }, []);
  return { toppodcasts };
};

export default UseFetchToppodcasts;
