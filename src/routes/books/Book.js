import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Route, Link, Switch } from 'react-router-dom';
/**
 * Hér mun þessi compnent sjá um alla listann af bókunum og getur valið spes bók.
 */

class books extends Component {

  constructor(props) {
      super(props);
      this.state = { 
        back:false, 
        forward:false,
        data:null, 
        loading:true, 
        error:null, 
        linkur:null,
        next:null,
        count:1,
      };

      this.forwardHandler = this.forwardHandler.bind(this);
      this.backwardHandler = this.backwardHandler.bind(this);
  }

  getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
  }
  
  async componentDidMount() {
    const searchParam = this.getQueryVariable("query");
    let url = 'https://verkefni2server.herokuapp.com/books?offset=0&limit=10&books'
    try {
      if(searchParam){
        console.log("url change");
        url = `https://verkefni2server.herokuapp.com/books?search=${searchParam}`
      }
      let data = await this.fetchData(url);
      console.log(data);
      if (searchParam) {
        data = data.response;
      }
      this.setState({ data, loading: false });

    } catch (e) {
      console.error('Error fetching navigation', e);
      this.setState({ error: true, loading: false});
    }
  }
 
  async fetchData(url) {
    const {linkur} = this.state;
    const link = url;
    let data = null;
    const response = await fetch(link);
    if(!linkur){
       data = await response.json();
    } else {
     data = response;
    }
    return data;
  }

  async forwardHandler(event) {
    const {back, forward, data, count} = this.state;
    const linkur = data.links.next.href.toString();
    if(linkur){
      let gogn = await this.fetchData(linkur);
      if (this.getQueryVariable("query")){
        gogn = gogn.response;
      }
      const inc = count+1;

      await this.setState({ data: gogn, loading: false, count:inc });
    }
  }

  async backwardHandler(event) {
    const {back, forward, data, count} = this.state;
    const linkur = data.links.prev.href.toString();
    if(linkur){
      console.log(linkur.href);
      const gogn = await this.fetchData(linkur);
      const dec = count-1;

      await this.setState({ data: gogn, loading: false, count:dec});
    }
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

    const view1 = bakkari ? <div><button>Aftur um síðu</button></div>:null;
    const view2 = frammari ? <div> <button>Áfram um síðu</button></div>:null
    return (
      <div className="BookList">
        <h2> Bækur </h2>
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
        <div className="takkar">
          {<button className="backButton" onClick = {this.backwardHandler}>{view1}</button>}
          {"Síða númer: "+this.state.count}
          {<button className="forwardButton" onClick = {this.forwardHandler}>{view2}</button>}
        </div>
      </div>
    );
    }
  }
export default books;
