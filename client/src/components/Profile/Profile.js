import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import moment from "moment";
import EditDetails from "../EditDetails/EditDetails";
import ProfileSkeleton from "../../util/ProfileSkeleton";

// MUI stuff
import Button from "@material-ui/core/Button";
import {
    Paper,
    Link as MuiLink,
    Typography,
    IconButton,
    Tooltip,
} from "@material-ui/core";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";

const styles = (theme) => ({
    paper: {
        padding: 20,
    },
    profile: {
        "& .image-wrapper": {
            textAlign: "center",
            position: "relative",
            "& button": {
                position: "absolute",
                top: "80%",
                left: "70%",
            },
        },
        "& .profile-image": {
            width: 200,
            height: 200,
            objectFit: "cover",
            maxWidth: "100%",
            borderRadius: "50%",
        },
        "& .profile-details": {
            textAlign: "center",
            "& span, svg": {
                verticalAlign: "middle",
            },
            "& a": {
                color: "#4872c8",
            },
        },
        "& hr": {
            border: "none",
            margin: "0 0 10px 0",
        },
        "& svg.button": {
            "&:hover": {
                cursor: "pointer",
            },
        },
    },
    buttons: {
        textAlign: "center",
        "& a": {
            margin: "20px 10px",
        },
    },
});

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        this.props.uploadImage(formData);
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById("imageInput");
        fileInput.click();
    };

    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {
        const {
            classes,
            user: {
                credentials: {
                    name,
                    createdAt,
                    imageUrl,
                    bio,
                    website,
                    location,
                },
                loading,
                authenticated,
            },
        } = this.props;

        let profileMarkup = !loading ? (
            authenticated ? (
                <Paper className={classes.paper}>
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <img
                                src={imageUrl}
                                alt="profile"
                                className="profile-image"
                            />
                            <input
                                type="file"
                                id="imageInput"
                                hidden="hidden"
                                onChange={this.handleImageChange}
                            />
                            <Tooltip
                                title="Edit profile picture"
                                placement="top"
                            >
                                <IconButton
                                    onClick={this.handleEditPicture}
                                    className="button"
                                >
                                    <EditIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <hr />
                        <div className="profile-details">
                            <MuiLink
                                component={Link}
                                to={`/users/${name}`}
                                color="primary"
                                variant="h5"
                            >
                                @{name}
                            </MuiLink>
                            <hr />
                            {bio && (
                                <Typography variant="body2">{bio}</Typography>
                            )}
                            <hr />
                            {location && (
                                <Fragment>
                                    <Typography variant="body2">
                                        <LocationOn color="primary" />{" "}
                                        <span>{location}</span>
                                    </Typography>
                                    <hr />
                                </Fragment>
                            )}
                            {website && (
                                <Fragment>
                                    <Typography variant="body2">
                                        <LinkIcon color="primary" />
                                        <a
                                            href={website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {" "}
                                            {website}
                                        </a>
                                    </Typography>
                                    <hr />
                                </Fragment>
                            )}
                            <Typography variant="body2">
                                <CalendarToday color="primary" />{" "}
                                <span>
                                    Joined{" "}
                                    {moment(createdAt).format("MMM YYYY")}
                                </span>
                            </Typography>
                        </div>
                        <Tooltip title="Logout" placement="top">
                            <IconButton onClick={this.handleLogout}>
                                <KeyboardReturn color="primary" />
                            </IconButton>
                        </Tooltip>
                        <EditDetails />
                    </div>
                </Paper>
            ) : (
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center">
                        No profile found, please login again
                    </Typography>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/login"
                        >
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to="/signup"
                        >
                            Signup
                        </Button>
                    </div>
                </Paper>
            )
        ) : (
            <ProfileSkeleton />
        );

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    logoutUser,
    uploadImage,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Profile));
