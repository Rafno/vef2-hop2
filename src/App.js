import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, NavLink, Link, Switch, withRouter } from 'react-router-dom'

import UserRoute from './components/user-route';
import Header from './components/header';

import Home from './routes/home';
import Login from './routes/login';
import Profile from './routes/profile';
import NotFound from './routes/not-found';
import Book from './routes/books';
import updated from './routes/updateBook';
/* todo fleiri routes */

import './App.css';
import store from './store';

class App extends Component {

  render() {
    const authenticated = false; /* vita hvort notandi sé innskráður */

    return (
      <Provider store={store} >
        <main className="main">
          <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />

          <Header />

          <div className="main__content">
            <Switch location={this.props.location}>
              <Route path="/" exact component={Home} />
              <Route path="/books" exact component={Book} />
              <Route path="/updateBook" ecact component={updated} />
              <Route path="/login" exact component={Login} />
              <UserRoute path="/profile" authenticated={authenticated} component={Profile} />
              {/* todo fleiri route */}
              <Route component={NotFound} />
            </Switch>
          </div>
        </main>
        </Provider>
        );
  }
}

const mapStateToProps = (state) => {
          /* todo stilla redux ef það er notað */
        }

        export default withRouter(connect(mapStateToProps)(App));
