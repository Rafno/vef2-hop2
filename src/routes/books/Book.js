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
  constructor(props) {
    super(props);
    this.state = {
      books: null,
      loading: true,
    }

  }
  componentDidMount() {
    this.props.fetchBooks();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }

  render() {
    if (this.props.books.items === undefined) {
      console.log("Gripið!");
    } else {
      console.log(this.props.books.items);
    }
    return (
      <div>
        <h1>Posts</h1>

      </div>
    );
  }
  }

Books.propTypes = {
  fetchBooks: PropTypes.func.isRequired,
  books: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  books: state.books.items
});

export default connect(mapStateToProps, { fetchBooks })(Books);