import React, {useState} from "react";
import './HeaderMenu.scss';
import {Link} from "react-router-dom";


const HeaderMenu = () => {

    return (
        <div>         
            <div className="HeaderMenu">
                <nav>
                    <ul className="HeaderButtons">
                        <li>
                            <button>
                                <Link className="HeaderButton" to="/">Home</Link>
                            </button>
                        </li>
                        <li>
                            <button>
                                <Link className="HeaderButton" to="/About">About</Link>
                            </button>
                        </li>
                        <li>
                            <button>
                            <Link className="HeaderButton" to="/DBTable">DBTable</Link></button>
                        </li>
                        <li>
                            <button>
                                <Link className="HeaderButton" to="/TableAndreyLearn">TableAndreyLearn</Link>
                            </button>
                        </li>
                        <li>
                            <button>
                                <Link className="HeaderButton" to="/ChiefCheckTable">ChiefCheckTable</Link>
                            </button>
                        </li>
                        <li>
                            <button>
                                <Link className="HeaderButton" to="/ClientCheckTable">ClientCheckTable</Link>
                            </button>
                        </li>
                        <li>
                            <button>
                                <Link className="HeaderButton" to="/TimeTable">TimeTable</Link>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default HeaderMenu;