import React, { Component } from 'react';
import { CreateBook, changeName } from '../../actions/auth';
import { connect } from 'react-redux';


class Profile extends Component {

  handleNameChange = (e) => {
    e.preventDefault();
    const { name } = this.state;
    console.log(`change name to ${name}`);
    this.props.changeName(name);
  }

  handlePassChange = (e) => {
    e.preventDefault();
    const { pass, confirmPass } = this.state;
    if(pass === confirmPass){
      this.props.UpdatePassword(pass);
    }
  }

  handleInputChange = (e) => {
    console.log(e.target.name);
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
        <form onSubmit={this.handleNameChange}>
          <input type="text" name="name" onChange={this.handleInputChange}/>
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
const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default connect (mapStateToProps, { changeName })(Profile);
