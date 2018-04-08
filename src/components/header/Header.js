import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receiveLogin, requestLogin, loginOut } from '../../actions/auth';
import { Link } from 'react-router-dom';

import Button from '../button';
import Search from '../search/search';

import './Header.css';

class Header extends Component {

  onClick = (e) => {
    console.log('leita');
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <header className="header">
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>

        {/* ætti samt frekar heima í sér component */}
        <div className="header__searchBar">
          <Search />
        </div>
        <Link to="/login">Innskráning</Link>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps, { receiveLogin, loginOut })(Header);