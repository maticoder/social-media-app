import React, { Component } from "react";
import { Grid } from "@material-ui/core";

import Scream from "../../components/Scream/Scream";
import Profile from "../../components/Profile/Profile";
import ScreamSkeleton from "../../util/ScreamSkeleton";

import { connect } from "react-redux";
import { getScreams } from "../../redux/actions/dataActions";

import "./Dashboard.css";

class Dashboard extends Component {
    componentDidMount() {
        this.props.getScreams();
    }

    render() {
        const { screams, loading } = this.props.data;
        let recentScreamsMarkup = !loading ? (
            screams.map((scream) => (
                <Scream key={scream.screamId} scream={scream} />
            ))
        ) : (
            <ScreamSkeleton />
        );

        return (
            <div id="dashboard">
                <div className="dashboard container">
                    <Grid container spacing={2}>
                        <Grid item sm={8} xs={12}>
                            {recentScreamsMarkup}
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <Profile />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    data: state.data,
});

const mapActionsToProps = {
    getScreams,
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
