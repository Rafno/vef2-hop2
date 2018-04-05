import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Route, Link, Switch } from 'react-router-dom';



/**
 * Get skoðað eina bók
 */

class viewBook extends Component {
  render(){
    const files = {
       items: {"id":10,"title":"195","author":"Geore Cow","description":"Rosalega skemmtilega bókinn sem er voða merkileg","isbn10":"451774934","isbn13":"9777451524935","category":2,"published":"","pagecount":"246","language":"en"},
    }
    const gogn = this.componentDidMount();
    console.log(gogn.items.length);
     /* return (
        <div className="skodaBok">
          <ul className="listinnfyirBok">
            <li>{items.title} </li>
            <li> {items.author.items[0].items[0].id}</li>
            <li> {items.isbn13} </li>
            <li>Alveg lost hvað fiction er semsagt category </li>
            <li> {items.description}</li>
            <li> {items.pagecount} Síður </li>
            <li> Tungumál: {items.language} </li>
          </ul>
        </div>
      );*/
      return(<p> jdjdj</p>);
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