import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Registerread from '../registerRead';
import { Route, Link, Switch } from 'react-router-dom';
import { signReadBook, readBookByUser } from '../../actions/auth';
import { fetchBooks } from '../../actions/book';
import { connect } from 'react-redux';

/**
 * Get skoðað eina bók
 */

class viewBook extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '', grade: '' };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const path = this.props.location.pathname;
    this.props.fetchBooks(path);
  }
  handleGradeChange(event) {
    this.setState({ grade: event.target.grade });
  }
  handleTextChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const { bookItem } = this.props;
    console.log(this.state.grade);
    this.props.readBookByUser(5, this.state.value, bookItem.gogn[0].title);
    event.preventDefault();
  }

  render() {
    const { bookItem } = this.props;
    const check = null;
    let name = null;
    const book = bookItem ?
      <div className="skodaBok">
        <ul className="listinnfyirBok">
          <li>{bookItem.gogn[0].title} </li>
          <li> {bookItem.gogn[0].author}</li>
          <li> {bookItem.gogn[0].isbn13} </li>
          <li>{bookItem.gogn[0].category} </li>
          <li> {bookItem.gogn[0].description}</li>
          <li> {bookItem.gogn[0].pagecount} Síður </li>
          <li> Tungumál: {bookItem.gogn[0].language} </li>
        </ul>
        <button>
          <Link to={`/books/${bookItem.gogn[0].id}/edit`}> Breyta bók</Link>
        </button>

        <div className={name}>
          <form onSubmit={this.handleSubmit} >
            <textarea value={this.state.value} onChange={this.handleTextChange} rows="5" cols="20">Hvað fannst þér um bókina?</textarea>
            <input type="number" value={this.state.grade} onChange={this.handleGradeChange} min="1" max="5" />
            <input type="submit" value="Lesinn" />
          </form>
        </div>
      </div> : <p>loading...</p>
    return (
      <div>{book}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    readBook: state.auth.readBook,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    bookItem: state.books.bookItem,
  }
}
export default connect(mapStateToProps, { signReadBook, fetchBooks, readBookByUser })(viewBook);
