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
    const visible = isAuthenticated ?
      <div class="profiles">
        <a href="/profile">{user.username}</a>
        <Button onClick={this.handleLogOut}>logout</Button>
      </div> :
      <div className="loginLink">
        <Link to="/register">Innskráning</Link>
      </div>
    return (
      <header className="header">
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>
        <div className="header__searchBar">
          <Search />
        </div>
        {visible}
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