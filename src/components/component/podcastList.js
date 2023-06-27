import { Link } from 'react-router-dom';
import '../../components_css/component/podcastList.css'

const PodcastList = (props) => {
    return (
        <div className="container" id="containerList">
            <div className="row" id="rowList">
              {props.toppodcasts.map(podcast => (
                <Link to={`/podcast/${podcast.id.attributes["im:id"]}`} className='col-lg-3 col-md-6 col-sm-12' id='Link' key={podcast.id.attributes["im:id"]}>
                  <div key={podcast.id.attributes["im:id"]} >
                    <div className="card mb-3">
                        <img src={podcast["im:image"][0].label} className="card-img-top" alt={podcast["im:image"][0].attributes.height} />
                      <div className="card-body">
                        <h3 className="card-title">{podcast["im:name"].label}</h3>
                        <p className="card-text">
                          <strong>Author:</strong> {podcast["im:artist"].label}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
        </div>
    )
}

export default PodcastList;
