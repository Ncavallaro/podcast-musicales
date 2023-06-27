import React from "react";
import '../../components_css/header/nav.css'

const Nav = (props) => {

    function isLoading() {
        if(props.toppodcasts.length === 0){
            return true;
        }
    }

    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container" id="containerNavbar">
                <a className="navbar-brand" href="/">Podcaster</a>
            </div>
            {isLoading() && (
                <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </nav>
    );
};

export default Nav;