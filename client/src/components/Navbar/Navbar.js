import React, { Fragment, useState } from "react";

import { connect } from "react-redux";

import PostScream from "../PostScream/PostScream";

import "./Navbar.css";

import logo from "../../images/logo.svg";

import { Link } from "react-router-dom";

import { AppBar, Toolbar } from "@material-ui/core";

import MyButton from "../../util/MyButton";

import Notifications from "../Notifications/Notifications";

// Icons
import HomeIcon from "@material-ui/icons/Home";

const Navbar = (props) => {
    const [active, setActive] = useState(false);

    const { authenticated } = props;

    return (
        <Fragment>
            {authenticated ? (
                <AppBar className="app-bar" position="static">
                    <Toolbar className="nav-container">
                        <Fragment>
                            <PostScream />
                            <Link to="/dashboard">
                                <MyButton tip="Home">
                                    <HomeIcon />
                                </MyButton>
                            </Link>
                            <Notifications />
                        </Fragment>
                    </Toolbar>
                </AppBar>
            ) : (
                <header>
                    <nav id="nav">
                        <div className="nav container">
                            <div className="logo">
                                <Link to="/">
                                    <img src={logo} alt="logo" />
                                    <h1>
                                        <span className="blue-text">
                                            Social
                                        </span>
                                        <span className="pink-text">Yn</span>
                                    </h1>
                                </Link>
                            </div>
                            <div
                                className={`hamburger ${
                                    active ? "active" : ""
                                }`}
                                onClick={() => setActive(!active)}
                            >
                                <div className="hamburger-box">
                                    <div className="hamburger-inner"></div>
                                </div>
                            </div>
                            <div
                                className={`navigation ${
                                    active ? "active" : ""
                                }`}
                            >
                                <ul className="nav-links">
                                    <li className="nav-link">
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="nav-link">
                                        <Link to="/about">About us</Link>
                                    </li>
                                    <li className="nav-link">
                                        <Link to="/work">Work</Link>
                                    </li>
                                    <li className="nav-link">
                                        <Link to="/info">Info</Link>
                                    </li>
                                    <li className="nav-link">
                                        <Link to="/contact">Contact us</Link>
                                    </li>
                                    <li className="nav-link additional">
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li className="nav-link additional">
                                        <Link to="/signup">Sign up</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-element">
                                <ul className="nav-links">
                                    <li className="nav-link">
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li className="nav-link">
                                        <Link to="/signup">Sign up</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
