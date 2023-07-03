import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchPodcastDetail from '../../api/apiPodcastDetail';
import PodcastDetails from '../component/podcastDetail';
import Contador from '../component/contador';
import EpisodesList from '../component/episodesList';
import '../../components_css/views/podcastDetailsView.css';

const PodcastDetailsView = () => {
  const { podcastId } = useParams();
  const { podcast, isLoading } = useFetchPodcastDetail({ podcastId });
  const podcastDetail = getPodcastDetail(podcast);
  const  episodes = getEpisodes(podcast);

  useEffect(() => {
    if (isLoading) {
      console.log('cargando');
    } else {
      console.log('Podcast: ', podcast);
    }
  }, [isLoading, podcast]);

  function getPodcastDetail(podcast) {
    if (podcast !== undefined && podcast.length > 0) {
      return podcast[0];
    }
  }

  function getEpisodes(podcast) {
    if (podcast !== undefined && podcast.length > 0) {
      const episodes = [];
      for (let i = 1; i < podcast.length; i++) {
        episodes.push(podcast[i]);
      }
      return episodes;
    }
  }

  return (
    <div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className='container' id="containerDetailsView">
          <div className='barraLateral'>
            <PodcastDetails podcastDetail={podcastDetail} />
          </div>
          <div className='seccionPrincipal'>
            <Contador episodes={episodes} />
            <EpisodesList episodes={episodes} podcastDetail={podcastDetail} />
          </div>
        </div>
          
      )}
    </div>
  );
};

export default PodcastDetailsView;
