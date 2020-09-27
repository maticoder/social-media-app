import React, { Component } from "react";

import { AppContext } from "../../AppContext";

import {
    Button,
    TextField,
    Checkbox,
    CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import "./Signup.css";

import signup from "../../images/signup.svg";

// Redux stuff
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/userActions";

class Signup extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            accept: false,
            errors: {},
        };
    }

    componentDidMount() {
        this.context.setLoading(true);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({
                errors: nextProps.ui.errors,
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            name: this.state.name,
        };
        this.props.signupUser(newUserData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    render() {
        const {
            ui: { loading },
        } = this.props;

        return (
            <div id="signup">
                <div className="signup container">
                    <form
                        noValidate
                        onSubmit={this.handleSubmit}
                        className="signup-form"
                    >
                        <img
                            onLoad={() => this.context.setLoading(false)}
                            className="signup-image"
                            src={signup}
                            alt="signup"
                        />
                        <h1>
                            <span>Sign</span> <span>up</span>
                        </h1>
                        <div className="name-input">
                            <TextField
                                id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                fullWidth
                                type="text"
                                label="Display name"
                                variant="outlined"
                                helperText={this.state.errors.name}
                                error={this.state.errors.name ? true : false}
                                autoComplete="off"
                            />
                        </div>
                        <div className="email-input">
                            <TextField
                                id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                fullWidth
                                type="email"
                                label="Email address"
                                variant="outlined"
                                helperText={this.state.errors.email}
                                error={this.state.errors.email ? true : false}
                                autoComplete="off"
                            />
                        </div>
                        <div className="password-input">
                            <TextField
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                fullWidth
                                type="password"
                                label="Password"
                                variant="outlined"
                                helperText={this.state.errors.password}
                                error={
                                    this.state.errors.password ? true : false
                                }
                                autoComplete="off"
                            />
                        </div>
                        <div className="confirm-password-input">
                            <TextField
                                id="confirmPassword"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                                fullWidth
                                type="password"
                                label="Confirm Password"
                                variant="outlined"
                                helperText={this.state.errors.confirmPassword}
                                error={
                                    this.state.errors.confirmPassword
                                        ? true
                                        : false
                                }
                                autoComplete="off"
                            />
                        </div>
                        <div className="extensions">
                            <div className="accept-terms-of-service">
                                <Checkbox
                                    checked={this.state.accept}
                                    onChange={() =>
                                        this.setState({
                                            accept: !this.state.accept,
                                        })
                                    }
                                    value="checked"
                                />
                                <span>
                                    I read and agree to{" "}
                                    <Link
                                        style={{
                                            textDecoration: "none",
                                        }}
                                        to="/terms"
                                    >
                                        <span className="terms-conditions">
                                            Terms & Conditions
                                        </span>
                                    </Link>
                                </span>
                            </div>
                        </div>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="signup-button"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            {!loading ? (
                                "Sign up"
                            ) : (
                                <CircularProgress
                                    color="inherit"
                                    // style={{ marginRight: "10px" }}
                                    size={24}
                                />
                            )}
                        </Button>
                        <Link style={{ textDecoration: "none" }} to="/">
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                className="back-button"
                            >
                                Back
                            </Button>
                        </Link>
                        <p className="have-account">
                            Already have an account?{" "}
                            <Link
                                style={{ textDecoration: "none" }}
                                to="/login"
                            >
                                <span className="log-in-link">Log in</span>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui,
});

const mapActionsToProps = {
    signupUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Signup);
