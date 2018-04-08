import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Registerread from '../registerRead';
import { Route, Link, Switch } from 'react-router-dom';



/**
 * Get skoðað eina bók
 */

class viewBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gogn:null,
      loading:true,
      error:null,
      clicked:null,
    };
}
  async componentDidMount(){
    const str = window.location.pathname;
    const hlutur = str.split('/');
    const url = 'https://verkefni2server.herokuapp.com/'+hlutur[1]+'/'+hlutur[2];
    console.log(url);
    const data = await this.fetchData(url);
    this.setState({ gogn:data, loading: false });
  }
  async fetchData(url) {
    const link = url;
    const response = await fetch(link);
    const data = await response.json();
    return data;
  }
  buttonHandler = (e) => {
    const {clicked} = this.state;
    this.setState({clicked:true});
  }
  StoppHandler = (e) => {
    this.setState({clicked:false});
  }
  render(){
    const {gogn, loading, error, teljari, tala,clicked} = this.state;
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
    if(this.state.clicked === false  || this.state.clicked === null){
      tableClass = 'lesTakkinn';
      name = 'none';
    }else{
      tableClass='none';
      name='lesa';
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
            <Link to = {`/books/${items.id}/edit`}> Breyta bók</Link>
          </button>
          <Registerread
          lesa = {BookRead}
          read = {this.state.clicked}
          check = {items}
          />
        {<button className={tableClass} onClick={this.buttonHandler}>Lesinn</button>}
        <div className={name}>
          <button>
            vista
          </button>
          <button onClick={this.StoppHandler}> Hætta</button>
        </div>

        </div>
      );
    }
  }
export default viewBook;



























/*<div className="oneBook">
      <h3> {title}</h3>
      <ul>
        <li>Eftir {author} </li>
        <li>ISBN13: {isbn13}</li>
        <li>{description}</li>
        <li>{pages} síður </li>
        <li> Gefinn út {published}</li>
        <li> Tungumál: {language}</li>
      </ul>
      <button onClick = {this.buttonHandler}>Til baka </button>
    </div>*/