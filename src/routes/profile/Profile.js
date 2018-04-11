import React, { Component } from 'react';
import { UpdatePassword } from '../../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class Profile extends Component {
  handlePassChange = (e) => {
    e.preventDefault();
    const { pass, confirmPass, name, confirmName } = this.state;
    let breyta = localStorage.getItem('user');
    breyta = JSON.parse(breyta);
    const id = breyta.id;
    const username = breyta.username;
    console.log(username, " þetta er id í profile");
    if (pass === confirmPass) {
      this.props.UpdatePassword(id, username, null, pass);
    }
    console.log(name, confirmName)
    if (name === confirmName) {
      this.props.UpdatePassword(id, username, name, null);
    }
  }
  handleInputChange = (e) => {
    console.log(e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  render() {
    const { user, isAuthenticated } = this.props;
    //const gogn = this.props.getBooks();
    const profile = isAuthenticated ?
      <div>
        <h2>Upplýsingar</h2>
        <form>
          <input type="file" name="pic" accept="image/*" />
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
  }
}
export default connect(mapStateToProps, { UpdatePassword })(Profile);
