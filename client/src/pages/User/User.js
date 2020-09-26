import React, { Component } from "react";
import axios from "axios";
import Scream from "../../components/Scream/Scream";
import StaticProfile from "../../components/StaticProfile/StaticProfile";
import Grid from "@material-ui/core/Grid";

import ScreamSkeleton from "../../util/ScreamSkeleton";
import ProfileSkeleton from "../../util/ProfileSkeleton";

import { connect } from "react-redux";
import { getUserData } from "../../redux/actions/dataActions";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            screamIdParam: null,
        };
    }

    componentDidMount() {
        const name = this.props.match.params.name;
        const screamId = this.props.match.params.screamId;

        if (screamId)
            this.setState({
                screamIdParam: screamId,
            });

        this.props.getUserData(name);
        axios
            .get(
                `https://europe-west2-socialyn-a79e1.cloudfunctions.net/api/user/${name}`
            )
            .then((res) => {
                this.setState({
                    profile: res.data.user,
                });
            })
            .catch((err) => console.log(err));
    }

    render() {
        const { screams, loading } = this.props.data;
        const { screamIdParam } = this.state;

        const screamsMarkup = loading ? (
            <ScreamSkeleton />
        ) : screams === null ? (
            <p>No screams from thi suser</p>
        ) : !screamIdParam ? (
            screams.map((scream) => (
                <Scream key={scream.screamId} scream={scream} />
            ))
        ) : (
            screams.map((scream) => {
                if (scream.screamId !== screamIdParam)
                    return <Scream key={scream.screamId} scream={scream} />;
                else
                    return (
                        <Scream
                            key={scream.screamId}
                            scream={scream}
                            openDialog
                        />
                    );
            })
        );

        return (
            <div id="user">
                <div className="user container">
                    <Grid container spacing={2}>
                        <Grid item sm={8} xs={12}>
                            {screamsMarkup}
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            {this.state.profile === null ? (
                                <ProfileSkeleton />
                            ) : (
                                <StaticProfile profile={this.state.profile} />
                            )}
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
    getUserData,
};

export default connect(mapStateToProps, mapActionsToProps)(User);
