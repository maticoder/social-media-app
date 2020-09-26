import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import moment from "moment";

// MUI Stuff
import { Grid, Typography } from "@material-ui/core";

const styles = (theme) => ({
    commentImage: {
        maxWidth: "100%",
        height: 100,
        objectFit: "cover",
        borderRadius: "50%",
    },
    commentData: {
        marginLeft: 20,
    },
    invisibleSeparator: {
        border: "none",
        margin: 4,
    },
    visibleSeparator: {
        width: "100%",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        marginTop: 20,
        marginBottom: 20,
    },
});

class Comments extends Component {
    render() {
        const { comments, classes } = this.props;

        return (
            <Grid container>
                {comments.map((comment, index) => {
                    const { body, createdAt, userImage, userName } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img
                                            src={userImage}
                                            alt="comment"
                                            className={classes.commentImage}
                                        />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant="h5"
                                                component={Link}
                                                to={`/users/${userName}`}
                                                color="primary"
                                            >
                                                {userName}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {moment(createdAt).format(
                                                    "h:mm a, MMMM DD YYYY"
                                                )}
                                            </Typography>
                                            <hr
                                                className={
                                                    classes.invisibleSeparator
                                                }
                                            />
                                            <Typography variant="body1">
                                                {body}
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )}
                        </Fragment>
                    );
                })}
            </Grid>
        );
    }
}

export default withStyles(styles)(Comments);
