import React from 'react';
import { useState } from 'react';
import Search from '../component/search';
import PodcastList from '../component/podcastList';

const MainView = (props) => {
  const [filter, setFilter] = useState('');

  const handleSearchChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  function filterPodcasts (podcasts, filterText) {
    const searchText = filterText.toLowerCase();
    return podcasts.filter((podcast) => {
      const title = podcast["im:name"].label.toLowerCase();
      const author = podcast["im:artist"].label.toLowerCase();
      return title.includes(searchText) || author.includes(searchText);
    });
  };
  
  return (
    <div className='containerMainView'>
      <Search 
        toppodcasts={filterPodcasts(props.toppodcasts, filter)}
        handleSearchChange={handleSearchChange}/>
      <PodcastList toppodcasts={filterPodcasts(props.toppodcasts, filter)} />
    </div>
  );
};

export default MainView;
