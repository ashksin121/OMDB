import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {Divider, Container, Paper, Grid} from '@material-ui/core';
import "./nominations.css";
import SearchIcon from '@material-ui/icons/Search';
import ErrorIcon from '@material-ui/icons/Error';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import StarIcon from '@material-ui/icons/Star';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import { connect } from "react-redux";

import {
    setNominations
} from '../../actions/nominations';

const styles = () => ({
    paper: {
        height: "250px",
        padding: "20px 0",
        boxSizing: "border-box",
        marginBottom: "20px",
        width: "70%"
    }
});

class Nominations extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            nominations: []
        }
    }

    componentDidMount() {
        if(this.props.nominationState.nominations) {
            this.setState({ nominations: this.props.nominationState.nominations })
        }
    }

    handleClick = data => {
        var newData = this.state.nominations;
        let i = newData.indexOf(data);
        newData.splice(i,1);
        var oldData = this.state.nominations;
        console.log(oldData);
        this.props.setNominations(newData, oldData);
    }

    render() {
        const { classes, theme } = this.props;

        let {
            nominations
        } = this.props.nominationState;

        console.log("Redux", this.state.nominations);

        return (
            <div className="app-wrapper" style={{paddingBottom: "20px"}}>
                <div className="MovieTitle">
                    Nominations
                </div>
                {
                    this.state.loading ?
                    <CircularProgress /> :
                    (!this.state.nominations) || this.state.nominations.length==0 ? 
                    <div className="responseMsg">
                        No Nominations Made!!
                    </div> :
                    <div className="resultList">
                        <Container>
                        {
                            this.state.nominations.map(data => {
                                return (
                                    <Grid container style={{ display: "flex", justifyContent: "center"}}>
                                        <Grid item xs={12} sm={10} md={12} style={{ display: "flex", justifyContent: "center"}}>
                                            <Paper className={classes.paper}>
                                                <Container style={{ height: "100%", width: "100%" }}>
                                                    <div className="searchCard">
                                                        <Grid container direction="row" alignItems="center" spacing={2} style={{ height: "100%" }}>
                                                            <Grid item xs={3} sm={3} md={3}>
                                                                {
                                                                    data.Poster==="N/A" ?
                                                                    <div className="posterNA">
                                                                        <ErrorIcon style={{ fontSize: "40px" }} />
                                                                    </div> :
                                                                    <img src={data.Poster} alt="Poster" className="poster" />
                                                                }
                                                            </Grid>
                                                            <Grid item xs={7} sm={7} md={7}>
                                                                <div className="movieTitle">
                                                                    {data.Title}
                                                                </div>
                                                                <div className="movieDate">
                                                                    <CalendarTodayIcon style={{ color: "#8d8d8d", marginRight: "10px"}} />
                                                                    {data.Year}
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={2} sm={2} md={2} style={{height: "100%"}}>
                                                                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start", height: "100%"}}>
                                                                    <div className="nominateButton" style={{
                                                                        backgroundColor: "red",
                                                                        cursor: "pointer"
                                                                    }} 
                                                                    onClick={() => this.handleClick(data)} >
                                                                        <StarIcon style={{marginRight: "3px"}} /> Remove
                                                                    </div>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </Container>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                        </Container>
                    </div>
                }
                {
                    this.state.nominations.length === 5 ?
                    <div className="warning">
                        You have made 5 nominations!!
                    </div> :
                    null
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        nominationState: state.nominationState
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setNominations: (data, oldData) => {
            return dispatch(setNominations(data, oldData))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Nominations));