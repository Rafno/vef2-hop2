import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Route, Link, Switch } from 'react-router-dom';



/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

class books extends Component {
  state = { data: null, loading: true, error: false, linkur: null, gogn:null, checked:'', confirm:'+', visibleschool:null}
  async componentWillMount() {
    try {
      const linkur ='https://vefforritun2-h1-synilausn.herokuapp.com/books';
      let data = await this.fetchData(linkur);
      let books = data.items.map((i, index) => {
        return (
          <ul>
            <li>{i.title}</li>
            <li>{i.author}</li>
          </ul>
        );
      })
      this.setState({data:books, loading:false});
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
        {this.state.data}
      </div>
    );
  }

  return (
    <div className="listForTitle">

  </div>
 );

}
}
export default books;


