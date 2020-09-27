import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import moment from "moment";
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import CommentForm from "../CommentForm/CommentForm";
import FavoriteIcon from "@material-ui/icons/Favorite";

// MUI Stuff
import {
    Grid,
    Typography,
    Dialog,
    DialogContent,
    CircularProgress,
} from "@material-ui/core";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

// Redux Stuff
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";

const styles = {
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: "50%",
        objectFit: "cover",
    },
    dialogContent: {
        padding: 20,
    },
    closeButton: {
        position: "absolute",
        left: "90%",
    },
    expandButton: {
        position: "absolute",
        left: "93%",
    },
    spinnerDiv: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    invisibleSeparator: {
        border: "none",
        margin: 4,
    },
    visibleSeparator: {
        width: "100%",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        marginBottom: 20,
    },
};

class ScreamDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            oldPath: "",
            newPath: "",
        };
    }

    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userName, screamId } = this.props;
        const newPath = `/users/${userName}/scream/${screamId}`;

        if (oldPath === newPath) oldPath = `/users/${userName}`;

        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath, newPath });
        this.props.getScream(this.props.screamId);
    };

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({
            open: false,
        });
        this.props.clearErrors();
    };

    render() {
        const {
            classes,
            scream: {
                screamId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userName,
                comments,
            },
            ui: { loading },
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2} />
            </div>
        ) : (
            <Grid container spacing={4}>
                <Grid item sm={5}>
                    <img
                        src={userImage}
                        alt="Profile"
                        className={classes.profileImage}
                    />
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userName}`}
                    >
                        @{userName}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body2" color="textSecondary">
                        {moment(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                    <MyButton tip="likes">
                        <FavoriteIcon color="primary" />
                    </MyButton>
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.visibleSeparator} />
                <CommentForm screamId={screamId} />
                <Comments comments={comments} />
            </Grid>
        );

        return (
            <Fragment>
                <MyButton
                    onClick={this.handleOpen}
                    tip="Expand scream"
                    tipClassName={classes.expandButton}
                >
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MyButton
                        tip="Close"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    ui: state.ui,
});

const mapActionsToProps = {
    getScream,
    clearErrors,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(ScreamDialog));
