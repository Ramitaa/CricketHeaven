import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNavBar from './components/AppNavBar';
import ViewPlayer from './components/ViewPlayer';
import SearchPlayer from './components/SearchPlayer';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import SearchHistory from './components/SearchHistory';
import PageNotFound from './components/PageNotFound';
import UpdatePassword from './components/UpdatePassword';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {

  componentDidMount(){
    console.log("Component did mount in App.js - Loading user!");
    store.dispatch(loadUser());
  }

  render(){
    return (
        <Router>
        <Provider store={store}>
        <div className="App">
          <AppNavBar />
          <Switch>
          <Route exact path="/" component = { Login } />
          <Route exact path="/registerNewUser" component = { Register } />
          <Route exact path="/home" component = { Home } />
          <Route exact path="/searchPlayer/:name" component = { SearchPlayer } />
          <Route exact path="/viewPlayer/:id" component = { ViewPlayer } />
          <Route exact path="/searchHistory/" component = { SearchHistory } />
          <Route exact path="/updatePassword/" component = { UpdatePassword } />
          <Route component = { PageNotFound } />
          </Switch>
        </div>
        </Provider>
      </Router>
    );
  }

}

export default App;
