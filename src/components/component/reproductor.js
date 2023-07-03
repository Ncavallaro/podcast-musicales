import '../../components_css/component/reproductor.css'

const Reproductor = (props) => {
    
    return (
        <div className="reproductor">
            <h2>{props.episodeDetail.trackName}</h2>
            <div dangerouslySetInnerHTML={{ __html: props.episodeDetail.description }} />
            <audio controls>
                <source src={props.episodeDetail.previewUrl} 
                type={`${props.episodeDetail.episodeContentType}/${props.episodeDetail.episodeFileExtension}`} />
            </audio>
        </div>
    );

}

export default Reproductor;