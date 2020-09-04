import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {Divider, Container, Paper, Grid} from '@material-ui/core';
import "./search.css";
import SearchIcon from '@material-ui/icons/Search';
import ErrorIcon from '@material-ui/icons/Error';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import StarIcon from '@material-ui/icons/Star';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import { connect } from "react-redux";

import {
    setNominations,
    getNominations
} from '../../actions/nominations';

const styles = () => ({
    searchText: {
        marginLeft: "20px",
        fontSize: "23px",
        fontWeight: "bold"
    },
    paper: {
        height: "250px",
        padding: "20px 0",
        boxSizing: "border-box",
        marginBottom: "20px",
        width: "70%"
    }
});

class Search extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            loading: false,
            searchResult: [],
            searchResponse: true,
            responseMsg: "",
            nominations: []
        }
    }

    componentDidMount() {
        this.props.getNominations();
        if(this.props.nominationState.nominations) {
            this.setState({ nominations: this.props.nominationState.nominations })
        }
    }

    onSearch = (event) => {
        var search = event.target.value;
        this.setState({ searchValue: search, loading: true });
        axios.get(`https://www.omdbapi.com/?apikey=c7311579&type=movie&page=1&s=${search}`)
        .then(res => {
            // console.log("res", res.data);
            if(res.data.Response==="False") {
                this.setState({
                    searchResponse: false,
                    responseMsg: res.data.Error,
                    searchResult: []
                })
            } else {
                this.setState({
                    searchResponse: true,
                    searchResult: res.data.Search,
                    responseMsg: ""
                })
            }
            this.setState({ loading: false });
        })
        .catch(err => {
            console.log(err)
            this.setState({ 
                loading: false,
                searchResponse: false,
                responseMsg: "Error"
            });
        })
    }

    handleClick = (data) => {
        // console.log("click", data);
        let newData = this.props.nominationState.nominations;
        newData.push(data);
        const oldData = this.props.nominationState.nominations;
        this.props.setNominations(newData, oldData);
    }

    render() {
        const { classes, theme } = this.props;

        let {
            nominations
        } = this.props.nominationState;

        console.log("Redux", nominations,this.state.nominations);

        return (
            <div className="app-wrapper" style={{paddingBottom: "20px"}}>
                <div className="MovieTitle">
                    Movie &nbsp;&nbsp;&nbsp;&nbsp; Title
                </div>
                <div className="searchDiv">
                    <div className="searchBar">
                        <SearchIcon className="searchIcon" style={{fontSize: "30px"}} />
                        <Input 
                            className={classes.searchText}
                            value={this.state.searchValue} 
                            disableUnderline={true}
                            placeholder="Movie Title"
                            autoFocus
                            onChange={this.onSearch}
                            fullWidth
                        />
                    </div>
                </div>
                {
                    this.state.loading ?
                    <div className="responseMsg">
                        <CircularProgress />
                    </div> :
                    this.state.searchResponse===false ? 
                    <div className="responseMsg">
                        <ErrorIcon style={{fontSize: "70px"}} />
                        {this.state.responseMsg}
                    </div> :
                    <div className="resultList" style={{height: "calc(100vh - 281px)"}}>
                        <Container>
                        {
                            this.state.searchResult.map(movie => {
                                var data = {
                                    poster: movie.Poster,
                                    title: movie.Title,
                                    year: movie.Year,
                                    imdbId: movie.imdbID
                                }
                                var found = false;
                                found = nominations.some(mov => mov.poster===data.poster && mov.title===data.title && mov.year===data.year && mov.imdbId===data.imdbId)
                                // console.log("Data", data, found)
                                return (
                                    <Grid container style={{ display: "flex", justifyContent: "center"}}>
                                        <Grid item xs={12} sm={10} md={12} style={{ display: "flex", justifyContent: "center"}}>
                                            <Paper className={classes.paper}>
                                                <Container style={{ height: "100%", width: "100%" }}>
                                                    <div className="searchCard">
                                                        <Grid container direction="row" alignItems="center" spacing={2} style={{ height: "100%" }}>
                                                            <Grid item xs={3} sm={3} md={3}>
                                                                {
                                                                    data.poster==="N/A" ?
                                                                    <div className="posterNA">
                                                                        <ErrorIcon style={{ fontSize: "40px" }} />
                                                                    </div> :
                                                                    <img src={data.poster} alt="Poster" className="poster" />
                                                                }
                                                            </Grid>
                                                            <Grid item xs={7} sm={7} md={7}>
                                                                <div className="movieTitle">
                                                                    {data.title}
                                                                </div>
                                                                <div className="movieDate">
                                                                    <CalendarTodayIcon style={{ color: "#8d8d8d", marginRight: "10px"}} />
                                                                    {data.year}
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={2} sm={2} md={2} style={{height: "100%"}}>
                                                                {
                                                                    found ?
                                                                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start", height: "100%"}}>
                                                                        <div className="nominateButton" style={{
                                                                            backgroundColor: "#36BE73",
                                                                            cursor: "not-allowed"
                                                                        }}>
                                                                            <StarIcon style={{marginRight: "3px"}} /> Nominated
                                                                        </div>
                                                                    </div> :
                                                                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start", height: "100%"}}>
                                                                        <div className="nominateButton" style={{
                                                                            backgroundColor: "#eaee16",
                                                                            cursor: "pointer"
                                                                        }} onClick={() => this.handleClick(data)}>
                                                                            Nominate
                                                                        </div>
                                                                    </div>
                                                                }
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
                    nominations.length === 5 ?
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
        },
        getNominations: () => {
            return dispatch(getNominations())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Search));