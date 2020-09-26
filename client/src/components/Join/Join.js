import React from "react";
// import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";

import "./Join.css";

const Join = () => {
    return (
        <div id="join">
            <div className="join container">
                <h1>Join us right now</h1>
                <p>
                    Our team is constantly growing and with that we can take on
                    more projects than ever. We are looking for young and full
                    of energy people to help us growing our projects. If you
                    wanna start making huge projects, apply now!
                </p>

                <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                />
                <Button variant="contained" color="primary">
                    Send
                </Button>
            </div>
        </div>
    );
};

export default Join;
