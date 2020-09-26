import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import moment from "moment";

import { Link } from "react-router-dom";

// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Typography } from "@material-ui/core";

// Redux
import { connect } from "react-redux";

import MyButton from "../../util/MyButton";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

import DeleteScream from "../DeleteScream/DeleteScream";
import ScreamDialog from "../ScreamDialog/ScreamDialog";
import LikeButton from "../LikeButton/LikeButton";

const styles = {
    card: {
        position: "relative",
        display: "flex",
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: "cover",
    },
};

class Scream extends Component {
    render() {
        const {
            classes,
            scream: {
                body,
                createdAt,
                userImage,
                userName,
                screamId,
                likeCount,
                commentCount,
            },
            user: {
                authenticated,
                credentials: { name },
            },
        } = this.props;

        const deleteButton =
            authenticated && userName === name ? (
                <DeleteScream screamId={screamId} />
            ) : null;

        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title="Profile image"
                    className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userName}`}
                        color="primary"
                    >
                        {userName}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {moment(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} comments</span>
                    <ScreamDialog
                        screamId={screamId}
                        userName={userName}
                        openDialog={this.props.openDialog}
                    />
                </CardContent>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Scream));
