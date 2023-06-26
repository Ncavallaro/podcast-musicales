import React from "react";
import '../../components_css/header/nav.css'

const Nav = (props) => {

    function isLoading() {
        if(props.toppodcasts.length === 0){
            return true;
        }
    }

    return (
        <nav class="navbar bg-body-tertiary">
            <div class="container" id="containerNavbar">
                <a class="navbar-brand" href="/">Podcaster</a>
            </div>
            {isLoading() && (
                <div class="spinner-grow text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            )}
        </nav>
    );
};

export default Nav;