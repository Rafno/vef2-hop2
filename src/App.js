import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, NavLink, Link, Switch, withRouter } from 'react-router-dom'
import { checkLogin } from './actions/auth';
import UserRoute from './components/user-route';
import Header from './components/header';

import Home from './routes/home';
import Login from './routes/login';
import Profile from './routes/profile';
import NotFound from './routes/not-found';
import Book from './routes/books';
import updated from './routes/updateBook';
import notandi from './routes/notandi';
import './App.css';
import store from './store';
import viewBook from './routes/viewbook/viewBook';
import users from './routes/users/users';
import Registration from './routes/registration';


class App extends Component {
  componentDidMount() {
    this.props.checkLogin(this.props.token);
  }
  state = { authenticated: false };

  render() {
    const { user, token } = this.props;
    return (
      <Provider store={store} >
        <main className="main">
          <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />

          <Header />

          <div className="main__content">
            <Switch location={this.props.location}>
              <Route path="/" exact component={Home} />
              <Route path="/books" exact component={Book} />
              <Route path="/users" exact component={users} />
              <Route path="/users/:id" exact component={notandi}/>
              <Route path="/books/new" exact component={updated} />
              <Route path="/books/:id" exact component={viewBook} />
              <Route path="/books/:id/edit" exact component={updated} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Registration} />
              <Route path="/profile" exact component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </div>

        </main>
      </Provider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    token: state.auth.token
  }
}

export default withRouter(connect(mapStateToProps, { checkLogin })(App));
