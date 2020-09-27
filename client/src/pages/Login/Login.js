import React, { Component } from "react";
import { Typography } from "@material-ui/core";

import { AppContext } from "../../AppContext";

import {
    TextField,
    Checkbox,
    Button,
    CircularProgress,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import login from "../../images/login.svg";

import "./Login.css";

// Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";

class Login extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            remember: false,
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
        const userData = {
            email: this.state.email,
            password: this.state.password,
        };
        this.props.loginUser(userData, this.props.history);
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
            <div id="login">
                <div className="login container">
                    <form
                        noValidate
                        onSubmit={this.handleSubmit}
                        className="login-form"
                    >
                        <img
                            onLoad={() => this.context.setLoading(false)}
                            className="login-image"
                            src={login}
                            alt="login"
                        />
                        <h1>
                            <span>Log</span> <span>in</span>
                        </h1>
                        <button
                            type="button"
                            className="login-with-google-button"
                        >
                            Login with Google
                        </button>
                        <p className="login-with-email-text">
                            <span>Or login with email</span>
                        </p>
                        <div className="login-input">
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
                                error={
                                    this.state.errors.email ||
                                    this.state.errors.general
                                        ? true
                                        : false
                                }
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
                                // variant="secondary"
                                type="password"
                                label="Password"
                                variant="outlined"
                                helperText={this.state.errors.password}
                                error={
                                    this.state.errors.password ||
                                    this.state.errors.general
                                        ? true
                                        : false
                                }
                                autoComplete="off"
                            />
                        </div>
                        {this.state.errors.general && (
                            <Typography
                                variant="body2"
                                className="custom-error"
                            >
                                {this.state.errors.general}
                            </Typography>
                        )}
                        <div className="extensions">
                            <div className="keep-logged-in">
                                <Checkbox
                                    checked={this.state.remember}
                                    onChange={() =>
                                        this.setState({
                                            remember: !this.state.remember,
                                        })
                                    }
                                    value="checked"
                                />
                                Remember me
                            </div>
                            <Link to="/reset" className="forget-password-link">
                                Reset password
                            </Link>
                        </div>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="login-button"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            {!loading ? (
                                "Log in"
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
                        <p className="dont-have-account">
                            Don't have an account?{" "}
                            <Link
                                style={{ textDecoration: "none" }}
                                to="/signup"
                            >
                                <span className="sign-up-link">Sign up</span>
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
    loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
