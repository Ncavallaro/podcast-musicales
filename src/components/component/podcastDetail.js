import '../../components_css/component/podcastDetail.css';

const PodcastDetails = ({podcastDetail}) => {
    if (!podcastDetail) {
        return <p>No podcast details available.</p>;
    }
    
    return (
        <div className="container">
            <div className="card mb-3" id="podcastDetail">
                <img src={podcastDetail.artworkUrl100} className="card-img-top" />
                <div className="card-body">
                    
                    <h3 className="card-title">{podcastDetail.collectionName}</h3>
                    <hr/>
                    <p className="card-text">
                        <strong>by {podcastDetail.artistName}</strong> 
                    </p>
                    <hr/>
                    <p className="card-text">
                        <strong>Description:</strong>
                        <br/> 
                        {podcastDetail.collectionExplicitness}
                    </p>
                </div>
            </div>
        </div>

    );
};

export default PodcastDetails;