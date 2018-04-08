import React, { Component } from 'react';
import { CreateBook } from '../../actions/auth';
import { connect } from 'react-redux';


class Profile extends Component {

  handlePassChange = (e) => {
    e.preventDefault();
    const { pass, confirmPass } = this.state;
    if(pass === confirmPass){
      this.props.UpdatePassword(pass);
    }
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState( { [name]:value });
  }

  render() {
    return (
      <div>
        <form>
          <input type="file" name="pic" accept="image/*"/>
          <input type="submit"/>
        </form>
        <form onSubmit={this.handlePassChange}>
          <input type="password" name="pass" onChange={this.handleInputChange}/>
          <input type="password" name="confirmPass" onChange={this.handleInputChange}/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}
export default Profile;
