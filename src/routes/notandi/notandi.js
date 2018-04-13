
  import React, { Component } from 'react';
  import { getBooks } from '../../actions/auth';
  import {  } from '../../actions/book';
  import { connect } from 'react-redux';
  import { Redirect } from 'react-router-dom';
  class Profile extends Component {
      componentDidMount() {
        this.props.getBooks();
      }
    render() {
      const { user, isAuthenticated, bookItem, book, message, delBook } = this.props;
      let bookReadList = <p> Hleð inn gögnum...</p>;
      try {
        bookReadList =
          (book.response.items.map(items =>
            <div>
              <h3>{items.booksread_title}</h3>
            <p>Einkunn {items.booksread_grade} {items.booksread_judge}</p>
            </div>
          ));
      } catch (e) {
        try {
          bookReadList =
          <div>{book.Empty}
          </div>
        } catch (e) {}
      }
      let breyta = localStorage.getItem('user');
      const users = JSON.parse(breyta);
      console.log(users.name);
        return(
          <div>
            <h2> {users.name}</h2>
            <h3> Lesnar bækur </h3>
           {bookReadList}
          </div>
        );
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
      book:state.auth.payload,
    }
  }
  export default connect(mapStateToProps,  {getBooks})(Profile);
