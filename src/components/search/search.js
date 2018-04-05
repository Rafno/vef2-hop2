import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../button';
import './Search.css';
class Search extends Component {
  state = {
    query: '',
    results:[]
  }
  handleInputChange = () => {
    console.log(this.search.value);
    this.setState({
      query:this.search.value
    })
  }
  render() {
    return (
      <form>
        <input
        placeholder="Bókaleit"
        ref={input => this.search = input}
        onChange={this.handleInputChange}
        />
        {/* <p>PLACEHOLDER {this.state.query}</p> */}
        <Button onClick={this.onClick}>Leita</Button>
        </form>
        )
  }
}
export default Search