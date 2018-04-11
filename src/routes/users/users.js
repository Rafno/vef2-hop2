import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { viewUser } from '../../actions/auth';
import { connect } from 'react-redux';

class users extends Component {
  componentDidMount() {
    const { token } = this.props;
    this.props.viewUser(token);

  }
  render() {
    const { users } = this.props;
    try {
      console.log(users.response);

    } catch (e) {
      console.log();
    }
    return (
      <p> Þello </p>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    users: state.auth.users,
    token: state.auth.token,
  }
}

export default connect(mapStateToProps, { viewUser })(users);