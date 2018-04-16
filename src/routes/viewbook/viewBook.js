import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { signReadBook, readBookByUser, delBook } from '../../actions/auth';
import { fetchBooks } from '../../actions/book';
import { connect } from 'react-redux';
import './viewBook.css';

/**
 * Get skoðað eina bók
 */

class viewBook extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '', grade: 0, checked:false, submit:false };

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
    const {grade, text, checked, submit} = this.state;
    const { bookItem } = this.props;
    event.preventDefault();
    const tala = this.state.grade;
    const numb = parseInt(tala);
    console.log(numb , ' þetta er talan í handlesubmit')
    this.props.readBookByUser(numb, this.state.text, bookItem.gogn[0].title);
    console.log(grade, 'þetta er einkuninn');
    this.setState({checked:false, submit:true, grade:0});
  }
  buttonHandler = () => {
    const {checked} = this.state;
    let truth = null;
    if(this.state.checked === true){
      truth = false;
    } else {
      truth = true;
    }
    this.setState({checked:truth});
  }

  render() {
    const {checked, submit, grade} = this.state;
    const { bookItem, message, delBook, payload } = this.props;
    const check = null;
    let name = null;
    let einkunn = 0;
    let domur = '';
    let agree = null;
    if(this.state.submit === true ){
      try {
        console.log(message.books.id, ' þetta er einkunin')
        einkunn = message.books.booksread_grade;
        domur = message.books.booksread_judge
        agree = payload ?
          <div>
            <p>Lesni bók eytt</p>
            </div> :
        <div>
          <ul>
            <li> Einkunn: {einkunn} </li>
            <li> {domur} </li>
          </ul>
          <button onClick={this.props.delBook.bind(this, message.books.id)}>Eyða lestri</button>
        </div>
      } catch (e) {
      }
    }

    const final = this.state.submit ?
    <div>
       {agree}
    </div>
      :
    null;

    const read = this.state.checked ?
    <div className={name}>
      <form className="reviewForm" onSubmit={this.handleSubmit} >
        <lable>Um Bók:</lable>
        <textarea value={this.state.text} onChange={this.handleTextChange} rows="5" cols="20">Hvað fannst þér um bókina?</textarea>
          <lable>Einkunn:</lable>
          <input className="userRating" type="number" name ="quantity" min ="1" max="5" value={this.state.grade} onChange={this.handleGradeChange} />
          <div className="reviewInputContainer">
          <input type="submit" value="Vista" />
          <button onClick={this.buttonHandler}>Hætta við</button>
          </div>
      </form>
  </div>:
  <div className="readBookButtonContainer">
  <button onClick={this.buttonHandler}> Lesin Bók </button>
  </div>
    const book = bookItem ?
      <div className="skodaBok">
        <ul className="listinnfyirBok">
          <li className="bookTitle">{bookItem.gogn[0].title} </li>
          <li> Eftir {bookItem.gogn[0].author}</li>
          <li> ISBN13: {bookItem.gogn[0].isbn13} </li>
          <li>{bookItem.gogn[0].category} </li>
          <li> {bookItem.gogn[0].description}</li>
          <li> {bookItem.gogn[0].pagecount} Síður </li>
          <li> Gefin út {bookItem.gogn[0].published}</li>
          <li> Tungumál: {bookItem.gogn[0].language} </li>
          <li> <Link to={`/books/${bookItem.gogn[0].id}/edit`}> Breyta bók</Link></li>
        </ul>
      </div> : <p>loading...</p>
    return (
      <div>
        {book}
        {read}
        {final}
        <div className="backButtonContainer">
        <button> <Link to={"/books"}>Til baka </Link> </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    readBook: state.auth.readBook,
    isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token,
    message: state.auth.message,
    bookItem: state.books.bookItem,
    payload: state.auth.payload,
  }
}
export default connect(mapStateToProps, { signReadBook, fetchBooks, readBookByUser, delBook })(viewBook);
