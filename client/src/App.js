import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { getUserData, logoutUser } from "./redux/actions/userActions";

// import context
import { AppContext } from "./AppContext";

// import styles
import "./App.css";

// import nav
import Navbar from "./components/Navbar/Navbar";

// import pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import User from "./pages/User/User";

// loading
import Loading from "./components/Loading/Loading";

// scrollbar
import Scrollbar from "smooth-scrollbar";

// Mui Theme
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

// ui themes
import themeFile from "./util/theme";

// smooth scrollbar
Scrollbar.init(document.querySelector("#my-scrollbar"), {
    alwaysShowTracks: true,
});

const theme = createMuiTheme(themeFile);

const token = localStorage.fbToken;
if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = "/login";
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = token;
        store.dispatch(getUserData());
    }
}

const App = () => {
    const appContext = useContext(AppContext);

    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <div
                    // show loading component whenever something's loading
                    style={
                        appContext.loading
                            ? { height: "100vh", overflow: "hidden" }
                            : null
                    }
                    className="app"
                >
                    {appContext.loading ? <Loading /> : null}
                    <Router>
                        <Navbar />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <AuthRoute path="/login" component={Login} />
                            <AuthRoute path="/signup" component={Signup} />
                            <Route path="/users/:name" exact component={User} />
                            <Route
                                path="/users/:name/scream/:screamId"
                                exact
                                component={User}
                            />
                            <Dashboard
                                path="/dashboard"
                                component={Dashboard}
                            />
                        </Switch>
                    </Router>
                </div>
            </Provider>
        </MuiThemeProvider>
    );
};

export default App;
