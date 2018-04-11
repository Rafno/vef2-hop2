import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { receiveLogin, requestLogin, loginOut, checkLogin } from '../../actions/auth';
import { fetchBooks, getbookByID } from '../../actions/book';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { error } = this.props;
    const loginUser = { username, password };
    let user = { 'username': username, 'password': password, 'name': null };
    // Put the object into storage
    this.props.receiveLogin(username, password);
    localStorage.setItem('user', JSON.stringify(user));
    console.log(error);
  }

  handleLogout = (e) => {
    this.props.loginOut();
  }

  render() {
    const { username, password } = this.state;
    const { isFetching, isAuthenticated, error } = this.props;
    const login = isAuthenticated ?
      (<Redirect
        to={{
          pathname: '/',
          state: { from: this.props.location }
        }}
      />
      ) :
      <div>
        {error && (
          <p>{error}</p>
        )}

        <form className="loginForm" onSubmit={this.handleSubmit}>
          <div className="inputContainer">
            <div>
              <label htmlFor="username">Notendanafn:</label>
              <input id="username" type="text" name="username" value={username} onChange={this.handleInputChange} />
            </div>

            <div>
              <label htmlFor="password">Lykilorð:</label>
              <input id="password" type="password" name="password" value={password} onChange={this.handleInputChange} />
            </div>
          </div>
          <button disabled={isFetching}>Innskrá</button>
        </form>
      </div>

    if (isFetching) {
      return (
        <p>Skrái inn <em>{username}</em>...</p>
      );
    }

    return (
      <div className="loginContainer">
        <h1>Innskráning</h1>
        {login}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.error,
  }
}

export default connect(mapStateToProps, { receiveLogin, loginOut, checkLogin })(Login);