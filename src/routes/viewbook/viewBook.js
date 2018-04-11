import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Registerread from '../registerRead';
import { Route, Link, Switch } from 'react-router-dom';
import { signReadBook } from '../../actions/auth';
import { fetchBooks } from '../../actions/book';
import { connect } from 'react-redux';

/**
 * Get skoðað eina bók
 */

class viewBook extends Component {
  componentDidMount() {
    const path = this.props.location.pathname;
    this.props.fetchBooks(path);
  }
  render() {
    const { bookItem } = this.props;
    /**
     * TODO, klára eftir </ul> virkni sem sendir á tilbúið Action sem setur í state lesna bók.
     * Gæti þurft að breyta hvort state takið við object, ef ekki. útfæra bókina og ég bæti á morgun þannig
     * að það sé bætt við object á stateið frekar en að yfirskrifa það
     */
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
export default connect(mapStateToProps, { signReadBook, fetchBooks })(viewBook);

/*const { gogn, loading, error, teljari, tala, clicked } = this.state;
    if (loading) {
      return (
        <div>
          <p>Sæki gögn...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div>
          <p> villa kom upp </p>
        </div>
      );
    }
    const items = this.state.gogn.gogn[0];
    console.log(items);
    const check = null;
    let tableClass = null;
    let name = null;
    //const BookRead = null;
    const BookRead = true;
    if (this.state.clicked === false || this.state.clicked === null) {
      tableClass = 'lesTakkinn';
      name = 'none';
    } else {
      tableClass = 'none';
      name = 'lesa';
    }
    return (
      <div className="skodaBok">
        <ul className="listinnfyirBok">
          <li>{items.title} </li>
          <li> {items.author}</li>
          <li> {items.isbn13} </li>
          <li>{items.category} </li>
          <li> {items.description}</li>
          <li> {items.pagecount} Síður </li>
          <li> Tungumál: {items.language} </li>
        </ul>
        <button>
          <Link to={`/books/${items.id}/edit`}> Breyta bók</Link>
        </button>
        <Registerread
          audkenni={items.title}
          lesa={BookRead}
          read={this.state.clicked}
          check={items}
        />
        {<button className={tableClass} onClick={this.buttonHandler}>Lesinn</button>}
        <div className={name}>
          <button onClick={this.StoppHandler}> Hætta</button>
        </div>
      </div>
    );
    */