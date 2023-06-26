import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainView from '../src/components/views/MainView';
import PodcastDetailsView from '../src/components/views/PodcastDetailsView';
import EpisodeDetailsView from '../src/components/views/EpisodeDetailsView';
import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MainView/>} />
          <Route path="/podcast/:podcastId" element={<PodcastDetailsView/>} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetailsView/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
