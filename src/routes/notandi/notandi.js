
import React, { Component } from 'react';
import { getBooks, updateUser } from '../../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './notandi.css';

  class Profile extends Component {
      componentDidMount() {
        this.props.getBooks();
        const userUrl = this.props.location.pathname.split('/');
        this.props.updateUser(userUrl[2]);
      }
    render() {
      const { isAuthenticated, bookItem, book, message, delBook, notandi } = this.props;
      let bookReadList = <p> Hleð inn gögnum...</p>;
      try {
        bookReadList =
          (book.response.items.map(items =>
            <div>
              <h3>{items.booksread_title}</h3>
              <h3>Einkunn: {items.booksread_grade} {items.booksread_judge}</h3>
            </div>
          ));
      } catch (e) {
        try {
          bookReadList =
          <div>{book.Empty}
          </div>
        } catch (e) {}
      }
      try {
        return (
          <div className="userListContainer">
            <h1> {this.props.notandi.name}</h1>
            <h1> Lesnar bækur </h1>
            {bookReadList}
          </div>
        );
      }
      catch (e) {
        return (
          <div>
            <p>Loading..</p>
          </div>
        );
      }
  }
}
  const mapStateToProps = (state) => {
    return {
      isFetching: state.auth.isFetching,
      message: state.auth.message,
      user: state.auth.user,
      isAuthenticated: state.auth.isAuthenticated,
      token: state.auth.token,
      bookItem: state.books.bookItem,
      book: state.auth.payload,
      notandi: state.auth.notandi,
    }
  }
export default connect(mapStateToProps, { getBooks, updateUser})(Profile);
