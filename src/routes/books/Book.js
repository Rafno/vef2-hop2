import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/book';

import { get } from '../../api';

/**
 * Hér mun þessi compnent sjá um alla listann af bókunum og getur valið spes bók.
 */

class Books extends Component {
  componentWillMount() {
    this.props.fetchBooks();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }

  render() {
    console.log(this.props);
    const postItems = this.props.books.map(post => (
      console.log(post)
    ));
    return (
      <div>
        <h1>Posts</h1>

      </div>
    );
  }
  }

Books.propTypes = {
  fetchBooks: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  books: state.books.items
});

export default connect(mapStateToProps, { fetchBooks })(Books);