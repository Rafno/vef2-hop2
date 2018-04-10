import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../api';
import './registration.css';
class Registration extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      error: [],
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  async handleSubmit(event) {
    const { username, password, name } = this.state;
    event.preventDefault();
    const registrationInfo = {
      username,
      password,
      name,
    }
    const results = await api.post('/register', registrationInfo);
    if (results.result.error) {
      console.log(results);
      this.setState({ error: results.result.error })
    } else {
      window.location.replace("login");
    }
  }

  render() {
    let errors = null;
    if (this.state.error) {
      console.log("I have errors");
      errors = this.state.error.map((x, i) => {
        console.log(x.error);
        return (<p>{x.error}</p>)
      });
      console.log(errors);
    }
    console.log("errors are" + errors);
    return (
      <form onSubmit={this.handleSubmit} class="registration">
        <h1>Nýskráning</h1>
        <div className="inputContainer">
          <label>
            Notandanafn:
              <input type="text" onChange={this.handleUsernameChange} />
          </label>
          <label>
            Lykilorð:
              <input type="password" onChange={this.handlePasswordChange} />
          </label>
          <label for="name">
            Nafn:
              <input id="name" type="text" onChange={this.handleNameChange} />
          </label>
        </div>
        {errors}
        <input type="submit" value="Nýskrá" />
        <a href="/login">Innskráning</a>
      </form>
    );
  }
}


/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default Registration;