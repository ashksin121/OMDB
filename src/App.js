import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom';
import { withStyles } from "@material-ui/core/styles";
import FrontScreen from './component/frontScreen/frontScreen';
import Login from './container/login/login';
import Search from './container/search/search';
import Header from './component/header/header';
import Nominations from './container/nominations/nominations'
import './App.css';

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      paddingLeft: "220px"
    },
    height: "100vh",
    background: '#F1F1F1',
    // minHeight: 800,
    // paddingTop: 65
  }
});

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showFront: true
      }
    }

    componentDidMount() {
      // this.id  = setTimeout(() => this.setState({showFront: false}), 2000);
    }

    componentWillUnmount() {
      // clearTimeout(this.id);
    }

    render() {
      const { classes } = this.props;
      console.log(window.location.pathname)
      return (
        <div className="App">
          {/* <FrontScreen showFront={this.state.showFront} />   */}
          <Router> 
            <Header />
            <main className={classes.content}>
                <Switch>
                  {/* <Route exact path="/login" component={Login} /> */}
                  <Route exact path="/search" component={Search} />
                  <Route exact path="/nominations" component={Nominations} />
                  <Redirect to={'/search'} />
                </Switch>
            </main>
          </Router>      
        </div>
      );
    }
}

export default withStyles(styles, { withTheme: true })(App);
