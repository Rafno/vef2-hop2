import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Route, Link, Switch } from 'react-router-dom';



/**
 * Hér mun þessi compnent sjá um alla listann af bókunum og getur valið spes bók.
 */

class books extends Component {
  state = { data: null,
            loading: true,
            error: false,
            clicked:false,
            link: 'https://vefforritun2-h1-synilausn.herokuapp.com/' }
  async componentDidMount() {
    try {
      const linkur ='https://vefforritun2-h1-synilausn.herokuapp.com/books';
      let data = await this.fetchData(linkur);
      this.setState({data, loading:false});
    } catch (e) {
      console.error('Error fetching navigation', e);
      this.setState({ error: true, loading: false});
    }
  }
  async fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  eventHandler = (audkenni) => {
      return(e) => {
        //const data = await this.fetchData(this.state.link+this.state.audkenni);
      //  console.log(data);
       this.setState({clicked:true, bookId:audkenni});
      }
  }
  render(){
  const { data, loading, error, gogn } = this.state;
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
      </div>
    );
  }
  const visible = this.state.clicked ?
  <div className="ShowOneBook">
  </div>:
  <div className="listForTitle">
  {data.items.map((i,index) => {
      return (
          <ul key={index}>
            <li onClick={this.eventHandler(i.id)}>{i.title}</li>
            <li> {i.author}</li>
        </ul>
    );
  })
  }
  </div>;
  return (
  <div>
    {visible}
  </div>
 );









}
}
export default books;


