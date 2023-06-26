import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainView from '../src/components/views/mainView';
import PodcastDetailsView from '../src/components/views/podcastDetailsView';
import EpisodeDetailsView from '../src/components/views/episodeDetailsView';
import Nav from '../src/components/header/nav';
import useFetchToppodcasts from '../src/api/podcastsList';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const limit = "100";
  const genre = "1310";
  const {toppodcasts} = useFetchToppodcasts({limit, genre});

  return (
    <div>
      <BrowserRouter>
        <Nav toppodcasts={toppodcasts}/>
        <Routes>
          <Route exact path="/" element={<MainView toppodcasts={toppodcasts}/>} />
          <Route path="/podcast/:podcastId" element={<PodcastDetailsView/>} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetailsView/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
