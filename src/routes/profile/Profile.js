import React, { Component } from 'react';
import { UpdatePassword, uploadPic } from '../../actions/auth';
import { fetchBooks } from '../../actions/book';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class Profile extends Component {
  componentDidMount() {

  }
  handlePassChange = (e) => {
    e.preventDefault();
    const { pass, confirmPass, name, confirmName } = this.state;
    if (pass === confirmPass) {
      this.props.UpdatePassword(10, pass, null);
    }
    if (name === confirmName) {
      this.props.UpdatePassword(10, null, name);
    }
  }
  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  handleFileSubmit = (e) => {
    e.preventDefault();
    const { token } = this.props;
    let profilePic = new FormData();
    profilePic.append('Profile', this.uploadInput.files[0]);
    fetch('https://verkefni2server.herokuapp.com/users/me', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${token}`
      },
      body: profilePic,
    }).then((response) => {
      response.json().then((body) => {
        this.props.uploadPic(body.file);
      });
    });
  }
  render() {
    const { user, isAuthenticated, bookItem } = this.props;
    const readBooks = bookItem ?
      <div>
        <p>I am destroy become worlds</p>
      </div> :
      <div>
        <p>Þú hefur ekki lesið neinar bækur</p>
      </div>
    const profile = isAuthenticated ?
      <div>
        <h2>Upplýsingar</h2>
        <form onSubmit={this.handleFileSubmit}>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
          <input type="submit" />
        </form>
        <form onSubmit={this.handlePassChange}> Breyta Lykilorði
          <input type="password" name="pass" onChange={this.handleInputChange} />
          <input type="password" name="confirmPass" onChange={this.handleInputChange} />
          <input type="submit" />
        </form>
        <form onSubmit={this.handlePassChange}> Breyta Nafni
          <input type="nafn" name="name" onChange={this.handleInputChange} />
          <input type="nafn" name="confirmName" onChange={this.handleInputChange} />
          <input type="submit" />
        </form>
        <h2> Lesnar Bækur </h2>
        {readBooks}
      </div> : (<Redirect
        to={{
          pathname: '/',
          state: { from: this.props.location }
        }}
      />
      )

    return (
      <div>
        {profile}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    message: state.auth.message,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    bookItem: state.books.bookItem,
  }
}
export default connect(mapStateToProps, { UpdatePassword, uploadPic, fetchBooks })(Profile);
