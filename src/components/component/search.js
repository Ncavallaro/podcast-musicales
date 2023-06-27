import '../../components_css/component/search.css'

const search = (props) => {

    return (
        <form className="d-flex" role="search" id="formSearch">
            <div className='containerSearch'>
                <span className="input-group-text" id="basic-addon1">{props.toppodcasts.length}</span>
                <input className="form-control me-2" type="search" placeholder="Filter podcasts..." aria-label="Name" onChange={(event) => props.handleSearchChange(event)}/>
            </div>
        </form>
    );
};

export default search;
