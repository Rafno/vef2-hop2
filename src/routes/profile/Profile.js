import React, { Component } from 'react';
import { UpdatePassword } from '../../actions/auth';
import { connect } from 'react-redux';


class Profile extends Component {

  handleNameChange = (e) => {
    e.preventDefault();
    const { name } = this.state;
    localStorage.setItem("username", name);
    this.props.changeName(name);
  }

  handlePassChange = (e) => {
    e.preventDefault();
    const { pass, confirmPass, name,confirmName } = this.state;
    if(pass === confirmPass){
      this.props.UpdatePassword(10,pass,null);
    }
    console.log(name, confirmName)
    if(name === confirmName){
      this.props.UpdatePassword(10,null,name);
    }
  }

  handleInputChange = (e) => {
    console.log(e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    this.setState( { [name]:value });
  }

  render() {
    return (
      <div>
        <h2>Upplýsingar</h2>
        <form>
          <input type="file" name="pic" accept="image/*"/>
          <input type="submit"/>
        </form>
        <form onSubmit={this.handlePassChange}> Breyta Lykilorði
          <input type="password" name="pass" onChange={this.handleInputChange}/>
          <input type="password" name="confirmPass" onChange={this.handleInputChange}/>
          <input type="submit"/>
        </form>
        <form onSubmit={this.handlePassChange}> Breyta Notendanafni
          <input type="username" name="name" onChange={this.handleInputChange}/>
          <input type="username" name="confirmName" onChange={this.handleInputChange}/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
  }
}
export default connect (mapStateToProps, {UpdatePassword})(Profile);
