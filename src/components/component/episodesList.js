import React from 'react';
import '../../components_css/component/episodesList.css'

const EpisodesList = (props) => {
  if (!props.episodes) {
    return <p>No podcast details available.</p>;
  }

  function formatTime(time) {
    const date = new Date(time);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString(undefined, options).replace(/\//g, '/');
  }

  function formatTrackTimeMillis(trackTimeMillis) {
    const totalSeconds = Math.floor(trackTimeMillis / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

    return (
      <div className="container" id="containerEpisodes">
        <div className="row" id="rowList">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Duration</th>
              </tr>
            </thead>
            <tbody>
              {props.episodes.map(episode => (
                <tr key={episode.trackId}>
                  <td>
                    <a href={`/podcast/${episode.collectionId}/episode/${episode.trackId}`} id="Link" key={episode.trackId}>
                      {episode.trackName}
                    </a>
                  </td>
                  <td>{formatTime(episode.releaseDate)}</td>
                  <td>{formatTrackTimeMillis(episode.trackTimeMillis)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
}

export default EpisodesList;