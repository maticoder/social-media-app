import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI Stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// Redux stuff
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = (theme) => ({
    textField: {
        margin: "10px auto 10px auto",
    },
    button: {
        marginTop: 20,
        marginBottom: 10,
        position: "relative",
    },
    visibleSeparator: {
        width: "100%",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        marginBottom: 20,
    },
});

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({
                errors: nextProps.ui.errors,
            });
        }
        if (!nextProps.ui.errors && !nextProps.ui.loading) {
            this.setState({
                body: "",
                errors: {},
            });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, {
            body: this.state.body,
        });
    };

    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: "center" }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment on scream"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </form>
                <hr className={classes.visibleSeparator} />
            </Grid>
        ) : null;

        return commentFormMarkup;
    }
}

const mapStateToProps = (state) => ({
    ui: state.ui,
    authenticated: state.user.authenticated,
});

const mapActionsToProps = {
    submitComment,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(CommentForm));
