import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receiveLogin, requestLogin, loginOut } from '../../actions/auth';
import { Link } from 'react-router-dom';

import Button from '../button';
import Search from '../search/search';

import './Header.css';

class Header extends Component {

  handleLogOut = (e) => {
    this.props.loginOut();
  }

  render() {
    const { isAuthenticated, user } = this.props;
    let breyta = localStorage.getItem('user');
    const users = JSON.parse(breyta);
    const visible = isAuthenticated ?
      <div className="profiles">
        <a href="/profile">{users.name}</a>
        <Button onClick={this.handleLogOut}>logout</Button>
      </div> :
      <div className="loginLink">
        <Link to="/register">Innskráning</Link>
      </div>
    return (
      <header className="header">
      <div className="headTextContainer">
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>
      </div>
        <div className="header__searchBar">
          <Search />
        </div>
        <div className="userInfo">
        <img src={require('../../res/profile.jpg')} />
        {visible}
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, { receiveLogin, loginOut })(Header);