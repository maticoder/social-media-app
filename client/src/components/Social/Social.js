import React from "react";

import "./Social.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import social from "../../images/social.svg";

const Social = () => {
    return (
        <div id="social">
            <div className="social container">
                <div className="top">
                    <div className="content">
                        <h1>Grow your social media</h1>
                        <p>
                            In order for social media marketing to work, you
                            need an audience. Otherwise it’s like talking to a
                            brick wall. Unfortunately, growing an audience is
                            also one of the most difficult tasks for businesses.
                            But with our help it’s easier than it have ever been
                        </p>
                        <Link to="/check">
                            <Button variant="contained" color="secondary">
                                Check out
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="bottom">
                    <div className="img-container">
                        <img src={social} alt="social" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Social;
