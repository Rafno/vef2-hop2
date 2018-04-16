import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CreateBook } from '../../actions/auth';
import { UpdateBookById, getBookById } from '../../actions/auth';
import { connect } from 'react-redux';
import './update.css';


class update extends Component {
  state = {
    title: '',
    author: '',
    about: '',
    category: 'Science Fiction',
    isbn10: '',
    isbn13: '',
    published: '',
    pageCount: '',
    language: '',
    initialized: false,
    back:false,
    id:null,
  }

  async componentDidMount() {
    const path = window.location.pathname;
    let aftur = null;
    let bookId = null;
    if (path.includes("edit")){
      aftur = true;
      bookId = path.split('/')[2];
      await this.props.getBookById(bookId);
      const { book, message } = this.props;
    } else {
      aftur = false;

    }
    this.setState({back:aftur, id:bookId})
  }
  generateOptions(categories, currentCategory) {
    return categories.map((x, i) => {
      return (<option key={i} value={x}>{x}</option>)
    });
  }
  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  buttonHandler = (e) => {
    const { title, author, category, isbn10, isbn13, published, pageCount, language, description, action } = this.state;
    this.props.CreateBook(title, author, description, parseInt(isbn10), parseInt(isbn13), published, parseInt(pageCount), language, category);
  }

  render() {
    const { title, author, category, isbn10, isbn13, published, pageCount, language, description, action, initialized, back, id } = this.state;
    const { isAuthenticated, user, book, message } = this.props;
    const errorMessage = <p>{this.props.message}</p>
    if(!initialized && book){
        this.setState({
          title: book.gogn[0].title,
          author: book.gogn[0].author,
          category: book.gogn[0].category,
          isbn10: book.gogn[0].isbn10,
          isbn13: book.gogn[0].isbn13,
          published: book.gogn[0].published,
          pageCount: book.gogn[0].pagecount,
          language: book.gogn[0].language,
          description: book.gogn[0].description,
          action: book.gogn[0].action,
          initialized: true,
        });
    }
    `/books/${this.state.sluggid}`
    let url = back ? url= `/books/${id}`: url = '/';
    let header = back ? header='Breyta bók': header='Búa til nýja bók';
    const allCategories = ['Science Fiction', 'Fantasy', 'Fiction', 'Computer Science', 'Comic', 'Nonfiction', 'Business',
      'Psychology', 'Horror', 'Design', 'Economics', 'Graphic Novel'];
    const options = this.generateOptions(allCategories, category);
    const visible = isAuthenticated ?
      <div className="bookEdit">
        <h1>{action}</h1>
        <div className="formContainer">
        <div className="bookTextContainer">
          <label htmlFor="username">Titill:</label>
          <input id="title" type="text" name="title" value={title} onChange={this.handleInputChange} placeholder="Þarf að fylla út"/>
        </div>
        <div className="bookTextContainer">
          <label htmlFor="">Höfundur:</label>
          <input id="author" type="text" name="author" value={author} onChange={this.handleInputChange}/>
        </div>
        <div>
          <legend htmlFor="about">Lýsing</legend>
          <textarea rows="5" cols="50" id="description" type="text" value={description} name="description" onChange={this.handleInputChange} placeholder ="Þarf að fylla út">
          </textarea>
        </div>
        <div className="categoryContainer">
          <lable htmlFor="category" >Flokkur:</lable>
          <select id="category" name="category" value={category} onChange={this.handleInputChange}>
            {options}
          </select>
        </div>
        <div className="bookTextContainer">
          <label htmlFor="isbn10">ISBN10:</label>
          <input id="isbn10" type="text" name="isbn10" value={isbn10} onChange={this.handleInputChange} placeholder ="Tölustafir þarf að fylla út" />
        </div>
        <div className="bookTextContainer">
          <label htmlFor="isbn13">ISBN13:</label>
          <input id="isbn13" type="text" name="isbn13" value={isbn13} onChange={this.handleInputChange} placeholder="13 tölustafir þarf að fylla út"/>
        </div>
        <div className="bookTextContainer">
          <label htmlFor="published">Útgefin:</label>
          <input id="published" type="text" name="published" value={published} onChange={this.handleInputChange} />
        </div>
        <div className="bookTextContainer">
          <label htmlFor="pageCount">Fjöldi síða:</label>
          <input id="pageCount" type="number" name="pageCount" value={pageCount} onChange={this.handleInputChange} placeholder="þarf að fylla út" />
        </div>
        <div className="bookTextContainer">
          <label htmlFor="language">Tungumál:</label>
          <input id="language" type="text" name="language" value={language} onChange={this.handleInputChange} placeholder="þarf að fylla út"/>
        </div>
        <button onClick={this.buttonHandler}> Vista </button>
        {errorMessage}
      </div>
      <button className="backButton">
          <Link to={url}> Til baka</Link>
        </button>
      </div>
       :
      (<Redirect
        to={{
          pathname: '/',
          state: { from: this.props.location }
        }}
      />
      )
    return (
      <div>
        <h2> {header} </h2>
        {visible}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
    book:state.auth.payload,
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default connect(mapStateToProps, { CreateBook, UpdateBookById, getBookById })(update);