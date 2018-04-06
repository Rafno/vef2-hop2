import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Route, Link, Switch } from 'react-router-dom';
/**
 * Hér mun þessi compnent sjá um alla listann af bókunum og getur valið spes bók.
 */

class books extends Component {
  state = { back:false, forward:false,data:null, loading:true, error:null, linkur:null}
  async componentDidMount() {
    try {
      const url = 'https://verkefni2server.herokuapp.com/books';
      const data = await this.fetchData(url);
      this.setState({ data, loading: false});
    } catch (e) {
      console.error('Error fetching navigation', e);
      this.setState({ error: true, loading: false});
    }
  }
 async componentDidUpdate () {
    const {back, forward,data, linkur} = this.state;
    if(linkur){
      console.log(linkur.href);
      const gogn = await this.fetchData(linkur);
      this.setState({ data, loading: false});
    }

  }
  async fetchData(url) {
    console.log(url);
    const response = await fetch('https://verkefni2server.herokuapp.com/books');
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  }
  eventHandler = (book) => {
    console.log("helli");
    return(e) => {
      //const data = await this.fetchData(this.state.link+this.state.audkenni);
    const slug = book.id;
    const url ="/books/"+slug
    {<a href={url}></a>}
    }
  }
  buttonHandler = () => {
    const {stat} = this.state;
    const temp = this.state.stat;
    const score = temp+1;
    this.setState({clicked:false, stat:score});
  }
  forwardHandler = (url) => {
    return(e) => {
      this.setState({linkur:url})
    }
   // this.componentDidMount(url);

  }
  backwardHandler = () => {
    //this.setState({back:true});
  }
  render(){
    let bakkari = true;
    let frammari = true;
    const {data, loading, error, teljari} = this.state;
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
    const next = data.links.next
    const view1 = bakkari ? <div><button>Aftur um síðu</button></div>:null;
    const view2 = frammari ? <div> <button>Áfram um síðu</button></div>:null
    return (
      <div className="BookList">
        <h2> Bæækur </h2>
        {data.items.map((i, index) => {
          const slug = i.id
          const url = "/book/"+slug
          return(
            <ul className ="listarnir">
            <Link to = {url}>
              <li> {i.title}</li>
            </Link>
              <li> {i.author} </li>
            </ul>
          );
        })}
        <div takkarnir className="takkar">
          {<div className="backButton" onClick = {this.backwardHandler}>{view1} </div>}
          {"Síða númer: "+teljari}
          {<div className="forwardButton"onClick = {this.forwardHandler(next)}>{view2}</div>}
        </div>
      </div>
    );
    }
  }
export default books;


