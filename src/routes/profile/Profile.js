import React, { Component } from 'react';
import { UpdatePassword, uploadPic, getBooks, delBook } from '../../actions/auth';
import { fetchBooks } from '../../actions/book';
import { connect } from 'react-redux';
import {header} from '../../components/header';
import { Redirect } from 'react-router-dom';
import './profile.css';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      pass: '',
      confirmPass: ',',
      name: '',
      confirmName: ',',
      checked:false,
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
    this.setState({pass:"",checked:true})
  }
  handleNameChange = (e) => {
    e.preventDefault();
    const { pass, confirmPass, name, confirmName, checked } = this.state;
    let breyta = localStorage.getItem('user');
    breyta = JSON.parse(breyta);
    const id = breyta.id;
    const username = breyta.username;
    let user = { 'username': username, 'password': breyta.password, "name":name, "id": id };
    this.props.UpdatePassword(id, username, name, null);
    if(name.length !== 0){
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.setState({name:""});
  }
  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value, checked:false });
  }
  handleFileSubmit = (e) => {
    e.preventDefault();
    const { token } = this.props;
    let profilePic = new FormData();
    profilePic.append('Profile', this.uploadInput.files[0]);
    fetch('http://res.cloudinary.com/duvvmlv8t/image/upload/v1523731772/jutr9ov1n8jbo7lxbush.jpg', {
    //fetch('https://verkefni2server.herokuapp.com/users/me', {
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
    const { user, isAuthenticated, bookItem, book, message, delBook } = this.props;
    const {checked, name, pass} = this.state;
    let bookReadList = <p>Hleð inn gögnum...</p>
    try {
      bookReadList =
        (book.response.items.map(items =>
          <div className="myReadBookContainer">
            <h3>{items.booksread_title}</h3>
            <h3>Einkunn {items.booksread_grade} {items.booksread_judge}</h3>
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
    let password
    if(checked === true) {
       password = "";
    }
    const profile = isAuthenticated ?
      <div>
        <h1>Upplýsingar</h1>
        <form className="imageUpdateContainer" onSubmit={this.handleFileSubmit}>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" placeholder=" óli sagðði a það mátti sleppa"/>
          <input value="Uppfæra mynd" type="submit"/>
        </form>
        <form className="nameChangeForm" onSubmit={this.handleNameChange}> 
        <div className="nameChangeContainer">
        <lable for="name">Nafn:</lable>
          <input type="nafn" name="name" onChange={this.handleInputChange} value={name} />
          </div>
          <input value="Uppfæra nafn" type="submit" />
        </form>
        {message ?
          <div className="submitErrorMessage">
            <header
            />
            <p>{message}</p>
            </div>
             :
             <p></p>}
        <form className="passChangeForm" onSubmit={this.handlePassChange}>
        <div className="passChangeContainer">
          <lable for="pass"> Lykilorð:</lable>
          <input type="password" name="pass" onChange={this.handleInputChange} value={password}/>
        </div>
        <div className="passChangeContainer">
          <lable for="confirmPass">Lykilorð aftur:</lable>
          <input type="password" name="confirmPass" onChange={this.handleInputChange} value={password}/>
        </div>
          <input value="Uppfæra lykilorð" type="submit" />
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
      <div className="profileContainer">
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
