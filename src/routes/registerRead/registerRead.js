import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import './registerRead.css';
import { connect } from 'react-redux';
import { readBookByUser } from '../../actions/auth';
import { Route, Link, Switch } from 'react-router-dom';

class registerRead extends Component {
  state = {
    einkunn: null,
    textinn: null,
    checkScore: null,
    checkText: null,
  }
  generateOptions(categories) {
    return categories.map((x, i) => {
      return (<option key={i} value={x}>{x}</option>)
    });
  }
  handleInputChange = (e) => {
    const { einkunn, textinn } = this.state;
    console.log(e.target.value)
    console.log(e.target.id)
    if (e.target.id === 'einkunn') {
      this.setState({ einkunn: e.target.value, checkScore: true });
    }
    if (e.target.id === 'texti') {
      this.setState({ textinn: e.target.value, checkText: true });
    }

  }
  submitHandler = (e) => {
    const { einkunn, textinn, checkScore, checkText } = this.state;
    this.props.readBookByUser(parseInt(this.state.einkunn, 10), this.state.textinn, e)
  }
  render() {
    const { einkunn, textinn, checkScore, checkText } = this.state;
    const title = this.props.audkenni;
    const gognin = this.props.check;
    const visible = this.props.read;
    const lesaBok = this.props.lesa;
    let tableClass = null;
    if (visible === false || visible === null) {
      tableClass = 'none ';
    } else {
      tableClass = 'ListinnFyrirBok';
    }
    const allCategories = ['1', '2', '3', '4', '5'];
    const options = this.generateOptions(allCategories);
    return (
      <div className={tableClass}>
        <div>
          <legend htmlFor="about">um Bók</legend>
          <textarea id="texti" rows="5" cols="50" type="text" name="about" onChange={this.handleInputChange}></textarea>
        </div>
        <lable htmlFor="category" >Einkunn:</lable>
        <select name="category" id="einkunn" onChange={this.handleInputChange}>
          {options}
        </select>
        <button onClick={this.submitHandler(title)}> vista</button>
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
export default connect(mapStateToProps, { readBookByUser })(registerRead);