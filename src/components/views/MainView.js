import React from 'react';

const MainView = (props) => {

  return (
    <div>
      <h1>Main View</h1>
      {
        props.toppodcasts.map( podcast => (
            <div key={podcast.id.attributes["im:id"]}>
              <h2>{podcast.title.label}</h2>

            </div>
          ))}
    </div>
  );
};

export default MainView;
