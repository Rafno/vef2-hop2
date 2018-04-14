import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import './book.css';
/**
 * Hér mun þessi compnent sjá um alla listann af bókunum og getur valið spes bók.
 */

class books extends Component {

  constructor(props) {
    super(props);
    this.state = {
      back: false,
      forward: false,
      data: null,
      loading: true,
      error: null,
      linkur: null,
      next: null,
      count: 1,
    };

    this.forwardHandler = this.forwardHandler.bind(this);
    this.backwardHandler = this.backwardHandler.bind(this);
  }

  getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
  }

  async componentDidMount() {
    const searchParam = this.getQueryVariable("query");
    const page = this.getQueryVariable("page");
    if (!page) {
      window.location.replace(`/books?page=1`);
    }
    let offset = this.state.count - 1;
    if (page) {
      offset = page - 1;
      this.state.count = parseInt(page, 10);
      if (page < 1) {
        this.setState({ loading: false, error: true })
      }
    }
    let url = `https://verkefni2server.herokuapp.com/books?offset=${(offset) * 10}&limit=10&books`;
    try {
      if (searchParam) {
        ;
        url = `https://verkefni2server.herokuapp.com/books?offset=${(offset) * 10}&limit=10&search=${searchParam}`
      }
      let data = await this.fetchData(url);
      if (data.villa) {
        this.setState({ error: data });
      }
      if (searchParam) {
        data = data.response;
      }
      this.setState({ data, loading: false });

    } catch (e) {
      console.error('Error fetching navigation', e);
      this.setState({ error: true, loading: false });
    }
  }

  async fetchData(url) {
    const { linkur } = this.state;
    const link = url;
    let data = null;
    const response = await fetch(link);
    if (!linkur) {
      data = await response.json();
    } else {
      data = response;
    }
    return data;
  }

  async forwardHandler(event) {
    const search = this.getQueryVariable("query");
    const page = this.getQueryVariable("page");
    if (search) {
      window.location.replace(`/books?query=${search}&page=${parseInt(page, 10) + 1}`);
    } else {
      window.location.replace(`/books?page=${parseInt(page, 10) + 1}`);
    }
  }

  async backwardHandler(event) {
    const search = this.getQueryVariable("query");
    const page = this.getQueryVariable("page");
    if (search) {
      window.location.replace(`/books?query=${search}&page=${parseInt(page, 10) - 1}`);
    } else {
      window.location.replace(`/books?page=${parseInt(page, 10) - 1}`);
    }
  }

  render() {
    let bakkari = true;
    let frammari = true;
    const { data, loading, error } = this.state;

    if (loading) {
      return (
        <div>
          <p>Sæki gögn...</p>
        </div>
      );
    }
    if (error) {
      if (error.villa) {
        return (
          <p>Engar niðurstöður fundust</p>
        );
      }
      return (
        <div>
          <p> villa kom upp </p>
        </div>
      );
    }
    const view1 = bakkari ? <div><button>Aftur um síðu</button></div> : null;
    const view2 = frammari ? <div> <button>Áfram um síðu</button></div> : null
    return (
      <div className="BookList">
        <h1> Bækur </h1>
        {data.items.map((i, index) => {
          const slug = i.id
          const url = "/books/" + slug
          return (
            <ul className="listarnir">
              <Link to={url}>
                <li> <h3>{i.title}</h3></li>
              </Link>
              <li> {i.author} </li>
            </ul>
          );
        })}
        <div className="takkar">
          {data.links.prev ? <button className="backButton" onClick={this.backwardHandler}>{view1}</button> : null}
          <p>Síða {this.state.count}</p>
          {data.links.next ? <button className="forwardButton" onClick={this.forwardHandler}>{view2}</button> : null}
        </div>
      </div>
    );
  }
}
export default books;
