import '../../components_css/component/contador.css'

const Contador = (props) => {
    if (!props.episodes) {
        return <p>No podcast details available.</p>;
    }

    return (
        <div className='containerContador'>
            <h3>Episodes:</h3>
            <span>{props.episodes.length}</span>
        </div>
    );
};

export default Contador;
