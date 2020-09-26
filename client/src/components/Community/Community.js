import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

import community from "../../images/community.svg";

import "./Community.css";

const Community = () => {
    return (
        <div id="community">
            <div className="community container">
                <div className="top">
                    <div className="content">
                        <h1>Our community for a better world</h1>
                        <p>
                            SocialYn is a platform that effortlessy brings
                            community together in one safety place. Meeting new
                            people has naver been easier. Find people around the
                            world and start making new friendships. Our mission
                            is to connect people from every corner of the world.
                        </p>
                        <Link to="/learn">
                            <Button variant="contained" color="secondary">
                                Learn more
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="bottom">
                    <div className="img-container">
                        <img src={community} alt="community" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Community;
