import React from "react";

import "./Footer.css";

import logoWhite from "../../images/logo-white.svg";

import usa from "../../images/flags/usa.svg";
import germany from "../../images/flags/germany.svg";
import france from "../../images/flags/france.svg";
import spain from "../../images/flags/spain.svg";
import italy from "../../images/flags/italy.svg";

import google from "../../images/icons/google.svg";
import facebook from "../../images/icons/facebook.svg";
import twitter from "../../images/icons/twitter.svg";
import youtube from "../../images/icons/youtube.svg";
import instagram from "../../images/icons/instagram.svg";

const Footer = () => {
    return (
        <footer id="footer">
            <div className="footer container">
                <div className="top">
                    <div className="left">
                        <div className="logo">
                            <img src={logoWhite} alt="logo" />
                            <p>SocialYn</p>
                        </div>
                        <div className="flags">
                            <ul>
                                <li>
                                    <a href="/">
                                        <span>
                                            <img src={usa} alt="flag" />
                                        </span>
                                        <span>English</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <span>
                                            <img src={germany} alt="flag" />
                                        </span>
                                        <span>German</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <span>
                                            <img src={france} alt="flag" />
                                        </span>
                                        <span>French</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <span>
                                            <img src={spain} alt="flag" />
                                        </span>
                                        <span>Spanish</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <span>
                                            <img src={italy} alt="flag" />
                                        </span>
                                        <span>Italian</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="right">
                        <div className="column">
                            <div className="column-content">
                                <p>Navigation</p>
                                <ul>
                                    <li>
                                        <a href="/">Home</a>
                                    </li>
                                    <li>
                                        <a href="/">Product</a>
                                    </li>
                                    <li>
                                        <a href="/">Discover</a>
                                    </li>
                                    <li>
                                        <a href="/">Platform</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="column">
                            <div className="column-content">
                                <p>Legal</p>
                                <ul>
                                    <li>
                                        <a href="/">Terms</a>
                                    </li>
                                    <li>
                                        <a href="/">Privacy</a>
                                    </li>
                                    <li>
                                        <a href="/">Cookies</a>
                                    </li>
                                    <li>
                                        <a href="/">Copyright</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="column">
                            <div className="column-content">
                                <p>Contact Us</p>
                                <ul>
                                    <li>24/7 Chat Support</li>
                                    <li>contact@marketing.com</li>
                                    <li>+15-844-000-0000</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="line"></div>
                <div className="bottom">
                    <p>© 2020 MarketinYou Inc. All rights reserved</p>
                    <div className="social">
                        <a href="/" className="icon">
                            <img src={google} alt="google" />
                        </a>
                        <a href="/" className="icon">
                            <img src={facebook} alt="facebook" />
                        </a>
                        <a href="/" className="icon">
                            <img src={twitter} alt="twitter" />
                        </a>
                        <a href="/" className="icon">
                            <img src={youtube} alt="youtube" />
                        </a>
                        <a href="/" className="icon">
                            <img src={instagram} alt="instagram" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
