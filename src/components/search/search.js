import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../button';
import './Search.css';
class Search extends Component {
  state = {
    query: '',
    results: []
  }
  handleInputChange = (e) => {
    this.setState({
      query: this.search.value
    })
  }
  handleSearch = (e) => {
    e.preventDefault();
    window.location.replace(`/books?query=${this.search.value}&page=1`);
  }

  render() {
    return (
      <form>
        <input
          placeholder="Bókaleit"
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <Button onClick={this.handleSearch}>Leita</Button>
      </form>
    )
  }
}
export default Search