import React from 'react';
import { useParams } from 'react-router-dom';
import PodcastDetails from '../component/podcastDetail';
import Reproductor from '../component/reproductor';

const EpisodeDetails = () => {
  const { podcastId, episodeId } = useParams();
  const podcast = getPodcast(podcastId);
  const podcastDetail = getPodcastDetail(podcast);
  const episodeDetail = getEpisodeDetail(podcast, episodeId);

  function getPodcast(podcastId) {
    const storedData = localStorage.getItem('podcast_' + podcastId);
    const podcastData = JSON.parse(storedData);
    return podcastData;
  }

  function getPodcastDetail(podcast){
    if (Array.isArray(podcast) && podcast.length > 0) {
      return podcast[0];
    }
    return null;
  }


  function getEpisodeDetail(podcast, episodeId) {
    if (Array.isArray(podcast) && podcast.length > 0) {
      for (let i = 1; i < podcast.length; i++) {
        if (podcast[i].trackId == episodeId) {
          return podcast[i];
        }
      }
    }
    return null;
  }

  return (
    <div>
        <div className='container' id="containerDetailsView">
          <div className='barraLateral'>
            <PodcastDetails podcastDetail={podcastDetail} />
          </div>
          <div className='seccionPrincipal'>
            <Reproductor episodeDetail={episodeDetail}/>
          </div>
        </div>
    </div>
  );
};

export default EpisodeDetails;
