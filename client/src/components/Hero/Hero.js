import React from "react";

import "./Hero.css";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import hero from "../../images/hero.svg";

const Hero = () => {
    return (
        <div id="hero">
            <div className="hero container">
                <div className="top">
                    <div className="content">
                        <h1>Social Web App</h1>
                        <p>
                            Users from all over the world are active on
                            SocialYn, keeping in touch with friends and distant
                            relatives, building up their professional network,
                            searching for their soulmate, and exchanging all
                            sorts of information and experiences
                        </p>
                        <Link to="/">
                            <Button variant="contained" color="primary">
                                Get started
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="bottom">
                    <div className="img-container">
                        <img src={hero} alt="hero" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
