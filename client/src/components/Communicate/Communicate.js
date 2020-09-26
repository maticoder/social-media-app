import React from "react";

import "./Communicate.css";

import communicate from "../../images/communicate.svg";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Communicate = () => {
    return (
        <div id="communicate">
            <div className="communicate container">
                <div className="top">
                    <div className="content">
                        <h1>Communicate with people everywhere</h1>
                        <p>
                            Communication is a topic that can be hard to master.
                            How do we communicate effectively so we can have
                            good relationship with others, whether in the
                            workplace or at home?
                        </p>
                        {/* <div className="card">
                            <h4>
                                Our team really feel great to use desk app
                                specially their speed
                            </h4>
                            <h5>
                                <span>Micle Duke,</span>{" "}
                                <span>Product Manager</span>
                            </h5>
                            <h5>Uber Inc.</h5>
                            <div className="card-decoration">
                                <img
                                    src={cardDecoration}
                                    alt="card decoration"
                                />
                            </div>
                            <div className="card-decoration">
                                <img
                                    src={cardDecoration}
                                    alt="card decoration"
                                />
                            </div>
                        </div> */}
                        <Link to="/check">
                            <Button variant="contained" color="primary">
                                Check more
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="bottom">
                    <div className="img-container">
                        <img src={communicate} alt="communicate" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Communicate;
