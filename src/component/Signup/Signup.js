import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { NavLink } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import LockIcon from '@material-ui/icons/Lock';
import CircularProgress from '@material-ui/core/CircularProgress';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import { Redirect } from 'react-router-dom'

const styles = () => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        minWidth: 250,
        marginBottom: 20,
        width: "100%",
        "& .MuiInput-underline:after": {
            borderBottom: "2px solid #8D8D8D"
          }
    },
    formDiv: {
        "& .MuiInput-underline:after": {
            borderBottom: "2px solid #8D8D8D"
        },
        "& .MuiInput-underline:hover": {
            borderBottom: "0px solid #8D8D8D"
        },
        "& .MuiFormLabel-root": {
            color: "#8D8D8D",
            fontSize: "16px",
            lineHeight: "21px",
        },
    }
  });

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEnterPress: false,
            showPassword: false,
            email: "",
            password: "",
            isLoading: false
        }
    }
    onKeyDown = name => e => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault()
            this.setState({ isEnterPress: true })
        }
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    };

    handleSignup = () => {
        // console.log(this.state.email, this.state.password)
        this.setState({ isLoading: true });
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
            console.log(res);
            auth.onAuthStateChanged(user => {
                console.log(user)
                this.setState({ isLoading: false });
                localStorage.setItem('authToken', user.uid);
                window.location = '/search';
            })
        })
        .catch(err => {
            console.log("err", err);
            this.setState({ isLoading: false });
            toast.error(err.message , {
                containerId: 'toastMessage'
            })
        })
    }

    render() {
        const { classes } = this.props;
        if (this.state.isEnterPress) {
            this.state.isEnterPress = false
            this.handleSignup();
        }
        // let form = (
        //     <form>
        //         {
        //             formElementArray.map(formElement => (
        //                 <Input
        //                     key={formElement.id}
        //                     elementType={formElement.config.elementType}
        //                     elementConfig={formElement.config.elementConfig}
        //                     value={formElement.config.value}
        //                     error={formElement.config.errorStatus}
        //                     helperText={formElement.config.errorMessage}
        //                     changed={(event) => this.props.loginTextFieldChangeHandler(formElement.id, event)}
        //                     touched={(event) => this.props.loginTextFieldChangeHandler(formElement.id, event)}
        //                     onKeyDown={this.onKeyDown}
        //                 />
        //             ))
        //         }
        //         <div style={{ display: "flex", justifyContent: "center" }} className="pt-3 pb-3">
        //             {
        //                 showLoginLoaderStatus ? <CircularProgress color="primary" />
        //                     :
        //                     <Button
        //                         variant="contained"
        //                         fullWidth
        //                         color="primary"
        //                         style={{marginTop: 15}}
        //                         onClick={() => this.props.onLogin(loginForm)}
        //                     >
        //                         Login
        //                     </Button>
        //             }

        //         </div>
        //     </form>
        // )
        return (
            <div className="loginBaseDiv">
                <div className="loginOverlay">
                    <Container style={{height: "100%"}}>
                        <div className="loginContainerDiv">
                            <div style={{float: "left", width: "50%"}}>
                                <div className="loginInfoContent">
                                We are
                                </div>
                                <div className="loginInfoHeading">
                                OMBD
                                </div>
                            </div>
                            <div className="loginCard">
                                <div style = {{display : "flex", justifyContent : "center", marginBottom: "30px"}}>
                                    {/* <img src = {logo} height="40px" /> */}
                                    <LockIcon style={{ color: "#EA4D23", fontSize: "40px"}} />
                                </div>
                                <form className={classes.formDiv}>
                                <FormControl className={classes.textField}>
                                                <InputLabel htmlFor="standard-adornment-email" style={{color: "#8D8D8D"}}>
                                                    Email ID
                                                </InputLabel>
                                                <Input
                                                    id="standard-adornment-email"
                                                    fullWidth
                                                    label="Email ID"
                                                    type="email"
                                                    value={this.state.email}
                                                    onChange={(event) => {this.setState({ email: event.target.value })}}
                                                    onKeyDown = {this.onKeyDown}
                                                    style={{fontWeight: "bold", marginColor: "#8D8D8D"}}
                                                />
                                            </FormControl>
                                            <FormControl className={classes.textField}>
                                                <InputLabel htmlFor="standard-adornment-password" style={{color: "#8D8D8D"}}>
                                                    Password
                                                </InputLabel>
                                                <Input
                                                    id="standard-adornment-password"
                                                    label="Password"
                                                    fullWidth
                                                    type={this.state.showPassword ? "text" : "password"}
                                                    value={this.state.password}
                                                    onChange={(event) => {this.setState({ password: event.target.value })}}
                                                    onKeyDown = {this.onKeyDown}
                                                    style={{fontWeight: "bold", marginColor: "#8D8D8D"}}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={this.handleClickShowPassword}>
                                                                {this.state.showPassword ? (
                                                                    <Visibility />
                                                                ) : (
                                                                    <VisibilityOff />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                </form>
                                {
                                    this.state.isLoading ? 
                                    <div className="loginCircularProgress">
                                        <CircularProgress style={{color: "#EA4D23"}} />
                                    </div>
                                    :
                                    <div className="loginButton" onClick = {this.handleSignup} style={{backgroundColor: "#282461"}}>
                                        <div>Sign Up</div>
                                    </div>
                                }
                                <div className="loginBottomInfo">
                                    <div>Already have an account?</div>
                                </div>
                                <NavLink
                                to="/login"
                                style={{
                                    textDecoration: "none",
                                    "margin-left": "auto"
                                }}
                                onClick={this.props.reloadHandler}>
                                    <div className="loginSignUp" style={{ backgroundColor: "#EA4D23"}}>
                                        <div>Login</div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(connect(null, null)(Signup));