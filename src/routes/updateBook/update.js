import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CreateBook } from '../../actions/auth';
import { UpdateBookById } from '../../actions/auth';
import { connect } from 'react-redux';

class update extends Component {
  state = {
    title: '',
    author: '',
    about: '',
    category: '',
    isbn10: '',
    isbn13: '',
    released: '',
    pageCount: '',
    language: '',
  }
  async componentDidMount() {
  }
  generateOptions(categories, currentCategory) {
    return categories.map((x, i) => {
      return (<option key={i} value={x}>{x}</option>)
    });
  }
  handleInputChange = (e) => {
    const {title} = this.state;
    console.log(e.target.value);
    if(e.target.id == "title"){
      this.setState({title})
    }
  }
  render() {
    const { title, author, category, isbn10, isbn13, released, pageCount, language, description, action } = this.state;
    const { isAuthenticated, user } = this.props;
    // TODO FALL SÆKJA ÖLL CATEGORIES
    const allCategories = ['Science Fiction', 'Fantasy', 'Fiction', 'Computer Science', 'Comic', 'Nonfiction', 'Business',
      'Psychology', 'Horror', 'Design', 'Economics', 'Graphic Novel'];
    const options = this.generateOptions(allCategories, category);
    const visible = isAuthenticated ?
      <div>
        <h2>{action}</h2>
        <div>
          <label htmlFor="username">Titill:</label>
          <input id="title" type="text" name="title" value={title} onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor="">Höfundur:</label>
          <input id="author" type="text" name="author" value={author} onChange={this.handleInputChange} />
        </div>
        <div>
          <legend htmlFor="about">Lýsing</legend>
          <textarea rows="5" cols="50" id="about" type="text" value={description} name="about" onChange={this.handleInputChange}>
          </textarea>
        </div>
        <div>
          <lable htmlFor="category" >Flokkur:</lable>
          <select id="category" name="category" value={category} onChange={this.handleInputChange}>
            {options}
          </select>
        </div>
        <div>
          <label htmlFor="isbn10">ISBN10:</label>
          <input id="isbn10" type="text" name="isbn10" value={isbn10} onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor="isbn13">ISBN13:</label>
          <input id="isbn13" type="text" name="isbn13" value={isbn13} onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor="released">Útgefin:</label>
          <input id="released" type="text" name="released" value={released} onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor="pageCount">Fjöldi síða:</label>
          <input id="pageCount" type="text" name="pageCount" value={pageCount} onChange={this.handleInputChange} />
        </div>
        <div>
          <label htmlFor="language">Tungumál:</label>
          <input id="language" type="text" name="language" value={language} onChange={this.handleInputChange} />
        </div>

        <button onClick={this.buttonHandler}> Submit </button>
        <button>
          <Link to={`/books/${this.state.sluggid}`}> Til baka</Link>
        </button>
      </div> :
      (<Redirect
        to={{
          pathname: '/',
          state: { from: this.props.location }
        }}
      />
      )
    return (
      <div>
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
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
export default connect(mapStateToProps, { CreateBook, UpdateBookById })(update);