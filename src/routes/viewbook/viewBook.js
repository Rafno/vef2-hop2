import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { signReadBook, readBookByUser, delBook } from '../../actions/auth';
import { fetchBooks } from '../../actions/book';
import { connect } from 'react-redux';

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
    this.props.readBookByUser(numb, this.state.text, bookItem.gogn[0].title);
    this.setState({checked:false, submit:true});
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
  DeleteHandler = () => {
    console.log("eyða þessari skrá");
  }

  render() {
    const {checked, submit} = this.state;
    const { bookItem, message, delBook, payload } = this.props;
    const check = null;
    let name = null;
    let einkunn = 0;
    let domur = '';
    let agree = null;
    if(this.state.submit === true ){
      try {
        einkunn = message.books.id
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
      <form onSubmit={this.handleSubmit} >
        <textarea value={this.state.text} onChange={this.handleTextChange} rows="5" cols="20">Hvað fannst þér um bókina?</textarea>
          <input type="number" name ="quantity" min ="1" max="5" value={this.state.grade} onChange={this.handleGradeChange} />
          <input type="submit" value="Lesinn" />
      </form>
          <button onClick={this.buttonHandler}> Hætta við </button>
  </div>:
  <button onClick={this.buttonHandler}> Lesinn </button>
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
      </div> : <p>loading...</p>
    return (
      <div>
        {book}
        {read}
        {final}
        <button> <Link to={"/books"}>Til baka </Link> </button>
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
