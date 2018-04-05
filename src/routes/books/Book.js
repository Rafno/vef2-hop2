import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Route, Link, Switch } from 'react-router-dom';



/**
 * Hér mun þessi compnent sjá um alla listann af bókunum og getur valið spes bók.
 */

class books extends Component {
  state = { clicked:false, bookId:null,stat:0,back:false, forward:true }
  componentDidMount() {
    const files = {
      items:[
        {"id":1,"title":"1985","author":"George Cow","description":"Rosalega skemmtilega bókinn sem er voða merkileg","isbn10":"451524934","isbn13":"9780451524935","category":2,"published":"","pagecount":"246","language":"en"},
        {"id":2,"title":"1Q84","author":"Sensei Haruki Murakami","description":"skitsæmilegt.","isbn10":"307593312","isbn13":"9780307593313","category":11,"published":"2010","pagecount":"925","language":"is"},
        {"id":19,"title":"Abaddon's Gate (The Expanse, #3)","author":"James S.A. Corey","description":"bull","isbn10":"316129070","isbn13":"9780316129077","category":2,"published":"2013-06-04","pagecount":"576","language":"en"},
        {"id":20,"title":"Abhorsen (Abhorsen, #3)","author":"Garth Nix","description":"","isbn10":"","isbn13":"9780060278250","category":7,"published":"","pagecount":null,"language":""},
        {"id":21,"title":"About a Boy","author":"Nick Hornby","description":"","isbn10":"","isbn13":"9780140285673","category":11,"published":"","pagecount":null,"language":""},
        {"id":22,"title":"Academ's Fury (Codex Alera, #2)","author":"Jim Butcher","description":"rugl.","isbn10":"441013406","isbn13":"9780441013401","category":7,"published":"2006","pagecount":"534","language":"en"},
        {"id":3,"title":"A Clash of Kings (A Song of Ice and Fire, #2)","author":"George R. R. Martin","description":"klukka","isbn10":"553381695","isbn13":"9780553381696","category":7,"published":"1999","pagecount":"761","language":"en"},
        {"id":4,"title":"A Clockwork Orange","author":"Anthony Burgess","description":"Resucked.\"","isbn10":"393312836","isbn13":"9780393312836","category":2,"published":"1995-04-17","pagecount":"240","language":"en"},
        {"id":5,"title":"A Conjuring of Light (Shades of Magic, #3)","author":"V.E. Schwab","description":"","isbn10":"","isbn13":"9780765387462","category":7,"published":"","pagecount":null,"language":""},
        {"id":6,"title":"A Crown of Swords (Wheel of Time, #7)","author":"Robert Jordan","description":"Reprint.","isbn10":"812550285","isbn13":"9780812550283","category":7,"published":"1997-11-15","pagecount":"896","language":"en"},
        {"id":13,"title":"the amazing book","author":"john michael","description":"Reprint the hell out of this.","isbn10":"812589785","isbn13":"9780812547883","category":7,"published":"1998-10-10","pagecount":"458","language":"en"},
        {"id":25,"title":"the amazing book","author":"john michael","description":"Reprintll out of this.","isbn10":"8125533585","isbn13":"9780899947883","category":7,"published":"1995-10-10","pagecount":"48","language":"en"},
      ],
    }
    return files;
  }
  componentDidUpdate(){
    console.log("jslue")
  }
  eventHandler = (book) => {
    return(e) => {
      //const data = await this.fetchData(this.state.link+this.state.audkenni);
     this.setState({clicked:true,
      title:book.title,
      author:book.author,
      isbn13:book.isbn13,
      category:book.category,
      description:book.description,
      pages:book.pagecount,
      published:book.published,
      language:book.language,
    });
    }
  }
  buttonHandler = () => {
    const {stat} = this.state;
    const temp = this.state.stat;
    const score = temp+1;
    console.log(score)
    this.setState({clicked:false, stat:score});
  }

  render(){
    const {clicked, title, author, isbn13, category, description, pages, published, language, stat, back, forward} = this.state;
    const gogn = this.componentDidMount();
    const temp = [];
    let j = 0;
    console.log(gogn.items.length)
    let bakkari = false;
    let teljari = this.state.stat;
    if(teljari>0){
      bakkari=true;
    }
    for(let i =teljari*10;i<teljari*10+10;i++){
      if(i === gogn.items.length){
        break;
      }
      temp[j] = gogn.items[i];
      j+=1;
    }
    const view1 = bakkari ? <button></button>:'false';
    return(
    <div className="BookList">
      <h2>Bækur</h2>
      {temp.map((i, index) => {
        return(
          <ul key = {index}>
            <li className="heiti"onClick = {this.eventHandler(i)}>{i.title}</li>
            <li>{i.author}</li>
          </ul>
        );
      }
      )
      }
      <div takkarnir>
      {back}{this.state.stat}{forward}
      </div>
    </div>
    );
    }
  }
export default books;


