import React, { Component } from 'react';
import { UpdatePassword, uploadPic, getBooks, delBook } from '../../actions/auth';
import { fetchBooks } from '../../actions/book';
import { connect } from 'react-redux';
import {header} from '../../components/header';
import { Redirect } from 'react-router-dom';
class Profile extends Component {
  constructor() {
    super()
    this.state = {
      pass: '',
      confirmPass: ',',
      name: '',
      confirmName: ',',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getBooks();
  }
  handlePassChange = (e) => {
    e.preventDefault();
    const { pass, confirmPass, name, confirmName } = this.state;
    let breyta = localStorage.getItem('user');
    breyta = JSON.parse(breyta);
    const id = breyta.id;
    const username = breyta.username;
    if (pass === confirmPass) {
      this.props.UpdatePassword(id, username, null, pass);
    }
  }
  handleNameChange = (e) => {
    e.preventDefault();
    const { pass, confirmPass, name, confirmName } = this.state;
    console.log(e.target.value)
    let breyta = localStorage.getItem('user');
    breyta = JSON.parse(breyta);
    const id = breyta.id;
    const username = breyta.username;
    let user = { 'username': username, 'password': breyta.password, "name":name, "id": id };
    this.props.UpdatePassword(id, username, name, null);
    if(name.length !== 0){
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.fall();
  }
  fall(){
    console.log("kemstu hingað");
   
    this.setState({name:"jónas fór út í búð"});
  }
  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  handleFileSubmit = (e) => {
    e.preventDefault();
    const { token } = this.props;
    let profilePic = new FormData();
    profilePic.append('Profile', this.uploadInput.files[0]);
    fetch('https://verkefni2server.herokuapp.com/users/me', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${token}`
      },
      body: profilePic,
    }).then((response) => {
      response.json().then((body) => {
        this.props.uploadPic(body.file);
      });
    });
  }
  handleSubmit(event) {
    const { delBook } = this.props;
    delBook(event);
  }
  render() {
    console.log("fer ég aftur hingað")
    const { user, isAuthenticated, bookItem, book, message, delBook } = this.props;
    let bookReadList = <p>Hleð inn gögnum...</p>
    try {
      bookReadList =
        (book.response.items.map(items =>
          <div>
            <h3>{items.booksread_title}</h3>
            <p>Einkunn {items.booksread_grade} {items.booksread_judge}</p>
          <button onClick={this.props.delBook.bind(this, items.id)}>Eyða lestri</button>
          </div>
        ));
    } catch (e) {
      try {
        bookReadList =
          <div>{book.Empty}
          </div>
      } catch (e) { }
    }
    const profile = isAuthenticated ?
      <div>
        <h2>Upplýsingar</h2>
        <form id="myForm" onSubmit={this.handleFileSubmit} onClick="clearField();">
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
          <input type="submit" value="Aftengt afþví Cloudinary virkar ekki" />
        </form>
        <form onSubmit={this.handleNameChange}> Breyta Nafni
          <input type="nafn" name="name" onChange={this.handleInputChange} />
          <input type="submit" />
          {message ?
          <div>
            <header
            />
            <p>{message}</p>
            </div>
             :
             <p></p>}
        </form>
        <form onSubmit={this.handlePassChange}> Breyta Lykilorði
          <input type="password" name="pass" onChange={this.handleInputChange} />
          <input type="password" name="confirmPass" onChange={this.handleInputChange} />
          <input type="submit" />
        </form>
        <h2> Lesnar Bækur </h2>
      </div> : (<Redirect
        to={{
          pathname: '/',
          state: { from: this.props.location }
        }}
      />
      )

    return (
      <div>
        {profile}
        <div className="readList">
          {bookReadList}
        </div>
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
    book: state.auth.payload,
  }
}
export default connect(mapStateToProps, { UpdatePassword, uploadPic, fetchBooks, getBooks, delBook })(Profile);
