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
    this.state = { text: '', grade: 0 };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const path = this.props.location.pathname;
    this.props.fetchBooks(path);
  }
  handleGradeChange(event) {
    this.setState({ grade: event.target.value });
  }
  handleTextChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit(event) {
    const {grade, text} = this.state;
    const { bookItem } = this.props;
<<<<<<< HEAD
=======
    console.log(this.state.grade);
    this.props.readBookByUser(5, this.state.value, bookItem.gogn[0].title);
>>>>>>> 11eceeeb5d0ed471c510b2f943040bde9f3b74b1
    event.preventDefault();
    const tala = this.state.grade;
    const numb = parseInt(tala);
    this.props.readBookByUser(numb, this.state.text, bookItem.gogn[0].title);
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
            <textarea value={this.state.text} onChange={this.handleTextChange} rows="5" cols="20">Hvað fannst þér um bókina?</textarea>
            <input type="number" name ="quantity" min ="1" max="5" value={this.state.grade} onChange={this.handleGradeChange} />
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
